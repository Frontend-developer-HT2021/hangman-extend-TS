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



//loopa igenom ordet för att de som någon bokstav stämmer överens

function compareLetters(word, letterGuess) {
    let found = false

    
    console.log(`Hangingman-ord: ${word}`);
    
    for (const letter of word) {
        if (letterGuess == letter) {
            found = true;
            console.log(letterGuess==letter);
            }
        }
        
        if (found) {
            console.log('Rätt!');        
        } else {
            console.log('Du gissade fel, försök igen!');
            //x.innerText = letterGuess
        }
    }
