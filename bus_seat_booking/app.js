const seats = document.querySelectorAll('.seat_item');
const seatNumber = document.querySelector('.seat_number');
const totalAmount = document.querySelector('.total_amount');
const form = document.querySelector('form');
const message = document.querySelector('.message p');

let total_amount = 0;
let seat_number = [];

function printAmount() {
  totalAmount.innerText = new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
  }).format(total_amount);
  seatNumber.innerText = `${[...seat_number]}`;
}

function printMessage(messo) {
  message.innerText = messo;
  message.parentElement.style.opacity = 1;
  let timer = setTimeout(function () {
    message.innerText = '';
    message.parentElement.style.opacity = 0;
  }, 4000);
}

function showNotification() {
  let formData = new FormData(form);

  if (
    (formData.get('dropping') === null) |
    (formData.get('boarding') === null)
  ) {
    printMessage('❗Kindly fill all the details');
  } else {
    console.log('details');
  }
}

function addSeat(e) {
  let label = e.target.nextSibling;
  let labelTitle = label.title.split('|');
  total_amount += Number(labelTitle[2]);
  seat_number.push(labelTitle[0]);
}

function removeSeat(e) {
  let label = e.target.nextSibling;
  let labelTitle = label.title.split('|');
  total_amount -= Number(labelTitle[2]);
  seat_number.splice(seat_number.indexOf(labelTitle[0]), 1);
}

seats.forEach((seat) => {
  seat.addEventListener('change', function (e) {
    if (this.firstElementChild.checked) {
      addSeat(e);

      printAmount();
    } else {
      removeSeat(e);

      printAmount();
    }
  });
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  showNotification();
});
