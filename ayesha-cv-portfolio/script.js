const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");
const pageTitle = document.getElementById("pageTitle");
const printBtn = document.getElementById("printBtn");
const photoInput = document.getElementById("photoInput");
const heroPhoto = document.getElementById("heroPhoto");
const sidebarPhoto = document.getElementById("sidebarPhoto");
const heroInitials = document.getElementById("heroInitials");
const sidebarInitials = document.getElementById("sidebarInitials");

function showPage(pageId) {
  const validPage = document.getElementById(pageId);
  if (!validPage || !validPage.classList.contains("page")) pageId = "home";

  pages.forEach((page) => {
    const isActive = page.id === pageId;
    page.hidden = !isActive;
    page.classList.toggle("active", isActive);
  });

  navLinks.forEach((link) => {
    const isActive = link.dataset.page === pageId;
    link.classList.toggle("active", isActive);
    if (isActive) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  pageTitle.textContent = document.getElementById(pageId).dataset.title;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const pageId = link.dataset.page;
    history.pushState({ pageId }, "", `#${pageId}`);
    showPage(pageId);
  });
});

window.addEventListener("popstate", () => {
  showPage(location.hash.slice(1) || "home");
});

showPage(location.hash.slice(1) || "home");
document.getElementById("year").textContent = new Date().getFullYear();

printBtn.addEventListener("click", () => window.print());

function displayPhoto(src) {
  heroPhoto.src = src;
  sidebarPhoto.src = src;
  heroPhoto.hidden = false;
  sidebarPhoto.hidden = false;
  heroInitials.hidden = true;
  sidebarInitials.hidden = true;
}

try {
  const savedPhoto = localStorage.getItem("ayeshaPortfolioPhoto");
  if (savedPhoto) displayPhoto(savedPhoto);
} catch (error) {
  console.warn("Saved photo could not be loaded.", error);
}

photoInput.addEventListener("change", () => {
  const file = photoInput.files && photoInput.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please choose an image file.");
    photoInput.value = "";
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    alert("Please choose an image smaller than 2 MB.");
    photoInput.value = "";
    return;
  }

  const reader = new FileReader();

  reader.onload = (event) => {
    const imageData = event.target.result;
    const testImage = new Image();

    testImage.onload = () => {
      displayPhoto(imageData);
      try {
        localStorage.setItem("ayeshaPortfolioPhoto", imageData);
      } catch (error) {
        alert("Photo is displayed, but could not be saved in this browser. Try a smaller image.");
      }
    };

    testImage.onerror = () => alert("This image could not be opened. Please try another one.");
    testImage.src = imageData;
  };

  reader.onerror = () => alert("Unable to read this image file.");
  reader.readAsDataURL(file);
});
