//global variables
let operator = '0';
let firstValue = '0';
let secondValue= '0';
let currentValue = '';

//functions

const add = function(element1, element2){
    return element1 + element2;
}

const subtract = function(element1, element2){
    return element1 - element2;
}


const divide = function(element1, element2){
    return element1 / element2;
}

const multiply = function(element1, element2){
    return element1 * element2;
}


const operate = function(operator, element1, element2){

    switch(operator){
        case '*':
            return multiply(element1,element2);
        case '/':
            return divide(element1, element2);
        case '+':
            return add(element1, element2);
        case '-':
            return subtract(element1, element2);
    }
}

const displayValue = function(value){
    display.innerHTML= '';
    display.textContent = value;
}

const appendValueToVariable = function(value){
    if(firstValue == 0){
        firstValue = value;
    }
    else if(operator != ''){
        secondValue = value;
    }
}



const getResult = function(){
    res = operate(operator, parseFloat(firstValue), parseFloat(secondValue));
    currentValue = res;
    firstValue = res;
    displayValue(currentValue);
}


// events
const buttonsDigits = document.querySelectorAll('.buttons-digits');


buttonsDigits.forEach(button => {
    button.addEventListener('click', (e)=>{
       currentValue += e.target.id;
       displayValue(currentValue);
    });
});


const display = document.querySelector('.display');
const buttonsOperator = document.querySelectorAll('.buttons-operator');


buttonsOperator.forEach(button => {
    button.addEventListener('click',(e)=>{  
        //Asign value of current value to firstValue
        appendValueToVariable(currentValue); 
        if(secondValue != '0'){
            getResult();
        }        
        operator = e.target.id;
        currentValue = ''; 

        
    })
});

const equal = document.getElementById('equals');

equal.addEventListener('click',(e)=>{
    
    if(firstValue == '0' || operator == ''){
        displayValue(currentValue);
        
    }
    else{ 
        //Asign value of current value to secondValue
        appendValueToVariable(currentValue);
        getResult();
        operator = '';
    }

    
})


