import FetchMovie from './api.fetch';
import filmTpl from '../templates/card.hbs';
import { refs } from './refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const newApiFetch = new FetchMovie();

refs.headerForm.addEventListener('submit', keyWordSearch);

function keyWordSearch(e) {
    e.preventDefault();
    newApiFetch.resetPage();

    newApiFetch.query = (e.target.elements.searchQuery.value).trim();

    newApiFetch.fetchFilms().then(film => {

        if (film.results.length === 0) {
            Notify.warning('We\'re sorry, but you\'ve reached the end of search results.');
            return;
        }
        newApiFetch.saveLocaleStorage(film);
        newApiFetch.renderMovieList();

    }).catch(error => {
        console.log(error);
    });
    clearInput();
}

function years() {
    newApiFetch.fetchYears().then(year => {
        newApiFetch.saveYearsToLocalStorage(year);
    })
}

// Очистка инпута

function clearInput() {
    document.querySelector('.header-search-input').value = '';
}

Notify.init({
    width: '280px',
    position: 'right-top',
    distance: '30px',
    borderRadius: '10px',
    timeout: 2000,
    cssAnimationStyle: 'from-right',
});