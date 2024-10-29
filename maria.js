
const startButton = document.querySelector(".start-button");
const wrongLetterArray = [];
const notAcceptedCharsArray = [];
const letterNoExistContainer = document.querySelector(".incorrect-letter-container-letter");
const letterGuessMessage = document.querySelector(".letter-message"); //NY
const letterPosition = document.querySelectorAll('.correct-letter-container-letter')
letterPosition.forEach(element => element.style.display = "none");


const ground = document.querySelector("#ground");
const scaffold = document.querySelector("#scaffold");
const head = document.querySelector("#head"); 
const body = document.querySelector("#body"); 
const arms = document.querySelector("#arms");
const legs = document.querySelector("#legs"); 
const allItems = [ground, scaffold, head, body, arms, legs]
let rightGuesses = [];

ground.style.display = "none";
scaffold.style.display = "none";
head.style.display = "none";
body.style.display = "none";
arms.style.display = "none";
legs.style.display = "none";
startButton.style.display = "block";



startButton.addEventListener('click', startGame, async () => {
    const wordArray = await loadWords(); 
    const randomWord = getRandomWord(wordArray); 
    console.log(`Random word: ${randomWord}`);
    return randomWord
});


async function loadWords() {
    try {
        const response = await fetch('ord.txt'); // Hämtar textfilen
        const text = await response.text(); // Hämtar textinnehållet
        const wordsArray = text.split('\n').map(word => word.trim()).filter(word => word); // Skapa en array av ord
        
        return wordsArray    
    } catch (error) {
        console.error('Fel vid hämtning av ord:', error);
    }
}

function startGame() {
    startButton.classList.remove('hidden');
    startButton.style.display = 'none';
    
    loadWords().then(wordsArray => {
        const randomWord = getRandomWord(wordsArray); 
        console.log("Random word:", randomWord);
        
        displayLetterContainers(randomWord);

        document.addEventListener('keydown', (event) => {
            console.log('Du gissade på: ' + event.key);
            compareLetters(randomWord, event.key);
        });
        
    }).catch(error => {
        console.error("Failed to load words:", error);
    });
}

function getRandomWord(wordArray) {
    let randomIndex = Math.floor(Math.random() * wordArray.length); 
    return wordArray.splice(randomIndex, 1)[0];  
}

function displayLetterContainers(randomWord) {
    for (let letterContainerIndex = 0; letterContainerIndex < randomWord.length; letterContainerIndex++) {
        letterPosition[letterContainerIndex].style.display = "block"
    }
}

function compareLetters(word, letterGuess) {
    let found = false
    let indices = []
    const notAcceptedChars = "!@#$%^&*()+=-[]\\';,./{}|\":<>?";


    for (let i = 0; i < notAcceptedChars.length; i++) {
    notAcceptedCharsArray.push(notAcceptedChars[i]);
    }

    for (let index = 0; index < word.length; index++){
        const letter = word[index]

        if (letterGuess === letter) {
            found = true;
            indices.push(index) 
        }
    }
    
    if (found && rightGuesses.includes(letterGuess)) {
        letterGuessMessage.innerText = `${letterGuess.toUpperCase()} är redan vald, prova en annan bokstav!` //NY

    } else if (found) {
        letterGuessMessage.innerText = `RÄTT! Fortsätt så!`//NY
        indices.forEach(i => {
        letterPosition[i].innerText = letterGuess.toUpperCase();})
        rightGuesses.push(letterGuess)                
        
    } else if (notAcceptedCharsArray.includes(letterGuess)) {
        letterGuessMessage.innerText = `Inga specialtecken eller siffror! Prova igen!` //NY
        
    } else if (wrongLetterArray.indexOf(letterGuess) === -1) {
        wrongLetterArray.push(letterGuess);
        letterGuessMessage.innerText = `${letterGuess.toUpperCase()} finns inte med i ordet, prova igen!` //NY
        letterNoExistContainer.innerHTML += `<p>${letterGuess.toUpperCase()}</p>`;
        hangingMan() //NY
        
    } else {
        letterGuessMessage.innerText = `${letterGuess.toUpperCase()} är redan vald, prova en annan bokstav!` //NY
    }
    
    examineWordGuess(rightGuesses, word) //NY
}

function examineWordGuess(rightGuesses, word) {//NY
    if(rightGuesses.length === word.length) {
        showGameOverPopup('gamewon')
    } 
}

function hangingMan() {//NY
    const nextItem = allItems.shift();
    if (nextItem && allItems.length == 0) {
        nextItem.style.display = "block";
        showGameOverPopup ('gamelost')
    } else if (nextItem) {
    nextItem.style.display = "block";                
    }
}

//TA BORT
/* function endGame(hasWon) {
    console.log("endGame called");
    showGameOverPopup(hasWon);
} */ 

function showGameOverPopup(gameOver) {
console.log("showGameOverPopup called");
const popup = document.querySelector('.game-over-popup');
const messageElement = document.getElementById('game-over-message');
const popupContent = document.querySelector('.popup-content');

if (gameOver === 'gamewon') {
    messageElement.textContent = "Grattis, du vann! 🎉";
    popupContent.classList.add('popup__content--win');
    popupContent.classList.remove('popup__content--loss');
} else if (gameOver === 'gamelost'){
    messageElement.textContent = "Tyvärr, du förlorade. 😢";
    popupContent.classList.add('popup__content--loss');
    popupContent.classList.remove('popup__content--win'); 
} else {
    console.log('errrrror')
}


popup.classList.remove('hidden');
}