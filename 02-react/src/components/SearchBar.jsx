import { Search } from "./icons/Search.jsx";

export function SearchBar({ placeholder = "", handleTextSearch }) {
  return (
    <form id="search-form" role="search">
      <Search />

      <input
        id="search-input"
        required
        type="text"
        name="search"
        placeholder={placeholder}
        onChange={handleTextSearch}
      />
    </form>
  );
}
