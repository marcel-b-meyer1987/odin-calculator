
//ROBERT MEYER

"use strict";

// initialize basic variables for all operations
let operand1 = 0;
let operand2 = 0;
let operator = "";


// main function of the app
function operate(operand1, operation, operand2) {
    switch(operation) {
        case "+":
            return add(operand1, operand2);
            break;
        case "-":
            return subtract(operand1, operand2);
            break;
        case "*":
            return multiply(operand1, operand2);
            break;
        case "/":
            return divide(operand1, operand2);
            break;
    }
}


// functions for indivicual mathematical operations
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0) return
    return a / b;
}