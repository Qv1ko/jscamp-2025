import { createServer } from "http";
import { json } from "node:stream/consumers";
import { randomUUID } from "node:crypto";

process.loadEnvFile();
const port = process.env.PORT ?? 3000;

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
  });
  res.end(JSON.stringify(data));
}

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

const server = createServer(async (req, res) => {
  const { method, url } = req;

  const [pathName, queryString] = url.split("?");

  const searchParams = new URLSearchParams(queryString);
  console.log(searchParams.get("limit"));

  if (method === "GET") {
    if (pathName === "/") {
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      return res.end("Hola desde Node 👍");
    }

    if (pathName === "/users") {
      const limit = Number(searchParams.get("limit")) || users.length;
      const offset = Number(searchParams.get("offset")) || 0;

      const paginatedUsers = users.slice(offset, offset + limit);

      return sendJson(res, 200, paginatedUsers);
    }

    if (pathName === "/health") {
      return sendJson(res, 200, { status: "ok", uptime: process.uptime() });
    }
  }

  if (method === "POST" && pathName === "/users") {
    const body = await json(req);

    if (!body || !body.name) {
      return sendJson(res, 400, { message: "El nombre es obligatorio" });
    }

    const newUser = {
      name: body.name,
      id: randomUUID(),
    };

    users.push(newUser);

    return sendJson(res, 200, { message: "Usuario creado" });
  }

  return sendJson(res, 404, { message: "Not Found" });
});

server.listen(port, () => {
  console.log(`Servidor escuchado en http://localhost:${port}`);
});
