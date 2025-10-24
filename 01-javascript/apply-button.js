// const buttons = document.querySelectorAll(".button-apply-job");

// buttons.forEach((button) => {
//   if (!button) return;
//   button.addEventListener("click", () => {
//     button.textContent = "¡Aplicado!";
//     button.classList.add("is-applied");
//     button.disabled = true;
//   });
// });

const offerSection = document.getElementById("offer-page");
const resultsSection = document.querySelector(".results");

resultsSection?.addEventListener("click", applyJob);
offerSection?.addEventListener("click", applyJob);

function applyJob(event) {
  const element = event.target;

  if (element.classList.contains("button-apply-job")) {
    element.textContent = "¡Aplicado!";
    element.classList.add("is-applied");
    element.disabled = true;
  } else if (element.classList.contains("offer-link")) {
    window.location.href = "../01-javascript/offer.html";
  }
}
