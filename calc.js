
//ROBERT MEYER

"use strict";

// initialize basic variables for all operations
let previousOperand = 0;
let currentOperand = 0;
let operator = "";

const displaySubTotal = document.getElementById("subtotal");
console.log(displaySubTotal);
const displayMain = document.getElementById("main-display");
console.log(displayMain);


// initialize event listeners for buttons:
const buttons = Array.from(document.querySelectorAll("button"));
buttons.forEach(button => {
    button.addEventListener("click", (e) => {

        e.preventDefault;
        let btnValue = e.target.innerText;
        console.log(btnValue);

        // handle events based on which button was clicked
        // if button was a number 
        if(! isNaN(btnValue)) {
            appendDigit(btnValue);
            return;
        }

        // if button was not a number
        switch(btnValue) {
            case "AC":
                console.log("Calling allClear()");
                allClear();
                break;

            case "+":
                previousOperand = currentOperand;
                setOperator(btnValue);
                break;
            
            case "-":
                previousOperand = currentOperand;
                setOperator(btnValue);
                break;
            
            case "x":
                previousOperand = currentOperand;
                setOperator(btnValue);
                break;

            case "/":
                previousOperand = currentOperand;
                setOperator(btnValue);
                break;

            case "=":
                if (currentOperand != undefined && previousOperand != undefined && operator != "") {
                    try {
                        console.log(`Calling operate: ${previousOperand} ${operator} ${currentOperand}`);
                        let result = operate(parseFloat(previousOperand), operator, parseFloat(currentOperand));
                        updateDisplay("", result);
                        break;
                    } catch (error) {
                        alert(error);
                        break;
                    }
                    
                } else {
                    console.log("Operation not possible:");
                    console.log(`previousOperand: ${previousOperand}`);
                    console.log(`Operator: ${operator}`);
                    console.log(`currentOperand: ${currentOperand}`);
                    break;
                }
                

        }

    });
});

// APP LOGIC BELOW:

function setOperator(btnValue) {
    console.log(`Set operator to ${btnValue}`);
    operator = btnValue;

    previousOperand = displayMain.innerText;
    currentOperand = 0;
    updateDisplay(previousOperand.toString() + btnValue, currentOperand.toString());
}

function appendDigit(digit) {
    console.log(`Digit ${digit} appended.`);
    currentOperand = parseFloat(displayMain.innerText.toString() + digit);
    console.log(`Setting currentOperand to ${currentOperand}.`);
    updateDisplay(undefined, currentOperand);
}

function updateDisplay(previous, current) {
    // update display for the previous and/or current operand (whichever is passed in as parameter)
    if (previous != undefined) {
        displaySubTotal.innerText = previous.toString();
    }

    if(current != undefined) {
        displayMain.innerText = current.toString();
    }
}

function allClear() {
    previousOperand = 0;
    currentOperand = 0;
    operator = "";
    updateDisplay(previousOperand, currentOperand);
}

// main function of the app
function operate(operand1, operation, operand2) {
    switch(operation) {
        case "+":
            return add(operand1, operand2);
            break;
        case "-":
            return subtract(operand1, operand2);
            break;
        case "x":
            return multiply(operand1, operand2);
            break;
        case "/":
            if (operand2 != 0) {
                return divide(operand1, operand2);
                break;    
            } else {
                return new Error("Cannot divide by 0.");
                break;
            }
    }
}


// functions for individual mathematical operations
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