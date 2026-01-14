import cors from 'cors';
import crypto from "crypto";
import express from "express";
import { DEFAULTS } from './config.js';
import jobs from "./jobs.json" with { type: "json" };

const PORT = process.env.PORT || DEFAULTS.PORT;
const app = express();

app.use(cors({
  origin: (origin, callback) => {
    if (DEFAULTS.ACCEPTED_ORIGINS.includes(origin) || !origin) {
      callback(null, true);
    }
    return callback(new Error('Origen no permitido'));
  }
}));
app.use(express.json());

app.use((req, res, next) => {
  const timeString = new Date().toLocaleTimeString();
  console.log(`[${timeString}] ${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send({ message: "Hello, World!" });
});

app.get("/health", (req, res) => {
  res.json({ status: "OK", uptime: process.uptime() });
});

// CRUD: Create, Read, Update, Delete

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

  res.json({data: filteredJobs, paginated: { limit, offset }, total: filteredJobs.length});
});

// Idempotente: porque el sistema queda igual si llamas varias veces
app.get("/jobs/:id", (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);

  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }

  return res.json(job);
});

// NO ES Idempotente
app.post('/jobs', (req, res) => {
  const { titulo, empresa, ubicacion, data } = req.body;

  const newJob = {
    id: crypto.randomUUID(),
    titulo,
    empresa,
    ubicacion,
    data
  }

  jobs.push(newJob); // Insert en DB

  res.status(201).json(newJob);
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

app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`);
});
