document.addEventListener('DOMContentLoaded', function () {
    // Fetch the daily Bible verse
    fetchDailyVerse();
});

async function fetchDailyVerse() {
    try {
        const url = 'https://beta.ourmanna.com/api/v1/get?format=json&order=daily';
        const options = { method: 'GET', headers: { accept: 'application/json' } };

        // Make a GET request using fetch (provided by the script tag)
        const response = await fetch(url, options);

        // Check if the response status is OK (200)
        if (response.ok) {
            const data = await response.json();

            // Extract verse text and reference
            const verseText = data.verse.details.text;
            const verseReference = data.verse.details.reference;

            // Display the verse on the webpage
            displayVerse(verseText, verseReference);
        } else {
            console.error('Error fetching daily Bible verse. Status:', response.status);
        }
    } catch (error) {
        console.error('Error fetching daily Bible verse:', error);
    }
}

function displayVerse(text, reference) {
    // Update the HTML elements with the fetched verse
    document.getElementById('verseText').innerText = text;
    document.getElementById('verseReference').innerText = reference;
}
