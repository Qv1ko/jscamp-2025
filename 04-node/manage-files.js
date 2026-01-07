import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";

let content = "";

if (process.permissions?.has("fs.read", "archivo.txt")) {
  content = await readFile("./archivo.txt", "utf-8");
  console.log(content);
} else {
  console.log("No se tiene permiso para leer el archivo.");
}

if (process.permissions?.has("fs.write", "output/files/documents/")) {
  const outputDir = join("output", "files", "documents");
  await mkdir(outputDir, { recursive: true });

  const uppercaseContent = content.toUpperCase();
  const outputFilePath = join(outputDir, "archivo-uppsercase.txt");

  console.log("La extensión es:", extname(outputFilePath));
  console.log("El nombre del archivo es:", basename(outputFilePath));

  await writeFile(outputFilePath, uppercaseContent);
  console.log("Archivo creado con contenido en mayúsculas");
} else {
  console.log("No se tiene permiso para escribir el archivo.");
}
