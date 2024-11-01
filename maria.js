const startButton = document.querySelector(".start-button");
const wrongLetterArray = [];
const acceptedChars =
  "abcdefghijklmnopqrstuvwxyzåäöABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ";
const acceptedCharsArray = [];
let wrongLetterArray = [];
const letterNoExistContainer = document.querySelector(".incorrect-letter-container-letter");
const letterGuessMessage = document.querySelector(".letter-message");
const letterPosition = document.querySelectorAll('.correct-letter-container-letter')
letterPosition.forEach(element => element.style.display = "none");
const resetBtn = document.querySelector('.start-over')

const ground = document.querySelector("#ground");
const scaffold = document.querySelector("#scaffold");
const head = document.querySelector("#head");
const body = document.querySelector("#body");
const arms = document.querySelector("#arms");
const legs = document.querySelector("#legs");
const allItems = [ground, scaffold, head, body, arms, legs];
let rightGuesses = [];

ground.style.display = "none";
scaffold.style.display = "none";
head.style.display = "none";
body.style.display = "none";
arms.style.display = "none";
legs.style.display = "none";
startButton.style.display = "block";



resetBtn.addEventListener('click', resetGame)
startButton.addEventListener('click', startGame, async () => {
    const wordArray = await loadWords(); 
    const randomWord = getRandomWord(wordArray); 
    console.log(`Random word: ${randomWord}`);
    return randomWord
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

function startGame() {
/*     startButton.classList.remove('hidden'); */
    startButton.style.visibility = 'hidden';

  loadWords()
    .then((wordsArray) => {
      const randomWord = getRandomWord(wordsArray);
      console.log("Random word:", randomWord);

      displayLetterContainers(randomWord);

      document.addEventListener("keydown", (event) => {
        console.log("Du gissade på: " + event.key);
        compareLetters(randomWord, event.key);
      });
    })
    .catch((error) => {
      console.error("Failed to load words:", error);
    });
}

function handleKeydown(event) {
  console.log("Du gissade på: " + event.key);
  compareLetters(currentWord, event.key);
}

function getRandomWord(wordArray) {
  let randomIndex = Math.floor(Math.random() * wordArray.length);
  return wordArray.splice(randomIndex, 1)[0];
}

function displayLetterContainers(randomWord) {
  for (
    let letterContainerIndex = 0;
    letterContainerIndex < randomWord.length;
    letterContainerIndex++
  ) {
    letterPosition[letterContainerIndex].style.display = "flex";
    letterPosition[letterContainerIndex].style.justifyContent = "center";
    letterPosition[letterContainerIndex].style.alignItems = "center";
  }
}

function compareLetters(word, letterGuess) {
  let found = false;
  let indices = [];

  for (let i = 0; i < acceptedChars.length; i++) {
    acceptedCharsArray.push(acceptedChars[i]);
  }

  for (let index = 0; index < word.length; index++) {
    const letter = word[index];

    if (letterGuess === letter) {
      found = true;
      indices.push(index);
    }
  }

    if (acceptedCharsArray.includes(letterGuess)) {
        if (found && rightGuesses.includes(letterGuess)) {
            letterGuessMessage.innerText = `${letterGuess.toUpperCase()} är redan vald, prova en annan bokstav!` //NY

        } else if (found) {
            letterGuessMessage.innerText = `RÄTT! Fortsätt så!`
            indices.forEach(i => {
            letterPosition[i].innerText = letterGuess.toUpperCase();
            rightGuesses.push(letterGuess) 
        })            
            
        } else if (wrongLetterArray.indexOf(letterGuess) === -1) {
            wrongLetterArray.push(letterGuess);
            letterGuessMessage.innerText = `${letterGuess.toUpperCase()} finns inte med i ordet, prova igen!` //NY
            letterNoExistContainer.innerHTML += `<p>${letterGuess.toUpperCase()}</p>`;
            hangingMan(word) 
            
        } else {
            letterGuessMessage.innerText = `${letterGuess.toUpperCase()} är redan vald, prova en annan bokstav!` //NY
        }
    } else {
         letterGuessMessage.innerText = `Inga specialtecken eller siffror! Prova igen!`
    }    

    examineWordGuess(rightGuesses, word) 

}

function examineWordGuess(rightGuesses, word) {
    if(rightGuesses.length === word.length) {
        console.log(rightGuesses, word.length);
        
        showGameOverPopup('gamewon')
    } 
}

function hangingMan(word) {
  const nextItem = allItems.shift();
  if (nextItem && allItems.length === 0) {
    nextItem.style.display = "block";
    showGameOverPopup("gamelost", word);
  } else if (nextItem) {
    nextItem.style.display = "block";
  }
}

function showGameOverPopup(hasWon, randomWord) {
  console.log("showGameOverPopup called");
  const popup = document.querySelector(".game-over-popup");
  const messageElement = document.getElementById("game-over-message");
  const popupContent = document.querySelector(".popup-content");
  const rightWordElement = document.getElementById("right-word");

  if (hasWon === "gamewon") {
    messageElement.textContent = "Grattis, du vann! 🎉";
    popupContent.classList.add("popup__content--win");
    popupContent.classList.remove("popup__content--loss");
  } else if (hasWon === "gamelost") {
    messageElement.textContent = "Tyvärr, du förlorade. 😢";
    popupContent.classList.add("popup__content--loss");
    popupContent.classList.remove("popup__content--win");
  } else {
    console.log("ERRRRROR");
  }
  rightWordElement.textContent = randomWord;
  popup.classList.remove("hidden");
}

// Återställ spelet till startläget
function resetGame() {
  console.log("Resetting game...");

  // Dölj game-over popup
  const popup = document.querySelector(".game-over-popup");
  popup.classList.add("hidden");

  startButton.classList.remove("hidden");
  startButton.style.display = "block";

  letterPosition.forEach((element) => {
    element.style.display = "none";
    element.innerText = "";
  });

  // Rensa felaktiga gissningar
  letterNoExistContainer.innerHTML = "";

  // Återställ alla delar av galgen
  ground.style.display = "none";
  scaffold.style.display = "none";
  head.style.display = "none";
  body.style.display = "none";
  arms.style.display = "none";
  legs.style.display = "none";
  allItems = [ground, scaffold, head, body, arms, legs];

  // Återställ spelets statusvariabler
  wrongLetterArray.length = 0;

  letterGuessMessage.innerText = "";
  rightGuesses.length = 0;
  wrongLetterArray = [];
  console.log(rightGuesses, wrongLetterArray);

  console.log("Game reset complete.");
}
