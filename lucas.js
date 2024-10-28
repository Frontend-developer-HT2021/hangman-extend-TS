// Vänta tills DOM har laddats
document.addEventListener('DOMContentLoaded', () => {
    loadWords();
});

// Funktion för att läsa filen
async function loadWords() {
    try {
        const response = await fetch('ord.txt'); // Hämtar textfilen
        const text = await response.text(); // Hämtar textinnehållet
        const wordsArray = text.split('\n').map(word => word.trim()).filter(word => word); // Skapa en array av ord

        // Slumpa fram ett ord
        const randomIndex = Math.floor(Math.random() * wordsArray.length);
        const randomWord = wordsArray[randomIndex];

        // Spara det slumpade ordet i localStorage
        localStorage.setItem('randomWord', randomWord);

        // Logga det slumpade ordet och antalet ord
        console.log(`Slumpar ord: ${randomWord}`);
        console.log(`Totalt antal ord: ${wordsArray.length}`); // Logga antalet ord
    } catch (error) {
        console.error('Fel vid hämtning av ord:', error);
    }
}

// För att hämta och använda det sparade ordet senare
function getSavedWord() {
    const savedWord = localStorage.getItem('randomWord');
    console.log(`Sparat ord: ${savedWord}`);
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