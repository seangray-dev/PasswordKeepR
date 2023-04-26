// Client facing scripts here
const showPasswordBtn = document.querySelectorAll(".show-password-btn");
const password = document.querySelectorAll(".hidden-password");
const passwordPlaceholder = document.querySelectorAll(".show-password");
const copyToClipboardBtn = document.querySelectorAll(".copy-to-clipboard");

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

copyToClipboardBtn.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    navigator.clipboard.writeText(password[index].innerHTML)
      .then(() => {
        // Show check icon after password successfully copied to clipboard
        btn.querySelector(".fa-clipboard").classList.toggle("hidden");
        btn.querySelector(".fa-check").classList.toggle("hidden");
        // Check icon change back to clipboard icon after 2 seconds
        setTimeout(()=> {
          btn.querySelector(".fa-clipboard").classList.toggle("hidden");
          btn.querySelector(".fa-check").classList.toggle("hidden");
        }, 2000)
      })
      .catch((err) => alert("Copy to clipboard failed!"))
  });
});
