import { Router } from "express";
import { JobController } from "../controllers/jobs";

export default jobsRouter;

jobsRouter.get("/", JobController.getAll);
jobsRouter.get("/:id", JobController.getById);
jobsRouter.post("/", JobController.create);
jobsRouter.put("/:id", JobController.update);
jobsRouter.patch("/:id", JobController.parcialUpdate);
jobsRouter.delete("/:id", JobController.delete);
