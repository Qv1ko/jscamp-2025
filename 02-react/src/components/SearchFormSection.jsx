import { useState, useId } from "react";
import { FilterSelector } from "./FilterSelector.jsx";
import { SearchBar } from "./SearchBar.jsx";

export function SearchFormSection() {
  const idText = useId();
  const idTechnology = useId();
  const idLocation = useId();
  const idContactType = useId();
  const idExperience = useId();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const filters = {
      technology: formData.idTechnology,
      location: formData.idLocation,
      contactType: formData.idContactType,
      experience: formData.idExperience,
    };

    onSearch(filters);
  };

  const handleTextChange = (event) => {
    const text = event.target.value;
    // onTextFilter()
  };

  return (
    <section className="form-section">
      <SearchBar
        name={idText}
        placeholder="Buscar trabajos, empresas o habilidades"
      />

      <form onSubmit={handleSubmit} id="filter" role="filter">
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
            { value: "js", text: "JavaScript" },
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
            { value: "mx", text: "Ciudad de México" },
            { value: "mty", text: "Monterrey" },
            { value: "hyb", text: "Híbrido" },
            { value: "remote", text: "Remoto" },
          ]}
        />

        <FilterSelector
          name={idContactType}
          options={[
            { value: "", text: "Tipo de contrato" },
            { value: "undefined", text: "Indefinido" },
            { value: "replacement", text: "Sustitución" },
            { value: "temporary", text: "Temporal" },
          ]}
        />

        <FilterSelector
          name={idExperience}
          options={[
            { value: "", text: "Nivel de experiencia" },
            { value: "2", text: "2 años" },
            { value: "3", text: "3 años" },
            { value: "4", text: "4 años" },
            { value: "5", text: "5 años" },
          ]}
        />
      </form>
    </section>
  );
}
