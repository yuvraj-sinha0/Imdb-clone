let movieID = localStorage.getItem('movieID'); // Get movie ID from localstorage
const loadMovieButton = document.querySelector('#loadMovieButton');
const addToFavBtn = document.querySelector('#addToFav'); // Add to fav Button

let favMovies = JSON.parse(localStorage.getItem('favMovies')); // Get details of list of movies stored in localstorage
const resultGrid = document.querySelector('#result-grid'); // movie container

// Show Movie on the page
const displayMovieDetails = (details) => {
  console.log(details);
  // Add movie to Page
  resultGrid.innerHTML = `<div class="movie-poster">
    <img src="${(details.Poster != 'N/A') ? details.Poster : '../image_not_found.png'}" alt="movie-poster">
  </div>

  <div class="movie-info">
    <h3 class="movie-title">${details.Title}</h3>
    <ul class="movie-misc-info">
      <li class="year">Year: ${details.Year}</li>
      <li class="rated">Ratings: ${details.Rated}</li>
      <li class="released">Released: ${details.Released}</li>
    </ul>

    <p class="genre"><b>Genre: </b>${details.Genre}</p>
    <p class="writer"><b>Writer: </b> ${details.Writer}</p>
    <p class="actors"><b>Actors: </b> ${details.Actors}</p>
    <p class="plot"><b>Plot: </b> ${details.Plot}</p>
    <p class="language"><b>Language: </b> ${details.Language}</p>
    <p class="awards"><b>Awards: <i class="fa-solid fa-award"></i></b> ${details.Awards}</p>
  </div>`;
};

// Load only clicked movie detail
async function getData(movieID) {
  const result = await fetch(`http://www.omdbapi.com/?i=${movieID}&page=1&apikey=ad49cc7e`); // Base URL
  const movieDetails = await result.json(); // Movie Details from server
  displayMovieDetails(movieDetails); // Display the movie
  console.log(result, movieID);
}

console.log(movieID);
getData(movieID);

// Set btn text to already added if it is there in fav-list
if (movieID && favMovies.includes(movieID)) {
  addToFavBtn.textContent = 'Already Added To Favourites';
}

// Favourite Button
const addToFav = () => {
    addToFavBtn.textContent = 'Added To Favourites';
    // Event listener for Add to Favorites button

    // Check if movie is already added to the list
    if (favMovies.includes(movieID)) {
      addToFavBtn.textContent = 'Already Added To Favourites';
    } else {
      favMovies.push(movieID); // Add movie to favourite list
      localStorage.setItem('favMovies', JSON.stringify(favMovies)); // Set data to localstorage
    }
  };

// OnLoad -- Run this command only if it has any data to show.
if (movieID) {
  getData(movieID);
}

// Event listeners
addToFavBtn.addEventListener('click', addToFav);
loadMovieButton.addEventListener('click', function() {
  getData(movieID);
addToFavBtn.addEventListener('click', addToFav);
});
