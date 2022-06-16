import card from '../templates/modal-card.hbs';
import FetchMovie from './api.fetch';
import { refs } from './refs';
import { keys } from './storage_key';

let film = '';
const fetchMovie = new FetchMovie();

// modal close - open  ******************************
refs.modalEventListener.addEventListener('click', e => {
  if (e.target.nodeName === 'IMG') {
    const { id } = e.target.dataset;
    mountModal(id);
  }
});

async function mountModal(id) {
  fetchMovie.idFilm = id;
  await fetchMovie
    .fetchFilmsById()
    .then(data => {
      film = data.title;
      refs.backdrop.innerHTML = card(data);
    })
    .catch(() => console.log('modal fetch error'));

  onOpenModal();
}

function onOpenModal() {
  refs.backdrop.classList.add('mount');
  refs.backdrop.addEventListener('click', modalCloseClickBackdrop);
  document.body.classList.add('overflow');
  document.addEventListener('keydown', modalCloseEsc);
  document
    .querySelector('.modal__button-close')
    .addEventListener('click', onCloseModal);
  document.querySelector('#watched').addEventListener('click', onAddToWatched);
  document.querySelector('#queue').addEventListener('click', onAddToQueue);
}

function onCloseModal() {
  refs.backdrop.classList.remove('mount');
  document.body.classList.remove('overflow');
  refs.backdrop.innerHTML = '';
}

function modalCloseEsc(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
}

function modalCloseClickBackdrop(e) {
  if (e.target.nodeName === 'BACKDROP') {
    onCloseModal();
  }
}

// localStorage *******************************

function onAddToWatched() {
  const storageState =
    JSON.parse(localStorage.getItem(keys.STORAGE_KEY1)) || [];

  if (storageState?.includes(film)) {
    const filterSroregeState = storageState.filter(el => el !== film);

    localStorage.setItem(keys.STORAGE_KEY1, JSON.stringify(filterSroregeState));
    document
      .querySelector('#watched')
      .classList.remove('modal__button--active');
    return;
  }

  document.querySelector('#watched').classList.add('modal__button--active');

  storageState.push(film);
  localStorage.setItem(keys.STORAGE_KEY1, JSON.stringify(storageState));
}

function onAddToQueue() {
  const storageState =
    JSON.parse(localStorage.getItem(keys.STORAGE_KEY2)) || [];

  if (storageState?.includes(film)) {
    const filterSroregeState = storageState.filter(el => el !== film);

    localStorage.setItem(keys.STORAGE_KEY2, JSON.stringify(filterSroregeState));
    document.querySelector('#queue').classList.remove('modal__button--active');
    return;
  }

  document.querySelector('#queue').classList.add('modal__button--active');

  storageState.push(film);
  localStorage.setItem(keys.STORAGE_KEY2, JSON.stringify(storageState));
}
