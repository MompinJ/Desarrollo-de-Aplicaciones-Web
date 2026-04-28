import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import { info } from "./config.js";
import path from "path";
import router from "./routes/payment-roues.js";

const app = express();
app.use(router);
app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve("src/public")));

app.listen(PORT, "0.0.0.0");
console.log("WU YI BI FONG en el puerto", PORT, info);


