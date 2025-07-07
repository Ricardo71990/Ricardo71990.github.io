// API code referenced from here: https://www.w3schools.com/js/js_api_intro.asp
// and here for giphy specifics: https://developers.giphy.com/docs/api/endpoint#action-register

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const results = document.getElementById('results');

// Giphy API key
const API_KEY = 'stKg5YpR5ysDIlSiyEsJHbxzjpQmUjKr';

// Function to search for GIFs
function searchGifs() {
    const searchTerm = searchInput.value.trim();
    results.innerHTML = '';

    // API request
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=12`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayGifs(data.data);
        });
}

// Display results
function displayGifs(gifs) {
    gifs.forEach(gif => {
        // Create a container for each
        const gifDiv = document.createElement('div');
        gifDiv.className = 'gif-item';
        
        // GIF image URL
        const imageUrl = gif.images.fixed_height.url;
        
        // title
        const title = gif.title || 'Untitled GIF';
        
        // username
        const username = gif.username || 'Unknown';
        
        // html for display
        gifDiv.innerHTML = `
            <img src="${imageUrl}" alt="${title}">
            <div class="gif-info">
                <div class="gif-title">${title}</div>
                <div class="gif-user">by ${username}</div>
            </div>
        `;
        
        // Add to results
        results.appendChild(gifDiv);
    });
}

// Event listeners
searchButton.addEventListener('click', searchGifs);
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchGifs();
    }
});