const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const filterSection = document.getElementById("filter");
const resultsSection = document.querySelector(".results");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("submit");
});

searchInput.addEventListener("input", () =>
  console.log("Se ejecuta al modificar el input")
);

searchInput.addEventListener("blur", () =>
  console.log("Se ejecuta al perder el foco")
);

filterSection?.addEventListener("change", (event) => {
  const element = event.target;

  if (element.value) {
    const articles = Array.from(resultsSection.children).filter(
      (child) => child.localName == "article"
    );

    articles.forEach(
      (article) =>
        (article.style.display = Array.from(article.children).some((child) =>
          child.textContent.toLowerCase().includes(element.value.toLowerCase())
        )
          ? "block"
          : "none")
    );

    const selectedArticles = articles.filter(
      (article) => article.style.display == "block"
    );
    selectedArticles.forEach((article, i) => {
      article.style.borderBottom =
        selectedArticles.length == i + 1
          ? "none"
          : "1px solid var(--select-bg)";
    });
  }
});

document.addEventListener("keydown", (event) =>
  console.log("Tecla presionada: " + event.key)
);
