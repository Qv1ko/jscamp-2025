import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

// const args = process.argv.slice(2);
// console.log("Arguments:", args);

// 1. Recuperar la carpeta a listar
const dir = process.argv[2] ?? ".";

// 2. Formateo simple de los tamaños
const formatBytes = (size) => {
  if (size < 1024) return size + " B";
  return (size / 1024).toFixed(2) + " KB";
};

// 3. Leer los nombre, sin info
const files = await readdir(dir);

// 4. Recuperar la infor de cada file
const entries = Promise.all(
  files.map(async (name) => {
    const fullPath = join(dir, name);
    const info = await stat(fullPath);
    return { name, isDir: info.isDirectory(), size: formatBytes(info.size) };
  })
);

// TODO sort
// 1. Primero carpetas
// 2. Orden alfabetico
// 3. Tener encuenta flags como --files-only o --dirs-only

for (const entry of await entries) {
  const icon = entry.isDir ? "📁" : "📄";
  const size = entry.isDir ? "-" : entry.size;

  console.log(`${icon} ${entry.name.padEnd(25)}   ${size}`);
}
