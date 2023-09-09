const inputBox = document.querySelector(".inputBox");
const searchBtn = document.querySelector(".searchBtn");
const movieDiv = document.querySelector(".movies-div");
const movieDetailsDiv = document.querySelector(".movies-details-div");

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  fetchMovies();
})
const fetchMovies = async (query) => {
  query = inputBox.value.trim();
  const data = await fetch(`http://www.omdbapi.com/?s=${query}&page=2&apikey=a58411ff`)
  const response = await data.json(); 
  response.Search.forEach((movie) => {
    const fetchedMovies = document.createElement('div');
    fetchedMovies.className = 'fetchedMovies';
    fetchedMovies.innerHTML =
      `
        <img src="${movie.Poster}">
      `
    fetchedMovies.addEventListener('mouseover', () => {
      moviesPopUpDetails(movie);
    })

    fetchedMovies.addEventListener('mouseout', () => {
      moviesPopUpDetailsClose();
    })
    movieDiv.appendChild(fetchedMovies)
  })

}
const moviesPopUpDetails = (movie) => {
  movieDetailsDiv.innerHTML = `
    <h2 class="movie-title">${movie.Title}</h2>
    <h3 class="movie-type"> Type: ${movie.Type}</h3>
    <h3 class="movie-year"> Year: ${movie.Year}</h3>
    <h3 class="movie-imdb"> IMDB: ${movie.imdbID}</h3>
    `
  movieDetailsDiv.style.display = "block";
  fetchMovies.appendChild(movieDetailsDiv);
}

const moviesPopUpDetailsClose = () => {
  movieDetailsDiv.style.display = "none"
}