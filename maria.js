let wordList = ["hej", "de", "lorem", "ipsum", "blä", "kom", "då", "lilla", "skit", "korv"];
getRandomWord(wordList);


function getRandomWord(wordList) {
    let randomWord = Math.floor(Math.random() * wordList.length);
    return wordList.splice(randomWord, 1)[0];    
}

console.log(getRandomWord(wordList)); 
console.log(wordList); 

