const App = {
  // Властивості для стану
  quantity: 5,
  maxSum: 10,
  operators: ["+", "-"],

  // Метод ініціалізації
  init() {
    // Очистити сторінку
    document.body.innerHTML = this.getInitialMarkup();

    // Посилання на елементи
    this.exercises = document.querySelector(".exercises");
    this.resetButton = document.querySelector(".reset");
    this.taskQuantitySelect = document.getElementById("task-quantity");
    this.numberRangeSelect = document.getElementById("number-range");

    // Додати слухачі подій
    this.addEventListeners();

    // Згенерувати початкові приклади
    this.createExercises();
  },
  





  // HTML калькулятора
  createCalculatorMarkup() {
    let buttons = "";
    for (let i = 0; i < 10; i++) {
      buttons += `<button class="button-input">${i}</button>`;
    }
    return `
      <div class="calculator">
        ${buttons}
        <button class="button-cancel">C</button>
        <button class="button-ok">Ok</button>
      </div>
    `;
  },

  // Обробка натискання "Check"
  handleExerciseCheckout(e) {
    if (!e.target.classList.contains("button-check")) return;

    const exerciseItem = e.target.parentElement;
    const number1 = parseInt(
      exerciseItem.querySelector(".first-number").textContent.trim()
    );
    const operator = exerciseItem.querySelector(".operator").textContent.trim();
    const number2 = parseInt(
      exerciseItem.querySelector(".second-number").textContent.trim()
    );
    const userAnswer = parseInt(
      exerciseItem.querySelector(".answer").value.trim()
    );
    const rightAnswer = this.calculateResult(number1, operator, number2);

    e.target.style.backgroundColor =
      rightAnswer === userAnswer ? "green" : "red";

    this.checkAllAnswers();
  },

  // Перевірка результатів
  checkAllAnswers() {
    const allButtons = document.querySelectorAll(".button-check");
    const allGreen = Array.from(allButtons).every(
      (button) => button.style.backgroundColor === "green"
    );

    if (allGreen) {
      document.body.innerHTML = "";
      const script = document.createElement("script");
      script.src = "/js/animation1.js";
      script.type = "module";
      document.body.appendChild(script);

      setTimeout(() => {
        this.init(); // Перезапуск програми
      }, 3000);
    }
  },

  // Генерація чисел для суми
  generateSumNumbers() {
    const num1 = Math.floor(Math.random() * (this.maxSum + 1));
    const num2 = Math.floor(Math.random() * (this.maxSum - num1 + 1));
    return [num1, num2];
  },

  // Генерація чисел для різниці
  generateDifferenceNumbers() {
    const num1 = Math.floor(Math.random() * (this.maxSum + 1));
    const num2 = Math.floor(Math.random() * (this.maxSum - num1 + 1));
    return [num1, num2];
  },

  // Обчислення результату
  calculateResult(num1, operator, num2) {
    switch (operator) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      default:
        return null;
    }
  },
};
// Запуск програми
App.init();
