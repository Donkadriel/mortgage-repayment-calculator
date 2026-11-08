const amountInput = document.getElementById("amount");
const yearsInput = document.getElementById("years");
const rateInput = document.getElementById("rate");


const form = document.querySelector("form");
const errorMessages = document.querySelectorAll(".error-message")

const calculateMortgage = (results) => {
  if (results.mortgageType === "repayment") {
    document.querySelector("#mortgage").textContent = "Repayment";
    document.querySelector("#monthly-payment").textContent =
      results.monthlyPayment.toFixed(2);
      document.querySelector("#total-repayment").textContent =
      results.totalRepayment.toFixed(2);
  } else if (results.mortgageType === "interest-only") {
    document.querySelector("#mortgage").textContent = "Interest Only";
    document.querySelector("#monthly-payment").textContent =  results.monthlyInterest.toFixed(2);
    document.querySelector("#total-repayment").textContent =
      results.totalInterest.toFixed(2);
  }
};


const validateForm = () => {
  let isValid = true;
  const inputs = [amountInput, yearsInput, rateInput];
  inputs.forEach((input, index) => {
    const errorMessage = input.parentElement.nextElementSibling;


    if (input.value.trim() === "") {
      errorMessage.textContent = "This field is required.";
      errorMessage.style.display = "block";

      input.parentElement.classList.add("error");
      isValid = false;  

    } else {
      errorMessage.textContent = "";
      errorMessage.style.display = "none";

      input.parentElement.classList.remove("error");
    }
    });

    const mortgageType = document.querySelector(".radio-input:checked");

    const mortgageTypeError = document.querySelector(".mortgage-type .error-message");

    if (!mortgageType) {
      mortgageTypeError.textContent = "This field is required";
      mortgageTypeError.style.display = "block";

      isValid = false;
    } else {
      mortgageTypeError.textContent= "";
      mortgageTypeError.style.display = "none";
    }

    return isValid;
}


const handleSubmit = (event) => {
  event.preventDefault();
  
  if (!validateForm()) {
    return;
  }

  const amount = Number(amountInput.value);
  const years = Number(yearsInput.value);
  const rate = Number(rateInput.value);
  const mortgageType = document.querySelector(".radio-input:checked").value;

  const numberOfMonths = years * 12;
const monthlyRate = rate / 100 / 12;
const monthlyPayment =
  (amount * monthlyRate) / (1 - (1 + monthlyRate) ** -numberOfMonths);

const totalRepayment = monthlyPayment * numberOfMonths;
const totalInterest = totalRepayment - amount;

const monthlyInterest = totalInterest / numberOfMonths;

document.querySelector(".results-shown").style.display = "none";
document.querySelector(".your-results").style.display = "block";

const results = {
  monthlyPayment: monthlyPayment,
  totalRepayment: totalRepayment,
  totalInterest: totalInterest,
  monthlyInterest: monthlyInterest,
  mortgageType: mortgageType,
  monthlyRate: monthlyRate,
};

calculateMortgage(results);

};

form.addEventListener("submit", handleSubmit);

const handleClearAll = () => {
amountInput.value = "";
yearsInput.value = "";
rateInput.value = "";
document.querySelectorAll(".radio-input").forEach((radio) => {
  radio.checked = false;
})

document.querySelector(".results-shown").style.display = "block";
document.querySelector(".your-results").style.display = "none";
}

document.querySelector("#clear-all").addEventListener( "click", handleClearAll);

[amountInput, yearsInput, rateInput].forEach((input) => {
  input.addEventListener("input", () => {
    const errorMessage = input.parentElement.nextElementSibling;

    if  (input.value.trim() !== ""){
      errorMessage.textContent = "";
      errorMessage.style.display = "none";
      input.parentElement.classList.remove("error");
    }
  });
});

document.querySelectorAll(".radio-input").forEach((radio) => {
  radio.addEventListener("change", () => {
    document.querySelector(
      ".mortgage-type .error-message"
    ).style.display = "none";
  });
});

