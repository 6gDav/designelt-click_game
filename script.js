const container = document.getElementById("grid-container");
const numbers = Array.from({ length: 12 }, (_, index) => index + 1);
let clickedNumbers = [];
let startTime; // Időmérő változó
let timerInterval; // Időmérő intervallum

// A HTML-hez adott időmérő h2, üzenet div és újra indítás gomb elemek
const timerDisplay = document.createElement("h2");
const messageDisplay = document.createElement("div");
const restartButton = document.createElement("button");
restartButton.textContent = "Újra indítás";
restartButton.addEventListener("click", restartGame);
document.body.appendChild(timerDisplay);
document.body.appendChild(messageDisplay);
document.body.appendChild(restartButton);

for (let i = 0; i < 12; i++) {
  let pos1 = Math.floor(Math.random() * 12);
  let pos2 = Math.floor(Math.random() * 12);
  let temp = numbers[pos1];
  numbers[pos1] = numbers[pos2];
  numbers[pos2] = temp;
}

for (let i = 0; i < 12; i++) {
  const box = createBox(numbers[i]);
  container.appendChild(box);
}

function createBox(number) {
  const box = document.createElement("div");
  box.classList.add("box");
  box.innerHTML = number;

  box.addEventListener("click", function () {
    if (!startTime) {
      startTime = new Date();
      timerInterval = setInterval(updateTimer, 1000);
    }

    if (parseInt(box.innerHTML) === clickedNumbers.length + 1) {
      clickedNumbers.push(parseInt(box.innerHTML));
      box.style.visibility = "hidden";

      if (clickedNumbers.length === numbers.length) {
        clearInterval(timerInterval);
        const endTime = new Date();
        const elapsedTime = (endTime - startTime) / 1000;
        timerDisplay.textContent = `Gratulálok! Idő: ${elapsedTime} másodperc`;
        messageDisplay.textContent = ""; // Töröld az esetleges korábbi üzenetet
      }
    } else {
      clearInterval(timerInterval);
      const endTime = new Date();
      const elapsedTime = (endTime - startTime) / 1000;
      messageDisplay.textContent = `Sajnálom, hibás kattintás. Idő: ${elapsedTime} másodperc`;
      timerDisplay.textContent = ""; // Töröld az időtartamot
    }
  });

  return box;
}

function updateTimer() {
  const currentTime = new Date();
  const elapsedTime = (currentTime - startTime) / 1000;
  timerDisplay.textContent = `Idő: ${elapsedTime} másodperc`;
}

function restartGame() {
  // Töröld az összes eddigi kattintást, időt és üzenetet
  clickedNumbers = [];
  startTime = null;
  clearInterval(timerInterval);
  timerDisplay.textContent = "";
  messageDisplay.textContent = "";
  location.reload();

  // Kezd új játékot
  for (let i = 0; i < 12; i++) {
    const box = createBox(numbers[i]);
    container.appendChild(box);
  }
}
