const maxScreenLength = 17;
const overflowMessage = "Screen overflow"

let firstNumber;
let operator;
let secondNumber;

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
numDisplay ='0';

let lastOperand = '';
let newOperand = '';
let noFirstDigit = true;
let calcKey = false;

const digitButtons = document.querySelectorAll('[data-type="digit"]');

digitButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(noFirstDigit || numDisplay.textContent == '0' || numDisplay.textContent == overflowMessage ){
            numDisplay.textContent = button.textContent;
            noFirstDigit = false;
            if(calcKey) {
                eqDisplay.textContent = '';
                lastOperand = ''
                calcKey = false;
            }
        }
        else if(numDisplay.textContent.length < maxScreenLength){
            numDisplay.textContent =  numDisplay.textContent + button.textContent;
        }
        else {
            numDisplay.textContent = overflowMessage;
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
                lastOperand = numDisplay.textContent;    
                eqDisplay.textContent = lastOperand + newOperator;
            }
            else {
                newOperand = numDisplay.textContent;
                newOperand = operate(parseFloat(lastOperand), parseFloat(newOperand), operator);
                numDisplay.textContent = newOperand;
                eqDisplay.textContent = newOperand + newOperator;
                lastOperand = newOperand;

            }
            noFirstDigit = true;
        }
        else {
            eqDisplay.textContent = lastOperand + newOperator;
        }
        operator = newOperator;
        calcKey = false;
    });
});

const equalsButton = document.querySelector('#equals');
equalsButton.addEventListener('click', () => {

    let answer;

    if(!calcKey){ // If consecutive equal, retain newOperand for next iteration
        newOperand = numDisplay.textContent; 
    }
    eqDisplay.textContent = lastOperand + operator + newOperand + '=';
    answer = operate(parseFloat(lastOperand), parseFloat(newOperand), operator);
    numDisplay.textContent = answer;
    lastOperand = answer;
    noFirstDigit = true;
    calcKey = true;
});


const backspaceButton = document.querySelector('#backspace');
clearEntryButton.addEventListener('click', () => {
    
    noFirstDigit = true;
    numDisplay.textContent = '0';

});

const clearEntryButton = document.querySelector('#clear-entry');
clearEntryButton.addEventListener('click', () => {
    
    noFirstDigit = true;
    numDisplay.textContent = '0';

});

const clearAllButton = document.querySelector('#clear-all');
clearAllButton.addEventListener('click', () => {
    
    noFirstDigit = true;
    numDisplay.textContent = '0';
    eqDisplay.textContent = '';

    lastOperand = '';
    //newOperand = '';
    calcKey = false;

});