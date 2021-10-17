// html qurries
// localStorage.clear();
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

const transaction = [];
const profile = {
  expenses: 0.0,
  income: 0.0,
  net: 0.0,
};

// functions

function assignValues(formData) {
  errorP.innerText = '';
  const transObj = new Object();
  transObj.transName = formData.get('name');
  transObj.transAmount = formData.get('amount');
  transObj.transDate = `${day} ${month} ${year}, ${hour}:${minute}`;
  transaction.push(transObj);
  localStorage.setItem('transactions', JSON.stringify(transaction));
  updateLive(transObj.transName, transObj.transAmount, transObj.transDate);
  formData.delete('name');
  formData.delete('amount');
}

function transElements() {
  try {
    const transaction = JSON.parse(localStorage.getItem('transactions'));

    transaction.map((trans) => {
      const { transName, transAmount, transDate } = trans;
      updateLive(transName, transAmount, transDate);
    });
  } catch (e) {
    // console.log(e.message);
  }
}

function updateLive(transName, transAmount, transDate) {
  const newRow = document.createElement('div');
  newRow.classList.add('tr');
  newRow.innerHTML = `
    <div class="details">
    <button class="btn-delete"><i class="bi bi-x"></i></button>
      <h5>${transName}</h5>
      <p>${transDate}</p>
    </div>
    <div class="amount ${
      transAmount.match(/^-/g) ? 'danger' : 'success'
    }">${transAmount}</div>
    `;

  table.appendChild(newRow);
  updateValues(transAmount);
}

function updateValues(transAmount) {
  if (transAmount.match(/^-/g)) {
    profile.expenses += Math.abs(+transAmount);
    expenseDiv.innerText = profile.expenses;
  } else {
    profile.income += +transAmount;
    incomeDiv.innerText = profile.income;
  }
  profile.net = profile.income - profile.expenses;
  netDiv.innerText = profile.net;
}

function removeValues(elemValue) {
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
}

function deleteTrans(btn) {
  let detailParent = btn.parentElement.parentElement;
  let elemValue = detailParent.children[1];
  const index = Array.from(detailParent.parentElement.children).indexOf(
    detailParent
  );
  const transaction = JSON.parse(localStorage.getItem('transactions'));
  transaction.splice(index, 1);
  localStorage.setItem('transactions', JSON.stringify(transaction));

  removeValues(elemValue);
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
    transForm.reset();
  }
});

table.addEventListener('click', function (e) {
  if (e.target.classList.contains('btn-delete')) {
    deleteTrans(e.target);
  }
});

transElements();
