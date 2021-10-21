// onclick function that takes the value as parameter
// when number is clicked concatenate until the value is an operator
// store operator and then wait for another set of value
// if operator or . or = is followed after opertaor do nothing
// if number, concatenate to a new var
// then when = is clicked perform operation

const calcScreen = document.querySelector('.calculation > .number');
const resultScreen = document.querySelector('.result > .number');

let operand = '';
let operation = [];
let operator = ['+', '-', '*', '/'];
let results = '';

// take values
function takeValues(self) {
  let val = self.children[0].dataset.value;
  animateBtn(self);

  if (/[0-9]/.test(val)) {
    operand += val;
    if (operation.length === 0) {
      calcScreen.innerText = operand;
    } else {
      if (operator.includes(calcScreen.innerText.slice(-1))) {
        calcScreen.innerText = calcScreen.innerText + ' ' + val;
      } else {
        calcScreen.innerText += val;
      }
    }
  }

  if (operator.includes(val)) {
    calcOperation(val);
  }

  if (val === '=') {
    getResults();
  }

  if (val === 'AC') {
    clearScreen();
  }

  if (val === '.') {
    ifPeriod(val);
  }
}

// Functions
function animateBtn(self) {
  self.classList.add('animate');
  self.classList.add('resetappearanim');
  self.addEventListener('animationend', function () {
    this.classList.remove('animate');
  });
}

function calcOperation(val) {
  if (operand.length !== 0) {
    operation.push(operand);
    operand = '';
    calcScreen.innerText = operation.join(' ');

    if (operator.includes(operation.at(-1))) {
      operation.splice(-1, 1, val);
      calcScreen.innerText = operation.join(' ');
    } else {
      operation.push(val);
      calcScreen.innerText = operation.join(' ');
    }
  } else {
    if (val === '-') {
      operand += val;
      calcScreen.innerText = operand;
    }
  }
}

function getResults() {
  if (operand.length !== 0) {
    operation.push(operand);
    operand = '';
  }
  if (operator.includes(operation.at(-1))) {
    results = '';
  } else {
    results = eval(operation.join(''));
    calcScreen.innerText = operation.join(' ');
    resultScreen.innerText = Number(results).toFixed(2);
    operand = '';
    results = '';
    operation = [];
  }
}

function clearScreen() {
  operand = '';
  operation = [];
  results = '';
  calcScreen.innerText = '0';
  resultScreen.innerText = results;
}

function ifPeriod(val) {
  if (operand.length !== 0) {
    if (!operand.includes(val)) {
      operand += val;
      calcScreen.innerText = operand;
    }
  }
}
