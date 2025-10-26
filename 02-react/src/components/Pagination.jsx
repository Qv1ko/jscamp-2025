import { ChevronLeft } from "./icons/ChevronLeft";
import { ChevronRight } from "./icons/ChevronRight";

export function Pagination({ pages }) {
  if (!pages) return;

  return (
    <nav className="pagination">
      <a data-page="0">
        <ChevronLeft />
      </a>

      {pages.map((_, i) => {
        const pageNumber = i + 1;
        return (
          <a
            key={pageNumber}
            className={i === 0 ? "is_active" : ""}
            data-page={i}
          >
            {pageNumber}
          </a>
        );
      })}

      <a data-page={pages.length - 1}>
        <ChevronRight />
      </a>
    </nav>
  );
}
