import { JobCard } from "./JobCard.jsx";

export function JobListing({ jobs }) {
  return (
    <>
      <h2>Resultados de búsqueda</h2>
      <div className="results">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  );
}
