import { Search } from "./icons/Search";

export function SearchBar({ placeholder = "" }) {
  return (
    <form id="search-form" role="search">
      <Search />

      <input
        id="search-input"
        required
        type="text"
        name="search"
        placeholder={placeholder}
      />
    </form>
  );
}
