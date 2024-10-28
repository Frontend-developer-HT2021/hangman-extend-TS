document.addEventListener('DOMContentLoaded', async () => {
    const wordArray = await loadWords(); // Vänta tills ordlistan är laddad
    const randomWord = getRandomWord(wordArray); // Slumpa ett ord efter att listan laddats
    console.log(`Random word: ${randomWord}`);
    
    document.addEventListener('keydown', (event) => {
        console.log('Du gissade på: ' + event.key);
        compareLetters(randomWord, event.key);
    });
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
}

document.getElementById('show-popup-button').addEventListener('click', function() {
    console.log("Button clicked");
    showGameOverPopup(false); // Ändra till true för att testa vinst
});

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

const allItems = [ground, scaffold, head, body, arms, legs]

function compareLetters(word, letterGuess) {
    let found = false
    let indices = []

    

for (let index = 0; index < word.length; index++){
    const letter = word[index]

    if (letterGuess === letter) {
        found = true;
        indices.push(index)
    }
}

if (found) {
    console.log('Rätt!');        
} else {
    console.log('Du gissade fel, försök igen!');
    const nextItem = allItems.shift();
        if (nextItem) {
          nextItem.style.display = "block";
}

console.log(indices);
}
}