import jwt from "jsonwebtoken";
import { COOKIE_NAME, JWT_SECRET } from "../config.js";

export function authMiddleware(req, res, next) {
  const token = req.cookies[COOKIE_NAME];
  if (!token) {
    return res.status(401).json({ message: "No autenticado" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Token no válido" });
  }
}
