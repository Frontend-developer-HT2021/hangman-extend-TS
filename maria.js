document.addEventListener('DOMContentLoaded', async () => {
    const wordArray = await loadWords(); // Vänta tills ordlistan är laddad
    const randomWord = getRandomWord(wordArray); // Slumpa ett ord efter att listan laddats
    console.log(`Random word: ${randomWord}`);
    displayLetterContainers(randomWord, letterPosition)
    
    document.addEventListener('keydown', (event) => {
        console.log('Du gissade på: ' + event.key);
        compareLetters(randomWord, event.key);
    });
});

const letterPosition = document.querySelectorAll('.correct-letter-container-letter')

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
    letterPosition.forEach(element => element.style.display = "none");

    for (let letterContainerIndex = 0; letterContainerIndex < randomWord.length; letterContainerIndex++) {
        letterPosition[letterContainerIndex].style.display = "block"
    }

}

//loopa igenom ordet för att de som någon bokstav stämmer överens
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
        indices.forEach(i => {
            letterPosition[i].innerText = letterGuess;
        })
    } else {
        console.log('Du gissade fel, försök igen!');
    }
}
