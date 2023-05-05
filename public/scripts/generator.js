// To copy the generated password:
const generatedPassword = document.querySelector(
  ".generator__card-password span"
);
const copyToClipboardButton = document.querySelector(".fa-copy");
const checkIcon = document.querySelector(".fa-check");

copyToClipboardButton.addEventListener("click", () => {
  navigator.clipboard
    .writeText(generatedPassword.innerHTML)
    .then(() => {
      // Show check icon after password successfully copied to clipboard
      copyToClipboardButton.classList.toggle("hidden");
      checkIcon.classList.toggle("hidden");
      // Check icon change back to clipboard icon after 2 seconds
      setTimeout(() => {
        copyToClipboardButton.classList.toggle("hidden");
        checkIcon.classList.toggle("hidden");
      }, 2000);
    })
    .catch((err) => alert("Copy to clipboard failed!"));
});

// Function for the return button
function goBack() {
  window.history.back();
}


// To display character length and password strength when user select value from the range slider:
const characterLengthInput = document.querySelector(".input-char-length input");
const characterLengthOutput = document.querySelector(".char-length-num");

characterLengthInput.addEventListener("input", () => {
  characterLengthOutput.innerHTML = characterLengthInput.value;
  displayStrength(
    characterLengthInput.value,
    document.querySelectorAll(".generator__form-input input:checked").length
  );
});

// To display password strength when user select checkboxs for including options:
const includeUppercase = document.getElementById("includeUppercase");
const includeLowercase = document.getElementById("includeLowercase");
const includeNumber = document.getElementById("includeNumber");
const includeSymbol = document.getElementById("includeSymbol");

[includeUppercase, includeLowercase, includeNumber, includeSymbol].forEach(
  (checkbox) => {
    checkbox.addEventListener("change", () => {
      displayStrength(
        characterLengthInput.value,
        document.querySelectorAll(".generator__form-input input:checked").length
      );
    });
  }
);

// Implement function to generate random password based on character length
// as well as options for including uppercase, lowercase, number or symbol
const generateRandomPassword = function (length, upper, lower, number, symbol) {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "~`!@#$%^&*()_-+={[}]|:;'\"<,>.?/";
  let input = "";
  let output = "";

  if (upper) {
    output += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
    input += uppercase;
  }
  if (lower) {
    output += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
    input += lowercase;
  }
  if (number) {
    output += numbers.charAt(Math.floor(Math.random() * numbers.length));
    input += numbers;
  }
  if (symbol) {
    output += symbols.charAt(Math.floor(Math.random() * symbols.length));
    input += symbols;
  }

  let remainingLength = length - output.length;
  for (let i = 0; i < remainingLength; i++) {
    output += input.charAt(Math.floor(Math.random() * input.length));
  }

  return output;
};

// Click generate button to generate password:
const generateButton = document.getElementById("generateButton");
const errorMessage = "Please select at least one option";

generateButton.addEventListener("click", () => {
  if (
    !includeUppercase.checked &&
    !includeLowercase.checked &&
    !includeNumber.checked &&
    !includeSymbol.checked
  ) {
    generatedPassword.innerHTML = errorMessage;
    generatedPassword.classList.add("error-message-generator");
  } else {
    let randomPassword = generateRandomPassword(
      characterLengthInput.value,
      includeUppercase.checked,
      includeLowercase.checked,
      includeNumber.checked,
      includeSymbol.checked
    );
    generatedPassword.textContent = randomPassword;
    generatedPassword.classList.remove("error-message-generator");
  }
});

// Implement function to show password strength level
const strengthText = document.querySelector(".strength-col2 span");
const stengthBars = document.querySelectorAll(".strength-bar");
const strengthBar1 = document.getElementById("strength-bar1");
const strengthBar2 = document.getElementById("strength-bar2");
const strengthBar3 = document.getElementById("strength-bar3");
const strengthBar4 = document.getElementById("strength-bar4");

const displayStrength = function (length, count) {
  if (length >= 15 && count >= 3) {
    // strong
    strengthText.innerHTML = "STRONG";
    stengthBars.forEach((bar) => {
      bar.classList.remove(
        "strength-strong",
        "strength-medium",
        "strength-weak",
        "strength-too-weak"
      );
      bar.classList.add("strength-strong");
    });
  } else if (length >= 10 && count >= 2) {
    // medium
    strengthText.innerHTML = "MEDIUM";
    stengthBars.forEach((bar) => {
      bar.classList.remove(
        "strength-strong",
        "strength-medium",
        "strength-weak",
        "strength-too-weak"
      );
    });
    [strengthBar1, strengthBar2, strengthBar3].forEach((bar) => {
      bar.classList.add("strength-medium");
    });
  } else if (length >= 8 && count >= 1) {
    // weak
    strengthText.innerHTML = "WEAK";
    stengthBars.forEach((bar) => {
      bar.classList.remove(
        "strength-strong",
        "strength-medium",
        "strength-weak",
        "strength-too-weak"
      );
    });
    [strengthBar1, strengthBar2].forEach((bar) => {
      bar.classList.add("strength-weak");
    });
  } else {
    // too weak
    strengthText.innerHTML = "TOO WEAK!";
    stengthBars.forEach((bar) => {
      bar.classList.remove(
        "strength-strong",
        "strength-medium",
        "strength-weak",
        "strength-too-weak"
      );
    });
    strengthBar1.classList.add("strength-too-weak");
  }
};
