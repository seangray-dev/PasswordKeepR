const form = document.querySelector(".register-login__form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const passwordConfirmInput = document.querySelector("#password_confirm");
const emailError = document.querySelector(".error-message-form");
const passwordError = document.querySelector("#password-error");
const passwordConfirmError = document.querySelector("#password-confirm-error");
const organizationInput = document.querySelector("#organization");
const successMessage = document.querySelector(".success");

form.addEventListener("input", () => {
  emailError.style.display = "none";
  passwordError.style.display = "none";
  passwordConfirmError.style.display = "none";
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let errors = false;
  if (emailInput.validity.typeMismatch || emailInput.validity.valueMissing) {
    errors = true;
    emailError.style.display = "block";
  } else {
    emailError.style.display = "none";
  }

  if (passwordInput.value.length < 8) {
    errors = true;
    passwordError.style.display = "block";
  } else {
    passwordError.style.display = "none";
  }

  if (passwordConfirmInput.value !== passwordInput.value) {
    errors = true;
    passwordConfirmError.style.display = "block";
  } else {
    passwordConfirmError.style.display = "none";
  }

  if (!errors) {
    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailInput.value,
          password: passwordInput.value,
          password_confirm: passwordConfirmInput.value,
          organization: organizationInput.value,
        }),
      });

      const data = await response.json();
      console.log(data.message);

      if (response.status === 201) {
        successMessage.textContent = data.message;
        successMessage.style.display = "block";
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      } else if (response.status !== 200 && response.status !== 201) {
        emailError.textContent = data.message;
        emailError.style.display = "block";
      }
    } catch (error) {
      console.error(error);
    }
  }
});
