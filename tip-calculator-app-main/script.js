const inputsDiv = document.querySelectorAll("#input");
const billInput = document.getElementById("bill_input");
const peopleInput = document.getElementById("people_input");
const tipBtns = document.querySelectorAll("#tip_btn");
const tipInput = document.getElementById("tip_input");
const errorTexts = document.querySelectorAll("#error_text");

const tipResult = document.getElementById("tip_amount_result");
const totalResult = document.getElementById("total_amount_result");
const resetBtn = document.getElementById("reset_btn");

let billValue = 0;
let tipValue = 0;
let peopleNumber = 0;

const updateResults = () => {
  if (billValue > 0 && tipValue >= 0 && peopleNumber > 0) {
    const tipAmount = (billValue * (tipValue / 100)) / peopleNumber;
    const totalAmount =
      (billValue + billValue * (tipValue / 100)) / peopleNumber;

    tipResult.textContent = "$" + tipAmount.toFixed(2);
    totalResult.textContent = "$" + totalAmount.toFixed(2);

    resetBtn.style.opacity = "1";
    resetBtn.style.pointerEvents = "auto";
    resetBtn.style.cursor = "pointer";
  } else {
    tipResult.textContent = "$0.00";
    totalResult.textContent = "$0.00";

    resetBtn.style.opacity = "0.3";
    resetBtn.style.pointerEvents = "none";
    resetBtn.style.cursor = "default";
  }
};

billInput.addEventListener("input", () => {
  const currentValue = billInput.value;

  if (currentValue.length === 0) {
    inputsDiv[0].style.borderColor = "transparent";
    errorTexts[0].style.display = "none";
    billValue = 0;
  } else if (/^0+$/.test(currentValue)) {
    inputsDiv[0].style.borderColor = "var(--RedError)";
    errorTexts[0].style.display = "inline-block";
    billValue = 0;
  } else {
    inputsDiv[0].style.borderColor = "var(--StrongCyan)";
    errorTexts[0].style.display = "none";
    billValue = parseFloat(currentValue);
  }
  updateResults();
});

tipInput.addEventListener("input", () => {
  const currentValue = tipInput.value;

  if (currentValue.length === 0) {
    tipInput.style.borderColor = "transparent";
    tipValue = 0;
  } else {
    tipInput.style.borderColor = "var(--StrongCyan)";
    tipValue = parseFloat(currentValue);

    tipBtns.forEach((btn) => {
      btn.style.color = "var(--white)";
      btn.style.backgroundColor = "var(--VeryDarkCyan)";
    });
  }
  updateResults();
});

tipBtns.forEach((tipBtn) => {
  tipBtn.addEventListener("click", () => {
    const currentValue = parseFloat(tipBtn.textContent.replace("%", ""));
    tipValue = currentValue;

    tipBtn.style.color = "var(--VeryDarkCyan)";
    tipBtn.style.backgroundColor = "var(--StrongCyan)";

    tipBtns.forEach((btn) => {
      if (btn !== tipBtn) {
        btn.style.color = "var(--white)";
        btn.style.backgroundColor = "var(--VeryDarkCyan)";
      }
    });

    tipInput.value = "";
    tipInput.style.borderColor = "transparent";

    updateResults();
  });
});

peopleInput.addEventListener("input", () => {
  const currentValue = peopleInput.value;

  if (currentValue.length === 0) {
    inputsDiv[1].style.borderColor = "transparent";
    errorTexts[1].style.display = "none";
    peopleNumber = 0;
  } else if (/^0+$/.test(currentValue)) {
    inputsDiv[1].style.borderColor = "var(--RedError)";
    errorTexts[1].style.display = "inline-block";
    peopleNumber = 0;
  } else {
    inputsDiv[1].style.borderColor = "var(--StrongCyan)";
    errorTexts[1].style.display = "none";
    peopleNumber = parseInt(currentValue);
  }
  updateResults();
});

resetBtn.addEventListener("click", () => {
  billValue = 0;
  tipValue = 0;
  peopleNumber = 0;

  billInput.value = "";
  tipInput.value = "";
  peopleInput.value = "";

  inputsDiv.forEach((inputDiv) => {
    inputDiv.style.borderColor = "transparent";
  });

  errorTexts.forEach((errorText) => {
    errorText.style.display = "none";
  });

  tipResult.textContent = "$0.00";
  totalResult.textContent = "$0.00";

  tipBtns.forEach((btn) => {
    btn.style.color = "var(--white)";
    btn.style.backgroundColor = "var(--VeryDarkCyan)";
  });

  resetBtn.style.opacity = "0.3";
  resetBtn.style.pointerEvents = "none";
  resetBtn.style.cursor = "default";
});
