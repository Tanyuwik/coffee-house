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

//карусель

const sliderItems = document.querySelectorAll(".carousel_content");
const sliderContent = document.querySelector(".carousel_line");
const sliderRight = document.querySelector(".btn_right");
const sliderLeft = document.querySelector(".btn_left");
const dots = document.querySelectorAll(".carousel_pagination");

let currentSlide = 0;
const slideWidth = 100;

sliderRight.addEventListener("click", () => changeSlide(1));
sliderLeft.addEventListener("click", () => changeSlide(-1));

function changeSlide(direction) {
  currentSlide =
    (currentSlide + direction + sliderItems.length) % sliderItems.length;
  showSlides();
  resetAutoChangeInterval();
}

function showSlides() {
  sliderContent.style.transition = "transform 1s ease";
  sliderContent.style.transform = `translateX(${-currentSlide * slideWidth}%)`;
  updateActiveDot();
}

function updateActiveDot() {
  dots.forEach((dot, index) => {
    const fill = dot.querySelector(".fill");
    const shouldAnimate = index === currentSlide;
    fill.classList.toggle("animate", shouldAnimate);
  });
}

let autoChangeInterval = setInterval(() => changeSlide(1), 6000);

function resetAutoChangeInterval() {
  clearInterval(autoChangeInterval);
  autoChangeInterval = setInterval(() => changeSlide(1), 6000);
}

// Обработчик событий для клавиш влево и вправо
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    changeSlide(1);
  } else if (e.key === "ArrowLeft") {
    changeSlide(-1);
  }
});

// Останавливаем автоматическое переключение при наведении мыши
sliderContent.addEventListener("mouseover", () =>
  clearInterval(autoChangeInterval)
);

// Возобновляем автоматическое переключение при убирании мыши
sliderContent.addEventListener("mouseout", () => {
  resetAutoChangeInterval();
  updateActiveDot();
});

// Запускаем автоматическое переключение при загрузке страницы
resetAutoChangeInterval();

// тач
let touchStartX;
let touchEndX;

sliderContent.addEventListener("touchstart", handleTouchStart);
sliderContent.addEventListener("touchmove", handleTouchMove);
sliderContent.addEventListener("touchend", handleTouchEnd);

function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX;
}

function handleTouchMove(event) {
  touchEndX = event.touches[0].clientX;
}

function handleTouchEnd() {
  const touchDiff = touchStartX - touchEndX;

  if (touchDiff > 0) {
    changeSlide(1);
  } else if (touchDiff < 0) {
    changeSlide(-1);
  }

  touchStartX = null;
  touchEndX = null;
}

//кнопка "refresh"

function toggleMenu() {
  // Переключаем класс show для .drink4 и .drink8
  const drink4 = document.querySelector(".drink4");
  drink4.classList.toggle("show");

  const drink8 = document.querySelector(".drink8");
  drink8.classList.toggle("show");

  const drink2 = document.querySelector(".drink2");
  drink2.classList.toggle("show");

  const drink6 = document.querySelector(".drink6");
  drink6.classList.toggle("show");

  // Добавляем класс additional-margin к элементу с классом coffee_menu_content
  const coffeeMenu = document.querySelector(".coffee_menu_content");
  coffeeMenu.classList.toggle("additional-margin");

  // Переключаем класс hide для кнопки "refresh"
  const toggleButton = document.querySelector(".drink_refresh");
  toggleButton.classList.toggle("hide");

  // Добавляем стиль display: none к кнопке
  if (toggleButton.classList.contains("hide")) {
    toggleButton.style.display = "none";
  } else {
    toggleButton.style.display = "block"; // или "inline" в зависимости от типа кнопки
  }
}

// Вызываем toggleMenu, чтобы применить начальные стили
toggleMenu();
