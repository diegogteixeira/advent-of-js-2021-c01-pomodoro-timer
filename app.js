/*
Ficou faltando:
- inserir o SVG "check" no lugar do "gear" (e vice-versa), quando o botão "button.settings" for clicado
*/

const circle = document.querySelector(".ring");
const minInput = document.getElementsByTagName("input")[0]; // pode ser também: document.querySelector(".minutes input")
const secInput = document.getElementsByTagName("input")[1]; // pode ser também: document.querySelector(".seconds input")
const startButton = document.querySelector(".start");
const settingsButton = document.querySelector(".settings");

let timer;
let isRunning = false;

function renderMinutes(min) {
  if (min < 10) {
    minInput.value = `0${min}`;
  } else {
    minInput.value = min;
  }
}

function renderSeconds(sec) {
  if (sec < 10) {
    secInput.value = `0${sec}`;
  } else {
    secInput.value = sec;
  }
}

startButton.addEventListener("click", () => {
  if (!minInput.disabled) {
    minInput.toggleAttribute("disabled");
    secInput.toggleAttribute("disabled");
  }

  if (minInput.value < 0 || minInput.value > 99 || secInput.value < 0 || secInput.value > 59) {
    alert("Minutes must be set between 0 and 99, and seconds, between 0 and 59.");
    return;
  }

  if (parseInt(minInput.value) === 0 && parseInt(secInput.value) === 0) {
    alert("Time's up! You must set the timer.");
    return;
  }

  circle.classList.remove(["ending"]);

  renderMinutes(parseInt(minInput.value));
  renderSeconds(parseInt(secInput.value));

  if (!isRunning) {
    isRunning = true;
    startButton.textContent = "stop";

    timer = setInterval(() => {
      if (parseInt(secInput.value) === 0) {
        minInput.value--;
        renderMinutes(parseInt(minInput.value));
        secInput.value = 60;
      }

      secInput.value--;
      renderSeconds(parseInt(secInput.value));

      if (parseInt(minInput.value) === 0 && parseInt(secInput.value) === 0) {
        clearInterval(timer);
        isRunning = false;
        startButton.textContent = "start";
        circle.classList.add(["ending"]);
        setTimeout(() => alert("Time's up!"), 100);
      }
    }, 1000);
  } else {
    clearInterval(timer);
    isRunning = false;
    startButton.textContent = "start";
  }
});

settingsButton.addEventListener("click", () => {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    startButton.textContent = "start";
  } else {
    if (parseInt(minInput.value) !== 0 || parseInt(secInput.value) !== 0) {
      circle.classList.remove(["ending"]);
    }
  }

  minInput.toggleAttribute("disabled");
  secInput.toggleAttribute("disabled");
});
