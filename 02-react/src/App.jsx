import { FilterSelector } from "./components/FilterSelector.jsx";
import { DevJobsAvatar } from "./components/icons/DevJobsAvatar.jsx";
import { NavLinks } from "./components/NavLinks.jsx";
import { Pagination } from "./components/Pagination.jsx";
import { SearchBar } from "./components/SearchBar.jsx";

function App() {
  return (
    <>
      <header className="logged-header">
        <div>
          <img src="src/assets/logo.svg" alt="Logo de DevJobs" />
          <h1>DevJobs</h1>
          <NavLinks
            links={[
              { link: "", text: "Inicio" },
              { link: "#", text: "Empleos" },
              { link: "", text: "Empresas" },
              { link: "", text: "Salarios" },
            ]}
          />
        </div>

        <div>
          <a href="">Subir CV</a>
          <DevJobsAvatar />
        </div>
      </header>

      <main>
        <section className="search-section">
          <header>
            <h1>Encuentra tu próximo trabajo</h1>
            <p>Explora miles de oportunidades en el sector tecnológico.</p>
          </header>

          <section className="form-section">
            <SearchBar placeholder="Buscar trabajos, empresas o habilidades" />

            <form id="filter" role="filter">
              <FilterSelector
                name="technology"
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
                name="location"
                options={[
                  { value: "", text: "Ubicación" },
                  { value: "mx", text: "Ciudad de México" },
                  { value: "mty", text: "Monterrey" },
                  { value: "hyb", text: "Híbrido" },
                  { value: "remote", text: "Remoto" },
                ]}
              />

              <FilterSelector
                name="contract_type"
                options={[
                  { value: "", text: "Tipo de contrato" },
                  { value: "undefined", text: "Indefinido" },
                  { value: "replacement", text: "Sustitución" },
                  { value: "temporary", text: "Temporal" },
                ]}
              />

              <FilterSelector
                name="experience"
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

          <section className="results-section">
            <h2>Resultados de búsqueda</h2>
            <div className="results"></div>
          </section>

          <footer>
            <Pagination pages={[1, 2, 3, 4, 5]} />
          </footer>
        </section>
      </main>
    </>
  );
}

export default App;
