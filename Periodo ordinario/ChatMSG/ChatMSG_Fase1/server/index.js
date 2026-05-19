import http from "node:http";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";

const PORT = Number(process.env.PORT) || 3001;
const MAX_MESSAGES = 200;

const app = express();
app.use(cors({ origin: true, credentials: false }));
app.use(express.json());

/** @type {{ id: string; nickname: string; text: string; ts: number }[]} */
const messages = [];
/** @type {Map<string, string>} socketId -> nickname */
const socketNicknames = new Map();

function pushMessage(msg) {
  messages.push(msg);
  while (messages.length > MAX_MESSAGES) messages.shift();
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/messages", (_req, res) => {
  res.json(messages);
});

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: true,
    credentials: false,
  },
});

io.on("connection", (socket) => {
  socket.on("join", (payload, ack) => {
    const nickname =
      typeof payload?.nickname === "string"
        ? payload.nickname.trim().slice(0, 32)
        : "";
    if (!nickname) {
      if (typeof ack === "function") ack({ ok: false, error: "nickname_required" });
      return;
    }
    socketNicknames.set(socket.id, nickname);
    socket.data.nickname = nickname;
    io.emit("presence", {
      usersOnline: socketNicknames.size,
      userJoined: nickname,
    });
    if (typeof ack === "function") ack({ ok: true });
  });

  socket.on("message", (payload) => {
    const nickname = socket.data.nickname || socketNicknames.get(socket.id);
    if (!nickname) return;
    const text =
      typeof payload?.text === "string" ? payload.text.trim().slice(0, 2000) : "";
    if (!text) return;

    const msg = {
      id: `${Date.now()}-${socket.id.slice(0, 8)}`,
      nickname,
      text,
      ts: Date.now(),
    };
    pushMessage(msg);
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    const nick = socketNicknames.get(socket.id);
    socketNicknames.delete(socket.id);
    if (nick) {
      io.emit("presence", {
        usersOnline: socketNicknames.size,
        userLeft: nick,
      });
    }
  });
});

httpServer.listen(PORT, () => {
  console.log(`Chat API + Socket.IO en http://localhost:${PORT}`);
});
