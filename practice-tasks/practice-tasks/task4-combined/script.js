const button = document.getElementById("welcomeBtn");
const message = document.getElementById("message");

button.addEventListener("click", function () {
  message.textContent = "Welcome! HTML, CSS, and JavaScript are all connected.";
});

const photoButtons = [...document.querySelectorAll(".nature-photo")];
const lightbox = document.getElementById("lightbox");
const lightboxImage = lightbox.querySelector(".lightbox-image");
const lightboxDescription = lightbox.querySelector(".lightbox-description");
const lightboxCount = lightbox.querySelector(".lightbox-count");
const closeButton = lightbox.querySelector(".lightbox-close");
let activePhotoIndex = 0;
let openingButton;

function showPhoto(index) {
  activePhotoIndex = (index + photoButtons.length) % photoButtons.length;
  const photo = photoButtons[activePhotoIndex].querySelector("img");

  lightboxImage.src = photo.src;
  lightboxImage.alt = photo.alt;
  lightboxDescription.textContent = photo.alt;
  lightboxCount.textContent = `${activePhotoIndex + 1} / ${photoButtons.length}`;
}

photoButtons.forEach((photoButton, index) => {
  photoButton.addEventListener("click", () => {
    openingButton = photoButton;
    showPhoto(index);
    lightbox.showModal();
    closeButton.focus();
  });
});

lightbox.querySelector(".lightbox-previous").addEventListener("click", () => {
  showPhoto(activePhotoIndex - 1);
});

lightbox.querySelector(".lightbox-next").addEventListener("click", () => {
  showPhoto(activePhotoIndex + 1);
});

closeButton.addEventListener("click", () => {
  lightbox.close();
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.close();
  }
});

lightbox.addEventListener("close", () => {
  openingButton?.focus();
});

lightbox.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    showPhoto(activePhotoIndex + 1);
  } else if (event.key === "ArrowLeft") {
    showPhoto(activePhotoIndex - 1);
  } else if (event.key === "Escape") {
    event.preventDefault();
    lightbox.close();
  }
});
