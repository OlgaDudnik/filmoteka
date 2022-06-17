import { keys } from './storage_key';
import FetchMovie from './api.fetch';
import renderCard from '../templates/card-by-id.hbs';
import { refs } from './refs';
//import { Block } from 'notiflix';
//-----------------------------------------------------------

const fechLibraryMovie = new FetchMovie();

//-----------------------------------------------------------

export default class MyLibrary {
  constructor() {
    this.watchedKey = [343611, 343611, 136418];
    this.queueKey = [343611, 973608, 136418, 973608];
    //this.watchedKey = keys.STORAGE_KEY1;
    //this.queueKey = keys.STORAGE_KEY2;
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

  renderWatchedFilm() {
    //const queryId = this.getWatchedFilmsId();
    const queryId = this.watchedKey;
    this.render(queryId);
  }

  getQueueFilmsId() {
    try {
      const queueFilms = localStorage.getItem(this.queueKey);
      return queueFilms === null ? undefined : JSON.parse(queueFilms);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  }

  renderQueryFilms() {
    //const queryId = this.getQueueFilmsId();
    const queryId = this.queueKey;
    this.render(queryId);
  }

  getLibraryId() {
    const myLibraryId = [];
    //const watchedFilmsId = this.getWatchedFilmsId();
    //const queueFilmsId = this.getQueueFilmsId();
    const watchedFilmsId = this.watchedKey;
    const queueFilmsId = this.queueKey;
    console.log(watchedFilmsId);
    console.log(queueFilmsId);

    if (watchedFilmsId) {
      myLibraryId.push(...watchedFilmsId);
    }
    if (queueFilmsId) {
      myLibraryId.push(...queueFilmsId);
    }
    return myLibraryId;
  }

  renderMyLibrary() {
    const myLibraryId = this.getLibraryId();

    this.render(myLibraryId);
  }

  render(ids) {
    console.log(ids);
    refs.collection.innerHTML = '';
    if (ids.length) {
      ids.map(id => {
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
