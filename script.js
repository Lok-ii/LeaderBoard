let details = [
  { firstName: "LOKESH", lastName: "KATARIA", Country: "INDIA", Score: "100" },
  { firstName: "JOHN", lastName: "DOE", Country: "USA", Score: "85" },
  { firstName: "JANE", lastName: "SMITH", Country: "CANADA", Score: "97" },
];

let dataBody = document.querySelector(".leaderboard");

let addPeople = (list = details) => {
  sortList(list);
  let rank = 1;
  dataBody.innerHTML = "";
  list.forEach((e) => {
    let dataRow = document.createElement("div");

    dataRow.innerHTML = `<span class="rank">${rank++}</span>
    <div>
      <span class="name">${e.firstName} ${e.lastName}</span>
      <p class="currentDate">${currentDate()}</p>
    </div>        
    <span class= "country">${e.Country}</span>
    <span class="score">${e.Score}</span>
    <button class="delete"><i class="fa-solid fa-trash"></i></button>
    <button class="incDec">+5</button>
    <button class="incDec">-5</button>`;

    dataBody.appendChild(dataRow);
    dataRow.classList.add("leaderboard-item");
  });
};

let sortList = (list = details) => {
  return list.sort((a, b) => Number(b.Score) - Number(a.Score));
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

addPeople();

let error = document.querySelector(".fields");
let inputData = document.querySelector("form");

inputData.addEventListener("submit", (e) => {
  e.preventDefault();
  let fName = e.target.children[0].value,
    lName = e.target.children[1].value,
    country = e.target.children[2].value,
    score = e.target.children[3].value;

  if (fName === "" || lName === "" || country === "" || score === "") {
    error.style.display = "block";
  } else {
    error.style.display = "none";
    let newPerson = {
      firstName: fName.toUpperCase(),
      lastName: lName.toUpperCase(),
      Country: country.toUpperCase(),
      Score: score,
    };
    details.push(newPerson);
    e.target.children[0].value = "";
    e.target.children[1].value = "";
    e.target.children[2].value = "";
    e.target.children[3].value = "";
    addPeople();
  }
});

let deleteButtons = document.querySelectorAll(".delete");
deleteButtons.forEach((e) => {
  e.addEventListener("click", () => {
    e.parentElement.remove();
  });
});


let changeScore = document.querySelectorAll(".incDec");

let addOrRemove = (i, newScore) => {
  console.log("hello");
  console.log(newScore);
  if (i % 2 == 0) {
    newScore += 5;
  } else {
    newScore -= 5;
  }
  details[Math.ceil(i / 2)].Score = newScore;
  addPeople();
  i++;
}

changeScore.forEach((element, i) => {
  let newScore = parseInt(details[Math.ceil(i / 2)].Score);
  element.addEventListener("click", addOrRemove(i, newScore));
});

