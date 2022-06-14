export default class MyLibrary {
  constructor(watchedKey, queueKey) {
    this.watchedKey = watchedKey;
    this.queueKey = queueKey;
  }
  getWatchedFilms() {
    try {
      const watchedFilms = localStorage.getItem(this.watchedKey);
      return watchedFilms === null ? undefined : JSON.parse(watchedFilms);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  }
  getQueueFilms() {
    try {
      const queueFilms = localStorage.getItem(this.queueKey);
      return queueFilms === null ? undefined : JSON.parse(queueFilms);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  }
  getMyLibrary() {
    const myLibrary = [];
    const watchedFilms = this.getWatchedFilms();
    const queueFilms = this.getQueueFilms();

    if (watchedFilms || queueFilms) {
      console.dir(myLibrary.push(watchedFilms, queueFilms));
      myLibrary.push(watchedFilms, queueFilms);
    }

    return myLibrary;
  }
}
