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

describe("GET /jobs", () => {
  test("debe responder con 200 y un array de trabajos", async () => {
    const response = await fetch(`${BASE_URL}/jobs`);
    assert.strictEqual(response.status, 200);

    const json = await response.json();
    assert.ok(Array.isArray(json.data), "La respuesta debe ser un array");
  });

  test("debe filtrar trabajos por tecnología", async () => {
    const tech = "javascript";
    const response = await fetch(`${BASE_URL}/jobs?technology=${tech}`);
    assert.strictEqual(response.status, 200);

    const json = await response.json();
    assert.ok(
      json.data.every((job) => job.data.technology.includes(tech)),
      `Todos los trabajos deben incluir la tecnología ${tech}`,
    );
  });
});

describe("POST /jobs", () => {
  test("debe crear un nuevo trabajo y responder con 201", async () => {
    const newJob = {
      titulo: "Backend Developer",
      empresa: "Tech Company",
      ubicacion: "Remote",
      data: {
        technology: ["nodejs", "express"],
        modalidad: "full-time",
        nivel: "mid",
      },
    };

    const response = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob),
    });
    assert.strictEqual(response.status, 201);
  });
});

describe("GET /jobs/:id", () => {
  test("debe responder con 404 para un ID no existente", async () => {
    const response = await fetch(`${BASE_URL}/jobs/bad-id`);
    assert.strictEqual(response.status, 404);
  });
});

