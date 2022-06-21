import FetchMovie from './api.fetch';
import articlesTpl from '../templates/card.hbs';

const select = document.querySelector('.filter');
const gallery = document.querySelector('.gallery-container_grid');

const fetchMovie = new FetchMovie();

function appendArticlesMarkup(markup) {
    gallery.insertAdjacentHTML('beforeend', articlesTpl(markup));
}

function sort(noSortArr, sortParam) {

    if (sortParam === 'raiting_down') {
        return noSortArr.sort((a, b) => a.vote_average - b.vote_average);
    }

    if (sortParam === 'raiting_up') {
        return noSortArr.sort((a, b) => b.vote_average - a.vote_average);
    }

    if (sortParam === 'popularity_down') {
        return noSortArr.sort((a, b) => a.popularity - b.popularity);
    }

    if (sortParam === 'popularity_up') {
        return noSortArr.sort((a, b) => b.popularity - a.popularity);
    }
}

select.addEventListener('click', onSelection);

function onSelection(e) {

    const sortParam = e.target.dataset.value;
    const dataAction = e.target.parentNode.dataset.action;

    if (dataAction === 'genre') {

        // Don't touch it please, required for pagination
        if (localStorage.getItem('action') !== 'fetchGenreFilms' || localStorage.getItem('genreFilm') !== e.target.id) {
            localStorage.setItem('isNeedResetPages', 'true');
        }
        localStorage.setItem('action', 'fetchGenreFilms');
        localStorage.setItem('genreFilm', e.target.id);

        fetchMovie.genreFilm = e.target.id;
        if (e.target.id) {
            fetchMovie.fetchGenreFilms().then((result) => {
                gallery.innerHTML = '';
                appendArticlesMarkup(fetchMovie.getFilterLocalStorage());
            });
        }
    }
    if (dataAction === 'years') {
        fetchMovie.yearFilm = e.target.id;
        if (e.target.id) {
            fetchMovie.fetchYears().then((result) => {
                gallery.innerHTML = '';
                appendArticlesMarkup(fetchMovie.getFilterLocalStorage());
            });
        }
    }
    if (sortParam !== undefined) {
        gallery.innerHTML = '';
        appendArticlesMarkup((sort(fetchMovie.getFilterLocalStorage(), sortParam)));
    }
}
