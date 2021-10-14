class Validation {
  constructor() {
    this.inputElements = document.querySelectorAll('input');
    this.errorMessage = document.createElement('p');
    this.form = document.querySelector('.card');
    this.mailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    this.currentPassword = null;
    // this.currentUser = {};
  }

  //   Methods

  // Error Reporting
  assignErrors(message, self) {
    this.errorMessage.innerText = message;
    this.errorMessage.classList.add('message');
    self.parentElement.appendChild(this.errorMessage);
  }

  // validate username
  validateUsername(self) {
    if (self.name === 'username') {
      if (self.value.match(/\s|\W/gi)) {
        this.assignErrors('Only a-z0-9 and _ values allowed', self);
      } else {
        // this.currentUser.username = self.value;
        this.errorMessage.innerText = '';
        console.log(self.value);
      }
    }
  }

  // validate email
  validateEmail(self) {
    if (self.name === 'email') {
      if (this.mailRegex.test(self.value)) {
        this.errorMessage.innerText = '';
        console.log(self.value);
      } else {
        this.assignErrors('Enter a valid email', self);
      }
    }
  }

  validatePassword(self) {
    if (self.name === 'password') {
      if (this.passwordRegex.test(self.value)) {
        // this.currentUser.password = self.value;
        this.errorMessage.innerText = '';
        this.currentPassword = self.value;
        console.log(self.value);
      } else {
        this.assignErrors(
          'Passsword be 8 characters long, conatin at least one uppercase letter, symbol and number',
          self
        );
      }
    }
  }

  confirmPassword(self) {
    if (self.name === 'confirm_password') {
      if (self.value === this.currentPassword) {
        // this.currentUser.confirmed_password = self.value;
        this.errorMessage.innerText = '';
        console.log(self.value);
      } else {
        this.assignErrors('Password must match', self);
      }
    }
  }

  checkEmpty(self) {
    if (self.value === '') {
      self.classList.add('error');
    } else {
      self.classList.remove('error');
    }
  }

  validateInputs(self) {
    //   Check if values are empty
    this.checkEmpty(self);
    // validate usernameerrorMessage
    this.validateUsername(self);
    // validate email
    this.validateEmail(self);
    // validate password
    this.validatePassword(self);
    // confirm password
    this.confirmPassword(self);
  }
}

const validation = new Validation();

// Events
validation.form.addEventListener('submit', (e) => {
  e.preventDefault();

  validation.inputElements.forEach((input) => {
    validation.validateInputs(input);
  });
});

validation.inputElements.forEach((input) => {
  input.addEventListener('change', function () {
    validation.validateInputs(this);
  });
});
