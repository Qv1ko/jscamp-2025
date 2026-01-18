import cors from "cors";
import { DEFAULTS } from "./config.js";

export const corsMiddleware = ({
  acceptedOrigins = DEFAULTS.ACCEPTED_ORIGINS,
} = {}) => {
  return cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin) || !origin) {
        callback(null, true);
      }

      return callback(new Error("Origen no permitido"));
    },
  });
};