describe("PUT /jobs/:id", () => {
  test("debe actualizar un trabajo existente y responder con 200", async () => {
    const newJob = {
      titulo: "Frontend Developer",
      empresa: "Design Company",
      ubicacion: "Remote",
      data: {
        technology: ["react", "css"],
        modalidad: "full-time",
        nivel: "junior",
      },
    };

    const createResponse = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob),
    });
    const createdJob = await createResponse.json();
    const jobId = createdJob.id;

    const updatedData = {
      titulo: "Senior Frontend Developer",
      empresa: "Design Company",
      ubicacion: "Remote",
      data: {
        technology: ["react", "css", "typescript"],
        modalidad: "full-time",
        nivel: "senior",
      },
    };
    const updateResponse = await fetch(`${BASE_URL}/jobs/${jobId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    assert.strictEqual(updateResponse.status, 200);

    const updatedJob = await updateResponse.json();
    assert.strictEqual(updatedJob.titulo, updatedData.titulo);
    assert.deepStrictEqual(
      updatedJob.data.technology,
      updatedData.data.technology,
    );
  });
});

describe("DELETE /jobs/:id", () => {
  test("debe eliminar un trabajo existente y responder con 204", async () => {
    const newJob = {
      titulo: "QA Engineer",
      empresa: "Testing Company",
      ubicacion: "Remote",
      data: {
        technology: ["automation", "manual"],
        modalidad: "full-time",
        nivel: "mid",
      },
    };

    const createResponse = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob),
    });
    assert.strictEqual(createResponse.status, 201);

    const createdJob = await createResponse.json();
    const jobId = createdJob.id;

    const deleteResponse = await fetch(`${BASE_URL}/jobs/${jobId}`, {
      method: "DELETE",
    });
    assert.strictEqual(deleteResponse.status, 204);
  });
});

describe("Validación en middleware - POST /jobs", () => {
  test("debe rechazar con 400 cuando falta el campo 'titulo'", async () => {
    const invalidJob = {
      empresa: "Tech Company",
      ubicacion: "Remote",
      data: {
        technology: ["nodejs"],
        modalidad: "full-time",
        nivel: "mid",
      },
    };

    const response = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invalidJob),
    });
    assert.strictEqual(response.status, 400);

    const json = await response.json();
    assert.ok(json.error, "Debe haber un mensaje de error");
  });

  test("debe rechazar con 400 cuando 'titulo' está vacío", async () => {
    const invalidJob = {
      titulo: "",
      empresa: "Tech Company",
      ubicacion: "Remote",
      data: {
        technology: ["nodejs"],
        modalidad: "full-time",
        nivel: "mid",
      },
    };

    const response = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invalidJob),
    });
    assert.strictEqual(response.status, 400);
  });

  test("debe rechazar con 400 cuando 'titulo' excede 100 caracteres", async () => {
    const invalidJob = {
      titulo: "a".repeat(101),
      empresa: "Tech Company",
      ubicacion: "Remote",
      data: {
        technology: ["nodejs"],
        modalidad: "full-time",
        nivel: "mid",
      },
    };

    const response = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invalidJob),
    });
    assert.strictEqual(response.status, 400);
  });

  test("debe rechazar con 400 cuando falta el objeto 'data'", async () => {
    const invalidJob = {
      titulo: "Backend Developer",
      empresa: "Tech Company",
      ubicacion: "Remote",
    };

    const response = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invalidJob),
    });
    assert.strictEqual(response.status, 400);
  });

  test("debe rechazar con 400 cuando 'technology' no es un array", async () => {
    const invalidJob = {
      titulo: "Backend Developer",
      empresa: "Tech Company",
      ubicacion: "Remote",
      data: {
        technology: "nodejs",
        modalidad: "full-time",
        nivel: "mid",
      },
    };

    const response = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invalidJob),
    });
    assert.strictEqual(response.status, 400);
  });

  test("debe aceptar y normalizar 'technology' a minúsculas", async () => {
    const jobWithUpperCase = {
      titulo: "Backend Developer",
      empresa: "Tech Company",
      ubicacion: "Remote",
      data: {
        technology: ["NodeJS", "EXPRESS"],
        modalidad: "full-time",
        nivel: "mid",
      },
    };

    const response = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobWithUpperCase),
    });
    assert.strictEqual(response.status, 201);

    const json = await response.json();
    assert.ok(
      json.data.technology.every((tech) => tech === tech.toLowerCase()),
      "Las tecnologías deben estar en minúsculas",
    );
  });

  test("debe permitir campos opcionales como 'descripcion'", async () => {
    const jobWithOptional = {
      titulo: "Backend Developer",
      empresa: "Tech Company",
      ubicacion: "Remote",
      descripcion: "Una descripción del puesto",
      data: {
        technology: ["nodejs", "express"],
        modalidad: "full-time",
        nivel: "mid",
      },
    };

    const response = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobWithOptional),
    });
    assert.strictEqual(response.status, 201);
  });
});

describe("Validación en middleware - PUT /jobs/:id", () => {
  test("debe permitir actualizar solo algunos campos", async () => {
    const newJob = {
      titulo: "Original Title",
      empresa: "Original Company",
      ubicacion: "Remote",
      data: {
        technology: ["nodejs"],
        modalidad: "full-time",
        nivel: "junior",
      },
    };

    const createResponse = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob),
    });
    const createdJob = await createResponse.json();
    const jobId = createdJob.id;

    const partialUpdate = {
      titulo: "Updated Title",
    };

    const updateResponse = await fetch(`${BASE_URL}/jobs/${jobId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(partialUpdate),
    });
    assert.strictEqual(updateResponse.status, 200);

    const updatedJob = await updateResponse.json();
    assert.strictEqual(updatedJob.titulo, "Updated Title");
  });

  test("debe rechazar con 400 si 'titulo' está vacío en PUT", async () => {
    const newJob = {
      titulo: "Original Title",
      empresa: "Original Company",
      ubicacion: "Remote",
      data: {
        technology: ["nodejs"],
        modalidad: "full-time",
        nivel: "junior",
      },
    };

    const createResponse = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob),
    });
    const createdJob = await createResponse.json();
    const jobId = createdJob.id;

    const invalidUpdate = {
      titulo: "",
    };

    const updateResponse = await fetch(`${BASE_URL}/jobs/${jobId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invalidUpdate),
    });
    assert.strictEqual(updateResponse.status, 400);
  });

  test("debe permitir actualizar el objeto 'data' parcialmente", async () => {
    const newJob = {
      titulo: "Backend Developer",
      empresa: "Tech Company",
      ubicacion: "Remote",
      data: {
        technology: ["nodejs", "express"],
        modalidad: "full-time",
        nivel: "junior",
      },
    };

    const createResponse = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob),
    });
    const createdJob = await createResponse.json();
    const jobId = createdJob.id;

    const partialDataUpdate = {
      data: {
        nivel: "senior",
      },
    };

    const updateResponse = await fetch(`${BASE_URL}/jobs/${jobId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(partialDataUpdate),
    });
    assert.strictEqual(updateResponse.status, 200);
  });

  test("debe permitir un objeto vacío en PUT (todos los campos son opcionales)", async () => {
    const newJob = {
      titulo: "Backend Developer",
      empresa: "Tech Company",
      ubicacion: "Remote",
      data: {
        technology: ["nodejs"],
        modalidad: "full-time",
        nivel: "junior",
      },
    };

    const createResponse = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob),
    });
    const createdJob = await createResponse.json();
    const jobId = createdJob.id;

    const emptyUpdate = {};

    const updateResponse = await fetch(`${BASE_URL}/jobs/${jobId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emptyUpdate),
    });
    assert.strictEqual(updateResponse.status, 200);
  });
});
