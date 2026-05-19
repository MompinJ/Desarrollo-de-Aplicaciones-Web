const express = require("express");
const cors = require("cors");

const servidor = express();
const PUERTO = 3000;

servidor.use(cors());
servidor.use(express.json());
servidor.use(express.static("public"));

let registros = [
  {
    id: 1,
    nombre: "Javier Mompin",
    email: "javier.mompin@correo.mx",
    genero: "Masculino",
    plataformas: ["Netflix", "Prime"],
  },
  {
    id: 2,
    nombre: "Andrea Lopez",
    email: "andrea.lopez@correo.mx",
    genero: "Femenino",
    plataformas: ["Disney+", "HBO"],
  },
];

let siguienteId = 3;

servidor.get("/api/usuarios", (_req, res) => {
  res.json(registros);
});

servidor.get("/api/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const usuario = registros.find((u) => u.id === id);
  if (!usuario) return res.status(404).json({ mensaje: "No encontrado" });
  res.json(usuario);
});

servidor.post("/api/usuarios", (req, res) => {
  const nuevo = {
    id: siguienteId++,
    nombre: req.body.nombre,
    email: req.body.email,
    genero: req.body.genero,
    plataformas: req.body.plataformas,
  };
  registros.push(nuevo);
  res.status(201).json(nuevo);
});

servidor.put("/api/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const usuario = registros.find((u) => u.id === id);
  if (!usuario) return res.status(404).json({ mensaje: "No encontrado" });

  usuario.nombre = req.body.nombre;
  usuario.email = req.body.email;
  usuario.genero = req.body.genero;
  usuario.plataformas = req.body.plataformas;
  res.json(usuario);
});

servidor.delete("/api/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const idx = registros.findIndex((u) => u.id === id);
  if (idx === -1) return res.status(404).json({ mensaje: "No encontrado" });
  registros.splice(idx, 1);
  res.status(204).end();
});

servidor.listen(PUERTO, () => {
  console.log(`Servidor activo en http://localhost:${PUERTO}`);
});
