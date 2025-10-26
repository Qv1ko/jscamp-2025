export function FilterSelector({ name = "technology", options }) {
  if (!options) return;

  return (
    <select name={name} id={`${name}-selector`}>
      {options?.map(({ value, text }) => (
        <option key={value} value={value}>
          {text}
        </option>
      ))}
    </select>
  );
}
