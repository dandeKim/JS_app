const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1"),
  clockHours = clockTitle.querySelector(".hours"),
  clockMinutes = clockTitle.querySelector(".minutes"),
  clockSeconds = clockTitle.querySelector(".seconds");

function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  clockHours.innerText = `${hours < 10 ? `0${hours}` : hours}:`;
  clockMinutes.innerText = `${minutes < 10 ? `0${minutes}` : minutes}:`;
  clockSeconds.innerText = `${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}
init();
