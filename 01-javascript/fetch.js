const container = document.querySelector(".results");

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

      container.appendChild(article);
    });
  });
