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

  const buildPageUrl = (page) => {
    const url = new URL(window.location);
    url.searchParams.set("page", page);
    return `${url.pathname}?${url.searchParams.toString()}`;
  };

  return (
    <nav className={styles.pagination}>
      {!isFirstPage && (
        <a href={buildPageUrl(currentPage - 1)} onClick={handlePrevClick}>
          <ChevronLeft />
        </a>
      )}

      {pages.map((page) => {
        return (
          <a
            key={page}
            href={buildPageUrl(page)}
            className={currentPage === page ? styles.isActive : ""}
            onClick={(event) => handleChangePage(event, page)}
          >
            {page}
          </a>
        );
      })}

      {!isLastPage && (
        <a href={buildPageUrl(currentPage + 1)} onClick={handleNextClick}>
          <ChevronRight />
        </a>
      )}
    </nav>
  );
}
