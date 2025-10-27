import { useState } from "react";

export function JobCard({ title, company, location, description, data }) {
  const [isApplied, setIsApplied] = useState(false);

  function handleClick() {
    setIsApplied(true);
  }

  const text = isApplied ? "Aplicado" : "Aplicar";
  const buttonClass = isApplied ? "is_applied" : "";

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
      <h3 className="offer-link">{title}</h3>
      <small>
        {company} | {location}
      </small>
      <p>{description}</p>
    </article>
  );
}
