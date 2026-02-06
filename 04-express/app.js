import { corsMiddleware } from "./middlewares/cors.js";
import express from "express";
import { DEFAULTS } from "./config.js";

const PORT = process.env.PORT || DEFAULTS.PORT;
const app = express();

app.use(corsMiddleware());
app.use(express.json());

// development o production
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`);
  });
}

export default app;
