let error = document.querySelector(".fields");
let inputData = document.querySelector("form");

inputData.addEventListener("submit", (e) => {
  e.preventDefault();
  let fName = e.target.children[0].value,
    lName = e.target.children[1].value,
    country = e.target.children[2].value,
    score = e.target.children[3].value;

  if (fName === "" || lName === "" || country === "" || score === "") {
    return (error.style.display = "block");
  } else if (score.length <= 2 || score === "100") {
    error.style.display = "none";
    let continer = document.querySelector(".leaderboard");
    let dataRow = document.createElement("div");

    dataRow.innerHTML = `
    <div>
      <span class="name">${fName} ${lName}</span>
      <p class="currentDate">${currentDate()}</p>
    </div>        
    <span class= "country">${country}</span>
    <span class="score">${score}</span>
    <div class="button-container">
      <button class="delete"><i class="fa-solid fa-trash"></i></button>
      <button class="incDec">+5</button>
      <button class="incDec">-5</button>
    </div>
      `;

    continer.appendChild(dataRow);
    dataRow.classList.add("leaderboard-item");
    e.target.children[0].value = "";
    e.target.children[1].value = "";
    e.target.children[2].value = "";
    e.target.children[3].value = "";

    sortList();
    buttonAction();
  }
});

function buttonAction() {
  document.querySelectorAll(".button-container").forEach((e) => {
    e.addEventListener("click", (el) => {
      let scorePlayer = el.target.parentElement.parentElement.children[2];

      if (el.target.parentElement.classList.contains("delete")) {
        return el.target.parentElement.parentElement.parentElement.remove();
      }
      if (el.target.classList.contains("incDec")) {
        let textContent = el.target.innerText;
        if (textContent.length > 2) return;

        scorePlayer.innerText =
          parseInt(scorePlayer.innerText) + parseInt(textContent);
      }
      sortList();
    });
  });
}

buttonAction();

let sortList = () => {
  let container = document.querySelector(".leaderboard");
  let rows = document.querySelectorAll(".leaderboard-item");
  let newList = [];
  rows.forEach((el) => newList.push(el));

  let sortedList = newList.map((e) => e);

  sortedList.sort(
    (a, b) => b.children[2].textContent - a.children[2].textContent
  );

  sortedList.forEach((el) => container.appendChild(el));
};

let currentDate = function dateAndTime() {
  let newDate = new Date();

  let year = newDate.getFullYear();
  let month = newDate.getMonth();
  let date = newDate.getDate();
  let time = newDate.toLocaleTimeString();

  let monthsArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let result = `${monthsArray[month]} ${date}, ${year} - ${time}`;

  return result;
};
