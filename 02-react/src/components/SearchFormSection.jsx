import { useId, useState } from "react";
import { FilterSelector } from "./FilterSelector.jsx";
import { SearchBar } from "./SearchBar.jsx";

const useSearchForm = ({
  idTechnology,
  idLocation,
  idExperience,
  onSearch,
  onTextFilter,
}) => {
  const [searchText, setSeachText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const filters = {
      technology: formData.get(idTechnology),
      location: formData.get(idLocation),
      experience: formData.get(idExperience),
    };

    onSearch(filters);
  };

  const handleTextChange = (event) => {
    const text = event.target.value;
    setSeachText(text);
    onTextFilter(text);
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

export function SearchFormSection({ onTextFilter, onSearch }) {
  const idText = useId();
  const idTechnology = useId();
  const idLocation = useId();
  const idExperience = useId();

  const { searchText, handleSubmit, handleTextChange, handleFilterChange } =
    useSearchForm({
      idTechnology,
      idLocation,
      idExperience,
      onSearch,
      onTextFilter,
    });

  return (
    <section className="form-section">
      <SearchBar
        name={idText}
        handleTextSearch={handleTextChange}
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
      </form>
    </section>
  );
}
