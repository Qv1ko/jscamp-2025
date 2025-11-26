import styles from "./JobCard.module.css";

import { useState } from "react";

export function JobCard({ job }) {
  const [isApplied, setIsApplied] = useState(false);

  function handleClick() {
    setIsApplied(true);
  }

  const { titulo, empresa, ubicacion, descripcion, data } = job;

  const text = isApplied ? "Aplicado" : "Aplicar";
  const buttonClass = isApplied ? styles.isApplied : "";

  return (
    <article
      data-technologies={data?.technology}
      data-modality={data?.modalidad}
      data-experience={data?.nivel}
    >
      <button
        className={`button-apply-job ${buttonClass}`}
        disabled={isApplied}
        onClick={handleClick}
      >
        {text}
      </button>
      <h3 className="jobCardTitle offer-link">{titulo}</h3>
      <small>
        {empresa} | {ubicacion}
      </small>
      <p className="jobCardDescription">{descripcion}</p>
    </article>
  );
}
