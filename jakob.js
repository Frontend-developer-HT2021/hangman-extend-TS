// let wordList = [
//   "hej",
//   "de",
//   "lorem",
//   "ipsum",
//   "blä",
//   "kom",
//   "då",
//   "lilla",
//   "skit",
//   "korv",
// ];

// let newWord = "";

// const letterNoExistContainer = document.querySelector(
//   ".incorrect-letter-container-letter"
// );
// const ground = document.querySelector("#ground");
// const head = document.querySelector("#head");
// const body = document.querySelector("#body");
// const arms = document.querySelector("#arms");
// const legs = document.querySelector("#legs");
// const scaffold = document.querySelector("#scaffold");
// // const existingWordBox = document.querySelector(
// //   ".correct-letter-container-letter"
// // );
// //   existingWordBox.innerHTML = `<div class="correct-letter-container-letter"></div>`
// // när randomword körs, så skapas ett word newWord, .length på den ska in i antal
// //ordboxar så de kmr ut på skärmen
// function getRandomWord(wordList) {
//   let randomNumber = Math.floor(Math.random() * wordList.length);
//   let randomWord = wordList.splice(randomNumber, 1)[0];
//   newWord = randomWord;

//   return newWord;
// }
// getRandomWord(wordList);
// console.log(newWord);

// // console.log(typeof getRandomWord(wordList));

// //loopa igenom ordet för att de som någon bokstav stämmer överens
// function handleSameLetter() {
//   //loop här

//   document.addEventListener("keydown", (event) => {
//     letter = event.key;
//     console.log(letter);
//     if (newWord.includes(letter)) {
//       console.log("ja");
//     } else {
//       console.log("nej");
//       letterNoExistContainer.innerHTML += `<p>${letter}</p>`;
//       ground.style.display = "block";
//       // hur gör jag för o loopa dettta hela tiden?
//     }
//   });
// }
// handleSameLetter();

// //fixa så boksttäver kommer i fel box dem man svart fel på!
const letterNoExistContainer = document.querySelector(
  ".incorrect-letter-container-letter"
);
document.addEventListener("DOMContentLoaded", async () => {
  const wordArray = await loadWords(); // Vänta tills ordlistan är laddad
  const randomWord = getRandomWord(wordArray); // Slumpa ett ord efter att listan laddats
  console.log(`Random word: ${randomWord}`);

  document.addEventListener("keydown", (event) => {
    console.log("Du gissade på: " + event.key);
    compareLetters(randomWord, event.key);
  });
});

async function loadWords() {
  try {
    const response = await fetch("ord.txt"); // Hämtar textfilen
    const text = await response.text(); // Hämtar textinnehållet
    const wordsArray = text
      .split("\n")
      .map((word) => word.trim())
      .filter((word) => word); // Skapa en array av ord

    return wordsArray;
  } catch (error) {
    console.error("Fel vid hämtning av ord:", error);
  }
}

function getRandomWord(wordArray) {
  let randomIndex = Math.floor(Math.random() * wordArray.length);
  return wordArray.splice(randomIndex, 1)[0];
}

//loopa igenom ordet för att de som någon bokstav stämmer överens
const wrongLetterArray = [];
const notAcceptedCharsArray = [];
function compareLetters(word, letterGuess) {
  let found = false;

  const notAcceptedChars = "!@#$%^&*()+=-[]\\';,./{}|\":<>?";
  for (let i = 0; i < notAcceptedChars.length; i++) {
    // console.log(notAcceptedChars[i]);
    notAcceptedCharsArray.push(notAcceptedChars[i]);
  }

  console.log(`Hangingman-ord: ${word}`);

  for (const letter of word) {
    if (letterGuess === letter) {
      found = true;
      console.log("Rätt!");
    }
  }

  if (found) {
    console.log("Rätt!");
  } else if (notAcceptedCharsArray.includes(letterGuess)) {
    console.log("inga sånna");
  } else if (wrongLetterArray.indexOf(letterGuess) === -1) {
    wrongLetterArray.push(letterGuess);
    letterNoExistContainer.innerHTML += `<p>${letterGuess}</p>`;
  } else {
    alert(`${letterGuess} already exists, try another letter`);
  }

  console.log(wrongLetterArray);
}
