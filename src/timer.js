const dateSelector = document.getElementById('date-selector');
const startButton = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

startButton.disabled = true;

function pad(value) {
    return String(value).padStart(2, '0');
 }

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

const timer = {
    intervalId: null,
    isActive: false,

    start() {
        if (this.isActive) {
            return;
         }

        const finishTime = dateSelector.textContent;

        this.isActive = true;
        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = finishTime - currentTime;
            const { days, hours, minutes, seconds } = convertMs(deltaTime);
        }, 1000);
    },

    stop() {
        if (deltaTime === 0) {
            clearInterval(this.intervalId);
            this.isActive = false;
        }
        return;
     },
};

function updateTimerField({ days, hours, minutes, seconds }) {
    days.textContent = `${days}:`;
    hours.textContent = `${hours}:`;
    minutes.textContent = `${minutes}:`;
    seconds.textContent = `${seconds}`;
 }

startButton.addEventListener('click', timer.start(), timer.stop());

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); //{days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6, minutes: 42, seconds: 20}