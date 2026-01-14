import crypto from "crypto";
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
    } = req.params;

    const filteredJobs = await JobModel.getAll({
      limit,
      offset,
      text,
      title,
      technology,
      level,
    });

    res.json({
      data: filteredJobs,
      paginated: { limit, offset },
      total: filteredJobs.length,
    });
  }

  static async getById(req, res) {
    const { titulo, empresa, ubicacion, data } = req.body;

    const newJob = {
      id: crypto.randomUUID(),
      titulo,
      empresa,
      ubicacion,
      data,
    };

    jobs.push(newJob); // Insert en DB

    res.status(201).json(newJob);
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
