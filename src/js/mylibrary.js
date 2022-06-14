import { STORAGE_KEY1 } from './modal';
import { STORAGE_KEY2 } from './modal';
import FetchMovie from './api.fetch';
import { refs } from './refs';
//-----------------------------------------------------------

const fechLibraryMovie = new FetchMovie();

//-----------------------------------------------------------

class MyLibrary {
  constructor(watchedKey, queueKey) {
    this.watchedKey = watchedKey;
    this.queueKey = queueKey;
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
    console.log(myLibrary);
    return myLibrary;
  }
}

//-----------------------------------------------------------

export function renderMyLibraryList() {
  const myLibrary = new MyLibrary(STORAGE_KEY1, STORAGE_KEY2);

  if (myLibrary.getMyLibraryId().length) {
    fechLibraryMovie.query = myLibrary.getMyLibraryId()[0];
    fechLibraryMovie.fetchFilms();
    console.log(fechLibraryMovie.fetchFilms());
    console.log('отрисовываем все фильмы библиотеки');
  } else {
    refs.myLibraryContainer.innerHTML = `<span class='user-message'></span>`;

    const message = 'Your library is empty!!!';

    const arrMessage = message.split('');
    let i = 0;
    const intervalId = setInterval(showLetter, 150);

    function showLetter() {
      if (i === arrMessage.length) {
        clearInterval(intervalId);
        return;
      }

      refs.myLibraryContainer.firstChild.textContent += arrMessage[i];
      i += 1;
    }
  }
}
