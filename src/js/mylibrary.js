import { STORAGE_KEY1 } from './modal';
import { STORAGE_KEY2 } from './modal';
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

    if (watchedFilms || queueFilms) {
      myLibrary.push(watchedFilms, queueFilms);
      console.log(myLibrary);
    }
    return myLibrary;
  }
}
//-----------------------------------------------------------

export function renderMyLibrary() {
  const myLibrary = new MyLibrary(STORAGE_KEY1, STORAGE_KEY2);

  if (myLibrary.getMyLibraryId().length) {
    console.log('отрисовываем все фильмы библиотеки');
  } else {
    console.log('Ваша библиотека пуста');
  }
}
