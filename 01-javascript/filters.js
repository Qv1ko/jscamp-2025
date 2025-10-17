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

    const visibleArticles = articles.filter((article) => {
      const match = Array.from(article.children).some((child) =>
        child.textContent.toLowerCase().includes(element.value.toLowerCase())
      );

      article.classList.toggle("hidden", !match);
      return match;
    });

    visibleArticles.forEach((article, i) => {
      article.classList.toggle(
        "without-border-bottom",
        i === visibleArticles.length - 1
      );
    });

    articles
      .filter((article) => article.classList.contains("hidden"))
      .forEach((article) => article.classList.remove("without-border-bottom"));
  }
});

document.addEventListener("keydown", (event) =>
  console.log("Tecla presionada: " + event.key)
);
