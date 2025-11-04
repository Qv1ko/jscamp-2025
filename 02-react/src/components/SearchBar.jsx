import styles from "./SearchBar.module.css";

import { useState } from "react";
import { Search } from "./icons/Search.jsx";

export function SearchBar({ placeholder = "", handleTextSearch }) {
  const [withError, setWithError] = useState(false);

  const handleSearchFocus = (event) => {
    const element = event.target;
    element.classList.add(styles.writing);
  };

  const handleSearchValidation = (event) => {
    const element = event.target;
    const hasError = !/^([^0-9]*)$/.test(element.value);

    setWithError(hasError);
    element.classList.remove(styles.writing);
  };

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
        onFocus={handleSearchFocus}
        onBlur={handleSearchValidation}
      />

      {withError && <span className={styles.error}>Error de validación</span>}
    </form>
  );
}
