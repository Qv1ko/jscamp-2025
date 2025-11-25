import { useEffect, useState } from "react";
import { JobListing } from "../components/JobListing.jsx";
import { Pagination } from "../components/Pagination.jsx";
import { SearchFormSection } from "../components/SearchFormSection.jsx";

import jobsData from "../assets/data.json";

const RESULTS_PER_PAGE = 5;

const useFilters = () => {
  const [filters, setFilters] = useState({
    technology: "",
    location: "",
    contract: "",
    experience: "",
  });
  const [textToFilter, setTextToFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const jobsFilteredByFilters = jobsData.filter((job) => {
    return (
      (filters.technology === "" ||
        job.data.technologies.some((item) => item === filters.technology)) &&
      (filters.location === "" || job.data.modality === filters.location) &&
      (filters.contract === "" || job.data.contract === filters.contract) &&
      (filters.experience === "" || job.data.experience === filters.experience)
    );
  });

  const jobsWithTextFilter =
    textToFilter === ""
      ? jobsFilteredByFilters
      : jobsFilteredByFilters.filter((job) => {
          return job.title.toLowerCase().includes(textToFilter.toLowerCase());
        });

  const totalPages = Math.ceil(jobsWithTextFilter.length / RESULTS_PER_PAGE);

  const pagedResults = jobsWithTextFilter.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (filters) => {
    setFilters(filters);
    setCurrentPage(1);
  };

  const handleTextFilter = (newTextToFilter) => {
    setTextToFilter(newTextToFilter);
    setCurrentPage(1);
  };

  return {
    jobsWithTextFilter,
    totalPages,
    pagedResults,
    currentPage,
    handlePageChange,
    handleSearch,
    handleTextFilter,
  };
};

export function SearchPage() {
  const {
    jobsWithTextFilter,
    totalPages,
    pagedResults,
    currentPage,
    handlePageChange,
    handleSearch,
    handleTextFilter,
  } = useFilters();

  useEffect(() => {
    document.title = `Resultados: ${jobsWithTextFilter.length}, Página ${currentPage} - DevJobs`;
  }, [jobsWithTextFilter, currentPage]);

  useEffect(() => {
    // Suscripción a un evento
    const handleResize = () => {
      console.info("Ventana redimensionada");
      console.info(window.innerHeight, window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Limpieza: se ejecuta antes de desmontar o antes de re-ejecutar
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <main>
      <section className="search-section">
        <header>
          <h1>Encuentra tu próximo trabajo</h1>
          <p>Explora miles de oportunidades en el sector tecnológico.</p>
        </header>

        <SearchFormSection
          onSearch={handleSearch}
          onTextFilter={handleTextFilter}
        />

        <section className="results-section">
          <JobListing jobs={pagedResults} />
        </section>

        <footer>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </footer>
      </section>
    </main>
  );
}
