updateDisplay() {
        if (this.result != undefined) {
        // if an operation has already taken place before

            if (this.currentOperand != undefined) {
            // after one calculation 
                this.previousOperandDisplay.innerText = 
                `${this.previousOperand} ${this.operator} ${this.currentOperand} =`;

                this.currentOperandDisplay.innerText = this.result.toString();

            } else {
            // before the next calculation (currentOperand yet to be typed in)
                this.previousOperandDisplay.innerText = 
                `${this.previousOperand} ${this.operator}`;

                this.currentOperandDisplay.innerText = "0";
            }
            
        } else {

            // if nothing has been calculated so far
            if (this.previousOperand != undefined && this.previousOperand != 0) {
                this.previousOperandDisplay.innerText = this.previousOperand.toString();
            } else {
                this.previousOperandDisplay.innerText = "";
            }

            if (this.operator != "") {
                this.previousOperandDisplay.innerText += ` ${this.operator}`;
            }

            if(this.currentOperand != undefined) {
                this.currentOperandDisplay.innerText = this.currentOperand.toString();
            } else {
                this.currentOperandDisplay.innerText = "0";
            }

        }
    }