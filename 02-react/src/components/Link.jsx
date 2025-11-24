import { useRouter } from "../hooks/useRouter";
import styles from "./Link.module.css";

export function Link({ href, children, ...restOfProps }) {
  const { currentPath, navigateTo } = useRouter();

  const isActive = currentPath === href;
  const linkClass = isActive ? styles.isActiveLink : "";

  const handleClick = (event) => {
    event.preventDefault();
    if (!isActive) navigateTo(href);
  };

  return (
    <a href={href} {...restOfProps} className={linkClass} onClick={handleClick}>
      {children}
    </a>
  );
}
