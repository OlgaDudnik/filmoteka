import FetchMovie from './api.fetch';
import { refs } from './refs';
import articlesTpl from '../templates/card.hbs';
import createMovies from './cards';
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

  if (target.dataset.action === 'left') {
    FetchMovieInstance.pageNum -= 1;

    if (
      localStorage.getItem('action') &&
      localStorage.getItem('action') === 'searchFilms'
    ) {
      FetchMovieInstance.searchQuery = localStorage.getItem('searchQuery');
      const films = await FetchMovieInstance.fetchFilms();
      const movies = createMovies(films.results, data);
      appendArticlesMarkup(movies);
      FetchMovieInstance.generatePaginationMarkup(page, totalPages);
    } else {
      const films = await FetchMovieInstance.fetchPopularFilms();
      const movies = createMovies(films.results, data);
      appendArticlesMarkup(movies);
      FetchMovieInstance.generatePaginationMarkup(page, totalPages);
    }
  } else if (target.dataset.action === 'right') {
    FetchMovieInstance.pageNum += 1;

    if (
      localStorage.getItem('action') &&
      localStorage.getItem('action') === 'searchFilms'
    ) {
      FetchMovieInstance.searchQuery = localStorage.getItem('searchQuery');
      const films = await FetchMovieInstance.fetchFilms();
      const movies = createMovies(films.results, data);
      appendArticlesMarkup(movies);
      FetchMovieInstance.generatePaginationMarkup(page, totalPages);
    } else {
      const films = await FetchMovieInstance.fetchPopularFilms();
      const movies = createMovies(films.results, data);
      appendArticlesMarkup(movies);
      FetchMovieInstance.generatePaginationMarkup(page, totalPages);
    }
  } else if (target.dataset.action === 'change') {
    FetchMovieInstance.pageNum = +target.dataset.page;

    if (
      localStorage.getItem('action') &&
      localStorage.getItem('action') === 'searchFilms'
    ) {
      FetchMovieInstance.searchQuery = localStorage.getItem('searchQuery');
      const films = await FetchMovieInstance.fetchFilms();
      const movies = createMovies(films.results, data);
      appendArticlesMarkup(movies);
      FetchMovieInstance.generatePaginationMarkup(
        +target.dataset.page,
        totalPages
      );
    } else {
      const films = await FetchMovieInstance.fetchPopularFilms();
      const movies = createMovies(films.results, data);
      appendArticlesMarkup(movies);
      FetchMovieInstance.generatePaginationMarkup(
        +target.dataset.page,
        totalPages
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
