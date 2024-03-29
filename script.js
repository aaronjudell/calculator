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
let solution = 0;
let sign = '+';
let equals = false;

function operate(firstNum, secondNum, operator) {
    switch (operator) {
        case '+':
            return add(firstNum, secondNum);
            break;
        case '-':
            return subtract(firstNum, secondNum);
            break;
        case 'x':
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
const body = document.body;

keys.forEach(key => {
    key.addEventListener('click', () => {
        updateDisplay(key.textContent);
    });
});

body.addEventListener('keydown', (e) => {
    const keyPressed = e.key;
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', 'x', '*', '/', 'c', 'C', '=', 'Backspace', 'Enter'];
    if (!allowedKeys.includes(keyPressed)) {
        e.preventDefault();
        return;
    }

    if (e.target.matches('button') && keyPressed === 'Enter') {
        e.preventDefault();
        updateDisplay(keyPressed);
        return;
    }
    updateDisplay(keyPressed);
});

function updateDisplay(input) {
    switch (input) {
        case '+':
            if (operator != 0 && !equals) {
                makeSecondNum();
                displayResult(firstNum, secondNum, operator);
                firstNum = solution;
                operator = '+'
                equals = true;
            }
            else if (equals) {
                operator = '+';
            }
            else {
            operator = '+';
            makeFirstNum();
            }
            break;
        case '-':
            if (operator != 0 && !equals) {
                makeSecondNum();
                displayResult(firstNum, secondNum, operator);
                firstNum = solution;
                operator = '-';
                equals = true;
            }
            else if (equals) {
                operator = '-';
            }
            else {
            operator = '-';
            makeFirstNum();
            }
            break;
        case 'x':
        case '*':
            if (operator != 0 && !equals) {
                makeSecondNum();
                displayResult(firstNum, secondNum, operator);
                firstNum = solution;
                operator = 'x';
                equals = true;
            }
            else if (equals) {
                operator = 'x';
            }
            else {
            operator = 'x';
            makeFirstNum();
            }
            break;
        case '/':
            if (operator != 0 && !equals) {
                makeSecondNum();
                displayResult(firstNum, secondNum, operator);
                firstNum = solution;
                operator = '/'
            }
            else if (equals) {
                operator = '/';
            }
            else {
            operator = '/';
            makeFirstNum();
            }
            break;
        case 'C':
        case 'c':
            clear();
            break;
        case '+/-':
            changeSign();
            break;
        case 'CE':
            clearEntry();
            break;
        case '<-':
        case 'Backspace':
            backspace();
            break;
        case '=':
        case 'Enter':
            makeSecondNum();
            displayResult(firstNum, secondNum, operator);
            equals = true;
            break;
        case '.':
            decimal();
            equals = false;
            break;
        default:
            if (solution != 0) {
                solution = 0;
                display.innerText = solution;
            }
            if (display.innerText !== '0' && display.innerText !== '-0') {
                display.innerText += input;
                break;
            }
            else if (display.innerText == '-0') {
                    display.innerText = '-' + input;
                }
            else {
                display.innerText = input;
            }
            equals = false;
            break;
    }
}

function decimal() {
    if (solution != 0) {
        solution = 0;
        display.innerText = solution + '.';
    }
    let string = display.innerText;
    if (string.includes('.')) {
        return;
    }
    display.innerText += '.';
}

function clear() {
    operator = 0;
    firstNum = 0;
    secondNum = 0;
    solution = 0;
    sign = '+';
    display.innerText = '0';
}

function clearEntry() {
    if (solution != 0) {
        return;
    }
    else {
        sign = '+';
        display.innerText = '0';
    }
}

function backspace() {
    if (solution != 0) {
        return;
    }
    let string = display.innerText;
    if (string.length > 1 && string != '0') {
        display.innerText = string.slice(0, -1);
    }
    else if (string.length = 1 && string != '0') {
        display.innerText = '0';
    }
}

function changeSign() {
    if (equals) {
        return;
    }
    let string = display.innerText;
    if (sign === '+') {
        display.innerText = '-' + string;
        sign = '-';
    }
    else {
        display.innerText = string.slice(1);
        sign = '+';
    }
}

function makeFirstNum() {
    if (firstNum != 0) {
        makeSecondNum();
        displayResult(firstNum, secondNum, operator);
        return;
    }
    firstNum = parseFloat(display.innerText);
    display.innerText = '0';
    sign = '+';
}

function makeSecondNum() {
    if (equals) {
        return;
    }
    secondNum = parseFloat(display.innerText);
    sign = '+';
}

function displayResult(a, b, operator) {
    solution = operate(a, b, operator);
    display.innerText = parseFloat(solution.toFixed(4));
    sign = '+';
    if (display.innerText.length > 14) {
        display.innerText = 'Too LONG!';
        solution = 'long';
        firstNum = 0;
        secondNum = 0;
    }
    else {
    firstNum = parseFloat(solution);
    }
}