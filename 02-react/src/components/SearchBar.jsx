import styles from "./SearchBar.module.css";

import { useRef, useState } from "react";
import { Search } from "./icons/Search.jsx";
import { SquareX } from "./icons/SquareX.jsx";

export function SearchBar({
  placeholder = "",
  initialText,
  handleTextSearch,
  handleTextFilter,
}) {
  const inputRef = useRef();

  const [withError, setWithError] = useState(false);

  const handleSearchFocus = (event) => {
    const element = event.target;
    element.classList.add(styles.writing);
  };

  const handleClearInput = (event) => {
    event.preventDefault();
    inputRef.current.value = "";
    handleTextFilter("");
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
        ref={inputRef}
        placeholder={placeholder}
        defaultValue={initialText}
        onChange={handleTextSearch}
        onFocus={handleSearchFocus}
        onBlur={handleSearchValidation}
      />

      <button onClick={handleClearInput}>
        <SquareX />
      </button>

      {withError && <span className={styles.error}>Error de validación</span>}
    </form>
  );
}
