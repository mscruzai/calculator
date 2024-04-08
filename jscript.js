
let firstNumer;
let operator;
let secondNumber;

function add(a, b) {
    return a + b;
}

function substract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide (a, b) {
    return a/b;
}

function operate(a, b, operator) {
    
    switch (operator) {
        case '+': return add(a,b)
        case '-': return substract(a,b)
        case '*': return multiply(a,b)
        case '÷':
            if(b == 0) return Infinity;
            else return divide(a,b);
        default: return null;
    }

}