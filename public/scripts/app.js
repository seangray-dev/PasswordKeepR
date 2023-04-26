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

// Function to show modal
function showModal(modal) {
  modal.style.display = "block";
}

// Function to hide modal with fade-out animation
function hideModalWithFadeOut(modal) {
  modal.classList.add("fade-out");
  setTimeout(() => {
    modal.style.display = "none";
    modal.classList.remove("fade-out");
  }, 500);
}

// Edit password (also needs to update the database securely)
const editPasswordButtons = document.querySelectorAll(".edit-password");
const editPasswordmodal = document.getElementById("editPasswordModal");
const cancelButton = editPasswordmodal.querySelector(".cancel-edit-password");

editPasswordButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    // Show the editPasswordmodal
    showModal(editPasswordmodal);

    // When the form is submitted, update the password and hide the editPasswordmodal
    editPasswordmodal
      .querySelector("form")
      .addEventListener("submit", (event) => {
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

        // Hide the editPasswordmodal with fade-out animation
        hideModalWithFadeOut(editPasswordmodal);
      });
  });
});

// When the cancel button is clicked, hide the editPasswordmodal with fade-out animation
cancelButton.addEventListener("click", () => {
  hideModalWithFadeOut(editPasswordmodal);
});

// When the user clicks anywhere outside of the editPasswordmodal, close it with fade-out animation
window.addEventListener("click", (event) => {
  if (event.target === editPasswordmodal) {
    hideModalWithFadeOut(editPasswordmodal);
  }
});

// Delete Password (also needs to delete the password from the database securely)
const deletePasswordButtons = document.querySelectorAll(".delete-password");
const deletePasswordModal = document.getElementById("deletePasswordModal");
const confirmDeleteButton = deletePasswordModal.querySelector(
  ".confirm-delete-password"
);
const cancelDeleteButton = deletePasswordModal.querySelector(
  ".cancel-delete-password"
);

deletePasswordButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Show the deletePasswordModal with fade-in animation
    showModal(deletePasswordModal);

    // When the confirm delete button is clicked, delete the password card and hide the deletePasswordModal with fade-out animation
    confirmDeleteButton.addEventListener("click", () => {
      // Get the password card element and remove it with fade-out animation
      const passwordCard = button.closest(".dashboard__passwords-card");
      passwordCard.classList.add("fade-out");
      setTimeout(() => {
        passwordCard.remove();
      }, 500);

      // Hide the deletePasswordModal with fade-out animation
      hideModalWithFadeOut(deletePasswordModal);
    });

    // When the cancel button is clicked, hide the deletePasswordModal with fade-out animation
    cancelDeleteButton.addEventListener("click", () => {
      hideModalWithFadeOut(deletePasswordModal);
    });
  });
});

// When the user clicks anywhere outside of the deletePasswordModal, close it with fade-out animation
window.addEventListener("click", (event) => {
  if (event.target === deletePasswordModal) {
    hideModalWithFadeOut(deletePasswordModal);
  }
});

// Add new password - (only hides and shows modal currently)
const addPasswordButton = document.querySelector(".dashboard__passwords-add");
const newPasswordModal = document.getElementById("newPasswordModal");
const cancelNewPasswordButton = newPasswordModal.querySelector(
  ".cancel-new-password"
);

addPasswordButton.addEventListener("click", () => {
  // Show the newPasswordmodal
  showModal(newPasswordModal);

  // When the cancel button is clicked, hide the newPasswordModal with fade-out animation
  cancelNewPasswordButton.addEventListener("click", () => {
    hideModalWithFadeOut(newPasswordModal);
  });
});

// When the user clicks anywhere outside of the newPasswordModal, close it with fade-out animation
window.addEventListener("click", (event) => {
  if (event.target === newPasswordModal) {
    hideModalWithFadeOut(newPasswordModal);
  }
});
