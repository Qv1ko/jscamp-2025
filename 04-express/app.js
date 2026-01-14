
import {corsMiddleware} from './middlewares/cors.js';
import { routerJobs } from "./routes/jobs.js";
import express from "express";
import { DEFAULTS } from './config.js';
import jobs from "./jobs.json" with { type: "json" };

const PORT = process.env.PORT || DEFAULTS.PORT;
const app = express();

app.use(corsMiddleware());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`);
});