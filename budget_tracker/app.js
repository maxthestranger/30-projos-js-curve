const transForm = document.querySelector('form');
const inputDivs = document.querySelectorAll('input');
const date = new Date();
const [month, day, year] = [date.getMonth(), date.getDay(), date.getFullYear()];
const [hour, minute, second] = [
  date.getHours(),
  date.getMinutes(),
  date.getSeconds(),
];

const table = document.querySelector('.table');

const expenseDiv = document.querySelector('.expense h3');
const incomeDiv = document.querySelector('.income h3');
const netDiv = document.querySelector('.net h3');

const transaction = {};
const profile = {
  expenses: 0.0,
  income: 0.0,
  net: 0.0,
};

// Events
transForm.addEventListener('submit', function (e) {
  e.preventDefault();
  inputDivs.forEach((input) => {
    if (input.name === 'name') {
      transaction.transName = input.value;
      input.value = '';
    }

    if (input.name === 'amount') {
      transaction.transAmount = input.value;
      input.value = '';
    }

    transaction.transDate = `${day} ${month} ${year}, ${hour}:${minute}`;
  });

  const newRow = document.createElement('div');
  newRow.classList.add('tr');

  newRow.innerHTML = `
  <div class="details">
    <h5>${transaction.transName}</h5>
    <p>${transaction.transDate}</p>
  </div>
  <div class="amount ${
    transaction.transAmount.match(/^-/g) ? 'danger' : 'success'
  }">${transaction.transAmount}</div>
  `;

  table.appendChild(newRow);

  if (transaction.transAmount.match(/^-/g)) {
    profile.expenses += Math.abs(+transaction.transAmount);
    expenseDiv.innerText = profile.expenses;
    profile.net += profile.income - profile.expenses;
    netDiv.innerText = profile.net;
  } else {
    profile.income += +transaction.transAmount;
    incomeDiv.innerText = profile.income;
    profile.net += profile.income - profile.expenses;
    netDiv.innerText = profile.net;
  }
});
