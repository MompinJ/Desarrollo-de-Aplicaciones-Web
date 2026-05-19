const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Usuario = require("./models/Usuario.js");

const servidor = express();
const PUERTO = process.env.PORT || 3000;

servidor.use(cors());
servidor.use(express.json());
servidor.use(express.static("public"));

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Conexion MongoDB lista"))
  .catch((err) => console.error("Error al conectar Mongo:", err));

servidor.post("/api/usuarios", async (req, res) => {
  try {
    const nuevo = new Usuario({
      nombre: req.body.nombre,
      email: req.body.email,
      genero: req.body.genero,
      plataformas: req.body.plataformas,
    });
    const guardado = await nuevo.save();
    res.status(201).json(guardado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

servidor.get("/api/usuarios", async (_req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
});

servidor.put("/api/usuarios/:id", async (req, res) => {
  const actualizado = await Usuario.findByIdAndUpdate(
    req.params.id,
    {
      nombre: req.body.nombre,
      email: req.body.email,
      genero: req.body.genero,
      plataformas: req.body.plataformas,
    },
    { new: true }
  );
  res.json(actualizado);
});

servidor.delete("/api/usuarios/:id", async (req, res) => {
  await Usuario.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

servidor.listen(PUERTO, () => {
  console.log(`Servidor activo en http://localhost:${PUERTO}`);
});
