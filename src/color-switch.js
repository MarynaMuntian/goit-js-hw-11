const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timerId = null;
stopButton.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const backgroundColor = () => {
    return body.style.backgroundColor = getRandomHexColor();
}

const onClickStart = () => {
    timerId = setInterval(backgroundColor, 1000);
    stopButton.disabled = false;
    startButton.disabled = true;
};

const onClickStop = () => {
    clearInterval(timerId);
    stopButton.disabled = true;
    startButton.disabled = false;
};

startButton.addEventListener('click', onClickStart);
stopButton.addEventListener('click', onClickStop);

