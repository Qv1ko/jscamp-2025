import styles from "./JobCard.module.css";

import { useState } from "react";

export function JobCard({ job }) {
  const [isApplied, setIsApplied] = useState(false);

  function handleClick() {
    setIsApplied(true);
  }

  const { title, company, location, description, data } = job;

  const text = isApplied ? "Aplicado" : "Aplicar";
  const buttonClass = isApplied ? styles.isApplied : "";

  return (
    <article
      data-technologies={data?.technologies}
      data-modality={data?.modality}
      data-contract={data?.contract}
      data-experience={data?.experience}
    >
      <button
        className={`button-apply-job ${buttonClass}`}
        disabled={isApplied}
        onClick={handleClick}
      >
        {text}
      </button>
      <h3 className="jobCardTitle offer-link">{title}</h3>
      <small>
        {company} | {location}
      </small>
      <p className="jobCardDescription">{description}</p>
    </article>
  );
}
