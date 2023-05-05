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

        // Get the password card element, then get the user password id from hidden html elements
        const passwordCard = button.closest(".dashboard__passwords-card");
        const userPasswordId = passwordCard.querySelector(".hidden-user-password-id").innerHTML;
        const data = {newPassword: newPassword, userPasswordId: userPasswordId};

        // Send request to backend to update password in DB
        const response = await fetch("/dashboard", {
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
      // Get the user password id and website id from hidden html elements
      const userPasswordId = passwordCard.querySelector(".hidden-user-password-id").innerHTML;
      const websiteId = passwordCard.querySelector(".hidden-website-id").innerHTML;
      const data = {userPasswordId: userPasswordId, websiteId: websiteId};

      const response = await fetch("/dashboard", {
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

// Add new password
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

const categorySelect = document.getElementById("category");
const newCategoryInput = document.getElementById("newCategoryInput");
const addModalForm = document.querySelector("#newPasswordModal .modal-form");

// Show or hide the newCategoryInput based on the selected option
categorySelect.addEventListener("change", function () {
  if (this.value === "add new") {
    newCategoryInput.classList.remove("hidden");
  } else {
    newCategoryInput.classList.add("hidden");
  }
});

// Add a new category to the select input after the form is submitted
addModalForm.addEventListener("submit", async function (event) {
  // Prevent default form submission
  event.preventDefault();

  // If a new category was added, append it to the select input
  if (categorySelect.value === "add new") {
    let newCategory = newCategoryInput.value;
    let newOption = document.createElement("option");
    newOption.text = newCategory;
    newOption.value = newCategory;

    // Insert the new option before the 'Add New' option
    const addNewOption = categorySelect.querySelector(
      "option[value='add new']"
    );
    categorySelect.insertBefore(newOption, addNewOption);

    // Set the new category as the selected option
    categorySelect.value = newCategory;
  }

  // Handle form submission using Fetch API
  const formData = new FormData(addModalForm);
  const data = Object.fromEntries(formData);

  const response = await fetch("/dashboard", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    // Redirect to /dashboard after successful submission
    window.location.href = "/dashboard";
  } else {
    // Handle any error messages here
    console.error("Failed to submit new password");
  }
});
