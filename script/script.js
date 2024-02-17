import { months, weeks } from "./data.js";

// Selectors
const datetimeHoverEffect = document.querySelector(".datetime");

const dayNa = document.getElementById("dayname");
const monthNa = document.getElementById("month");
const dayNum = document.getElementById("daynum");
const yearNo = document.getElementById("year");
const hoursNo = document.getElementById("hour");
const minutes = document.getElementById("min");
const seconds = document.getElementById("sec");
const amPm = document.getElementById("Am_Pm");
const hourChange = document.getElementById("changeHr");
const hideSeconds = document.getElementById("hide-seconds");
const hideAmPm = document.getElementById("hide-am-pm");
const toggleBtn = document.getElementById("toggle-btn");
const theme = document.getElementById("theme");
const settingOptionShow = document.querySelector(".setting-options-show");
const settingOptionHide = document.querySelector(".setting-options-hide");
const menu = document.querySelector(".menu");

//localStorage
let darkMode = localStorage.getItem("dark-mode");

// Event Listners
toggleBtn.addEventListener("click", () => {
  darkMode = localStorage.getItem("dark-mode"); // update darkMode when clicked
  if (darkMode === "disabled") {
    toggleBtn.textContent = "Light Mode";
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});

settingOptionShow.addEventListener("click", () => {
  menu.style.display = "inline-flex";
  settingOptionShow.style.display = "none";
  settingOptionHide.style.display = "block";
});
settingOptionHide.addEventListener("click", () => {
  menu.style.display = "none";
  settingOptionHide.style.display = "none";
  settingOptionShow.style.display = "block";
});

const enableDarkMode = () => {
  toggleBtn.textContent = "Light Mode";
  theme.classList.add("dark-mode-theme");
  toggleBtn.classList.remove("dark-mode-toggle");
  localStorage.setItem("dark-mode", "enabled");
};

const disableDarkMode = () => {
  toggleBtn.textContent = "Dark Mode";
  theme.classList.remove("dark-mode-theme");
  toggleBtn.classList.add("dark-mode-toggle");
  localStorage.setItem("dark-mode", "disabled");
};

if (darkMode === "enabled") {
  toggleBtn.textContent = "Light Mode";
  enableDarkMode(); // set state of darkMode on page load
}

// functions

function updateClock() {
  const dateObj = new Date();
  let monthName = months[dateObj.getMonth()];
  let dayName = weeks[dateObj.getDay()];
  let dayNumber = dateObj.getDate();
  let year = dateObj.getFullYear();
  let hours = dateObj.getHours();
  let min = dateObj.getMinutes();
  let sec = dateObj.getSeconds();
  let show24Hr = dateObj.getHours();

  // converting 12 hours from 24 hours & adding AM & PM format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  min = min < 10 ? "0" + min : min;

  // converting am to pm based on current time

  let am_pm = hours <= 12 ? "PM" : "AM";
  const Show12Hr = `${hours}`;

  // rendering date,month,dayno, year
  dayNa.textContent = `${dayName}, `;
  monthNa.textContent = `${monthName}`;
  dayNum.textContent = `${dayNumber}, `;
  yearNo.textContent = `${year}`;

  // rendering hour,min,sec,am||pm
  hoursNo.textContent = `${Show12Hr}`;
  minutes.textContent = `: ${min}`;
  seconds.textContent = `: ${sec} `;
  amPm.textContent = `${am_pm} `;

  if (hourChange.checked) {
    hoursNo.textContent = `${show24Hr}`;
  }
  if (hideSeconds.checked) {
    seconds.textContent = "";
  }
  if (hideAmPm.checked) {
    amPm.textContent = "";
  }
}

let interval = setInterval(() => {
  updateClock();
}, 1000);
