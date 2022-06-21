import FetchMovie from './api.fetch';
import articlesTpl from '../templates/card.hbs';
import { refs } from './refs';
import data from '../data-base/genres.json';

const fetchMovie = new FetchMovie();

loadPopularMovies();

async function loadPopularMovies() {
  const fetchPopMovies = await fetchMovie.fetchPopularFilms();
  const { results } = fetchPopMovies;
  const movies = createMovies(results, data);
  parseMarkup(movies);

  return movies;
}

export default function createMovies(returnedFetchMovies, genresAll) {
  return returnedFetchMovies.map(movie => {
    movie.release_date = movie.release_date
      ? movie.release_date.split('-')[0]
      : 'n/a';

    if (movie.genre_ids.length > 0 && movie.genre_ids.length <= 3) {
      movie.genres = movie.genre_ids
        .map(id => genresAll.filter(el => el.id == id))
        .flat();
    }

    console.log(returnedFetchMovies);

    if (movie.genre_ids.length > 3) {
      movie.genres = movie.genre_ids
        .map(id => genresAll.filter(el => el.id == id))
        .slice(0, 2)
        .flat()
        .concat({ name: 'Other' });
    }

    if (movie.genre_ids.length === 0) {
      movie.genres = [{ name: 'n/a' }];
    }

    return movie;
  });
}

function parseMarkup(films) {
  refs.collection.insertAdjacentHTML('beforeend', articlesTpl(films));
}
