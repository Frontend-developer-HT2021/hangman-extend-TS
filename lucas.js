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