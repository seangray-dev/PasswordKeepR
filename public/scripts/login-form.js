const form = document.querySelector(".register-login__form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const errorMessage = document.querySelector(".error-message-login");
const successMessage = document.querySelector(".success");

form.addEventListener("input", () => {
  errorMessage.style.display = "none";
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInput.value,
        password: passwordInput.value,
      }),
    });

    const data = await response.json();
    console.log(data.message);

    if (response.status === 200) {
      successMessage.textContent = data.message;
      successMessage.style.display = "block";
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } else {
      errorMessage.textContent = data.message;
      errorMessage.style.display = "block";
    }
  } catch (error) {
    console.error(error);
  }
});
