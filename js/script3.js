const  exercises = document.querySelector(".exercises");
const resetButton = document.querySelector(".reset");
const taskQuantitySelect = document.getElementById("task-quantity");
let numberRangeSelect =  document.getElementById("number-range") ;
let quantity = parseInt(taskQuantitySelect.value);
let range = parseInt(numberRangeSelect.value);
const operators = ["=", ">", "<"];


taskQuantitySelect.addEventListener("change", ()=>{
    quantity = parseInt(taskQuantitySelect.value); 
    regenerateExercises();
})

numberRangeSelect.addEventListener("change", ()=>{
    range = parseInt(numberRangeSelect.value);
    regenerateExercises();
})


function regenerateExercises(){
    const exercises = document.querySelector(".exercises");
    exercises.innerHTML = "";

    createExercises();
}

resetButton.addEventListener("click", resetPage);

function resetPage() {
    location.reload(); 
}

function createExercises (){
let items = []

for(let i = 0; i<quantity; i++){
    let number1 = Math.floor(Math.random()*range);
    let number2 = Math.floor(Math.random()*range);

   
    const randomOperator = operators[Math.floor(Math.random() * operators.length)];

    const item = document.createElement("li");
    item.className = "exercise-item";

    
    const firstNumber = document.createElement("span");
    firstNumber.className = "first-number"
    firstNumber.textContent = `${number1} `;
    item.appendChild(firstNumber);
    
    const operatorButton = document.createElement("button");
    operatorButton.className="operator";
    operatorButton.textContent = randomOperator;
    item.appendChild(operatorButton);
 
    //item.appendChild(document.createTextNode(` ${number2} `));
    const secondNumber = document.createElement("span");
    secondNumber.className = "second-number"
    secondNumber.textContent = `${number2} `;
    item.appendChild(secondNumber);

    const buttonCheck = document.createElement("button")
    buttonCheck.className="button-check";
    buttonCheck.textContent = "check";
    item.appendChild(buttonCheck);
    items.push(item);
} 
   return exercises.append(...items)
}

createExercises ();

exercises.addEventListener("click", (e) => {
    if (e.target.classList.contains("operator")) { 
        const currentOperator = e.target.textContent;
        e.target.textContent = getNextOperator(currentOperator); 
    }

    if (e.target.classList.contains("button-check")) {
    
        const exerciseItem = e.target.parentElement;

        const number1 = parseInt(exerciseItem.childNodes[0].textContent.trim());
        const operator = exerciseItem.querySelector(".operator").textContent;
        const number2 = parseInt(exerciseItem.childNodes[2].textContent.trim());
     
        const expression = `${number1} ${operator === "=" ? "==" : operator} ${number2}`;
 
        let isCorrect = math.evaluate(expression);
         
        e.target.style.backgroundColor = isCorrect ? "green" : "red";

    }
        
});

function getNextOperator(currentOperator) {
    const operators = ["=", ">", "<"];
    let currentIndex = operators.indexOf(currentOperator);
    let nextIndex = (currentIndex + 1) % operators.length;
    return operators[nextIndex];
}