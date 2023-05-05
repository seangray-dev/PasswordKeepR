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

// Edit password
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
      .addEventListener("submit", async (event) => {
        event.preventDefault();

        const newUsername = document.getElementById("editUsername").value;
        const newPassword = document.getElementById("newPassword").value;
        const confirmNewPassword =
          document.getElementById("confirmNewPassword").value;

        if (newPassword !== confirmNewPassword) {
          alert("New password and confirm password must match");
          return;
        }

        // Get the password card element, then get the organization password id from hidden html elements
        const passwordCard = button.closest(".dashboard__passwords-card");
        const organizationPasswordId = passwordCard.querySelector(
          ".hidden-organization-password-id"
        ).innerHTML;
        const data = {
          newUsername: newUsername,
          newPassword: newPassword,
          organizationPasswordId: organizationPasswordId,
        };

        // Send request to backend to update password in DB
        const response = await fetch("/admin", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          // Update the password element
          // Find password span element in current 'passwordCard' element
          // and then update its content with the new password
          const passwordSpan = passwordCard.querySelector(".hidden-password");
          passwordSpan.textContent = newPassword;
          
          //Update username without refreshing page
          if (newUsername) {
            const usernameSpan = passwordCard.querySelector(".dashboard__passwords-username");
            usernameSpan.textContent = newUsername;
          }
        } else {
          console.error("Failed to update password");
        }

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

// Delete Password
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

    // When the confirm delete button is clicked, delete password and website from DB
    // Then delete the password card and hide the deletePasswordModal with fade-out animation
    confirmDeleteButton.addEventListener("click", async () => {
      // Get the password card element and remove it with fade-out animation
      const passwordCard = button.closest(".dashboard__passwords-card");
      // Get the organization password id and website id from hidden html elements
      const organizationPasswordId = passwordCard.querySelector(
        ".hidden-organization-password-id"
      ).innerHTML;
      const websiteId =
        passwordCard.querySelector(".hidden-website-id").innerHTML;
      const data = {
        organizationPasswordId: organizationPasswordId,
        websiteId: websiteId,
      };

      const response = await fetch("/admin", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        passwordCard.classList.add("fade-out");
        setTimeout(() => {
          passwordCard.remove();
        }, 500);
      } else {
        console.error("Failed to delete password");
      }

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

// Delete User
const deleteUserButtons = document.querySelectorAll(".delete-user");
const deleteUserModal = document.getElementById("deleteUserModal");
const confirmDeleteUserButton = deleteUserModal.querySelector(
  ".confirm-delete-user"
);
const cancelDeleteUserButton = deleteUserModal.querySelector(
  ".cancel-delete-user"
);

let userIdToDelete;

deleteUserButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Get the user ID to delete
    userIdToDelete = button.closest(".dashboard__passwords-card").dataset
      .userId;

    // Show the deleteUserModal with fade-in animation
    showModal(deleteUserModal);
  });
});

// When the confirm delete button is clicked, delete the user card and hide the deleteUserModal with fade-out animation
confirmDeleteUserButton.addEventListener("click", async () => {
  if (userIdToDelete) {
    // Get the user card element and remove it with fade-out animation
    const userCard = document.querySelector(
      `[data-user-id="${userIdToDelete}"]`
    );
    userCard.classList.add("fade-out");
    setTimeout(() => {
      userCard.remove();
    }, 500);

    // Hide the deleteUserModal with fade-out animation
    hideModalWithFadeOut(deleteUserModal);
    await deleteUserFromDatabase(userIdToDelete);
  }
});

// When the cancel button is clicked, hide the deleteUserModal with fade-out animation
cancelDeleteUserButton.addEventListener("click", () => {
  hideModalWithFadeOut(deleteUserModal);
});

const deleteUserFromDatabase = async (userId) => {
  try {
    const response = await fetch("/admin", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId }),
    });

    if (response.status !== 200) {
      throw new Error("Error deleting user from the database");
    }
  } catch (error) {
    console.error(error);
  }
};
