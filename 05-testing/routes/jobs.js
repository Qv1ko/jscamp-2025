import { Router } from "express";
import { JobController } from "../controllers/jobs";
import { validateJob, validatePartialJob } from "../validators/jobs";

export default jobsRouter;

function validateCreate(req, res, next) {
  const result = validateJob(req.body);
  if (result.success) {
    req.body = result.data; // Vamos a tener los datos validados y limpios
    return next();
  }

  return res.status(400).json({ error: "Invalid request", data: result.error });
}

function validateUpdate(req, res, next) {
  const result = validatePartialJob(req.body);
  if (result.success) {
    req.body = result.data;
    return next();
  }

  return res.status(400).json({ error: "Invalid request", data: result.error });
}

jobsRouter.get("/", JobController.getAll);
jobsRouter.get("/:id", JobController.getById);
jobsRouter.post("/", validateCreate, JobController.create);
jobsRouter.put("/:id", validateUpdate, JobController.update);
jobsRouter.patch("/:id", validateUpdate, JobController.parcialUpdate);
jobsRouter.delete("/:id", JobController.delete);
