import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import http from "node:http";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config({ path: path.resolve(__dirname, ".env") });
import crypto from "node:crypto";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { parse as parseCookie } from "cookie";
import Redis from "ioredis";
import { Server } from "socket.io";

const PORT = Number(process.env.PORT) || 3001;
const MAX_MESSAGES = 200;
const JWT_SECRET = process.env.JWT_SECRET || "dev-cambiar-JWT_SECRET-en-produccion";
const COOKIE_NAME = "chatmsg_session";
const CHAT_CHANNEL = process.env.REDIS_CHANNEL || "chatmsg:messages";
const SERVER_ID = process.env.SERVER_ID || `srv-${crypto.randomBytes(4).toString("hex")}`;

const REDIS_URL = process.env.REDIS_URL;
const REDIS_HOST =
  process.env.REDIS_HOST ||
  "redis-18104.c251.east-us-mz.azure.cloud.redislabs.com";
const REDIS_PORT = Number(process.env.REDIS_PORT) || 18104;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || undefined;
/** Redis 6+ / Redis Cloud: suele ser `default` (lo pone el panel al copiar la URL). */
const REDIS_USERNAME = process.env.REDIS_USERNAME;
const REDIS_TLS =
  process.env.REDIS_TLS === "1" ||
  process.env.REDIS_URL?.startsWith("rediss://");

function buildRedisOptions() {
  if (REDIS_URL) {
    return REDIS_URL;
  }
  const opts = {
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD,
    ...(REDIS_TLS ? { tls: { rejectUnauthorized: true } } : {}),
  };
  if (REDIS_PASSWORD) {
    opts.username = REDIS_USERNAME || "default";
  }
  return opts;
}

function redisAuthHint() {
  return [
    "Añade en ChatMSG_Fase2/.env la contraseña del panel de Redis Cloud, por ejemplo:",
    "  REDIS_PASSWORD=tu_clave_aqui",
    "o una URL completa:",
    "  REDIS_URL=redis://default:tu_clave@redis-....:18104",
    "Si el panel te da rediss:// (TLS), usa REDIS_URL=rediss://... o REDIS_TLS=1.",
  ].join("\n");
}

const app = express();

function allowCorsOrigin(origin) {
  if (!origin) return true;
  return (
    /^https?:\/\/localhost(?::\d+)?$/.test(origin) ||
    /^https?:\/\/127\.0\.0\.1(?::\d+)?$/.test(origin)
  );
}

const corsOptions = {
  origin(origin, cb) {
    cb(null, allowCorsOrigin(origin));
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

/** @type {{ id: string; nickname: string; text: string; ts: number; origin?: string }[]} */
const messages = [];
/** @type {Map<string, string>} socketId -> nickname */
const socketNicknames = new Map();

function pushMessage(msg) {
  messages.push(msg);
  while (messages.length > MAX_MESSAGES) messages.shift();
}

/** @type {Redis | null} */
let pub = null;

function publishMessage(msg) {
  if (!pub) return;
  pub.publish(CHAT_CHANNEL, JSON.stringify(msg)).catch((err) => {
    console.error("[redis pub]", err.message);
  });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

app.post("/api/session", (req, res) => {
  const nickname = String(req.body?.nickname ?? "")
    .trim()
    .slice(0, 32);
  if (!nickname) {
    return res.status(400).json({ error: "nickname_required" });
  }
  const token = jwt.sign({ nickname }, JWT_SECRET, { expiresIn: "7d" });
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });
  res.json({ ok: true, nickname });
});

app.get("/api/me", (req, res) => {
  const t = req.cookies[COOKIE_NAME];
  if (!t) return res.status(401).json({ error: "no_session" });
  try {
    const { nickname } = verifyToken(t);
    res.json({ nickname });
  } catch {
    res.status(401).json({ error: "invalid_session" });
  }
});

app.post("/api/logout", (req, res) => {
  res.clearCookie(COOKIE_NAME, { path: "/" });
  res.json({ ok: true });
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, serverId: SERVER_ID, redis: Boolean(pub) });
});

app.get("/api/messages", (req, res) => {
  const t = req.cookies[COOKIE_NAME];
  if (!t) return res.status(401).json({ error: "no_session" });
  try {
    verifyToken(t);
  } catch {
    return res.status(401).json({ error: "invalid_session" });
  }
  res.json(messages);
});

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: (origin, cb) => cb(null, allowCorsOrigin(origin)),
    credentials: true,
    methods: ["GET", "POST"],
  },
});

io.use((socket, next) => {
  try {
    const raw = socket.handshake.headers.cookie || "";
    const cookies = parseCookie(raw);
    const token = cookies[COOKIE_NAME];
    if (!token) {
      return next(new Error("no_session"));
    }
    const { nickname } = verifyToken(token);
    socket.data.nickname = nickname;
    next();
  } catch {
    next(new Error("invalid_session"));
  }
});

io.on("connection", (socket) => {
  const nickname = socket.data.nickname;
  if (!nickname) {
    socket.disconnect();
    return;
  }

  socketNicknames.set(socket.id, nickname);
  io.emit("presence", {
    usersOnline: socketNicknames.size,
    userJoined: nickname,
    serverId: SERVER_ID,
  });

  /** No usar el nombre de evento "message" (reservado / conflicto en Socket.IO). */
  socket.on("chat:send", (payload) => {
    const text =
      typeof payload?.text === "string" ? payload.text.trim().slice(0, 2000) : "";
    if (!text) return;

    const msg = {
      id: `${Date.now()}-${crypto.randomUUID()}`,
      nickname,
      text,
      ts: Date.now(),
      origin: SERVER_ID,
    };

    publishMessage(msg);
  });

  socket.on("disconnect", () => {
    const nick = socketNicknames.get(socket.id);
    socketNicknames.delete(socket.id);
    if (nick) {
      io.emit("presence", {
        usersOnline: socketNicknames.size,
        userLeft: nick,
        serverId: SERVER_ID,
      });
    }
  });
});

async function startRedis() {
  const opts = buildRedisOptions();
  pub = new Redis(opts);
  const sub = new Redis(opts);

  pub.on("error", (e) => console.error("[redis pub]", e.message));
  sub.on("error", (e) => console.error("[redis sub]", e.message));

  await sub.subscribe(CHAT_CHANNEL);
  console.log(`[redis] suscrito a canal "${CHAT_CHANNEL}" (${SERVER_ID})`);

  sub.on("message", (_channel, payload) => {
    try {
      const msg = JSON.parse(payload);
      if (!msg?.id || !msg?.nickname || !msg?.text) return;
      pushMessage(msg);
      io.emit("chat:message", msg);
    } catch (e) {
      console.error("[redis message]", e.message);
    }
  });
}

httpServer.listen(PORT, async () => {
  console.log(`Chat Fase 2 — ${SERVER_ID} — http://localhost:${PORT}`);
  try {
    await startRedis();
  } catch (e) {
    console.error("[redis] no se pudo conectar:", e.message);
    if (String(e.message).includes("NOAUTH")) {
      console.error(redisAuthHint());
    }
    process.exit(1);
  }
});
