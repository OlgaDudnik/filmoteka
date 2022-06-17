import { keys } from './storage_key';
import FetchMovie from './api.fetch';
import renderCard from '../templates/card-by-id.hbs';
import { refs } from './refs';
import { Block } from 'notiflix';
//-----------------------------------------------------------

const fechLibraryMovie = new FetchMovie();

//-----------------------------------------------------------

export default class MyLibrary {
  constructor() {
    this.watchedKey = keys.STORAGE_KEY1;
    this.queueKey = keys.STORAGE_KEY2;
    this.message = 'Your library is empty!!!';
    this.interval = 0;
  }

  getWatchedFilmsId() {
    try {
      const watchedFilms = localStorage.getItem(this.watchedKey);
      return watchedFilms === null ? undefined : JSON.parse(watchedFilms);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  }

  getQueueFilmsId() {
    try {
      const queueFilms = localStorage.getItem(this.queueKey);
      return queueFilms === null ? undefined : JSON.parse(queueFilms);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  }

  getMyLibraryId() {
    const myLibrary = [];
    const watchedFilms = this.getWatchedFilmsId();
    const queueFilms = this.getQueueFilmsId();

    if (watchedFilms) {
      myLibrary.push(watchedFilms);
    }
    if (queueFilms) {
      myLibrary.push(queueFilms);
    }
    return myLibrary;
  }

  renderLibrary() {
    refs.collection.innerHTML = '';
    if (this.getMyLibraryId().length) {
      const query = [343611, 973608, 136418];
      query.map(id => {
        fechLibraryMovie.idFilm = id;
        fechLibraryMovie.fetchFilmsById().then(film => {
          refs.collection.insertAdjacentHTML('beforeend', renderCard(film));
        });
      });
    } else {
      refs.collection.insertAdjacentHTML(
        'beforeend',
        `<li class="empty-library"><span class='user-message'></span></li>`
      );
      refs.collection.style.display = 'block';
      this.showMessage();
    }
  }

  clearEmptyLibrary() {
    refs.collection.style.display = 'grid';
  }

  showMessage() {
    const arrMessage = this.message.split('');
    let i = 0;
    this.interval = setInterval(showLetter, 150);

    function showLetter() {
      if (i === arrMessage.length) {
        clearInterval(this.interval);
        return;
      }

      refs.collection.querySelector(
        '.empty-library .user-message'
      ).textContent += arrMessage[i];
      i += 1;
    }
  }
  clearInterval() {
    clearInterval(this.interval);
  }
}
