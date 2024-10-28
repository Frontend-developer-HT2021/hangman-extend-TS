let wordList = [
  "hej",
  "de",
  "lorem",
  "ipsum",
  "blä",
  "kom",
  "då",
  "lilla",
  "skit",
  "korv",
];

let newWord = "";

const letterNoExistContainer = document.querySelector(
  ".incorrect-letter-container-letter"
);
const ground = document.querySelector("#ground");
const head = document.querySelector("#head");
const body = document.querySelector("#body");
const arms = document.querySelector("#arms");
const legs = document.querySelector("#legs");
const scaffold = document.querySelector("#scaffold");
// const existingWordBox = document.querySelector(
//   ".correct-letter-container-letter"
// );
//   existingWordBox.innerHTML = `<div class="correct-letter-container-letter"></div>`
// när randomword körs, så skapas ett word newWord, .length på den ska in i antal
//ordboxar så de kmr ut på skärmen
function getRandomWord(wordList) {
  let randomNumber = Math.floor(Math.random() * wordList.length);
  let randomWord = wordList.splice(randomNumber, 1)[0];
  newWord = randomWord;

  return newWord;
}
getRandomWord(wordList);
console.log(newWord);

// console.log(typeof getRandomWord(wordList));

//loopa igenom ordet för att de som någon bokstav stämmer överens
function handleSameLetter() {
  //loop här

  document.addEventListener("keydown", (event) => {
    letter = event.key;
    console.log(letter);
    if (newWord.includes(letter)) {
      console.log("ja");
    } else {
      console.log("nej");
      letterNoExistContainer.innerHTML += `<p>${letter}</p>`;
      ground.style.display = "block";
      // hur gör jag för o loopa dettta hela tiden?
    }
  });
}
handleSameLetter();
