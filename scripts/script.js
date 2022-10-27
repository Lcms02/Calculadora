// seleção dos elementos
const previousOperationText = document.querySelector('#previous-operation');
const currentOperationText = document.querySelector('#current-operation');
const buttons = document.querySelectorAll('#buttons-container button');

// lógica da calculadora
class Calculator{
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    // Add digit do display
    addDigit(digit){
        // Verifica se o dígito é um ponto e se já existe um ponto no display
        if(digit === "." && this.currentOperationText.innerText.includes(".")){
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

    // Operaçoes
    processOperation(operation){
        
        // Chega se o current value esta vazio
        if(this.currentOperationText.innerText === "" && operation !="C"){
            // muda a operação
            if(this.previousOperationText.innerText != ""){
                this.changeOperation(operation);    
            }
            return;
        }

        //valor atura e anterior
        let operationValue
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation){
            case '+':
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous); 
                break;
            case '-':
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous); 
                break;
            case '/':
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous); 
                break;
            case 'x':
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous); 
                break;
            case 'DEL':
                this.processDelete();
                break;
                case 'CE':
                this.processClearCurrentOperation();
                break;
                case 'C':
                this.processClearAll();
                break;
                case '=':
                this.processEqual();
                break;
            default: 
                return;
        }
    }

    // Atualiza o display
    updateScreen(
        operationValue = null, 
        operation = null, 
        current = null,
        previous = null
        ){

        if(operationValue === null){
            this.currentOperationText.innerText += this.currentOperation;
        } else{
            //se valor for 0 add current value  
            if(previous === 0){
                operationValue = current;
            }

            //Add current value para previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";    
        }
    }

    //muda a operação
    changeOperation(operation){

        const mathOperations = ['+', '-', '/', 'x'];

        if(!mathOperations.includes(operation)){
            return;
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;

    }

    //processa o delete
    processDelete(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    processClearCurrentOperation(){
        this.currentOperationText.innerText = "";
    }

    processClearAll(){
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    processEqual(){

        const operation = previousOperationText.innerText.split(" ")[1];

        this.processOperation(operation);

    }

}

const calc = new Calculator(previousOperationText, currentOperationText);

// eventos
buttons.forEach((btn) =>{
    btn.addEventListener('click', (e) =>{

        const value = e.target.innerText;

        if(+value >=0 || value === "."){
            calc.addDigit(value);
        }else {
            calc.processOperation(value);
        }
    });
});  