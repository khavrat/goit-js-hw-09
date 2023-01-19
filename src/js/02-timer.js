import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const initInput = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  maxDate: new Date().fp_incr(99),

  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future', {
        timeout: 2500,
        position: 'left-top',
        distance: '200px',
      });
    }
    if (selectedDates[0] >= new Date()) {
      startBtn.disabled = false;

      class Timer {
        constructor({ isUpdate }) {
          this.intervalId = null;
          this.isUpdate = isUpdate;
        }

        identifyTime() {
          this.amountOfTime = selectedDates[0] - new Date();
          this.time = this.convertMs(this.amountOfTime);
        }

        start() {
          initInput.disabled = true;
          startBtn.disabled = true;
          this.intervalId = setInterval(() => {
            this.identifyTime();
            this.isUpdate(this.time);
            this.clear();
          }, 1000);
        }

        stop() {
          clearInterval(this.intervalId);
          const time = this.convertMs(0);
          this.isUpdate(time);
          document.removeEventListener('click', timer.start.bind(timer));
        }

        clear() {
          const values = Object.values(this.time);
          const allValuesOfTime = [];
          for (const value of values) {
            const parsed = Number(value);
            allValuesOfTime.push(parsed);
          }
          const isClear = allValuesOfTime.every(part => part === 0);
          if (isClear) {
            this.stop();
          }
        }

        convertMs(ms) {
          const second = 1000;
          const minute = second * 60;
          const hour = minute * 60;
          const day = hour * 24;

          const days = Math.floor(ms / day);
          const hours = Math.floor((ms % day) / hour);
          const minutes = Math.floor(((ms % day) % hour) / minute);
          const seconds = Math.floor((((ms % day) % hour) % minute) / second);

          return { days, hours, minutes, seconds };
        }

        addLeadingZero(value) {
          return String(value).padStart(2, '0');
        }
      }

      const timer = new Timer({
        isUpdate: updateClockface,
      });

      startBtn.addEventListener('click', timer.start.bind(timer));
    }
  },
};

flatpickr(initInput, options);

function updateClockface({ days, hours, minutes, seconds }) {
  dataDays.textContent = this.addLeadingZero(`${days}`);
  dataHours.textContent = this.addLeadingZero(`${hours}`);
  dataMinutes.textContent = this.addLeadingZero(`${minutes}`);
  dataSeconds.textContent = this.addLeadingZero(`${seconds}`);
}

// styling elements
const interfaceTimer = document.querySelector('.timer');
const interfaceFields = document.getElementsByClassName('field');
const interfaceValues = document.getElementsByClassName('value');
const interfaceLabels = document.getElementsByClassName('label');

interfaceTimer.style.cssText = 'margin-top: 30px; display: flex; gap: 15px';

for (const field of interfaceFields) {
  field.style.cssText = 'width: 70px; text-align: center';
}

for (const label of interfaceLabels) {
  label.style.cssText =
    'text-transform: uppercase; font-size: 14px; letter-spacing: -1px';
}

for (const value of interfaceValues) {
  value.style.cssText = 'display: block; font-size: 35px';
}
