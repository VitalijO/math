const palette =document.querySelector(".palette");
let quantity = 30;
 let quantityCkliked = 0;

palette.addEventListener("click", selectRectangle);

function selectRectangle(e){
    if(e.target.nodeName !=="BUTTON"){
        return;
    }

    const selectedRectangle =e.target;
    const randomColor = getRandomColor();
   
    if( selectedRectangle.style.backgroundColor !== "buttonface"){
        return;
    }
  
    selectedRectangle.style.backgroundColor = randomColor;  
    quantityCkliked ++;

 if(quantityCkliked===quantity){
        resetPalette();  
        return quantityCkliked = 0;
    }
    
}


function getRandomNumber(min, max){
 return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomColor(){
    const r = getRandomNumber(0,255);
    const g = getRandomNumber(0,255);
    const b = getRandomNumber(0,255);
    return `rgb(${r}, ${g}, ${b})`;
}

function getRandomDimensions(){
let dimensions = {}
dimensions.width = getRandomNumber(20, 60);
dimensions.height  =  getRandomNumber(20, 60);
return dimensions;
}

createPaletteRectangles();

function createPaletteRectangles(){
    const items = []; 
    
    for(let i=0; i<quantity; i++){
        const dimensions = getRandomDimensions();
        const item = document.createElement("button");
        item.type = "button";
        item.className = "color-button";
        item.style.width = `${dimensions.width}px`;
        item.style.height = `${dimensions.height}px`;
        item.style.backgroundColor = "buttonface";
        items.push(item);
    }
    
  return palette.append(...items);
}

function resetPalette() {
    const buttons = document.querySelectorAll(".palette .color-button");
    buttons.forEach(button => {
        button.style.backgroundColor = "buttonface";
    });
    
}