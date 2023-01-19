// wrap buttons into <div> with innerHTML to center elements
const div = document.createElement('div');
const elements = document.querySelectorAll('button');
div.innerHTML = elements[0].outerHTML + elements[1].outerHTML;
elements[0].parentNode.replaceChild(div, elements[0]);
elements[1].parentNode.removeChild(elements[1]);

// styling elements
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

const disabledBtnStyle =
  'margin: 10px; font-size:16px; text-transform: uppercase; padding: 8px 16px; border-radius: 4px; border: none;';
const activeBtnStyle =
  'margin: 10px; font-size:16px; text-transform: uppercase; padding: 8px 16px; border-radius: 4px; border: none; cursor: pointer;';

div.style.textAlign = 'center';
div.style.marginTop = '150px';
styleBtnToggle();

// task functionality
startBtn.addEventListener('click', startRandomHexColor);
stopBtn.addEventListener('click', stopRandomHexColor);

const INTERVAL_DELAY = 1000;
let intervalId = null;

function startRandomHexColor() {
  intervalId = setInterval(() => {
    return (body.style.backgroundColor = `#${Math.floor(
      Math.random() * 16777215
    ).toString(16)}`);
  }, INTERVAL_DELAY);

  startBtn.disabled = true;
  styleBtnToggle();
}

function stopRandomHexColor() {
  clearInterval(intervalId);

  startBtn.disabled = false;
  styleBtnToggle();

  document.removeEventListener('click', startRandomHexColor);
  document.removeEventListener('click', stopRandomHexColor);
}

function styleBtnToggle() {
  if (startBtn.disabled) {
    stopBtn.disabled = false;
    startBtn.style.cssText = disabledBtnStyle;
    stopBtn.style.cssText = activeBtnStyle;
  } else if (!startBtn.disabled) {
    stopBtn.disabled = true;
    startBtn.style.cssText = activeBtnStyle;
    stopBtn.style.cssText = disabledBtnStyle;
  }
}
