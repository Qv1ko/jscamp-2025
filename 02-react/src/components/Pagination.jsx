import styles from "./Pagination.module.css";

import { ChevronLeft } from "./icons/ChevronLeft.jsx";
import { ChevronRight } from "./icons/ChevronRight.jsx";

export function Pagination({ currentPage = 1, totalPages = 10, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePrevClick = (event) => {
    event.preventDefault();
    if (!isFirstPage) onPageChange(currentPage - 1);
  };

  const handleNextClick = (event) => {
    event.preventDefault();
    if (!isLastPage) onPageChange(currentPage + 1);
  };

  const handleChangePage = (event, page) => {
    event.preventDefault();
    if (page !== currentPage) onPageChange(page);
  };

  return (
    <nav className={styles.pagination}>
      {!isFirstPage && (
        <a href="#" onClick={handlePrevClick}>
          <ChevronLeft />
        </a>
      )}

      {pages.map((page) => {
        return (
          <a
            key={page}
            href="#"
            className={currentPage === page ? styles.isActive : ""}
            onClick={(event) => handleChangePage(event, page)}
          >
            {page}
          </a>
        );
      })}

      {!isLastPage && (
        <a onClick={handleNextClick}>
          <ChevronRight />
        </a>
      )}
    </nav>
  );
}
