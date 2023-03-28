// Defining the API endpoint and get references to the DOM elements
const apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const searchBtn = document.getElementById('search-btn');
const inputField = document.getElementById('inp-word');
const resultDiv = document.getElementById('result');
const soundBtn = document.getElementById('sound');

// Attaching an event listener to the search button
searchBtn.addEventListener('click', () => {
  // Geting the word entered by the user
  const word = inputField.value;

  // Fetching the word definition from the API
  fetch(`${apiUrl}${word}`)
    .then((response) => response.json())
    .then((data) => {
      // Extracting the necessary information from the API response
      const partOfSpeech = data[0].meanings[0].partOfSpeech;
      const phonetic = data[0].phonetics[0].text;
      const definition = data[0].meanings[0].definitions[0].definition;
      const example = data[0].meanings[0].definitions[0].example || '';

      // Updating the UI with the word details
      resultDiv.innerHTML = `
        <div class="word">
          <h3>${word}</h3>
          <button onclick="playSound()">
            <i class="fas fa-volume-up"></i>
          </button>
        </div>
        <div class="details">
          <p>${partOfSpeech}</p>
          <p>/${phonetic}/</p>
        </div>
        <p class="word-meaning">${definition}</p>
        <p class="word-example">${example}</p>
      `;

      // Updating the audio source with the word pronunciation
      soundBtn.setAttribute('src', `https:${data[0].phonetics[0].audio}`);
    })
    .catch(() => {
      // Displaying an error message if the API call fails
      //   resultDiv.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
      swal(
        'Oops!',
        'We do not have a definition for the word you searched for!',
        'error',
        {
          button: 'Try Another',
        }
      );
    });
});

// Function to play the word pronunciation
function playSound() {
  soundBtn.play();
}
