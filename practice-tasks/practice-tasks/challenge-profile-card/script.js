
const bio = document.getElementById("bio");
const bioInput = document.getElementById("bioInput");
const photoInput = document.getElementById("photoInput");
const profilePic = document.getElementById("profilePic");
const avatarLetter = document.getElementById("avatarLetter");
const saveBioBtn = document.getElementById("saveBioBtn");
const changeBioBtn = document.getElementById("changeBioBtn");
const charCount = document.getElementById("charCount");
const message = document.getElementById("message");

const bios = [
  "Hi! I am a student passionate about web development, learning HTML, CSS, JavaScript, and React.",
  "I enjoy building creative projects, solving coding problems, and learning new technologies.",
  "My goal is to become a skilled full-stack developer and create useful web applications."
];

let sampleIndex = 0;

// Show a message
function showMessage(text, isError = false) {
  message.textContent = text;
  message.classList.toggle("error", isError);
}

// Update character counter
function updateCounter() {
  charCount.textContent = bioInput.value.length;
}

bioInput.addEventListener("input", updateCounter);

// Load saved bio
try {
  const savedBio = localStorage.getItem("profileBio");

  if (savedBio !== null) {
    bio.textContent = savedBio;
  }
} catch (error) {
  console.warn("Could not load saved bio.");
}

// Keep editor text in sync with displayed bio
bioInput.value = bio.textContent;
updateCounter();

// Save manually written bio
saveBioBtn.addEventListener("click", function () {
  const newBio = bioInput.value.trim();

  if (!newBio) {
    showMessage("Please write your bio first.", true);
    return;
  }

  bio.textContent = newBio;

  try {
    localStorage.setItem("profileBio", newBio);
    showMessage("Your bio has been saved successfully!");
  } catch (error) {
    showMessage("Bio updated, but browser storage is unavailable.", true);
  }
});

// Try a sample bio
changeBioBtn.addEventListener("click", function () {
  const currentBio = bio.textContent;

  for (let i = 1; i <= bios.length; i++) {
    const nextIndex = (sampleIndex + i) % bios.length;

    if (bios[nextIndex] !== currentBio) {
      sampleIndex = nextIndex;
      break;
    }
  }

  bioInput.value = bios[sampleIndex];
  bio.textContent = bios[sampleIndex];
  updateCounter();

  try {
    localStorage.setItem("profileBio", bios[sampleIndex]);
    showMessage("Sample bio applied. You can edit it above.");
  } catch (error) {
    showMessage("Sample applied, but could not save it.", true);
  }
});

// Load saved profile picture
try {
  const savedPhoto = localStorage.getItem("profilePhoto");

  if (savedPhoto) {
    displayPhoto(savedPhoto);
  }
} catch (error) {
  console.warn("Could not load saved photo.");
}

// Display selected photo
function displayPhoto(imageSource) {
  profilePic.src = imageSource;
  profilePic.classList.add("visible");
  avatarLetter.classList.add("hidden");
}

// Upload a new profile picture
photoInput.addEventListener("change", function () {
  const file = photoInput.files[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    showMessage("Please select an image file.", true);
    photoInput.value = "";
    return;
  }

  // Limit image size to 2 MB
  if (file.size > 2 * 1024 * 1024) {
    showMessage("Image is too large. Please choose a photo under 2 MB.", true);
    photoInput.value = "";
    return;
  }

  const reader = new FileReader();

  reader.onload = function (event) {
    const imageSource = event.target.result;
    const testImage = new Image();

    testImage.onload = function () {
      try {
        // Save photo in browser storage
        localStorage.setItem("profilePhoto", imageSource);
        displayPhoto(imageSource);
        showMessage("Profile picture updated successfully!");
      } catch (error) {
        showMessage(
          "Browser storage is full. Try a smaller image.",
          true
        );
      }
    };

    testImage.onerror = function () {
      showMessage("Could not open this image. Try another photo.", true);
    };

    testImage.src = imageSource;
  };

  reader.onerror = function () {
    showMessage("Unable to read the selected image.", true);
  };

  reader.readAsDataURL(file);
});
