function loadSharedHeader() {
  const placeholder = document.getElementById("shared-header");
  if (!placeholder) return;

  fetch("header.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Header file not found");
      }
      return response.text();
    })
    .then((html) => {
      placeholder.innerHTML = html;
      updateActiveNavLink();
      attachSmoothScroll();
    })
    .catch((error) => {
      console.warn("Could not load shared header:", error);
    });
}

function updateActiveNavLink() {
  const navLinks = document.querySelectorAll(".nav-links a");
  const path = window.location.pathname.split("/").pop();
  navLinks.forEach((link) => {
    if (
      link.getAttribute("href") === path ||
      (path === "" && link.getAttribute("href") === "index.html")
    ) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function attachSmoothScroll() {
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const targetId = href.slice(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  });
}

window.addEventListener("DOMContentLoaded", loadSharedHeader);

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
