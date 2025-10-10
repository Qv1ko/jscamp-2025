// const buttons = document.querySelectorAll(".button-apply-job");

// buttons.forEach((button) => {
//   if (!button) return;
//   button.addEventListener("click", () => {
//     button.textContent = "¡Aplicado!";
//     button.classList.add("is-applied");
//     button.disabled = true;
//   });
// });

const resultsSection = document.querySelector(".results");
const filterSection = document.getElementById("filter");

resultsSection?.addEventListener("click", (event) => {
  const element = event.target;

  if (element.classList.contains("button-apply-job")) {
    element.textContent = "¡Aplicado!";
    element.classList.add("is-applied");
    element.disabled = true;
  }
});

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
