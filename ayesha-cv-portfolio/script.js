const navLinks = document.querySelectorAll(".nav-link");
const pageLinks = document.querySelectorAll("[data-page]");
const pages = document.querySelectorAll(".page");
const pageTitle = document.getElementById("pageTitle");
const cvDialog = document.getElementById("cvDialog");
const resumePhoto = document.getElementById("resumePhoto");
const resumeInitials = document.getElementById("resumeInitials");
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

pageLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const pageId = link.dataset.page;
    if (cvDialog.open) cvDialog.close();
    history.pushState({ pageId }, "", `#${pageId}`);
    showPage(pageId);
  });
});

window.addEventListener("popstate", () => {
  if (cvDialog.open) cvDialog.close();
  showPage(location.hash.slice(1) || "home");
});

showPage(location.hash.slice(1) || "home");
document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("openCvOptions").addEventListener("click", () => cvDialog.showModal());
document.getElementById("closeCvOptions").addEventListener("click", () => cvDialog.close());
cvDialog.addEventListener("click", (event) => {
  if (event.target === cvDialog) cvDialog.close();
});

async function downloadResumePdf() {
  const resumeDocument = document.getElementById("resumeDocument");
  const downloadButtons = [document.getElementById("downloadCvPdf"), document.getElementById("resumeDownload")];

  if (location.hash !== "#resume") history.pushState({ pageId: "resume" }, "", "#resume");
  showPage("resume");
  if (cvDialog.open) cvDialog.close();

  if (typeof window.html2pdf !== "function") {
    document.body.classList.add("printing-resume");
    window.addEventListener("afterprint", () => document.body.classList.remove("printing-resume"), { once: true });
    window.print();
    return;
  }

  downloadButtons.forEach((button) => { button.disabled = true; });
  resumeDocument.classList.add("pdf-export");
  try {
    await document.fonts.ready;
    await Promise.all([...resumeDocument.querySelectorAll("img")].map((image) => image.decode().catch(() => {})));
    await window.html2pdf().set({
      margin: 0,
      filename: "Ayesha-Bibi-CV.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] }
    }).from(resumeDocument).save();
    if (cvDialog.open) cvDialog.close();
  } catch (error) {
    console.error("CV PDF could not be generated.", error);
    alert("The PDF could not be generated. Please try again.");
  } finally {
    resumeDocument.classList.remove("pdf-export");
    downloadButtons.forEach((button) => { button.disabled = false; });
  }
}

document.getElementById("downloadCvPdf").addEventListener("click", downloadResumePdf);
document.getElementById("resumeDownload").addEventListener("click", downloadResumePdf);

function displayPhoto(src) {
  heroPhoto.src = src;
  sidebarPhoto.src = src;
  resumePhoto.src = src;
  heroPhoto.hidden = false;
  sidebarPhoto.hidden = false;
  resumePhoto.hidden = false;
  heroInitials.hidden = true;
  sidebarInitials.hidden = true;
  resumeInitials.hidden = true;
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
