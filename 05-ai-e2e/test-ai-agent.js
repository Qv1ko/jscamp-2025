process.loadEnvFiles();

import { test } from "node:test";
import assert from "node:assert";

import { Stagehand } from "@browserbasehq/stagehand";

test("Un usuario puede entrar a la JSConf y adquirir dos entradas por €287.98", async () => {
  const stagehand = new Stagehand({
    env: "LOCAL",
    model: "openai/gpt-5-mini",
  });

  const agent = stagehand.agent({
    mode: "cua",
    model: {
      modelName: "openai/gpt-5-mini",
      apiKey: process.env.OPENAI_API_KEY,
    },
    systemPrompt:
      "Eres un agente de testing e2e para navegar páginas y hacer las haciones que te pido.",
  });

  await stagehand.init();

  const [page] = stagehand.context.pages();

  await page.goto("https://jsconf.es");

  const result = await stagehand.agent(
    'add two tickets "Entrada" to the cart for the JSConf event and extract the subtotal amount displayed in the cart.',
  );

  console.log("Subtotal extraído:", result);
  assert.strictEqual(result, "€287.98");

  await stagehand.close();
});
