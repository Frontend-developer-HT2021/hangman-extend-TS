 function startGame() {
        startButton.classList.remove('hidden');
        startButton.style.display = 'none';
        
        // Ladda ord och starta spelet
        loadWords().then(wordsArray => {
            const randomWord = getRandomWord(wordsArray);  // Definiera randomWord efter att ha laddat ordlistan
            console.log("Random word:", randomWord);
            
            // Visa bokstavscontainrar
            displayLetterContainers(randomWord);
    
            // Lägg till en keydown-lyssnare för att hantera bokstavsgissningar
            document.addEventListener('keydown', (event) => {
                console.log('Du gissade på: ' + event.key);
                compareLetters(randomWord, event.key);
            });
            
        }).catch(error => {
            console.error("Failed to load words:", error);
        });
    }
    
const startButton = document.querySelector(".start-button");
const wrongLetterArray = [];
const notAcceptedCharsArray = [];
const letterPosition = document.querySelectorAll('.correct-letter-container-letter')
letterPosition.forEach(element => element.style.display = "none");
const letterNoExistContainer = document.querySelector(".incorrect-letter-container-letter");
const ground = document.querySelector("#ground");
const scaffold = document.querySelector("#scaffold");
const head = document.querySelector("#head"); 
const body = document.querySelector("#body"); 
const arms = document.querySelector("#arms");
const legs = document.querySelector("#legs"); 

ground.style.display = "none";
scaffold.style.display = "none";
head.style.display = "none";
body.style.display = "none";
arms.style.display = "none";
legs.style.display = "none";
startButton.style.display = "block";


const allItems = [ground, scaffold, head, body, arms, legs]

startButton.addEventListener('click', startGame, async () => {
    const wordArray = await loadWords(); // Vänta tills ordlistan är laddad
    const randomWord = getRandomWord(wordArray); // Slumpa ett ord efter att listan laddats
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

function getRandomWord(wordArray) {
    let randomIndex = Math.floor(Math.random() * wordArray.length); 
    return wordArray.splice(randomIndex, 1)[0];  
}

//visa rätt antal divvar för bokstäver
function displayLetterContainers(randomWord) {
    
    for (let letterContainerIndex = 0; letterContainerIndex < randomWord.length; letterContainerIndex++) {
        letterPosition[letterContainerIndex].style.display = "block"
    }
}


function compareLetters(word, letterGuess) { //loopa igenom ordet för att de som någon bokstav stämmer överens
    let found = false
    let indices = []
    
    const notAcceptedChars = "!@#$%^&*()+=-[]\\';,./{}|\":<>?";
    for (let i = 0; i < notAcceptedChars.length; i++) {
      // console.log(notAcceptedChars[i]);
      notAcceptedCharsArray.push(notAcceptedChars[i]);
    }
 
    for (let index = 0; index < word.length; index++){
        const letter = word[index]

        if (letterGuess === letter) {
            found = true;
            indices.push(index)  
        }
    }

    if (found) {
        console.log('Rätt!'); 
        indices.forEach(i => {
            letterPosition[i].innerText = letterGuess;})
    } else if (notAcceptedCharsArray.includes(letterGuess)) {
        console.log("inga sånna");
      } else if (wrongLetterArray.indexOf(letterGuess) === -1) {
        wrongLetterArray.push(letterGuess);
        letterNoExistContainer.innerHTML += `<p>${letterGuess}</p>`;


        console.log('Du gissade fel, försök igen!'); //LUCAS
        const nextItem = allItems.shift();
            if (nextItem) {
              nextItem.style.display = "block";
    } //LUCAS
        
    } else {
        alert(`${letterGuess} already exists, try another letter`);
    }
    console.log(wrongLetterArray);
}


function showGameOverPopup(hasWon) {
    console.log("showGameOverPopup called");
    const popup = document.querySelector('.game-over-popup');
    const messageElement = document.getElementById('game-over-message');
    const popupContent = document.querySelector('.popup-content');
    
    if (hasWon) {
        messageElement.textContent = "Grattis, du vann! 🎉";
        popupContent.classList.add('popup__content--win');
        popupContent.classList.remove('popup__content--loss');
    } else {
        messageElement.textContent = "Tyvärr, du förlorade. 😢";
        popupContent.classList.add('popup__content--loss');
        popupContent.classList.remove('popup__content--win'); 
    }
    popup.classList.remove('hidden');
}

function endGame(hasWon) {
    console.log("endGame called");
    showGameOverPopup(hasWon);
    resetGame();
}

// Återställ spelet till startläget
function resetGame() {
    console.log("Resetting game...");

    // Dölj game-over popup
    const popup = document.querySelector('.game-over-popup');
    popup.classList.add('hidden');

    // Visa startknappen
    startButton.classList.remove('hidden');
    startButton.style.display = 'block';

    // Återställ UI-element
    letterPosition.forEach(element => {
        element.style.display = "none"; // Dölj varje bokstavscontainer
        element.innerText = '';         // Återställ text
    });

    // Rensa felaktiga gissningar
    letterNoExistContainer.innerHTML = '';

    // Återställ alla delar av galgen
    allItems.forEach(item => {
        item.style.display = 'none';
    });

    // Återställ spelets statusvariabler
    wrongLetterArray.length = 0;

    console.log("Game reset complete.");
}