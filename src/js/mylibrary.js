import { keys } from './storage_key';
import FetchMovie from './api.fetch';
import renderCard from '../templates/card.hbs';
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
    this.films = [];
    this.message = '';
    this.interval = 0;
  }

  getWatchedFilms() {
    try {
      const watchedFilms = localStorage.getItem(this.watchedKey);
      return watchedFilms === null ? [] : JSON.parse(watchedFilms);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  }

  renderWatchedFilm() {
    if (this.getWatchedFilms().length !== 0) {
      this.films = this.getWatchedFilms();
      this.render();
      this.idFilms = [];
      return;
    }
    this.films = [];
    this.message = 'You have no movies watched !!!';
    this.render();
  }

  removeWatchedFilm() {
    localStorage.removeItem(this.watchedKey);
    this.films = [];
    this.message = 'You have no movies watched !!!';
    this.render();
  }

  getQueueFilms() {
    try {
      const queueFilms = localStorage.getItem(this.queueKey);
      return queueFilms === null ? [] : JSON.parse(queueFilms);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  }

  renderQueryFilms() {
    if (this.getQueueFilms().length !== 0) {
      this.films = this.getQueueFilms();
      this.render();
      this.films = [];
      return;
    }
    this.films = [];
    this.message = 'There is no queue to watch movies !!!';
    this.render();
  }

  removeQueryFilms() {
    localStorage.removeItem(this.queueKey);
    this.films = [];
    this.message = 'You have no movies watched !!!';
    this.render();
  }

  getLibrary() {
    const myLibrary = [];
    const watchedFilms = this.getWatchedFilms();
    const queueFilms = this.getQueueFilms();

    if (watchedFilms) {
      myLibrary.push(...watchedFilms);
    }
    if (queueFilms) {
      myLibrary.push(...queueFilms);
    }
    return myLibrary
      .filter((id, index) => myLibrary.indexOf(id) === index)
      .filter(id => id != null);
  }

  renderMyLibrary() {
    if (this.getLibrary().length) {
      this.films = this.getLibrary();
      this.render();
      this.films = [];
      return;
    }
    this.message = 'Your library is empty!!!';
    this.render();
  }

  render() {
    if (this.films.length) {
      refs.collection.innerHTML = renderCard(this.films);
    } else {
      refs.collection.innerHTML =
        '<li class="empty-library"><span class="user-message"></span></li>';
      this.showMessage();
    }
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
