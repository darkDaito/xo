let createLobby = document.getElementsByClassName("create")[0];
let lobbyCode = document.getElementsByClassName("lobby__code")[0];
let shuffle = document.getElementsByClassName("shuffle")[0];
let enterCode = document.getElementsByClassName("enter__code")[0];
let joinLobby = document.getElementsByClassName("join")[0];


function createToken() {
  let tokenNumbers = Math.floor(Math.random() * 8999999) + 1000000;
  let tokenLetters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
  ];
  let token =
    tokenLetters[Math.floor(Math.random() * tokenLetters.length)] +
    tokenNumbers;
  return token;
}
let token = createToken();

joinLobby.addEventListener("click", function () {
  let code = enterCode.value;
  location.href = "/id/o/" + code;
});

createLobby.addEventListener("click", () => {
  let code = lobbyCode.value;
  fetch("/createLobby/" + code + "/" + token)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      location.href = "/id/x/" + code;
    });
});

function getRandomCode() {
  let randomCode = Math.floor(Math.random() * 8999999) + 1000000;
  lobbyCode.value = randomCode;
}

getRandomCode();

shuffle.addEventListener("click", () => {
  getRandomCode();
});




