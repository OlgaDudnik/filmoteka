import FetchMovie from './api.fetch';
import articlesTpl from '../templates/card.hbs';
import { refs } from './refs';
// const refs = {
//     cardColection: document.querySelector('.card__colection'),
// };

const fetchMovie = new FetchMovie();

loadPopularMovies();

async function loadPopularMovies() {
    const fetchPopMovies = await fetchMovie.fetchPopularFilms();
    const fetchGenres = await fetchMovie.fetchGenres();
    const { results } = fetchPopMovies;
    const { genres } = fetchGenres;

    const movies = createMovies(results, genres);
    parseMarkup(movies);

    return movies;
}

function createMovies(returnedFetchMovies, returnedFetchGenres) {
    return returnedFetchMovies.map(movie => {
        movie.release_date = movie.release_date ? movie.release_date.split('-')[0] : 'n/a';

        if (movie.genre_ids.length > 0 && movie.genre_ids.length <= 3) {
            movie.genres = movie.genre_ids
                .map(id => returnedFetchGenres.filter(el => el.id === id))
                .flat();
        }

        if (movie.genre_ids.length > 3) {
            movie.genres = movie.genre_ids
                .map(id => returnedFetchGenres.filter(el => el.id === id))
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

function render() {
    fetchMovie
        .fetchPopularFilms()
        .then(data => {
            return data.results;
        })
        .then(appendArticlesMarkup);
}

function parseMarkup(films) {
    refs.collection.insertAdjacentHTML('beforeend', articlesTpl(films));
}

function appendArticlesMarkup(results) {
    refs.collection.insertAdjacentHTML('beforeend', articlesTpl(results));
}

