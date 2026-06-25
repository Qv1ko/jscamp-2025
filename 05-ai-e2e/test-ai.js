process.loadEnvFiles();

import { test } from "node:test";
import assert from "node:assert";

import { Stagehand } from "@browserbasehq/stagehand";

test("Un usuario puede entrar a la JSConf y adquirir dos entradas por €287.98", async () => {
  const stagehand = new Stagehand({
    env: "LOCAL",
    model: "openai/gpt-5-mini",
  });

  await stagehand.init();

  const [page] = stagehand.context.pages();

  await page.goto("https://jsconf.es");

  // Lo que quiero que haga
  await stagehand.act('Clicar en el botón de "Comprar entradas"');

  await stagehand.act(
    'Click en el "+" al lado de "Entrada general" para seleccionar 1 entrada',
  );
  await stagehand.act(
    'Click en el "+" al lado de "Entrada general" para seleccionar otra entrada más',
  );

  // Extraer la información
  const { extraction } = await stagehand.extract(
    "Obten el subtotal de la página",
  );

  console.log("Subtotal extraído:", extraction);
  assert.strictEqual(extraction, "€287.98");

  await stagehand.close();
});
