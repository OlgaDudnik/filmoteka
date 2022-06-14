import FetchMovie from './api.fetch';
import articlesTpl from '../templates/card.hbs';

const refs = {
  cardColection: document.querySelector('.card__colection'),
};

const fetchMovie = new FetchMovie();

function render() {
  fetchMovie
    .fetchPopularFilms()
    .then(data => {
      return data.results;
    })
    .then(appendArticlesMarkup);
}
render();

function appendArticlesMarkup(results) {
  refs.cardColection.insertAdjacentHTML('beforeend', articlesTpl(results));
}
