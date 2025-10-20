const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const filterSection = document.getElementById("filter");
const resultsSection = document.querySelector(".results");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const search = searchInput.value;
  if (search) filterTitle(search);
});

searchInput.addEventListener("input", () =>
  console.log("Se ejecuta al modificar el input")
);

searchInput.addEventListener("blur", () =>
  console.log("Se ejecuta al perder el foco")
);

filterSection?.addEventListener("change", (event) => {
  const filter = event.target.value;

  if (filter) {
    const articles = Array.from(resultsSection.children).filter(
      (child) => child.localName == "article"
    );

    const visibleArticles = articles.filter((article) => {
      const match =
        article.dataset.technologies?.includes(filter.toLowerCase()) ||
        article.dataset.modality?.includes(filter.toLowerCase()) ||
        article.dataset.contract?.includes(filter.toLowerCase()) ||
        article.dataset.experience?.includes(filter.toLowerCase());

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

function filterTitle(search) {
  const articles = Array.from(resultsSection.children).filter(
    (child) => child.localName == "article"
  );

  const visibleArticles = articles.filter((article) => {
    const title = Array.from(article.children).find(
      (child) => child.localName === "h3"
    );

    const match = title.textContent
      .toLowerCase()
      .includes(search.toLowerCase());

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
