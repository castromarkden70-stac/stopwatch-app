let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let lapCount = 0;

const timeDisplay = document.getElementById("timeDisplay");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");
const themeToggle = document.getElementById("themeToggle");

// Theme management
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeToggle.textContent = "☀️";
  } else {
    document.body.classList.remove("light-mode");
    themeToggle.textContent = "🌙";
  }
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  const isLightMode = document.body.classList.contains("light-mode");
  localStorage.setItem("theme", isLightMode ? "light" : "dark");
  themeToggle.textContent = isLightMode ? "☀️" : "🌙";
});

// Initialize theme on page load
initTheme();

function formatTime(ms) {
  let minutes = Math.floor(ms / 60000);
  let seconds = Math.floor((ms % 60000) / 1000);
  let centiseconds = Math.floor((ms % 1000) / 10);

  return (
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0") + "." +
    String(centiseconds).padStart(2, "0")
  );
}

function updateTime() {
  elapsedTime = Date.now() - startTime;
  timeDisplay.textContent = formatTime(elapsedTime);
}

startPauseBtn.addEventListener("click", () => {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
    startPauseBtn.textContent = "⏸";
    running = true;
  } else {
    clearInterval(timerInterval);
    startPauseBtn.textContent = "▶";
    running = false;
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  elapsedTime = 0;
  running = false;
  lapCount = 0;
  timeDisplay.textContent = "00:00.00";
  startPauseBtn.textContent = "▶";
  laps.innerHTML = "";
});

lapBtn.addEventListener("click", () => {
  if (running) {
    lapCount++;
    const lap = document.createElement("div");
    lap.textContent = `Lap ${lapCount}: ${formatTime(elapsedTime)}`;
    laps.prepend(lap);
  }
});
