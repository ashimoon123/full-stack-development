const button = document.getElementById("welcomeBtn");
const message = document.getElementById("message");

button.addEventListener("click", function () {
  message.textContent = "Welcome! Your HTML, CSS, and JavaScript are all linked correctly.";
});
