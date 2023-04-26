// Client facing scripts here

// Toggles password visibility
const showPasswordBtn = document.querySelectorAll(".show-password-btn");
const password = document.querySelectorAll(".hidden-password");
const passwordPlaceholder = document.querySelectorAll(".show-password");

showPasswordBtn.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    // Toggle the visibility of the password element
    password[index].classList.toggle("hidden");
    passwordPlaceholder[index].classList.toggle("hidden");

    // Toggle the visibility of the eye and eye-slash icons
    btn.querySelector(".eye-show").classList.toggle("hidden");
    btn.querySelector(".eye-hide").classList.toggle("hidden");
  });
});

// Edit password
const editPasswordButtons = document.querySelectorAll(".edit-password");
const modal = document.getElementById("editPasswordModal");
const cancelButton = modal.querySelector(".cancel-edit-password");

editPasswordButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    // Show the modal
    modal.style.display = "block";

    // When the form is submitted, update the password and hide the modal
    modal.querySelector("form").addEventListener("submit", (event) => {
      event.preventDefault();

      const newPassword = document.getElementById("newPassword").value;
      const confirmNewPassword =
        document.getElementById("confirmNewPassword").value;

      if (newPassword !== confirmNewPassword) {
        alert("New password and confirm password must match");
        return;
      }

      // Update the password element
      const password = document.querySelectorAll(".hidden-password")[index];
      password.textContent = newPassword;

      // Hide the modal
      modal.style.display = "none";
    });
  });
});

// When the cancel button is clicked, hide the modal
cancelButton.addEventListener("click", () => {
  modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Copy password to clipboard
const copyToClipboardBtn = document.querySelectorAll(".copy-to-clipboard");

copyToClipboardBtn.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    navigator.clipboard
      .writeText(password[index].innerHTML)
      .then(() => {
        // Show check icon after password successfully copied to clipboard
        btn.querySelector(".fa-clipboard").classList.toggle("hidden");
        btn.querySelector(".fa-check").classList.toggle("hidden");
        // Check icon change back to clipboard icon after 2 seconds
        setTimeout(() => {
          btn.querySelector(".fa-clipboard").classList.toggle("hidden");
          btn.querySelector(".fa-check").classList.toggle("hidden");
        }, 2000);
      })
      .catch((err) => alert("Copy to clipboard failed!"));
  });
});
