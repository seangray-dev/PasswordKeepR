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

const addModalForm = document.querySelector("#newPasswordModal .modal-form");

addModalForm.addEventListener("submit", async function (event) {
  // Prevent default form submission
  event.preventDefault();

  // Handle form submission using Fetch API
  const formData = new FormData(addModalForm);
  const data = Object.fromEntries(formData);

  const response = await fetch("/admin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    // Redirect to /dashboard after successful submission
    window.location.href = "/admin";
  } else {
    // Handle any error messages here
    console.error("Failed to submit new password");
  }
});

// Edit User
const editUserModal = document.getElementById("editUserModal");
const editUserButtons = document.querySelectorAll(".edit-user");
const cancelEditUserButton = editUserModal.querySelector(".cancel-edit-user");

editUserButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Show the editUserModal
    showModal(editUserModal);

    // Get the targeted username element
    const targetUsernameElement =
      button.parentElement.parentElement.previousElementSibling;

    // Add submit event listener to the edit user form
    editUserModal.querySelector("form").addEventListener("submit", (event) => {
      // Prevent the form from submitting and refreshing the page
      event.preventDefault();

      // Update the user details (username and password)
      updateUserDetails(targetUsernameElement);

      // Hide the editUserModal with fade-out animation
      hideModalWithFadeOut(editUserModal);
    });

    // Add click event listener to the cancel button
    cancelEditUserButton.addEventListener("click", () => {
      // Hide the editUserModal with fade-out animation
      hideModalWithFadeOut(editUserModal);
    });

    // Add click event listener to the window (outside the modal)
    window.addEventListener("click", (event) => {
      // Check if the clicked target is the editUserModal
      if (event.target === editUserModal) {
        // Hide the editUserModal with fade-out animation
        hideModalWithFadeOut(editUserModal);
      }
    });
  });
});

// Function to update user details
function updateUserDetails(targetUsernameElement) {
  const editUsernameInput = document.getElementById("editUsername");
  const editUserPasswordInput = document.getElementById("editUserPassword");
  const confirmEditUserPasswordInput = document.getElementById(
    "confirmEditUserPassword"
  );

  // Check if both password fields are filled and match
  const passwordFieldsFilled =
    editUserPasswordInput.value !== "" &&
    confirmEditUserPasswordInput.value !== "";
  const passwordFieldsMatch =
    editUserPasswordInput.value === confirmEditUserPasswordInput.value;

  // If both password fields are filled but don't match, show an error message
  if (passwordFieldsFilled && !passwordFieldsMatch) {
    alert("User password and confirm password must match");
    return;
  }

  // Update the username on the page (you should also update it in the database)
  targetUsernameElement.textContent = editUsernameInput.value;

  // Update the password only if both password fields are filled and match
  if (passwordFieldsFilled && passwordFieldsMatch) {
    const passwordElement =
      targetUsernameElement.nextElementSibling.querySelector(
        ".hidden-password"
      );
    passwordElement.textContent = editUserPasswordInput.value;
  }

  // Hide the editUserModal with fade-out animation
  hideModalWithFadeOut(editUserModal);
}

// Delete User
const deleteUserButtons = document.querySelectorAll(".delete-user");
const deleteUserModal = document.getElementById("deleteUserModal");
const confirmDeleteUserButton = deleteUserModal.querySelector(
  ".confirm-delete-user"
);
const cancelDeleteUserButton = deleteUserModal.querySelector(
  ".cancel-delete-user"
);

deleteUserButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Show the deleteUserModal with fade-in animation
    showModal(deleteUserModal);

    // When the confirm delete button is clicked, delete the password card and hide the deleteUserModal with fade-out animation
    confirmDeleteUserButton.addEventListener("click", () => {
      // Get the password card element and remove it with fade-out animation
      const passwordCard = button.closest(".dashboard__passwords-card");
      passwordCard.classList.add("fade-out");
      setTimeout(() => {
        passwordCard.remove();
      }, 500);

      // Hide the deleteUserModal with fade-out animation
      hideModalWithFadeOut(deleteUserModal);
    });

    // When the cancel button is clicked, hide the deleteUserModal with fade-out animation
    cancelDeleteUserButton.addEventListener("click", () => {
      hideModalWithFadeOut(deleteUserModal);
    });
  });
});
