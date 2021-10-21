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
function takeValues(val) {
  if (/[0-9]/.test(val)) {
    operand += val;
    calcScreen.innerText = operation.join(' ');
  }

  if (operator.includes(val)) {
    if (operand.length !== 0) {
      operation.push(operand);
      operand = '';
    }
    if (operator.includes(operation.at(-1))) {
      operation.splice(-1, 1, val);
    } else {
      operation.push(val);
    }

    calcScreen.innerText = operation.join(' ');
  }

  if (val === '=') {
    if (operand.length !== 0) {
      operation.push(operand);
      operand = '';
    }
    if (operator.includes(operation.at(-1))) {
      results = '';
    } else {
      results = eval(operation.join(''));
      calcScreen.innerText = operation.join(' ');
      resultScreen.innerText = results;
      operand = '';
      results = '';
      operation = [];
    }
  }

  if (val === 'AC') {
    operand = '';
    operation = [];
    results = '';
    calcScreen.innerText = '0';
    resultScreen.innerText = results;
  }
}
