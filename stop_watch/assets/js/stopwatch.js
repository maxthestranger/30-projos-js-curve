'use strict';

let milli = 0;
let sec = 0;
let min = 0;
let hrs = 0;
let timer = null;

let milliWrapper = document.querySelector('.milli');
let secWrapper = document.querySelector('.sec');
let minWrapper = document.querySelector('.min');
let hrsWrapper = document.querySelector('.hrs');

// utils

// rendering to DOM
function renderTimer() {
  milliWrapper.textContent = milli;
  secWrapper.textContent = sec;
  minWrapper.textContent = min;
  hrsWrapper.textContent = hrs;
}

function resetInnitials() {
  milli = sec = min = hrs = 0;
  timer = null;
}

function runTimer() {
  milli += 1;
  renderTimer();

  if (milli === 100) {
    milli = 0;
    sec += 1;
  }

  if (sec === 60) {
    sec = 0;
    min += 1;
  }

  if (min === 60) {
    min = 0;
    hrs += 1;
  }
}

const startTimer = () => {
  timer = setInterval(runTimer, 10);
};
const stopTimer = () => {
  clearInterval(timer);
};

const resetTimer = () => {
  stopTimer();
  resetInnitials();
  renderTimer();
};
