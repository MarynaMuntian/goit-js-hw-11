import './sass/main.scss';

const dateSelector = document.getElementById('date-selector');
const startButton = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

startButton.disabled = true;

class Timer {
  constructor() {
    this.intervalId = null;
    this.isActive = false;
  }
  updateButton() {
    const deltaTime = this.getTime();
    if (deltaTime > 0) {
      startButton.disabled = false;
    } else {
      startButton.disabled = true;
    }
  }
  getTime() {
    const finishTime = dateSelector.value;
    return Date.parse(finishTime) - Date.now();
  }
  start() {
    this.isActive = true;
    this.intervalId = setInterval(() => {
      const deltaTime = this.getTime();
      if (deltaTime <= 0) {
        clearInterval(this.intervalId);
        return;
      }
      startButton.disabled = false;
      const time = this.convertMs(deltaTime);
      this.updateTimerField(time);
    }, 1000);
  }
  updateTimerField({ days, hours, minutes, seconds }) {
    daysRef.textContent = `${days}`;
    hoursRef.textContent = `${hours}`;
    minutesRef.textContent = `${minutes}`;
    secondsRef.textContent = `${seconds}`;
  }
  stop() {
    const finishTime = dateSelector.textContent;
    const currentTime = Date.now();
    const deltaTime = finishTime - currentTime;
    if (deltaTime === 0) {
      clearInterval(this.intervalId);
      this.isActive = false;
    }
    return;
  }
  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.pad(Math.floor(ms / day));
    // Remaining hours
    const hours = this.pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
  }
  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new Timer();

startButton.addEventListener('click', timer.start.bind(timer));
dateSelector.addEventListener('change', timer.updateButton.bind(timer));
