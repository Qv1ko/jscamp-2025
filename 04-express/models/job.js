import crypto from "crypto";
import { DEFAULTS } from "../config";
import jobs from "../jobs.json" with { type: "json" };

export class JobModel {
  static async getAll({
    limit = DEFAULTS.LIMIT,
    offset = DEFAULTS.OFFSET,
    text,
    title,
    technology,
    level,
  }) {
    let filteredJobs = jobs;

    if (text) {
      const searchTerm = text.toLowerCase();
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm) ||
          job.description.toLowerCase().includes(searchTerm),
      );
    }

    if (title) {
      const searchTerm = title.toLowerCase();
      filteredJobs = filteredJobs.filter((job) =>
        job.title.toLowerCase().includes(searchTerm),
      );
    }

    if (technology) {
      const searchTerm = technology.toLowerCase();
      filteredJobs = filteredJobs.filter((job) =>
        job.technology.toLowerCase().includes(searchTerm),
      );
    }

    if (level) {
      const searchTerm = level.toLowerCase();
      filteredJobs = filteredJobs.filter((job) =>
        job.level.toLowerCase().includes(searchTerm),
      );
    }

    const limitNumber = Number.parseInt(limit);
    const offsetNumber = Number.parseInt(offset);

    if (!isNaN(offsetNumber) || !isNaN(limitNumber)) {
      paginatedJobs = filteredJobs.slice(
        offsetNumber,
        offsetNumber + limitNumber,
      );
    }

    return paginatedJobs;
  }

  static async getById(id) {
    return jobs.find((job) => job.id === id);
  }

  static async create({ titulo, empresa, ubicacion, data }) {
    const newJob = {
      id: crypto.randomUUID(),
      titulo,
      empresa,
      ubicacion,
      data,
    };

    jobs.push(newJob); // Insert en DB

    return newJob;
  }

  static async update(id, { titulo, empresa, ubicacion, data }) {
    const jobIndex = jobs.findIndex((job) => job.id === id);

    if (jobIndex === -1) return null;

    const updatedJob = {
      ...jobs[jobIndex],
      titulo,
      empresa,
      ubicacion,
      data,
    };

    jobs[jobIndex] = updatedJob;

    return updatedJob;
  }

  static async parcialUpdate(id, updateData) {
    const jobIndex = jobs.findIndex((job) => job.id === id);

    if (jobIndex === -1) return null;

    const updatedJob = {
      ...jobs[jobIndex],
      ...updateData,
    };

    jobs[jobIndex] = updatedJob;

    return updatedJob;
  }

  static async delete(id) {
    const jobIndex = jobs.findIndex((job) => job.id === id);
    if (jobIndex === -1) return null;

    return jobs.splice(jobIndex, 1)[0];
  }
}
