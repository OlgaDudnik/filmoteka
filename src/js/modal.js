import card from '../templates/modal-card.hbs';
import FetchMovie from './api.fetch';
import { refs } from './refs';
import { keys } from './storage_key';

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
      refs.backdrop.innerHTML = card(data);
      onOpenModal(id);
    })
    .catch(() => {
      throw new Error('Modal fetch error!');
    });
}

function onOpenModal(id) {
  refs.backdrop.classList.add('mount');
  refs.backdrop.addEventListener('click', modalCloseClickBackdrop);
  document.body.classList.add('overflow');
  document.addEventListener('keydown', modalCloseEsc);
  document
    .querySelector('.modal__button-close')
    .addEventListener('click', onCloseModal);
  document
    .querySelector('#watched')
    .addEventListener('click', () => onAddToWatched(id));
  document
    .querySelector('#queue')
    .addEventListener('click', () => onAddToQueue(id));
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

// add id card in localStorage on button Watched vs Queue *******************************

function onAddToWatched(id) {
  const storageWatched =
    JSON.parse(localStorage.getItem(keys.STORAGE_KEY1)) || [];
  const storageQueue =
    JSON.parse(localStorage.getItem(keys.STORAGE_KEY2)) || [];

  if (storageWatched?.includes(id)) {
    removeFilmIdWatchedLocSt(id, storageWatched);
    return;
  }
  addFilmIdWatchedLocSt(id, storageWatched);
  removeFilmIdQueueLocSt(id, storageQueue);
}

function onAddToQueue(id) {
  const storageWatched =
    JSON.parse(localStorage.getItem(keys.STORAGE_KEY1)) || [];
  const storageQueue =
    JSON.parse(localStorage.getItem(keys.STORAGE_KEY2)) || [];

  if (storageQueue?.includes(id)) {
    removeFilmIdQueueLocSt(id, storageQueue);
    return;
  }
  addFilmIdQueueLocSt(id, storageQueue);
  removeFilmIdWatchedLocSt(id, storageWatched);
}

function addFilmIdWatchedLocSt(id, storageWatched) {
  document.querySelector('#watched').classList.add('modal__button--active');
  storageWatched.push(id);
  localStorage.setItem(keys.STORAGE_KEY1, JSON.stringify(storageWatched));
}

function removeFilmIdWatchedLocSt(id, storageWatched) {
  const filterSroregeWatched = storageWatched.filter(el => el !== id);
  localStorage.setItem(keys.STORAGE_KEY1, JSON.stringify(filterSroregeWatched));
  document.querySelector('#watched').classList.remove('modal__button--active');
}

function addFilmIdQueueLocSt(id, storageQueue) {
  document.querySelector('#queue').classList.add('modal__button--active');
  storageQueue.push(id);
  localStorage.setItem(keys.STORAGE_KEY2, JSON.stringify(storageQueue));
}

function removeFilmIdQueueLocSt(id, storageQueue) {
  const filterSroregeQueue = storageQueue.filter(el => el !== id);
  document.querySelector('#queue').classList.remove('modal__button--active');
  localStorage.setItem(keys.STORAGE_KEY2, JSON.stringify(filterSroregeQueue));
}
