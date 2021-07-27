//global variables
let operator = '';
let firstValue = '';
let secondValue= '';
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
    if(isNaN(element1) && isNaN(element2)){
        return 0;
    }
    else if(isNaN(element2)){
        return element1;
    }
    else if(isNaN(element1)){
        return 0;
    }
    else{
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
    
}

const displayValue = function(value){
    
    display.innerHTML= '';
    display.textContent = value;
       
}

const clearCalculator = function(){
    firstValue = '';
    secondValue = '';
    currentValue = '';
    operator = '';
    displayValue('0');
}


const appendValueToVariable = function(value){
    if(firstValue == ''){
        firstValue = value;
    }
    else if(operator != ''){
        secondValue = value;
    }
}



const getResult = function(){
    res = operate(operator, parseFloat(firstValue), parseFloat(secondValue));
    currentValue = res.toString();


    if(res === Infinity){
        displayValue('ERROR divided by 0');
        return;
    }else if(!Number.isInteger(res)){
        displayValue(currentValue.toFixed(2))
    }
    else{
        displayValue(currentValue);
    }
    
    firstValue = res.toString();
    operator = '';
    secondValue = '';

    
}

const deleteLastCharacter = function(){
    if(currentValue === ''){
        currentValue = '0';
    }
    else if(currentValue === firstValue){
        currentValue = currentValue.slice(0, -1);
        firstValue = currentValue;
    }
    else{
        currentValue = currentValue.slice(0, -1);
    }
}


// events

const display = document.querySelector('.display');


//digits buttons handler
const buttonsDigits = document.querySelectorAll('.buttons-digits');


buttonsDigits.forEach(button => {
    button.addEventListener('click', (e)=>{
        if(e.target.id =='.' && currentValue == ''){
            //appended up to only 17 characters
            if(currentValue.length < 17){
                currentValue += 0
                currentValue += e.target.id;
            }    
        }
        else{
            if(currentValue.length < 17){
                currentValue += e.target.id;
                displayValue(currentValue);
            }  
        }
    });
});


//operator buttons handler
const buttonsOperator = document.querySelectorAll('.buttons-operator');

buttonsOperator.forEach(button => {
    button.addEventListener('click',(e)=>{  
        //Asign value of current value to firstValue or secondValue
        appendValueToVariable(currentValue); 
        
        if(secondValue != '0'){
            getResult();
        }        

        operator = e.target.id;
        currentValue = ''; 
        
    })
});

//equal button handler
const equal = document.getElementById('equals');

equal.addEventListener('click', ()=>{
    //Asign value of current value to secondValue
    appendValueToVariable(currentValue);
    getResult();
})


//clear button handler
const clear = document.getElementById('clear');

clear.addEventListener('click', clearCalculator);


//delete button handler
const deleteButton = document.getElementById('delete');

deleteButton.addEventListener('click', ()=>{
    deleteLastCharacter();
    displayValue(currentValue);
})



//keyboard supoort

document.addEventListener('keydown', (e)=>{
    buttonsDigits.forEach(element => {
        if(e.key === element.id){
            if(e.key === '.' && currentValue == ''){
                //appended up to only 17 characters
                if(currentValue.length < 17){
                    currentValue += 0
                    currentValue += e.key;
                }    
            }
            else{
                if(currentValue.length < 17){
                    currentValue += e.key;
                    displayValue(currentValue);
                }  
            }  
        }
    });

    buttonsOperator.forEach(element => {
        if(e.key === element.id){
             //Asign value of current value to firstValue or secondValue
            appendValueToVariable(currentValue); 
        
            if(secondValue != '0'){
                getResult();
            }        
            operator = e.key;
            currentValue = ''; 
        }
    });


    //if you press the equal, evaluate the operation
    if(e.key === '='){
        //Asign value of current value to secondValue
        appendValueToVariable(currentValue);
        getResult();
    }
   

    //if you press the backspace key, delete the last character
    if(e.key === 'Backspace'){
        deleteLastCharacter();
        displayValue(currentValue); 
    }

});


