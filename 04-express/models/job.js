import jobs from "../jobs.json" with { type: "json" };

export class JobModel {
    static async getAll({ limit, offset, text, title, technology, level }) {
        let filteredJobs = jobs;
        
        if (text) {
            const searchTerm = text.toLowerCase();
            filteredJobs = filteredJobs.filter(
            (job) =>
                job.title.toLowerCase().includes(searchTerm) ||
                job.description.toLowerCase().includes(searchTerm)
            );
        }
    
        if (title) {
            const searchTerm = title.toLowerCase();
            filteredJobs = filteredJobs.filter((job) =>
            job.title.toLowerCase().includes(searchTerm)
            );
        }
    
        if (technology) {
            const searchTerm = technology.toLowerCase();
            filteredJobs = filteredJobs.filter((job) =>
            job.technology.toLowerCase().includes(searchTerm)
            );
        }
    
        if (level) {
            const searchTerm = level.toLowerCase();
            filteredJobs = filteredJobs.filter((job) =>
            job.level.toLowerCase().includes(searchTerm)
            );
        }
    
        if (limit !== undefined && !isNaN(limit)) {
            filteredJobs = filteredJobs.slice(0, Number.parseInt(limit));
        }
    
        if (offset !== undefined && !isNaN(offset)) {
            filteredJobs = filteredJobs.slice(Number.parseInt(offset));
        }

        return filteredJobs;
    }

    static async getById(id) {
        return jobs.find((job) => job.id === id);
    }

    static async create({ titulo, empresa, ubicacion, data }) {
        const job = {
            id: crypto.randomUUID(),
            titulo,
            empresa,
            ubicacion,
            data,
        };

        jobs.push(job); // Insert en DB

        return job;
    }
}