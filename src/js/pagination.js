import FetchMovie from './api.fetch';
import { refs } from './refs';
import articlesTpl from '../templates/card.hbs';
import data from '../data-base/genres.json';

const FetchMovieInstance = new FetchMovie();

refs.pagination.addEventListener('click', onPaginationClick);

let page = 1;
let totalPages = 1000;

async function onPaginationClick(e) {
    let target = e.target;
    if (!['SPAN', 'svg', 'path'].includes(target.nodeName)) {
        return;
    }

    if (['svg', 'path'].includes(target.nodeName)) {
        target = target.closest('span');
    }

    if (target.classList.contains('disabled-arrow')) {
        return;
    }

    if (localStorage.getItem('isNeedResetPages')) {
        FetchMovieInstance.resetPage();
        localStorage.removeItem('isNeedResetPages');
    }

    if (target.dataset.action === 'left') {
        FetchMovieInstance.decrementPage();

        if (localStorage.getItem('action') && localStorage.getItem('action') === 'searchFilms') {
            FetchMovieInstance.searchQuery = localStorage.getItem('searchQuery');
            const films = await FetchMovieInstance.fetchFilms();
            appendArticlesMarkup(films.results);
            FetchMovieInstance.generatePaginationMarkup(page, totalPages);
        } else if (localStorage.getItem('action') === 'fetchGenreFilms') {
            FetchMovieInstance.genreFilm = localStorage.getItem('genreFilm');
            const films = await FetchMovieInstance.fetchGenreFilms();
            appendArticlesMarkup(films.results);
            FetchMovieInstance.generatePaginationMarkup(page, totalPages);
        } else {
            const films = await FetchMovieInstance.fetchPopularFilms();
            appendArticlesMarkup(films.results);
            FetchMovieInstance.generatePaginationMarkup(page, totalPages);
        }
    } else if (target.dataset.action === 'right') {
        FetchMovieInstance.incrementPage();

        if (localStorage.getItem('action') && localStorage.getItem('action') === 'searchFilms') {
            FetchMovieInstance.searchQuery = localStorage.getItem('searchQuery');
            const films = await FetchMovieInstance.fetchFilms();
            appendArticlesMarkup(films.results);
            FetchMovieInstance.generatePaginationMarkup(page, totalPages);
        } else if (localStorage.getItem('action') === 'fetchGenreFilms') {
            FetchMovieInstance.genreFilm = localStorage.getItem('genreFilm');
            const films = await FetchMovieInstance.fetchGenreFilms();
            appendArticlesMarkup(films.results);
            FetchMovieInstance.generatePaginationMarkup(page, totalPages);
        } else {
            const films = await FetchMovieInstance.fetchPopularFilms();
            appendArticlesMarkup(films.results);
            FetchMovieInstance.generatePaginationMarkup(page, totalPages);
        }
    } else if (target.dataset.action === 'change') {
        FetchMovieInstance.pageNum = +target.dataset.page;

        if (localStorage.getItem('action') && localStorage.getItem('action') === 'searchFilms') {
            FetchMovieInstance.searchQuery = localStorage.getItem('searchQuery');
            const films = await FetchMovieInstance.fetchFilms();
            appendArticlesMarkup(films.results);
            FetchMovieInstance.generatePaginationMarkup(
                +target.dataset.page,
                totalPages,
            );
        } else if (localStorage.getItem('action') === 'fetchGenreFilms') {
            FetchMovieInstance.genreFilm = localStorage.getItem('genreFilm');
            const films = await FetchMovieInstance.fetchGenreFilms();
            appendArticlesMarkup(films.results);
            FetchMovieInstance.generatePaginationMarkup(page, totalPages);
        } else {
            const films = await FetchMovieInstance.fetchPopularFilms();
            appendArticlesMarkup(films.results);
            FetchMovieInstance.generatePaginationMarkup(
                +target.dataset.page,
                totalPages,
            );
        }
    }

    scroll();
}

function scroll() {
    window.scrollTo(pageYOffset, 0);
}

function appendArticlesMarkup(results) {
    refs.collection.innerHTML = articlesTpl(results);
}

//----------------------------------------------------------------------------------------------------------------
const fetchMovie = new FetchMovie();

async function loadPopularMovies() {
    const fetchPopMovies = await fetchMovie.fetchPopularFilms();
    const { results } = fetchPopMovies;
    const movies = createMovies(results, data);
    parseMarkup(movies);

    return movies;
}

function createMovies(returnedFetchMovies, genresAll) {
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