import { test, describe, before, after } from "node:test";
import assert from "node:assert";
import app from "./app.js";

let server;

const PORT = 3456;
const BASE_URL = `http://localhost:${PORT}`;

// Antes de todos los tests, se ejecuta una vez para levantar el servidor
before(async () => {
  return new Promise((resolve, reject) => {
    server = app.listen(PORT, () => resolve());
    server.on("error", reject);
  });
});

// después de todos los tests, se ejecuta una vez para cerrar el servidor
after(async () => {
  return new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
});
