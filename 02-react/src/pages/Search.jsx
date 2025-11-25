import { useEffect, useState } from "react";
import { JobListing } from "../components/JobListing.jsx";
import { Pagination } from "../components/Pagination.jsx";
import { SearchFormSection } from "../components/SearchFormSection.jsx";

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

  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);

        const response = await fetch("https://jscamp-api.vercel.app/api/jobs");
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
  }, []);

  const totalPages = Math.ceil(jobs.length / RESULTS_PER_PAGE);

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
  } = useFilters();

  useEffect(() => {
    document.title = `Resultados: ${total}, Página ${currentPage} - DevJobs`;
  }, [total, currentPage]);

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
          {loading ? <p>Cargando empleos...</p> : <JobListing jobs={jobs} />}
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
