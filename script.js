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
    if (b == 0) {
        return "Cannot Divide by 0";
    }
    return a / b;
}

let firstNum = 0;
let secondNum = 0;
let operator = 0;
let displayNum = 0;

function operate(firstNum, secondNum, operator) {
    switch (operator) {
        case '+':
            return add(firstNum, secondNum);
            break;
        case '-':
            return subtract(firstNum, secondNum);
            break;
        case '*':
            return multiply(firstNum, secondNum);
            break;
        case '/':
            return divide(firstNum, secondNum);
            break;
        default:
            return 'ERROR improper operator chosen';
            break;
    }
}


const keys = document.querySelectorAll('.key');
const display = document.getElementById('display');

keys.forEach(key => {
    key.addEventListener('click', () => {
        updateDisplay(key.textContent);
    });
});

function updateDisplay(input) {
    switch (input) {
        case '+':
            operator = '+';
            makeFirstNum();
            break;
        case '-':
            operator = '-';
            break;
        case 'x':
            operator = 'x';
            break;
        case '/':
            operator = '/';
            break;
        case 'C':
            clear();
            break;
        case '+/-':
            changeSign();
            break;
        case '%':

            break;
        case '<-':
            backspace();
            break;
        case '=':
            calculate(firstNum, secondNum, operator);
            break;
        case '.':
            decimal();
            break;
        default:
            if (display.innerText !== '0') {
                display.innerText += input;
                break;
            }
            display.innerText = input;
            break;
    }
}

function decimal() {
    let string = display.innerText;
    if (string.includes('.')) {
        return;
    }
    display.innerText += '.';
}

function clear() {
    operator = 0;
    firstNum = 0;
    display.innerText = '0';
}

function backspace() {
    let string = display.innerText;
    if (string.length > 1 && string != '0') {
        display.innerText = string.slice(0, -1);
    }
    else if (string.length = 1 && string != '0') {
        display.innerText = '0';
    }
}

function makeFirstNum() {
    firstNum = parseFloat(display.innerText);
    display.innerText = '0';
}