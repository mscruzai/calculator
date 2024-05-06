const maxScreenLength = 17;
const overflowMessage = "Screen overflow"

let lastOperand = '';
let operator;
let newOperand = '';

function add(a, b) {
    return a + b;
}

function substract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return  a * b;
}

function divide (a, b) {
    return a/b;
}

function operate(a, b, optr) {
    
    switch (optr) {
        case '+': return add(a,b)
        case '-': return substract(a,b)
        case '*': case '×': return multiply(a,b)
        case '÷':
            if(b == 0) return Infinity;
            else return divide(a,b);
        default: return null;
    }

}

const eqDisplay = document.querySelector(".equation-line");
const numDisplay = document.querySelector(".numeric-line");

eqDisplay.textContent = '';
numDisplay.value ='0';

let noFirstDigit = true;
let calcKey = false;
let hasPoint = false;

const digitButtons = document.querySelectorAll('[data-type="digit"]');

digitButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(button.textContent == '.'){
            if(hasPoint){
                return;
            }
            else {
                hasPoint = true;
            }
        }
        if(noFirstDigit || numDisplay.value == '0' || numDisplay.value == overflowMessage ){
            if(button.textContent == '.'){
                numDisplay.value = '0' + '.';
                hasPoint = true;
            }
            else {
                numDisplay.value = button.textContent;
            }
            noFirstDigit = false;
            if(calcKey) {
                eqDisplay.textContent = '';
                lastOperand = ''
                calcKey = false;
            }
        }
        else if(numDisplay.value.length > maxScreenLength){
            numDisplay.value = overflowMessage;
        }
        else {
            numDisplay.value =  numDisplay.value + button.textContent;
        }
    });
});

const operatorButtons = document.querySelectorAll('[data-type="operator"]');

let newOperator;

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        
        newOperator = button.textContent;
        if(!noFirstDigit){
            if(lastOperand ==='') {
                lastOperand = numDisplay.value;    
                eqDisplay.textContent = lastOperand + ' ' +  newOperator;
            }
            else {
                newOperand = numDisplay.value;
                newOperand = operate(parseFloat(lastOperand), parseFloat(newOperand), operator);
                
                answer = newOperand.toString();
                numDisplay.value = (answer.length > maxScreenLength) ? answer.slice(0, maxScreenLength): answer;
                eqDisplay.textContent = newOperand + ' ' + newOperator;
                
                lastOperand = newOperand;

            }
            noFirstDigit = true;
        }
        else {
            eqDisplay.textContent = lastOperand + ' ' + newOperator;
        }
        operator = newOperator;
        calcKey = false;
        hasPoint = false;
    });
});

const equalsButton = document.querySelector('#equals');
equalsButton.addEventListener('click', () => {

    let answer;

    if(!calcKey){ // If consecutive equal, retain newOperand for next iteration
        newOperand = numDisplay.value; 
    }
    eqDisplay.textContent = lastOperand + ' ' + operator + ' ' + newOperand + ' ' + '=';
    answer = operate(parseFloat(lastOperand), parseFloat(newOperand), operator);
   
    // lastOperand = answer; // Should we store the original number?

    if(('' + answer).includes('e') ){
        answer = answer.toPrecision(maxScreenLength -5);
    } else {
        answer = answer.toString();
        answer = (answer.length > maxScreenLength) ?
                answer.slice(0, maxScreenLength): answer;    
    }

    numDisplay.value = answer;
    lastOperand = answer;

    noFirstDigit = true;
    calcKey = true;
    hasPoint = false;
});


const backspaceButton = document.querySelector('#backspace');
backspaceButton.addEventListener('click', () => {
    
    if(calcKey) return;
    let s = numDisplay.value;
    numDisplay.value = (s.length > 1)? s.slice(0,-1): '0';
});

const clearEntryButton = document.querySelector('#clear-entry');
clearEntryButton.addEventListener('click', () => {
    
    noFirstDigit = true;
    numDisplay.value = '0';
    hasPoint = false;

});

const clearAllButton = document.querySelector('#clear-all');
clearAllButton.addEventListener('click', () => {
    
    noFirstDigit = true;
    numDisplay.value = '0';
    eqDisplay.textContent = '';

    lastOperand = '';
    //newOperand = ''; I think no need
    calcKey = false;
    hasPoint = false;

});

const signButton = document.querySelector('#sign');
signButton.addEventListener('click', () => {
    
    numDisplay.value = numDisplay.value * -1;
    
});
