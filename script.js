// Menu
const btnMobile = document.getElementById("btn-mobile");

function toggleMenu(event) {
  if (event.type === "touchstart") event.preventDefault();
  const nav = document.getElementById("nav");
  nav.classList.toggle("active");
  const active = nav.classList.contains("active");
  event.currentTarget.setAttribute("aria-expanded", "active");
  if (active) {
    document.documentElement.style.overflow = "hidden";
    event.currentTarget.setAttribute("aria-label", "Fechar Menu");
  } else {
    document.documentElement.style.overflow = "unset";
    event.currentTarget.setAttribute("aria-label", "Abrir Menu");
  }
}

btnMobile.addEventListener("click", toggleMenu);
btnMobile.addEventListener("touchstart", toggleMenu);

// Menu scroll
var lastScrollTop;
navbar = document.getElementById("header");
window.addEventListener("scroll", function () {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    navbar.style.top = "-70px";
  } else {
    navbar.style.top = "0";
  }
  lastScrollTop = scrollTop;
});

// Dynamic Copyright
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();
