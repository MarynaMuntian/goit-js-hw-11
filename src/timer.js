const dateSelector = document.getElementById('date-selector');
const startButton = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

startButton.disabled = true;
console.log(dateSelector.value);
const startButtonActive = () => {
    if (!dateSelector.value) {
        return
    }
    startButton.disabled = false;
};
startButtonActive();

class Timer {
    constructor({ onTick}) {
        this.intervalId = null;
        this.isActive = false;
        this.onTick = onTick;
    }
    start() {
        // if (this.isActive) {
        //     return;
        //  }

        const finishTime = dateSelector.textContent;

        this.isActive = true;
        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = finishTime - currentTime;
            const time = this.convertMs(deltaTime);
            this.onTick(time);
        }, 1000);
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

const timer = new Timer({onTick: updateTimerField});

function updateTimerField({ days, hours, minutes, seconds }) {
    days.textContent = `${days}:`;
    hours.textContent = `${hours}:`;
    minutes.textContent = `${minutes}:`;
    seconds.textContent = `${seconds}`;
 }

startButton.addEventListener('click', timer.start.bind(timer), timer.stop.bind(timer));

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); //{days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6, minutes: 42, seconds: 20}