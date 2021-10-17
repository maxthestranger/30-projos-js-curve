const formElem = document.querySelector('form');
const allError = document.querySelector('#all_error');
const errorMessage = document.createElement('p');
const mailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
let currentPassword = '';
let isErrorFree = [];

// functiions
function assignErrors(message, input) {
  errorMessage.innerText = message;
  errorMessage.classList.add('message');
  input.parentElement.appendChild(errorMessage);
}

function validateUsername(username) {
  if (username.value.match(/\s|\W/gi)) {
    assignErrors(
      'No spaces or special characters allowed (a-zA-Z, 0-9 and _ only',
      username
    );
    isErrorFree[0] = false;
  } else {
    errorMessage.innerText = '';
    isErrorFree[0] = true;
    console.log(username.value);
  }
}

function validateEmail(email) {
  if (mailRegex.test(email.value)) {
    errorMessage.innerText = '';
    isErrorFree[1] = true;
    console.log(email.value);
  } else {
    assignErrors('Enter a valid email address', email);
    isErrorFree[1] = false;
  }
}

function validatePassword(password) {
  if (passwordRegex.test(password.value)) {
    errorMessage.innerText = '';
    isErrorFree[2] = true;
    currentPassword = password.value;
  } else {
    assignErrors(
      'Password be 8 characters long, conatins at least one uppercase letter, symbol and a number',
      password
    );
    isErrorFree[2] = false;
  }
}

function confirmPassword(password) {
  if (password.value !== currentPassword) {
    assignErrors('Password must match', password);
    isErrorFree[3] = false;
  } else {
    errorMessage.innerText = '';
    isErrorFree[3] = true;
    console.log(currentPassword);
  }
}

const formData = formElem.elements;

// Listen to onChange for each input
Array.from(formData).forEach((input) => {
  if (input.tagName === 'INPUT') {
    input.addEventListener('change', function (e) {
      if (input.name === 'username') {
        validateUsername(input);
      }

      if (input.name === 'email') {
        validateEmail(input);
      }

      if (input.name === 'password') {
        validatePassword(input);
      }

      if (input.name === 'confirm_password') {
        confirmPassword(input);
      }
    });
  }
});

// Listen to form submit

formElem.addEventListener('submit', function (e) {
  e.preventDefault();
  if (
    (formData['username'].value === '') |
    (formData['email'].value === '') |
    (formData['password'].value === '') |
    (formData['confirm_password'].value === '')
  ) {
    allError.innerText = 'All fields with * are required';
  } else {
    allError.innerText = '';
    if (isErrorFree.includes(false)) {
      allError.innerText =
        'Make sure that all fields are valid before submitting';
    } else {
      allError.classList.add('successful');
      allError.innerText = 'Form validation successfull';
    }
  }
});
