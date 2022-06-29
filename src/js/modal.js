import card from '../templates/modal-card.hbs';
import FetchMovie from './api.fetch';
import { refs } from './refs';
import { keys } from './storage_key';
import MyLibrary from './mylibrary';

const fetchMovie = new FetchMovie();
const myLibrary = new MyLibrary();

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
      onOpenModal(data);
      examinationLocalStorage(id);
    })
    .catch(() => {
      throw new Error('Modal fetch error!');
    });
}

function onOpenModal(data) {
  refs.backdrop.classList.add('mount');
  refs.backdrop.addEventListener('click', modalCloseClickBackdrop);
  document.body.classList.add('overflow');
  document.addEventListener('keydown', modalCloseEsc);
  document
    .querySelector('.modal__button-close')
    .addEventListener('click', onCloseModal);
  document
    .querySelector('#watched')
    .addEventListener('click', () => onAddToWatched(data));
  document
    .querySelector('#queue')
    .addEventListener('click', () => onAddToQueue(data));
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

function onAddToWatched(data) {
  const storageWatched =
    JSON.parse(localStorage.getItem(keys.STORAGE_KEY1)) || [];
  const storageQueue =
    JSON.parse(localStorage.getItem(keys.STORAGE_KEY2)) || [];

  const arreyWatched = [];
  storageWatched.map(el => arreyWatched.push(el.id));

  if (arreyWatched.includes(data.id)) {
    removeFilmIdWatchedLocSt(data, storageWatched);
    return;
  }
  addFilmIdWatchedLocSt(data, storageWatched);
  removeFilmIdQueueLocSt(data, storageQueue);
}

function onAddToQueue(data) {
  const storageWatched =
    JSON.parse(localStorage.getItem(keys.STORAGE_KEY1)) || [];
  const storageQueue =
    JSON.parse(localStorage.getItem(keys.STORAGE_KEY2)) || [];

  const arreyQueue = [];
  storageQueue.map(el => arreyQueue.push(el.id));

  if (arreyQueue.includes(data.id)) {
    removeFilmIdQueueLocSt(data, storageQueue);
    return;
  }
  addFilmIdQueueLocSt(data, storageQueue);
  removeFilmIdWatchedLocSt(data, storageWatched);
}

function addFilmIdWatchedLocSt(data, storageWatched) {
  storageWatched.push(data);
  localStorage.setItem(keys.STORAGE_KEY1, JSON.stringify(storageWatched));
  document.querySelector('#watched').classList.add('modal__button--active');
  document.querySelector('#watched-add').classList.add('visibility');
  document.querySelector('#watched-delete').classList.remove('visibility');
}

function removeFilmIdWatchedLocSt(data, storageWatched) {
  const filterSroregeWatched = storageWatched.filter(el => el.id !== data.id);
  localStorage.setItem(keys.STORAGE_KEY1, JSON.stringify(filterSroregeWatched));
  document.querySelector('#watched').classList.remove('modal__button--active');
  document.querySelector('#watched-add').classList.remove('visibility');
  document.querySelector('#watched-delete').classList.add('visibility');

  //opdate page library
  if (refs.header.classList.contains('header-library')) {
    if (refs.buttonWatched.classList.contains('button--active')) {
      myLibrary.renderWatchedFilm();
    } else {
      if (!refs.buttonQueue.classList.contains('button--active')) {
        myLibrary.renderMyLibrary();
        //myLibrary.clearInterval();
      }
    }
  }
}

function addFilmIdQueueLocSt(data, storageQueue) {
  storageQueue.push(data);
  localStorage.setItem(keys.STORAGE_KEY2, JSON.stringify(storageQueue));
  document.querySelector('#queue').classList.add('modal__button--active');
  document.querySelector('#queue-add').classList.add('visibility');
  document.querySelector('#queue-delete').classList.remove('visibility');
}

function removeFilmIdQueueLocSt(data, storageQueue) {
  const filterSroregeQueue = storageQueue.filter(el => el.id !== data.id);
  localStorage.setItem(keys.STORAGE_KEY2, JSON.stringify(filterSroregeQueue));
  document.querySelector('#queue').classList.remove('modal__button--active');
  document.querySelector('#queue-add').classList.remove('visibility');
  document.querySelector('#queue-delete').classList.add('visibility');

  //opdate page library
  if (refs.header.classList.contains('header-library')) {
    if (refs.buttonQueue.classList.contains('button--active')) {
      myLibrary.renderQueryFilms();
    } else {
      if (!refs.buttonWatched.classList.contains('button--active')) {
        myLibrary.renderMyLibrary();
      }
    }
  }
}

function examinationLocalStorage(id) {
  const storageWatched =
    JSON.parse(localStorage.getItem(keys.STORAGE_KEY1)) || [];
  const storageQueue =
    JSON.parse(localStorage.getItem(keys.STORAGE_KEY2)) || [];

  storageWatched.map(el => {
    if (el.id == id) {
      document.querySelector('#watched').classList.add('modal__button--active');
      document.querySelector('#watched-add').classList.add('visibility');
      document.querySelector('#watched-delete').classList.remove('visibility');
    }
  });

  storageQueue.map(el => {
    if (el.id == id) {
      document.querySelector('#queue').classList.add('modal__button--active');
      document.querySelector('#queue-add').classList.add('visibility');
      document.querySelector('#queue-delete').classList.remove('visibility');
    }
  });
}
