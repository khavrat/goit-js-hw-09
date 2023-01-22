import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const inputDelay = document.querySelector('input[name="delay"]');
const inputStep = document.querySelector('input[name="step"]');
const inputAmount = document.querySelector('input[name="amount"]');
const btn = document.querySelector('button');

form.addEventListener('submit', onFormSubmit);

let delay = '';
let amount = '';
let step = '';

function onFormSubmit(e) {
  if (e && e.preventDefault) e.preventDefault();
  delay = Number(inputDelay.value);
  amount = Number(inputAmount.value);
  step = Number(inputStep.value);
  
  for (let i = 1; i <= amount; i += 1) {
    setTimeout(iterationPromise, step, i);
  }
}


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position: position, delay: delay });
      } else {
        reject({ position: position, delay: delay });
      }
    }, delay);
  });
}

function iterationPromise(amount) {
  createPromise(amount, delay)
    .then(({ position, delay }) => {
      Notify.success(`Fulfilled promise ${position} in ${delay}ms`, {
        timeout: 5000,
        position: 'left-center',
        distance: '130px',
      });
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`Rejected promise ${position} in ${delay}ms`, {
        timeout: 5000,
        position: 'left-center',
        distance: '130px',
      });
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  delay += step;
}

// styling elements
form.style.cssText =
  'display: flex; gap: 10px; max-width: 600px; align-items: flex-end;';
btn.style.cssText =
  'border: none; border-radius: 4px; width: 200px; padding: 7px; background-color: rgba(167, 191, 190, 0.5); font-size: 14px; cursor: pointer;';

const inputs = document.querySelectorAll('input');
for (const input of inputs) {
  input.style.cssText =
    'border: none; outline: 1px solid rgb(167, 191, 190); height: 28px; border-radius: 4px; margin-top: 8px;}';
}

const labels = document.querySelectorAll('label');
for (const label of labels) {
  label.style.fontSize = '14px';
}
