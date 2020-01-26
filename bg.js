const body = document.querySelector("body");
const bgImage = document.querySelector(".bgImage");
const IMG_NUMBER = 6;

function paintImage(imgNumber) {
  const bgImgClass = `img${imgNumber + 1}`;
  bgImage.classList.add(bgImgClass);
}

function getRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = getRandom();
  paintImage(randomNumber);
}

init();
