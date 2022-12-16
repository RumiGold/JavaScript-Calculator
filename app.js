const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const preveiousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);
const changeSign = document.querySelector("[data-change-sign]");
const percent = document.querySelector("[data-percent]");

// variables =====
let previous = "";
let current = "";
let operator = undefined;

// Event listeners =====
allClearButton.addEventListener("click", () => {
  clear();
});

numberButtons.forEach((num) => {
  num.addEventListener("click", () => {
    appendNumber(num.innerHTML);
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (operator !== undefined) compute();
    chooseOperator(button.innerHTML);
  });
});

equalsButton.addEventListener("click", () => {
  compute();
  updateDisplay();
});

deleteButton.addEventListener("click", () => {
  current = current.toString().slice(0, -1);
  updateDisplay();
});

changeSign.addEventListener("click", () => {
  if (current === "") return;
  current = convertNumber(Number(current));
  updateDisplay();
});

percent.addEventListener("click", () => {
  if (current == "") return;
  current = current / 100;
  updateDisplay();
});

// calculator functions =====
function convertNumber(number) {
  if (number === Math.abs(number)) {
    return Math.abs(number) * -1;
  }

  if (number === Math.abs(number) * -1) {
    return Math.abs(number);
  }
}

function clear() {
  previous = "";
  current = "";
  operator = undefined;
  updateDisplay(current);
}

function updateDisplay() {
  currentOperandTextElement.innerHTML = current;
  if (operator !== undefined) {
    preveiousOperandTextElement.innerHTML = `${previous} ${operator}`;
  } else {
    preveiousOperandTextElement.innerHTML = previous;
  }
}

function chooseOperator(operation) {
  if (current === "") return;
  if (previous !== "") compute();
  console.log(operation);
  operator = operation;
  previous = current;
  current = "";
  updateDisplay();
}

function appendNumber(number) {
  if (number === "." && current.includes(".")) return;
  current = current.toString() + number.toString();
  updateDisplay();
}

function compute() {
  let result;
  let prev = parseFloat(previous);
  let curr = parseFloat(current);

  if (isNaN(prev) || isNaN(curr)) return;

  switch (operator) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "x":
      result = prev * curr;
      break;
    case "÷":
      result = prev / curr;
      break;
    case "%":
      result = prev % curr;
      break;
    default:
      return;
  }

  current = result;
  previous = "";
  operator = undefined;
  updateDisplay();
}
