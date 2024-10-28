let wordList = ["hej", "de", "lorem", "ipsum", "blä", "kom", "då", "lilla", "skit", "korv"];
getRandomWord(wordList);


function getRandomWord(wordList) {
    let randomWord = Math.floor(Math.random() * wordList.length);
    return wordList.splice(randomWord, 1)[0];    
}

console.log(getRandomWord(wordList)); 
console.log(wordList); 



//loopa igenom ordet för att de som någon bokstav stämmer överens
document.addEventListener('keydown', (event) =>{
    console.log('du gissade på ' + event.key);
    compareLetters(event.key)
})

function compareLetters(randomWord, event) {
    let wordHangingMan = randomWord
    let letterGuess = event
    for (const letter of wordHangingMan) {
        if (letterGuess == letter) {
            console.log("Rätt!")

        } else {
            console.log('Du gissade fel! Försök igen!')
        }
    }
}