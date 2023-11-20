/* tady bude tvůj kód */

const movieList = document.querySelector('#movies');
const ascButton = document.querySelector('.button--ascending');
const descButton = document.querySelector('.button--descending');

//komponenta pro vykreslení filmu
const Movie = ({ posterUrl, title, url, year, genres }) => {
  return `
        <div class="movie">
            <img class="movie__img" src="${posterUrl}" alt="${title}">
            <h2 class="movie__title"><a href="${url}">${title}</a></h2>
            <p class="movie__year">${year}</p>
            <p class="movie__genre">${genres.join(', ')}</p>
        </div>
`;
};

//fce pro jednoho filmu do komponenty Movie
const showMovies = (movies) => {
  movies.forEach((movie) => {
    movieList.innerHTML += Movie(movie);
  });
};

// stáhnutí dat z API
const response = await fetch(
  'https://apps.kodim.cz/daweb/trening-api/apis/movie-api/movies',
);
const movies = await response.json();
movies.sort((a, b) => a.title.localeCompare(b.title));
showMovies(movies);

//vyčištění seznamu filmu
const clearMovieList = () => {
  movieList.innerHTML = '';
};

//fce pro vzestupný seřazení
const ascending = () => {
  movies.sort((a, b) => a.year - b.year);
  clearMovieList();
  showMovies(movies);
};

//fce pro sestupný seřazení
const descending = () => {
  movies.sort((a, b) => b.year - a.year);
  clearMovieList();
  showMovies(movies);
};

//posluchač události na tlačítka
ascButton.addEventListener('click', ascending);
descButton.addEventListener('click', descending);
