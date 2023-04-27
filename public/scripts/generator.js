const generatedPassword = document.querySelector(".generator__card-password span");
const copyToClipboardButton = document.querySelector(".fa-copy");
const checkIcon = document.querySelector(".fa-check");
const characterLengthInput = document.querySelector(".input-char-length input");
const characterLengthOutput = document.querySelector(".char-lenght-num");
const includeUppercase = document.getElementById("includeUppercase");
const includeLowercase = document.getElementById("includeLowercase");
const includeNumber = document.getElementById("includeNumber");
const includeSymbol = document.getElementById("includeSymbol");
const generateButton = document.getElementById("generateButton");

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

characterLengthInput.addEventListener("change", () => {
  characterLengthOutput.innerHTML = characterLengthInput.value;
  displayStrength(
    characterLengthInput.value,
    document.querySelectorAll(".generator__form-input input:checked").length);
});

const generateRandomPassword = function (length, upper, lower, number, symbol) {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "~`!@#$%^&*()_-+={[}]\|:;'\"<,>.?/";
  let input = "";
  let output= "";

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
    input += numbers;
  }

  let remainingLength = length - output.length;
  for (let i = 0; i < remainingLength; i++) {
    output += input.charAt(Math.floor(Math.random() * input.length));
  }

  return output;
}

generateButton.addEventListener("click", () => {
  let randomPassword =  generateRandomPassword(
    characterLengthInput.value,
    includeUppercase.checked,
    includeLowercase.checked,
    includeNumber.checked,
    includeSymbol.checked);

    generatedPassword.innerHTML = randomPassword;
});

// To display password stength:
const strengthText = document.querySelector(".strength-col2 span");

const displayStrength = function (length, count) {
  console.log(`length: ${length}, count: ${count}`);
  if (length >= 15 && count >= 3) {
    // strong
    strengthText.innerHTML = "STRONG";
    document.querySelectorAll(".strength-bar").forEach((element) => {
    });
  }
  else if (length >= 10 && count >= 2) {
    // medium
    strengthText.innerHTML = "MEDIUM";
  }
  else if (length >= 6 && count >= 1) {
    // weak
    strengthText.innerHTML = "WEAK";
  }
  else {
    // too weak
    strengthText.innerHTML = "TOO WEAK!";
  }
}













