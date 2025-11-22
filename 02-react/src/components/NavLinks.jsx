import { Link } from "./Link.jsx";

export function NavLinks({ links }) {
  if (!links) return;

  return (
    <nav>
      {links.map(({ link, text }) => (
        <Link key={text.toLowerCase()} href={link}>
          {text}
        </Link>
      ))}
    </nav>
  );
}
