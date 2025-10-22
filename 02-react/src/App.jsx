function App() {
  return (
    <>
      <header className="logged-header">
        <div>
          <img src="./logo.svg" alt="Logo de DevJobs" />
          <h1>DevJobs</h1>
          <nav>
            <a href="./index.html">Inicio</a>
            <a href="#">Empleos</a>
            <a href="">Empresas</a>
            <a href="">Salarios</a>
          </nav>
        </div>

        <div>
          <a href="">Subir CV</a>
          <devjobs-avatar
            service="x"
            username="qv1ko"
            size="32"
          ></devjobs-avatar>
        </div>
      </header>

      <main>
        <section className="search-section">
          <header>
            <h1>Encuentra tu próximo trabajo</h1>
            <p>Explora miles de oportunidades en el sector tecnológico.</p>
          </header>

          <section className="form-section">
            <form id="search-form" role="search">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                <path d="M21 21l-6 -6" />
              </svg>

              <input
                id="search-input"
                required
                type="text"
                name="search"
                placeholder="Buscar trabajos, empresas o habilidades"
              />
            </form>

            <form id="filter" role="filter">
              <select name="technology" id="technology-selector">
                <option value="">Tecnología</option>
                <option value="azure">Azure</option>
                <option value="aws">AWS</option>
                <option value="cs">C#</option>
                <option value="c++">C++</option>
                <option value="firewalls">Firewalls</option>
                <option value="gcp">GCP</option>
                <option value="js">JavaScript</option>
                <option value="kotlin">Kotlin</option>
                <option value="linux">Linux</option>
                <option value="node.js">Node.js</option>
                <option value="nosql">NoSQL</option>
                <option value="python">Python</option>
                <option value="r">R</option>
                <option value="react">React</option>
                <option value="sql">SQL</option>
                <option value="swift">Swift</option>
                <option value="unity">Unity</option>
                <option value="unreal">Unreal Engine</option>
                <option value="vue.js">Vue.js</option>
                <option value="windows">Windows</option>
              </select>

              <select name="location" id="location-selector">
                <option value="">Ubicación</option>
                <option value="mx">Ciudad de México</option>
                <option value="mty">Monterrey</option>
                <option value="hyb">Híbrido</option>
                <option value="remote">Remoto</option>
              </select>

              <select name="contract_type" id="contract_type-selector">
                <option value="">Tipo de contrato</option>
                <option value="undefined">Indefinido</option>
                <option value="replacement">Sustitución</option>
                <option value="temporary">Temporal</option>
              </select>

              <select name="experience" id="experience-selector">
                <option value="">Nivel de experiencia</option>
                <option value="2">2 años</option>
                <option value="3">3 años</option>
                <option value="4">4 años</option>
                <option value="5">5 años</option>
              </select>
            </form>
          </section>

          <section className="results-section">
            <h2>Resultados de búsqueda</h2>

            <div className="results"></div>
          </section>

          <footer>
            <nav className="pagination">
              <a data-page="0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M15 6l-6 6l6 6" />
                </svg>
              </a>
              <a className="is_active" data-page="0">
                1
              </a>
              <a data-page="1">2</a>
              <a data-page="2">3</a>
              <a data-page="3">4</a>
              <a data-page="4">5</a>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M9 6l6 6l-6 6" />
                </svg>
              </a>
            </nav>
          </footer>
        </section>
      </main>
    </>
  );
}

export default App;
