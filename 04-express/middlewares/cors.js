import cors from "cors";
import { DEFAULTS } from "./config.js";

export const corsMiddleware = ({
  acceptedOrigins = DEFAULTS.ACCEPTED_ORIGINS,
} = {}) => {
  return cors({
    origin: (origin, callback) => {
      if (DEFAULTS.ACCEPTED_ORIGINS.includes(origin) || !origin) {
        callback(null, true);
      }
      return callback(new Error("Origen no permitido"));
    },
  });
};
