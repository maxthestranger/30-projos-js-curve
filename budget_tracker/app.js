// html qurries
localStorage.clear();
const transForm = document.querySelector('form');
const errorP = document.querySelector('.error');
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
const deleteBtn = document.querySelectorAll('.btn-delete');

const transaction = {};
const profile = {
  expenses: 0.0,
  income: 0.0,
  net: 0.0,
};

// functions

function assignValues(formData) {
  errorP.innerText = '';
  transaction.transName = formData.get('name');
  transaction.transAmount = formData.get('amount');
  transaction.transDate = `${day} ${month} ${year}, ${hour}:${minute}`;
  localStorage.setItem('transactions', JSON.stringify(transaction));
  formData.delete('name');
  formData.delete('amount');
}

function transElements() {
  const transaction = JSON.parse(localStorage.getItem('transactions'));
  const newRow = document.createElement('div');
  newRow.classList.add('tr');
  newRow.innerHTML = `
  <div class="details">
  <button class="btn-delete"><i class="bi bi-x"></i></button>
    <h5>${transaction.transName}</h5>
    <p>${transaction.transDate}</p>
  </div>
  <div class="amount ${
    transaction.transAmount.match(/^-/g) ? 'danger' : 'success'
  }">${transaction.transAmount}</div>
  `;

  table.appendChild(newRow);
}

function updateValues() {
  const transaction = JSON.parse(localStorage.getItem('transactions'));
  if (transaction.transAmount.match(/^-/g)) {
    profile.expenses += Math.abs(+transaction.transAmount);
    expenseDiv.innerText = profile.expenses;
    profile.net = profile.income - profile.expenses;
    netDiv.innerText = profile.net;
  } else {
    profile.income += +transaction.transAmount;
    incomeDiv.innerText = profile.income;
    profile.net = profile.income - profile.expenses;
    netDiv.innerText = profile.net;
  }
}

function deleteTrans(btn) {
  let detailParent = btn.parentElement.parentElement;
  let elemValue = detailParent.children[1];

  if (elemValue.classList.contains('amount')) {
    if (elemValue.innerText.match(/^-/g)) {
      profile.expenses -= Math.abs(elemValue.innerText);
      expenseDiv.innerText = profile.expenses;
      profile.net = profile.income - profile.expenses;
      netDiv.innerText = profile.net;
    } else {
      profile.income -= elemValue.innerText;
      incomeDiv.innerText = profile.income;
      profile.net = profile.income - profile.expenses;
      netDiv.innerText = profile.net;
    }
  }

  detailParent.remove();
}

// Events
transForm.addEventListener('submit', function (e) {
  e.preventDefault();
  let formData = new FormData(transForm);

  if (formData.get('name') === '' || formData.get('amount') === '') {
    errorP.innerText = 'All fields are required';
  } else {
    assignValues(formData);
    transElements();
    updateValues();
  }
});

table.addEventListener('click', function (e) {
  if (e.target.classList.contains('btn-delete')) {
    deleteTrans(e.target);
  }
});
