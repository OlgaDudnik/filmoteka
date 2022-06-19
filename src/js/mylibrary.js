import { keys } from './storage_key';
import FetchMovie from './api.fetch';
import renderCard from '../templates/card-by-id.hbs';
import { refs } from './refs';

//-----------------------------------------------------------

const fechLibraryMovie = new FetchMovie();

//-----------------------------------------------------------

export default class MyLibrary {
  constructor() {
    //this.watchedKey = [343611, 343611, 136418];
    //this.queueKey = [343611, 973608, 136418, 973608];
    this.watchedKey = keys.STORAGE_KEY1;
    this.queueKey = keys.STORAGE_KEY2;
    this.idFilms = [];
    this.message = '';
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
    if (this.getWatchedFilmsId()) {
      this.idFilm = this.getWatchedFilmsId();
      this.idFilm.filter(id => id !== null);
      this.render();
      return;
    }
    this.idFilms = [];
    this.message = 'You have no movies watched !!!';
    this.render();
    //const queryId = this.watchedKey;
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
    if (this.getQueueFilmsId()) {
      this.idFilms = this.getQueueFilmsId();
      this.idFilms.filter(id => id !== null);
      this.render();
      return;
    }
    this.idFilms = [];
    this.message = 'There is no queue to watch movies !!!';
    this.render();
    //const queryId = this.queueKey;
  }

  getLibraryId() {
    const myLibraryId = [];
    const watchedFilmsId = this.getWatchedFilmsId();
    const queueFilmsId = this.getQueueFilmsId();
    //const watchedFilmsId = this.watchedKey;
    //const queueFilmsId = this.queueKey;

    if (watchedFilmsId) {
      myLibraryId.push(...watchedFilmsId);
    }
    if (queueFilmsId) {
      myLibraryId.push(...queueFilmsId);
    }
    return myLibraryId
      .filter((id, index) => myLibraryId.indexOf(id) === index)
      .filter(id => id != null);
  }

  renderMyLibrary() {
    if (this.getLibraryId().length != 0) {
      this.idFilms = this.getLibraryId();
      this.render();
      return;
    }
    this.idFilms = [];
    this.message = 'Your library is empty!!!';
    this.render();
  }

  render() {
    refs.collection.innerHTML = '';
    if (this.idFilms.length) {
      this.idFilms.map(id => {
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
