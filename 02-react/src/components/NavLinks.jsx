export function NavLinks({ links }) {
  if (!links) return;

  return (
    <nav>
      {links.map(({ link, text }) => (
        <a key={text.toLowerCase()} href={link}>
          {text}
        </a>
      ))}
    </nav>
  );
}
