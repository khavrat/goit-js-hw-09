import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const inputDelay = document.querySelector('input[name="delay"]');
const inputStep = document.querySelector('input[name="step"]');
const inputAmount = document.querySelector('input[name="amount"]');
const btn = document.querySelector('button');

form.addEventListener('input', onFormDataValue);
form.addEventListener('submit', createPromise);
btn.addEventListener('submit', onFormSubmit);

const STORAGE_KEY = 'form-state';

const formData = {};

function onFormDataValue(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function getSavedFormData() {
  const parsedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  formData.delay = parsedData.delay || '';
  formData.step = parsedData.step || '';
  formData.amount = parsedData.amount || '';
}

getSavedFormData();

let delay = Number(formData.delay);
let amount = Number(formData.amount);
let step = Number(formData.step);

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

for (let i = 1; i <= amount; i += 1) {
  setTimeout(iterationPromise, step, i);
}

function onFormSubmit(e) {
  localStorage.removeItem(STORAGE_KEY);

  const { delay, step, amount } = formData;
  inputDelay.value = delay;
  inputStep.value = step;
  inputAmount.value = amount;

  document.removeEventListener('submit', createPromise);
  document.removeEventListener('input', onFormDataValue);
}

onFormSubmit();

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
