import { Router } from "express";
import { exito, cancelar } from "../config.js";
import { procesarPago } from "../controllers/pagoControllers.js";

const router = Router();

router.post("/pagar", procesarPago);
router.get("/exito", (req, res) => (res.send(exito)));
router.get("/cancelado", (req, res) => (res.send(cancelar)));

export default router;
