import { useEffect, useState } from "react";
import { JobListing } from "../components/JobListing.jsx";
import { Loader } from "../components/Loader.jsx";
import { Pagination } from "../components/Pagination.jsx";
import { SearchFormSection } from "../components/SearchFormSection.jsx";

const RESULTS_PER_PAGE = 5;

const useFilters = () => {
  const [filters, setFilters] = useState({
    technology: "",
    location: "",
    experience: "",
  });
  const [textToFilter, setTextToFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const hasActiveFilters =
    textToFilter ||
    filters.technology ||
    filters.location ||
    filters.experience;

  const handleClearFilters = () => {
    setTextToFilter("");
    setFilters({
      technology: "",
      location: "",
      experience: "",
    });
  };

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);

        const params = new URLSearchParams();
        if (textToFilter) params.append("text", textToFilter);
        if (filters.technology) params.append("technology", filters.technology);
        if (filters.location) params.append("type", filters.location);
        if (filters.experience) params.append("level", filters.experience);

        const offset = (currentPage - 1) * RESULTS_PER_PAGE;
        params.append("limit", RESULTS_PER_PAGE);
        params.append("offset", offset);

        const queryParams = params.toString();

        const response = await fetch(
          `https://jscamp-api.vercel.app/api/jobs?${queryParams}`
        );
        const json = await response.json();

        setJobs(json.data);
        setTotal(json.total);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, [filters, textToFilter, currentPage]);

  const totalPages = Math.ceil(total / RESULTS_PER_PAGE);

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
    jobs,
    total,
    loading,
    totalPages,
    currentPage,
    handlePageChange,
    handleSearch,
    handleTextFilter,
    hasActiveFilters,
    handleClearFilters,
  };
};

export function SearchPage() {
  const {
    jobs,
    total,
    loading,
    totalPages,
    currentPage,
    handlePageChange,
    handleSearch,
    handleTextFilter,
    hasActiveFilters,
    handleClearFilters,
  } = useFilters();

  const title = loading
    ? "Cargando... - DevJobs"
    : `Resultados: ${total}, Página ${currentPage} - DevJobs`;

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
      <title>{title}</title>
      <meta
        name="description"
        content="Explora miles de oprtunidades laborales en el sector tecnológico. Encuentra tu próximo empleo en DevJobs."
      />
      <section className="search-section">
        <header>
          <h1>Encuentra tu próximo trabajo</h1>
          <p>Explora miles de oportunidades en el sector tecnológico.</p>
        </header>

        <SearchFormSection
          onSearch={handleSearch}
          onTextFilter={handleTextFilter}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={handleClearFilters}
        />
        {loading ? (
          <Loader />
        ) : (
          <>
            <section className="results-section">
              <JobListing jobs={jobs} />
            </section>

            <footer>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </footer>
          </>
        )}
      </section>
    </main>
  );
}
