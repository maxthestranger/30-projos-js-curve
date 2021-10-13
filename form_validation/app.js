// //  selector
// const inputElement = document.querySelectorAll('input');
// const errorMessage = document.createElement('p');
// const submitBtn = document.querySelector('button');
// errorMessage.classList.add('message');
// const mailRegex =
//   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

// let currentPassword = null;

// inputElement.forEach((input) => {
//   input.addEventListener('change', function () {
//     if (input.value === '') {
//       input.classList.add('error');
//       errorMessage.innerText = `Value is required`;
//       input.parentElement.appendChild(errorMessage);
//     }

//     if (input.name === 'username') {
//       if (input.value.match(/\s|\W/gi)) {
//         errorMessage.innerText = 'Only a-z0-9 and _ values allowed';
//         input.parentElement.appendChild(errorMessage);
//       } else {
//         console.log(input.value);
//       }
//     }

//     if (input.name === 'email') {
//       if (mailRegex.test(input.value)) {
//         console.log(input.value);
//       } else {
//         errorMessage.innerText = 'Enter a valid email';
//         input.parentElement.appendChild(errorMessage);
//       }
//     }

//     if (input.name === 'password') {
//       if (passwordRegex.test(input.value)) {
//         currentPassword = input.value;
//       } else {
//         errorMessage.innerText =
//           'Passsword be 8 characters long, conatin at least one uppercase letter, symbol and number';
//         input.parentElement.appendChild(errorMessage);
//       }
//     }

//     if (input.name === 'confirm_password') {
//       if (input.value === currentPassword) {
//         console.log(currentPassword);
//       } else {
//         errorMessage.innerText = 'Password must match';
//         input.parentElement.appendChild(errorMessage);
//       }
//     }
//   });
// });

// Refactoring

class Validation {
  constructor() {
    this.inputElements = document.querySelectorAll('input');
    this.errorMessage = document.createElement('p').classList.add('message');
    this.submitBtn = document.querySelector('button');
    this.mailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    this.passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    this.currentPassword = null;
    this.currentUser = {};
  }

  //   Methods

  // Error Reporting
  assignErrors(message) {
    errorMessage.innerText = message;
    input.parentElement.appendChild(errorMessage);
  }

  validateInputs(self, inputName) {
    //   Check if values are empty
    (function () {
      if (self.value === '') {
        self.classList.add('error');
      }
    })();

    // validate username
    const validateUsername = () => {
      if (inputName === 'username') {
        if (self.value.match(/\s|\W/gi)) {
          this.assignErrors('Only a-z0-9 and _ values allowed');
        } else {
          this.currentUser.username = self.value;
        }
      }
    };

    // validate email
    const validateEmail = () => {
      if (inputName === 'email') {
        if (this.mailRegex.test(self.value)) {
          this.currentUser.email = self.value;
        } else {
          this.assignErrors('Enter a valid email');
        }
      }
    };

    // validate password
    const validatePassword = () => {
      if (inputName === 'password') {
        if (this.passwordRegex.test(self.value)) {
          this.currentUser.password = self.value;
        } else {
          this.assignErrors(
            'Passsword be 8 characters long, conatin at least one uppercase letter, symbol and number'
          );
        }
      }
    };

    // confirm password
    const confirmPassword = () => {
      if (inputName === 'password') {
        if (self.value === currentPassword) {
          this.currentUser.confirmed_password = self.value;
        } else {
          this.assignErrors('Password must match');
        }
      }
    };
  }
}

const validation = new Validation();

// Events
validation.submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  validation.inputElements.forEach((input) => {
    input.addEventListener('change', function () {
      validation.validateInputs(this, input.name);
    });
  });
});

validation.inputElements.forEach((input) => {
  input.addEventListener('change', function () {
    validation.validateInputs(this, input.name);
  });
});
