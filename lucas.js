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
