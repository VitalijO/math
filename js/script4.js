

    function debounce(callback, delay) {
      let timeout;
      return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => callback.apply(this, args), delay);
      };
    }
   

    const App={
      exercises : document.querySelector(".exercises"),
      resetButton : document.querySelector(".reset"),
      taskQuantitySelect : document.getElementById("task-quantity"),
      numberRangeSelect :  document.getElementById("number-range") ,
      
      calcWraps:  null,
      quantity : null,
      maxSum : null,
      
       operators : ["+", "-"] ,

 
    
       addEventListeners(){
        this.taskQuantitySelect.addEventListener("change", () => {
          this.quantity = parseInt(this.taskQuantitySelect.value);
          this.regenerateExercises();
        });
    
        this.numberRangeSelect.addEventListener("change", () => {
          this.maxSum = parseInt(this.numberRangeSelect.value);
          this.regenerateExercises();
        });
    
        this.resetButton.addEventListener("click", () => location.reload());
    
        this.exercises.addEventListener("click", (e) => this.handleExerciseCheckout(e));
        
        document.addEventListener("click", (e) => {
          let activeInput= null;
          const calcWraps = document.querySelectorAll(".calc-wrap");
          const debouncedInput = debounce((input, value) => {
            input.value += value;
          }, 150); 
        
          calcWraps.forEach((wrap) => {
            const input = wrap.querySelector(".answer");  
            const okButton = wrap.querySelector(".button-ok");  
            const clearButton = wrap.querySelector(".button-cancel");
        
            const isClickInside = wrap.contains(e.target);  
            wrap.classList.toggle("active", isClickInside);
        
            if (isClickInside) {
              activeInput = input;
            }
               
            if (e.target === okButton && activeInput) { 
                wrap.classList.remove("active");  
                activeInput = null;  
            }
        
            if (e.target === clearButton && activeInput) {
              activeInput.value = activeInput.value.slice(0, -1); 
            }
        
            if (e.target.classList.contains("button-input") && activeInput) {
              const value = e.target.textContent;
              debouncedInput(activeInput, value);
            }
            
          });
        });
        

       },
    
       createExercises() {
        this.exercises.innerHTML = "";
        const items = [];
    
        for (let i = 0; i < this.quantity; i++) {
          const randomOperator =
            this.operators[Math.floor(Math.random() * this.operators.length)];
          const numbers =
            randomOperator === "+"
              ? this.generateSumNumbers()
              : this.generateDifferenceNumbers();
    
          const number1 = numbers[0];
          const number2 = numbers[1];
    
          const item = document.createElement("li");
          item.className = "exercise-items";
          item.innerHTML = `
            <span class="first-number">${number1}</span>
            <span class="operator">${randomOperator}</span>
            <span class="second-number">${number2}</span>
            <span class="equal-sign">=</span>
            <div class="calc-wrap">
              <input class="answer" readonly />
              ${this.createCalculatorMarkup()}
            </div>
            <button class="button-check">Check</button>
          `;
    
          items.push(item);
        }
    
        this.exercises.append(...items);
      },
    
      regenerateExercises() {
        this.createExercises();
      },
    
        // HTML калькулятора
        createCalculatorMarkup() {
          let buttons ="";
          for (let i = 0; i < 10; i++) {
         
            buttons += `<button class="button-input">${i}</button>`;

          }
          return `
            <div class="calculator">${buttons}<button class="button-cancel">C</button><button class="button-ok">Ok</button>
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
          script.src = "../js/animation1.js";
          script.type = "module";
          document.body.appendChild(script);
    
          setTimeout(() => {
            location.reload(); 
             
      
          }, 10000);
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
        const num2 = Math.floor(Math.random() * ( num1 + 1));
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
    
       init() {
    
    
        this.quantity = parseInt(this.taskQuantitySelect.value);
        this.maxSum = parseInt(this.numberRangeSelect.value);
    
         // Додати слухачі подій
         this.addEventListeners();
        
        // Згенерувати початкові приклади
        this.createExercises();
    
      },
    }

    App.init();










   