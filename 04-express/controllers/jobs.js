import { DEFAULTS } from "../config.js";
import { JobModel } from "../models/job.js";

export class JobController {
  static async getAll(req, res) {
    const {
      limit = DEFAULTS.LIMIT,
      offset = DEFAULTS.OFFSET,
      text,
      title,
      technology,
      level,
    } = req.query;

    const paginatedJobs = await JobModel.getAll({
      limit,
      offset,
      text,
      title,
      technology,
      level,
    });

    res.json({
      data: paginatedJobs,
      total: paginatedJobs.length,
      limit: limit,
      offset: offset,
    });
  }

  static async getById(req, res) {
    const { id } = req.params;

    const job = JobModel.getById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(201).json(job);
  }

  static async create(req, res) {
    const { titulo, empresa, ubicacion, data } = req.body;

    const newJob = JobModel.create({
      titulo,
      empresa,
      ubicacion,
      data,
    });

    res.status(201).json(newJob);
  }

  static async update(req, res) {}
  static async parcialUpdate(req, res) {}
  static async delete(req, res) {}
}
