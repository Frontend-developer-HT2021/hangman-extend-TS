let wordList = ["hej", "de", "lorem", "ipsum", "blä", "kom", "då", "lilla", "skit", "korv"];
const randomWord = getRandomWord(wordList)

document.addEventListener('keydown', (event) =>{
    console.log('du gissade på ' + event.key);
    compareLetters(randomWord, event.key)
})



function getRandomWord(wordList) {
    let randomIndex = Math.floor(Math.random() * wordList.length); 
    return wordList.splice(randomIndex, 1)[0];  
}

console.log(randomWord); 



//loopa igenom ordet för att de som någon bokstav stämmer överens

function compareLetters(word, letterGuess) {
    let found = false

    
    console.log(`Hangingman-ord: ${word}`);
    
    for (const letter of word) {
        if (letterGuess == letter) {
            found = true;
            }
        }
    
    if (found) {
        console.log('Rätt!');        
    } else {
        console.log('Du gissade fel, försök igen!');
        //x.innerText = letterGuess
    }
    }
