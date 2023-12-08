document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("burger").addEventListener("click", function () {
    document.querySelector(".header").classList.toggle("open");
  });
});

document.getElementById("navigationList").addEventListener("click", (event) => {
  event._isClickWithInMenu = true;
});

document.getElementById("burger").addEventListener("click", (event) => {
  event._isClickWithInMenu = true;
});

const menuLinks = document.querySelectorAll("#navigationList a");
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".header").classList.remove("open");
  });
});

document.body.addEventListener("click", (event) => {
  if (event._isClickWithInMenu) return;
  document.querySelector(".header").classList.remove("open");
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelector(".header").classList.remove("open");
  }
});


