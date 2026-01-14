import express from "express";
import jobs from "./jobs.json" with { type: "json" };
import { DEFAULTS } from './config.js';

const PORT = process.env.PORT || DEFAULTS.PORT;
const app = express();

app.use((req, res, next) => {
  const timeString = new Date().toLocaleTimeString();
  console.log(`[${timeString}] ${req.method} ${req.url}`);
  next();
});

const previousHomeMiddleware = (req, res, next) => {
  console.log("Middleware anterior a la ruta /");
  next();
};

app.get("/", previousHomeMiddleware, (req, res) => {
  res.send({ message: "Hello, World!" });
});

app.get("/health", (req, res) => {
  res.json({ status: "OK", uptime: process.uptime() });
});

app.get("/jobs", (req, res) => {
  const { limit = DEFAULTS.LIMIT, offset = DEFAULTS.OFFSET, text, title, technology, level } = req.query;

  let filteredJobs = jobs;

  if (text) {
    const searchTerm = text.toLowerCase();
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm)
    );
  }

  if (title) {
    const searchTerm = title.toLowerCase();
    filteredJobs = filteredJobs.filter(
      (job) => job.title.toLowerCase().includes(searchTerm)
    );
  }

  if (technology) {
    const searchTerm = technology.toLowerCase();
    filteredJobs = filteredJobs.filter(
      (job) => job.technology.toLowerCase().includes(searchTerm)
    );
  }

  if (level) {
    const searchTerm = level.toLowerCase();
    filteredJobs = filteredJobs.filter(
      (job) => job.level.toLowerCase().includes(searchTerm)
    );
  }

  if (limit !== undefined && !isNaN(limit)) {
    filteredJobs = filteredJobs.slice(0, Number.parseInt(limit));
  }

  if (offset !== undefined && !isNaN(offset)) {
    filteredJobs = filteredJobs.slice(Number.parseInt(offset));
  }

  res.json(filteredJobs);
});

// Idempotente: porque el sistema queda igual si llamas varias veces
app.get("/jobs/:id", (req, res) => {
  const { id } = req.params;
  const jobId = Number(id);

  return res.json({
    job: { id: jobId, title: `Job with id ${id}` },
  });
});

// NO ES Idempotente
app.post('/jobs', (req, res) => {
  // TODO
});

// Reemplazar un recurso completo
app.put('/jobs/:id', (req, res) => {
  // TODO
});

// Actualizar parcialmente un recurso
app.patch('/jobs/:id', (req, res) => {
  // TODO
});

app.delete('/jobs/:id', (req, res) => {
  // TODO
});

// Opcional
app.get("/a{b}cd", (req, res) => {
  res.send("abcd o acd");
});

// Comodín
app.get("/bb*bb", (req, res) => {
  res.send("bb*bb");
});

// Rutas más largas que no sabes como terminan
app.get("file/*filname", (req, res) => {
  res.send(`file: ${req.params.filname}`);
});

// Con Regex
app.get(/.*fly$/, (req, res) => {
  res.send("Termina en fly");
});

app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`);
});
