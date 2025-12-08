import { useId, useRef, useState } from "react";
import { FilterSelector } from "./FilterSelector.jsx";
import { SearchBar } from "./SearchBar.jsx";
import { FilterOff } from "./icons/FilterOff.jsx";

const useSearchForm = ({
  idTechnology,
  idLocation,
  idExperience,
  idText,
  onSearch,
  onTextFilter,
}) => {
  let timeoutId = useRef(null);
  const [searchText, setSeachText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    if (event.target.name === idText) return;

    const filters = {
      technology: formData.get(idTechnology),
      location: formData.get(idLocation),
      experience: formData.get(idExperience),
    };

    onSearch(filters);
  };

  const handleTextChange = (event) => {
    const text = event.target.value;
    setSeachText(text); // actualizamos el input inmediatamente

    // DEBOUNCE: Cancelar el timeout anterior
    if (timeoutId.current) clearTimeout(timeoutId.current);

    timeoutId.current = setTimeout(() => onTextFilter(text), 500);
  };

  const handleFilterChange = (event) => {
    const formData = new FormData(event.currentTarget);

    const filters = {
      technology: formData.get(idTechnology),
      location: formData.get(idLocation),
      experience: formData.get(idExperience),
    };

    onSearch(filters);
  };

  return { searchText, handleSubmit, handleTextChange, handleFilterChange };
};

export function SearchFormSection({
  onTextFilter,
  onSearch,
  hasActiveFilters,
  onClearFilters,
}) {
  const idText = useId();
  const idTechnology = useId();
  const idLocation = useId();
  const idExperience = useId();

  const { searchText, handleSubmit, handleTextChange, handleFilterChange } =
    useSearchForm({
      idTechnology,
      idLocation,
      idExperience,
      idText,
      onSearch,
      onTextFilter,
      hasActiveFilters,
    });

  return (
    <section className="form-section">
      <SearchBar
        name={idText}
        handleTextSearch={handleTextChange}
        handleTextFilter={onTextFilter}
        placeholder="Buscar trabajos, empresas o habilidades"
      />

      <form
        onSubmit={handleSubmit}
        onChange={handleFilterChange}
        id="filter"
        role="filter"
      >
        <FilterSelector
          name={idTechnology}
          options={[
            { value: "", text: "Tecnología" },
            { value: "azure", text: "Azure" },
            { value: "aws", text: "AWS" },
            { value: "cs", text: "C#" },
            { value: "c++", text: "C++" },
            { value: "firewalls", text: "Firewalls" },
            { value: "gcp", text: "GCP" },
            { value: "javascript", text: "JavaScript" },
            { value: "kotlin", text: "Kotlin" },
            { value: "linux", text: "Linux" },
            { value: "node.js", text: "Node.js" },
            { value: "nosql", text: "NoSQL" },
            { value: "python", text: "Python" },
            { value: "r", text: "R" },
            { value: "react", text: "React" },
            { value: "sql", text: "SQL" },
            { value: "swift", text: "Swift" },
            { value: "unity", text: "Unity" },
            { value: "unreal", text: "Unreal Engine" },
            { value: "vue.js", text: "Vue.js" },
            { value: "windows", text: "Windows" },
          ]}
        />

        <FilterSelector
          name={idLocation}
          options={[
            { value: "", text: "Ubicación" },
            { value: "cdmx", text: "Ciudad de México" },
            { value: "guadalajara", text: "Guadalajara" },
            { value: "barcelona", text: "Barcelona" },
            { value: "madrid", text: "Madrid" },
            { value: "remoto", text: "Remoto" },
          ]}
        />

        <FilterSelector
          name={idExperience}
          options={[
            { value: "", text: "Nivel de experiencia" },
            { value: "senior", text: "Senior" },
            { value: "mid-level", text: "Mid Level" },
            { value: "junior", text: "Junior" },
          ]}
        />
        {hasActiveFilters && (
          <button onClick={onClearFilters}>
            <FilterOff />
          </button>
        )}
      </form>
    </section>
  );
}
