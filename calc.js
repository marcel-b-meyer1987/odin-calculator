
//ROBERT MEYER
//ROBERT MEYER

"use strict";

// initialize basic variables for all operations
let previousOperand = 0;
let currentOperand = 0;
let operator = "";
let segments = [];
let result = undefined;

const displaySubTotal = document.getElementById("subtotal");
console.log(displaySubTotal);
const displayMain = document.getElementById("main-display");
console.log(displayMain);

// initialize displays
updateDisplay(0, 0);


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
                        result = operate(parseFloat(previousOperand), operator, parseFloat(currentOperand));
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
    operator = btnValue;
    console.log(`Set operator to ${btnValue}`);

    if (result != undefined) {
        previousOperand = result;
        currentOperand = undefined;
        console.log(`Set previousOperand to ${previousOperand}.`);
        updateDisplay(undefined, `${previousOperand} ${operator}`);
        return;
    }
       
    updateDisplay(undefined, `${currentOperand} ${operator}`);

    // previousOperand = currentOperand;
    // currentOperand = 0;
}

function appendDigit(digit) {

    // if the display is 0 or empty, just use the entered digit as currentOperand
    if(currentOperand === 0) {
        currentOperand = digit;
        updateDisplay(undefined, currentOperand);
        return;
    }

    // if the display contains only a number, it means the user is not finshed entering the digits,
    // in which case we just need to append the last digit and update the display with the complete operand
    if (! isNaN(displayMain.innerText)) {
        console.log(`Digit ${digit} appended.`);
        currentOperand = parseFloat(displayMain.innerText.toString() + digit.toString());
        console.log(`Setting currentOperand to ${currentOperand}.`);
        updateDisplay(undefined, currentOperand);
        return;
    } else {

        // else, this means that the user has already entered an operater (+, -, x or /),
        // in that case we have to:
        // 1. parse the display.innerText into display segments: 1) the 1st operand and 2) the 2nd operand (if any) - splitting with the operator
        // 2. store the operand (=the 1st segment) in the previousOperand variable, parsing it as float first
        // 3. append the entered digit to the 2nd operand, then store the same in the currentOperand variable after parsing it as float
        // 4. updating the display with 1) previousOperand - operator - currentOperand
        segments = displayMain.innerText.split(operator);
        console.log(segments);

        previousOperand = parseFloat(segments[0]);
        console.log(`previousOperand: ${previousOperand}`);

        if (segments[1] != "") {
            currentOperand = parseFloat(segments[1].toString() + digit.toString());
        } else {
            currentOperand = parseFloat(digit);
        }
        console.log(`currentOperand: ${currentOperand}`);

        updateDisplay(undefined, `${previousOperand} ${operator} ${currentOperand}`);
    }
}

function updateDisplay(previous, current) {
    // update display for the previous and/or current operand (whichever is passed in as parameter)
    if (previous != undefined && previous != 0) {
        displaySubTotal.innerText = previous.toString();
    } else {
        displaySubTotal.innerText = "";
    }

    if(current != undefined) {
        displayMain.innerText = current.toString();
    }
}

function allClear() {
    previousOperand = undefined;
    currentOperand = undefined;
    operator = "";
    result = undefined;
    updateDisplay("", currentOperand);
}

// main function of the app
function operate(operand1, operation, operand2) {

    let result;

    switch(operation) {
        case "+":
            result = add(operand1, operand2);
            break;
        case "-":
            result = subtract(operand1, operand2);
            break;
        case "x":
            result = multiply(operand1, operand2);
            break;
        case "/":
            if (operand2 != 0) {
                result = divide(operand1, operand2);
                break;    
            } else {
                return new Error("Cannot divide by 0.");
                break;
            }
    }
    operator = "";
    return result;

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