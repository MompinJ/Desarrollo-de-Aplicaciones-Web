import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import {
  PORT,
  JWT_SECRET,
  COOKIE_NAME,
  cookieOptions,
} from "./config.js";
import { authMiddleware } from "./middleware/auth.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";
app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  })
);

// Demo: admin / 12345
app.post("/api/login", (req, res) => {
  const { username, password } = req.body || {};
  if (username === "admin" && password === "12345") {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
    res.cookie(COOKIE_NAME, token, cookieOptions());
    return res.json({ message: "Login exitoso" });
  }
  return res.status(401).json({ message: "Credenciales inválidas" });
});

app.get("/api/me", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

app.post("/api/logout", (req, res) => {
  res.clearCookie(COOKIE_NAME, { path: "/" });
  res.json({ message: "Sesión cerrada" });
});

app.listen(PORT, () => {
  console.log(`API en http://localhost:${PORT}`);
});
