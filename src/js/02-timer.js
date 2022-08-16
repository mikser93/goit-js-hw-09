// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Імпорт біблотеки Notify для алертів
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(inputDate, options);

//функція з ТЗ
function convertMs(ms) {
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

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

startBtn.addEventListener('click', () => {
  let timer = setInterval(() => {
    let countdown = new Date(inputDate.value) - new Date();
    startBtn.disabled = true;
    if (countdown >= 0) {
      let timeObject = convertMs(countdown);
      timerDays.textContent = addLeadingZero(timeObject.days);
      timerHours.textContent = addLeadingZero(timeObject.hours);
      timerMinutes.textContent = addLeadingZero(timeObject.minutes);
      timerSeconds.textContent = addLeadingZero(timeObject.seconds);
    } else {
      clearInterval(timer);
      Notify.success('Yahoo');
    }
  }, 1000);
});
