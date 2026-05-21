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
