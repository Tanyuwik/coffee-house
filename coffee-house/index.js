document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");

  document.getElementById("burger").addEventListener("click", function () {
    header.classList.toggle("open");
    document.body.classList.toggle(
      "show-burger",
      header.classList.contains("open")
    );
    document.body.classList.remove("show-burger");
  });

  document
    .getElementById("navigationList")
    .addEventListener("click", (event) => {
      event._isClickWithInMenu = true;
    });

  document.getElementById("burger").addEventListener("click", (event) => {
    event._isClickWithInMenu = true;
  });

  const menuLinks = document.querySelectorAll("#navigationList a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("open");
      document.body.classList.remove("show-menu");
    });
  });

  document.body.addEventListener("click", (event) => {
    if (event._isClickWithInMenu) return;
    header.classList.remove("open");
    document.body.classList.remove("show-menu");
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      header.classList.remove("open");
      document.body.classList.remove("show-menu");
    }
  });

  showMenu("coffee-menu");
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

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    changeSlide(1);
  } else if (e.key === "ArrowLeft") {
    changeSlide(-1);
  }
});

sliderContent.addEventListener("mouseover", () =>
  clearInterval(autoChangeInterval)
);

sliderContent.addEventListener("mouseout", () => {
  resetAutoChangeInterval();
  updateActiveDot();
});

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
  const drink4 = document.querySelector(".drink4");
  drink4.classList.toggle("show");

  const drink8 = document.querySelector(".drink8");
  drink8.classList.toggle("show");

  const drink2 = document.querySelector(".drink2");
  drink2.classList.toggle("show");

  const drink6 = document.querySelector(".drink6");
  drink6.classList.toggle("show");

  const dessert5 = document.querySelector(".dessert5");
  dessert5.classList.toggle("show");

  const dessert6 = document.querySelector(".dessert6");
  dessert6.classList.toggle("show");

  const dessert7 = document.querySelector(".dessert7");
  dessert7.classList.toggle("show");

  const dessert8 = document.querySelector(".dessert8");
  dessert8.classList.toggle("show");

  const toggleButton = document.querySelector(".drink_refresh");
  toggleButton.classList.toggle("hide");

  if (toggleButton.classList.contains("hide")) {
    toggleButton.style.display = "none";
  } else {
    toggleButton.style.display = "block";
  }
}

toggleMenu();

function toggleMenuDessert() {
  const dessert5 = document.querySelector(".dessert5");
  dessert5.classList.toggle("show");

  const dessert6 = document.querySelector(".dessert6");
  dessert6.classList.toggle("show");

  const dessert7 = document.querySelector(".dessert7");
  dessert7.classList.toggle("show");

  const dessert8 = document.querySelector(".dessert8");
  dessert8.classList.toggle("show");

  const toggleButtonDessert = document.querySelector(".dessert_refresh");
  toggleButtonDessert.classList.toggle("hide");

  if (toggleButtonDessert.classList.contains("hide")) {
    toggleButtonDessert.style.display = "none";
  } else {
    toggleButtonDessert.style.display = "block";
  }
}

toggleMenuDessert();

//смена меню

function showMenu(menuId) {
  var containers = document.getElementsByClassName("menu-container");
  for (var i = 0; i < containers.length; i++) {
    containers[i].style.display = "none";
  }

  var selectedMenu = document.getElementById(menuId);
  if (selectedMenu) {
    selectedMenu.style.display = "flex";
  }

  var menuBtns = document.querySelectorAll(".menu-btn");
  menuBtns.forEach((div) => {
    div.classList.remove("active");
  });

  var selectedBtn = document.querySelector(`.menu-btn[data-menu="${menuId}"]`);
  if (selectedBtn) {
    selectedBtn.classList.add("active");
  }
}
