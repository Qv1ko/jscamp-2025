import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import snarkdown from "snarkdown";
import styles from "./Detail.module.css";

function JobSection({ title, content }) {
  const html = snarkdown(content);

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div
        className={`${styles.sectionContent} prose`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
}

export function JobDetail() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://jscamp-api.vercel.app/api/jobs/${jobId}`)
      .then((response) => {
        if (!response.ok) throw new Error("Job Not Found");
        return response.json();
      })
      .then((json) => setJob(json))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [jobId]);

  if (loading) {
    return (
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
        <div className={styles.loading}>
          <p className={styles.loadingText}>Cargando...</p>
        </div>
      </div>
    );
  }

  if ((error, !job)) {
    return (
      <div className={styles.notFound}>
        <h1>Oferta no encontrada</h1>
        <p>Puede que esta oferta haya caducado o que la URL no sea correcta.</p>
        <button className={styles.backButton} onClick={() => navigate("/jobs")}>
          Volver a la lista de empleos
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link href="/jobs" className={styles.breadcrumbLink}>
            Empleos
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbTitle}>{job.title}</span>
        </nav>

        {/* Header principal */}
        <header className={styles.header}>
          <h1 className={styles.title}>{job.title}</h1>
          <div className={styles.meta}>
            <p className={styles.company}>{job.company}</p>
            <p className={styles.location}>{job.location}</p>
          </div>
          <button className={styles.applyButton}>Aplicar a esta oferta</button>
        </header>

        <JobSection
          title="Descripción del puesto"
          content={job.content.description}
        />

        <JobSection
          title="Responsabilidades"
          content={job.content.responsibilities}
        />

        <JobSection title="Requisitos" content={job.content.requirements} />

        <JobSection title="Acerca de la empresa" content={job.content.about} />
      </div>
    </div>
  );
}
