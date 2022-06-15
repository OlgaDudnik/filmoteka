import { STORAGE_KEY1 } from './modal';
import { STORAGE_KEY2 } from './modal';
import FetchMovie from './api.fetch';
import renderCard from '../templates/card.hbs';
import { refs } from './refs';
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
    return myLibrary;
  }
}

//-----------------------------------------------------------

export async function renderMyLibraryList() {
  const myLibrary = new MyLibrary(STORAGE_KEY1, STORAGE_KEY2);
  const fechLibraryMovie = new FetchMovie();

  if (myLibrary.getMyLibraryId().length) {
    const query = [343611, 973608, 136418];
    try {
      fechLibraryMovie.idFilm = query[2];
      const { poster_path, title, genres, release_date } =
        await fechLibraryMovie.fetchFilmsById();
      refs.myLibraryList.insertAdjacentHTML(
        'beforeend',
        renderCard({ poster_path, title, genres, release_date })
      );

      //   query.map(film => {
      //     fechLibraryMovie.idFilm = film;
      //     return ({ poster_path, title, genres, release_date } =
      //       await fechLibraryMovie.fetchFilmsForId());

      //     //console.log({ poster_path, title, genres, release_date })
      //   });
      //   refs.myLibraryList.insertAdjacentHTML('beforeend', renderCard(query));

      console.log('отрисовываем все фильмы библиотеки');
    } catch (error) {
      console.log(error.message);
    }
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
