import { refs } from './refs';
import { renderButton } from './button';
import MyLibrary from './mylibrary';
import FetchMovie from './api.fetch';
import renderCard from '../templates/card.hbs';
import onAddToQueue from './modal';
import { keys } from './storage_key';

//-----------------------------------------------------------

const getMovies = new FetchMovie();
const myLibrary = new MyLibrary();

//-----------------------------------------------------------

refs.buttonHeaderHome.classList.add('nav-btn--underline');

//-----------------------------------------------------------

refs.buttonHeaderLibrary.addEventListener('click', onOpenLibraryPage);

//-----------------------------------------------------------
function onOpenHomePage() {
  refs.collection.style.gridTemplateColumns = '';
  refs.header.classList.remove('header-library');
  refs.buttonHeaderHome.classList.add('nav-btn--underline');
  refs.buttonHeaderLibrary.classList.remove('nav-btn--underline');

  //show filter
  refs.filterBtn.classList.remove('visually-hidden');
  refs.filter.classList.remove('visually-hidden');

  //show pagination
  refs.pagination.classList.remove('visually-hidden');

  refs.headerForm.classList.remove('visually-hidden');
  refs.headerListButtons.classList.add('visually-hidden');

  myLibrary.clearInterval();
}

function onOpenLibraryPage() {
  refs.header.classList.add('header-library');
  refs.buttonHeaderLibrary.classList.add('nav-btn--underline');
  refs.buttonHeaderHome.classList.remove('nav-btn--underline');

  refs.headerForm.classList.add('visually-hidden');
  refs.headerListButtons.classList.remove('visually-hidden');

  refs.collection.style.gridTemplateColumns = '';

  //hide filter
  refs.filterBtn.classList.add('visually-hidden');
  refs.filter.classList.add('visually-hidden');

  refs.headerListButtons.innerHTML = '';
  renderButton();

  //show pagination
  refs.pagination.classList.remove('visually-hidden');

  if (myLibrary.getLibrary().length === 0) {
    refs.collection.style.gridTemplateColumns = 'repeat(1, 100%)';
    //hide button library
    refs.headerListButtons.classList.add('visually-hidden');
    //hide pagination
    refs.pagination.classList.add('visually-hidden');
  }

  //render all library films

  myLibrary.clearInterval();
  myLibrary.renderMyLibrary();

  refs.buttonQueue = document.querySelector('[data-action="queue"]');
  refs.buttonWatched = document.querySelector('[data-action="watched"]');

  refs.buttonQueue.addEventListener('click', onOpenQueueFilms);
  refs.buttonWatched.addEventListener('click', onOpenWatchedFilms);
}

//-----------------------------------------------------------

function onOpenWatchedFilms(event) {
  //highlight button
  refs.buttonWatched.classList.add('button--active');
  refs.buttonQueue.classList.remove('button--active');

  //render watched films
  refs.collection.style.gridTemplateColumns = '';
  myLibrary.clearInterval();
  myLibrary.renderWatchedFilm();

  //show pagination
  refs.pagination.classList.remove('visually-hidden');

  if (myLibrary.getWatchedFilms().length === 0) {
    refs.collection.style.gridTemplateColumns = 'repeat(1, 100%)';
    //hide pagination
    refs.pagination.classList.add('visually-hidden');
  }

  //delete watched films
  if (event.target.tagName === 'SPAN') {
    myLibrary.clearInterval();
    myLibrary.removeWatchedFilm();
    refs.collection.style.gridTemplateColumns = 'repeat(1, 100%)';
    //hide pagination
    refs.pagination.classList.add('visually-hidden');
  }
}

function onOpenQueueFilms(event) {
  //highlight button
  refs.buttonQueue.classList.add('button--active');
  refs.buttonWatched.classList.remove('button--active');

  //render queue films
  refs.collection.style.gridTemplateColumns = '';
  myLibrary.clearInterval();
  myLibrary.renderQueryFilms();

  //show pagination
  refs.pagination.classList.remove('visually-hidden');
  if (myLibrary.getQueueFilms().length === 0) {
    refs.collection.style.gridTemplateColumns = 'repeat(1, 100%)';
    //hide pagination
    refs.pagination.classList.add('visually-hidden');
  }

  //delete queue films
  if (event.target.tagName === 'SPAN') {
    myLibrary.clearInterval();
    myLibrary.removeQueryFilms();
    refs.collection.style.gridTemplateColumns = 'repeat(1, 100%)';
    //hide pagination
    refs.pagination.classList.add('visually-hidden');
  }
}

//-----------------------------------------------------------

// Display the main page
function toMainPage() {
  onOpenHomePage();
  getMovies.fetchPopularFilms().then(film => {
    const movieList = refs.collection;
    movieList.innerHTML = renderCard(film.results);

    // Don't touch it please, required for pagination
    localStorage.setItem('searchQuery', '');
    if (localStorage.getItem('action') !== 'fetchPopularFilms') {
      localStorage.setItem('isNeedResetPages', 'true');
    }
    localStorage.setItem('action', 'fetchPopularFilms');
  });
}

// Logo click event
function onHandleClick() {
  toMainPage();
}

refs.logoBtn.addEventListener('click', onHandleClick);
refs.buttonHeaderHome.addEventListener('click', onHandleClick);
