import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";

const dataPicker = document.querySelector('#datetime-picker');
const calendar = document.querySelectorAll("input");
const startButton = document.querySelector('[data-start]');

const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');


let userSelectedDate;
let timer;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < new Date()) {
      iziToast.warning({ message: 'Please choose a date in the future' ,position: 'topCenter' });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
    if (dataPicker.value === '') {
      startButton.disabled = true;
    }
  },
};
startButton.disabled = true;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.padStart(2,"0")
}
startButton.addEventListener('click', startTimer);

function startTimer() {
  timer = setInterval(updateTimer, 1000);
  console.log(timer);
  dataPicker.disabled = true;
  startButton.disabled = true;
}
function updateTimer() {
  const currentDate = new Date().getTime();
  const deltaTimer = userSelectedDate.getTime() - currentDate;
  const converTimer = convertMs(deltaTimer);
  if (deltaTimer <0) {
    clearInterval(timer);
    dataPicker.disabled = false;
    startButton.disabled = false;
    return;
  }
  days.textContent = addLeadingZero(String(converTimer.days));
  hours.textContent = addLeadingZero(String(converTimer.hours));
  minutes.textContent = addLeadingZero(String(converTimer.minutes));
  seconds.textContent = addLeadingZero(String(converTimer.seconds));
}

flatpickr('#datetime-picker', options);