import { keys } from './storage_key';
import FetchMovie from './api.fetch';
import renderCard from '../templates/card-by-id.hbs';
import { refs } from './refs';
//-----------------------------------------------------------

class MyLibrary {
  constructor() {
    this.watchedKey = keys.STORAGE_KEY1;
    this.queueKey = keys.STORAGE_KEY2;
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
}

//-----------------------------------------------------------

export function renderMyLibraryList() {
  const myLibrary = new MyLibrary();
  const fechLibraryMovie = new FetchMovie();

  if (myLibrary.getMyLibraryId().length) {
    const query = [343611, 973608, 136418];

    query.map(id => {
      fechLibraryMovie.idFilm = id;
      fechLibraryMovie.fetchFilmsById().then(film => {
        refs.myLibraryList.insertAdjacentHTML('beforeend', renderCard(film));
      });
    });
  } else {
    refs.myLibraryContainer.innerHTML = `<div class="empty-library"><span class='user-message'></span><div>`;

    const message = 'Your library is empty!!!';

    const arrMessage = message.split('');
    let i = 0;
    const intervalId = setInterval(showLetter, 150);

    function showLetter() {
      if (i === arrMessage.length) {
        clearInterval(intervalId);
        return;
      }

      refs.myLibraryContainer.querySelector(
        '.empty-library .user-message'
      ).textContent += arrMessage[i];
      i += 1;
    }
  }
}
