export function FilterSelector({ name = "technology", initialValue, options }) {
  if (!options) return;

  return (
    <select name={name} id={`${name}-selector`} defaultValue={initialValue}>
      {options?.map(({ value, text }) => (
        <option key={value}>{text}</option>
      ))}
    </select>
  );
}
