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
  refs.header.classList.remove('header-library');
  refs.buttonHeaderHome.classList.add('nav-btn--underline');
  refs.buttonHeaderLibrary.classList.remove('nav-btn--underline');

  refs.paginationContainer.classList.remove('visually-hidden');
  refs.headerForm.classList.remove('visually-hidden');
  refs.headerListButtons.classList.add('visually-hidden');

  myLibrary.clearEmptyLibrary();
  myLibrary.clearInterval();
}

function onOpenLibraryPage() {
  refs.header.classList.add('header-library');
  refs.buttonHeaderLibrary.classList.add('nav-btn--underline');
  refs.buttonHeaderHome.classList.remove('nav-btn--underline');

  refs.headerForm.classList.add('visually-hidden');
  refs.headerListButtons.classList.remove('visually-hidden');

  refs.headerListButtons.innerHTML = '';
  renderButton();

  if (myLibrary.getLibraryId().length === 0) {
    refs.headerListButtons.classList.add('visually-hidden');
    refs.paginationContainer.classList.add('visually-hidden');
  }

  myLibrary.clearInterval();
  myLibrary.renderMyLibrary();

  refs.buttonQueue = document.querySelector('[data-action="queue"]');
  refs.buttonWatched = document.querySelector('[data-action="watched"]');

  refs.buttonQueue.addEventListener('click', onOpenQueueFilms);
  refs.buttonWatched.addEventListener('click', onOpenWatchedFilms);
}

//-----------------------------------------------------------

function onOpenQueueFilms() {
  refs.buttonQueue.classList.add('button--active');
  refs.buttonWatched.classList.remove('button--active');

  myLibrary.renderQueryFilms(); //Рендер фильмов, поставленных в очередь
}

function onOpenWatchedFilms() {
  refs.buttonWatched.classList.add('button--active');
  refs.buttonQueue.classList.remove('button--active');

  myLibrary.renderWatchedFilm(); //Рендер просмотренных фильмов
}

//-----------------------------------------------------------

// Display the main page
function toMainPage() {
  onOpenHomePage();
  getMovies.fetchPopularFilms().then(film => {
    const movieList = refs.collection;
    movieList.innerHTML = renderCard(film.results);
  });
}

// Logo click event
function onHandleClick() {
  toMainPage();
}

refs.logoBtn.addEventListener('click', onHandleClick);
refs.buttonHeaderHome.addEventListener('click', onHandleClick);
