import { DevJobsAvatar } from "./icons/DevJobsAvatar.jsx";
import { NavLinks } from "./NavLinks.jsx";

export function Header() {
  return (
    <header className="logged-header">
      <div>
        <a href="/">
          <img src="src/assets/logo.svg" alt="Logo de DevJobs" />
          <h1>DevJobs</h1>
        </a>
        <NavLinks
          links={[
            { link: "/", text: "Inicio" },
            { link: "/search", text: "Empleos" },
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
  );
}
