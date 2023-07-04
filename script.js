const movieSearchBox = document.querySelector('#movie-search-box'); //Input box
const searchList = document.querySelector('#search-list'); // Autocomplete box
const resultGrid = document.querySelector('#result-grid'); // Result container
// import { getData } from "./result/result";


//Show Movie in page

const displayMovieDetails = (details) =>
 {
    console.log(resultGrid)
    //Add movie to Page
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

 // Show the "Add to Favorites" button
 addToFavBtn.style.display = 'block';

}
// Load only clicked movie detail

async function getData(movieID) {
    const result = await fetch(`http://www.omdbapi.com/?i=${movieID}&page=1&apikey=ad49cc7e`); //Base URL
    const movieDetails = await result.json(); //Movie Details from server
    displayMovieDetails(movieDetails); //Display the movie
    // loadMovieButton.addEventListener('click', function() {
    //     getData(movieID);
    // });
console.log(result,movieID)
}
// Set default data to localstorage
if(!localStorage.getItem('favMovies')){
    let favMovies = [];
    localStorage.setItem('favMovies',JSON.stringify(favMovies));
}
// Load movies from API
async function loadMovies(searchTerm) {
    const URL = `http://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=ad49cc7e`; //Base URL
    const res = await fetch(`${URL}`); //Fetch data from server
    const data = await res.json(); //Arrange data to readable format (JSON)
    // Check if everything is Okay
    if (data.Response == "True") {
        displayMovieList(data.Search); //then display the autocomplete box
    }
}

//Find movies as you type any character
const findMovies = () => {
    let searchTerm = (movieSearchBox.value).trim(); // Get typed value and remove whitespace
    //Perform operation only if any character is present inthe search box
    if (searchTerm.length > 0) {
        searchList.classList.remove('hide-search-list'); // show the autocomplete box
        loadMovies(searchTerm); //Load movies from API
    } else {
        searchList.classList.add('hide-search-list'); // Hide the autocomplete box if no character is present in the search box
    }
}

// Show the matched movies in the autocomplete box
const displayMovieList = (movies) => {
    searchList.innerHTML = ""; //clear the list of movies
    //Get all matching movies related to typed charactes
    for (let idx = 0; idx < movies.length; idx++) {
        let movieListItem = document.createElement('div'); // Create a Div
        movieListItem.dataset.id = movies[idx].imdbID; // Set Id to each movie result
        movieListItem.classList.add('search-list-item'); //Add CSS
        //Set poster image address
        if (movies[idx].Poster != "N/A") {
            moviePoster = movies[idx].Poster; // Set found image address
        } else {
            moviePoster = "image_not_found.png"; //If image not found then set default image
        }
        //Add a matched result to list
        movieListItem.innerHTML = `<div class="search-item-thumbnail"> 
        <img src="${moviePoster}" alt="movie">
    </div>

    <div class="search-item-info">
        <h3>${movies[idx].Title}</h3>
        <p>${movies[idx].Year}</p>
    </div>`;

        searchList.appendChild(movieListItem); //Add a matched movie to autocomplete list
    }
    loadMovieDetails(); //Load movie details
}

//Load movie details 
const loadMovieDetails = () => {
    const searchListMovies = searchList.querySelectorAll('.search-list-item'); //Select all Matched movies
    //Add all matched movies to autmocomplete box
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
         
            
            //searchlist class
            searchList.classList.add('hide-search-list'); //Add CSS
            movieSearchBox.value = ""; //Reset search box
            localStorage.setItem('movieID',movie.dataset.id); // Set movie id to localstorage for later use
            let dir = window.location.origin + "/YMDB/result/resultPage.html"; // Custom URL for result page
           //window.location.href = "https://github.com/yuvraj00001/YMDB/blob/main/result/result.js"
            //Redirect to a new page
   //display movie details
            getData(movie.dataset.id)
        })
    })
}

// EventListners
window.addEventListener('click', (e) => {
    if(e.target.className != 'form-control'){
        searchList.classList.add('hide-search-list'); // Hide autocomplete box if user click anywhere other than autocomplete box
        
    }
})


movieSearchBox.addEventListener('keyup', findMovies);
movieSearchBox.addEventListener('click', findMovies);
addToFavBtn.addEventListener('click', addToFav);

