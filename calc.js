
//LENI MEYER
//ROBERT MEYER

"use strict";

// initialize basic variables and constants for all operations
const DEC_SEPARATOR =".";

// define Calculator class
class Calculator {

    constructor(previousOperandTextElement, currentOperandTextElement) {
        
        // connect display elements from the page to the object
        this.previousOperandDisplay = previousOperandTextElement;
        this.currentOperandDisplay = currentOperandTextElement;

        this.allClear();
    }

    updateDisplay() {
       if (this.previousOperand != undefined) {
            this.previousOperandDisplay.innerText = this.previousOperand;
       }
       
       if (this.operator != "" && this.operator != undefined) {
            this.previousOperandDisplay.innerText += ` ${this.operator}`;
       }

       if (this.currentOperand != undefined) {
            this.currentOperandDisplay.innerText = this.currentOperand;
        } else {
            this.currentOperandDisplay.innerText = "0";
        }
       
    }

    setOperator(btnValue) {

        if (this.currentOperand === "" || this.currentOperand === undefined) return;
        if (this.previousOperandDisplay.innerText !== "0" && this.previousOperandDisplay.innerText !== "") {
            this.operate();
        }
        this.operator = btnValue;
        console.log(`Set operator to ${btnValue}`);

        if (this.result != undefined) {
            this.previousOperand = this.result;
            this.currentOperand = undefined;
            console.log(`Set previousOperand to ${this.previousOperand}.`);
            this.updateDisplay();
            return;
        }

        if (this.currentOperand != undefined) {
            this.previousOperand = this.currentOperand;
            this.currentOperand = undefined;
        }
        
        this.updateDisplay();
    }

    del() {    
        // store everything except the last character of the display.innerText in the currentOperand, then updateDisplay
        if (this.currentOperandDisplay.innerText.length < 2) {
            this.currentOperand = 0;
        } else {
            this.currentOperand = parseFloat(this.currentOperandDisplay.innerText.substring(0, this.currentOperand.toString().length - 1));
        }

        this.updateDisplay();
    }

    allClear() {
        this.previousOperand = 0;
        this.currentOperand = 0;
        this.operator = undefined;
        this.result = undefined;
        this.updateDisplay();
    }

    appendDigit(digit) {
        // if the display is 0 or empty, just use the entered digit as currentOperand
        if (this.currentOperand === 0 || this.currentOperand === undefined) {
            this.currentOperand = parseInt(digit);
            this.updateDisplay();
            return;
        }

        // otherwise, we append the selected digit, then update the Display
        this.currentOperand = parseFloat(this.currentOperandDisplay.innerText + digit.toString());
        this.updateDisplay();
        
    }

    appendComma() {
        console.log("appending comma");

        // if the display is 0 or empty, just set display to "0."
        if(this.currentOperand === 0 || this.currentOperand === undefined) {
            this.currentOperandDisplay = "0."
            return;
        }

        // if the display doesn't contain a comma, we append it to the display
        if ((! this.currentOperandDisplay.innerText.includes(".")) && (! this.currentOperandDisplay.innerText.includes(","))) {
            this.currentOperandDisplay.innerText = this.currentOperandDisplay.innerText + DEC_SEPARATOR;            
            return;
        }
    }

    operate() {

        switch(this.operator) {
            case "+":
                this.result = this.previousOperand + this.currentOperand;
                break;
            case "-":
                this.result = this.previousOperand - this.currentOperand;
                break;
            case "x":
                this.result = this.previousOperand * this.currentOperand;
                break;
            case "/":
                if (this.currentOperand != 0) {
                    this.result = this.previousOperand / this.currentOperand;
                    break;    
                } else {
                    return new Error("Cannot divide by 0.");
                    break;
                }
            default:
                break;
        }

        
        this.currentOperand = this.result;
        this.updateDisplay();
        this.operator = "";
    }

}


const displaySubTotal = document.getElementById("subtotal");
console.log(displaySubTotal);
const displayMain = document.getElementById("main-display");
console.log(displayMain);

// initialize Calculator object
const calc = new Calculator(displaySubTotal, displayMain);

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
            calc.appendDigit(btnValue);
            return;
        }

        // if button was not a number
        switch(btnValue) {
            case "AC":
                console.log("Calling allClear()");
                calc.allClear();
                break;

            case "D":
                console.log("Calling del()");
                calc.del();
                break;

            case ".":
                calc.appendComma();
                break;

            case ",":
                calc.appendComma();
                break;

            case "+":    
                calc.setOperator(btnValue);
                break;
            
            case "-":
                calc.setOperator(btnValue);
                break;
            
            case "x":
                calc.setOperator(btnValue);
                break;

            case "/":
                calc.setOperator(btnValue);
                break;

            case "=":
                if (calc.currentOperand != undefined && calc.previousOperand != undefined && calc.operator != "") {
                    try {
                        console.log(`Calling operate: ${calc.previousOperand} ${calc.operator} ${calc.currentOperand}`);
                        calc.operate();
                        break;
                    } catch (error) {
                        alert(error);
                        break;
                    }
                    
                } else {
                    console.log("Operation not possible:");
                    console.log(`previousOperand: ${calc.previousOperand}`);
                    console.log(`Operator: ${calc.operator}`);
                    console.log(`currentOperand: ${calc.currentOperand}`);
                    break;
                }
                
        }

    });
});

// initialize event listeners for keyboard:
document.addEventListener("keyup", (e) => {
    console.log(e.key + " - " + e.keyCode);

    if (e.key === "Escape") calc.allClear();

    // a number key was pressed, append the digit
    if (! isNaN(e.key)) {
        calc.appendDigit(e.key);
        return;
    }

    // otherwise, treat the key press accordingly
    switch(e.key) {
        case ",":
            calc.appendComma();
            break;
        case "Enter":
            calc.operate();
            break;
        case "Delete":
            if (e.shiftKey) {
                calc.allClear();
                break;
            } else {
                calc.del();
                break;
            }
        case "+":
            calc.setOperator("+");
            break;
        case "-":
            calc.setOperator("-");
            break;
        case "*":
            calc.setOperator("x");
            break;
        case "/":
            calc.setOperator("/");
            break;
        default:
            break;
    }
});