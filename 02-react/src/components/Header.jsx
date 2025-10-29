import { DevJobsAvatar } from "./icons/DevJobsAvatar.jsx";
import { NavLinks } from "./NavLinks.jsx";

export function Header() {
  return (
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
  );
}
