const container = document.querySelector(".results");
let articles = [];

const pagination = document.querySelector(".pagination");
const ARTICLES_PER_PAGE = 5;

fetch("../01-javascript/data.json")
  .then((response) => response.json())
  .then((jobs) => {
    jobs.forEach((job) => {
      const article = document.createElement("article");

      article.dataset.technologies = job.data.technologies;
      article.dataset.modality = job.data.modality;
      article.dataset.contract = job.data.contract;
      article.dataset.experience = job.data.experience;

      article.innerHTML = `
        <button class="button-apply-job" href="">Aplicar</button>
        <h3 class="offer-link">${job.title}</h3>
        <small>${job.company} | ${job.location}</small>
        <p>${job.description}</p>
      `;

      articles.push(article);
    });

    paginator(0);
  });

pagination.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (link) paginator(link.dataset.page);
});

function paginator(page) {
  const pages = articles.reduce((acc, value, i) => {
    if (i % ARTICLES_PER_PAGE === 0) {
      acc.push([value]);
    } else {
      acc[acc.length - 1].push(value);
    }
    return acc;
  }, []);

  const pageIndex = page === undefined ? pages.length - 1 : page;

  if (pageIndex >= 0 && pageIndex < pages.length) {
    container.innerHTML = "";
    pages[pageIndex].forEach((article) => container.appendChild(article));
  }
}
