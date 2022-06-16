import { refs } from './refs';
import { markupButton } from './button';
import { renderMyLibraryList } from './mylibrary';
import FetchMovie from './api.fetch';
import renderCard from '../templates/card.hbs';
import onAddToQueue from './modal';
import { keys } from './storage_key';

//-----------------------------------------------------------
const getMovies = new FetchMovie();
//-----------------------------------------------------------

refs.buttonHeaderHome.classList.add('nav-btn--underline');

//-----------------------------------------------------------

refs.buttonHeaderLibrary.addEventListener('click', onOpenLibraryPage);

//-----------------------------------------------------------

function onOpenHomePage() {
  refs.header.classList.remove('header-library');
  refs.buttonHeaderHome.classList.add('nav-btn--underline');
  refs.buttonHeaderLibrary.classList.remove('nav-btn--underline');
}
function onOpenLibraryPage() {
  refs.header.classList.add('header-library');
  refs.buttonHeaderLibrary.classList.add('nav-btn--underline');
  refs.buttonHeaderHome.classList.remove('nav-btn--underline');

  refs.headerForm.innerHTML = '';
  markupButton('Watched', 'watched');
  markupButton('queue', 'queue');
  document
    .querySelector('[data-action="queue"]')
    .classList.add('button--rightLocation');

  renderMyLibraryList();

  refs.buttonQueue = document.querySelector('[data-action="queue"]');
  refs.buttonWatched = document.querySelector('[data-action="watched"]');

  refs.buttonQueue.addEventListener('click', onOpenQueueFilms);
  refs.buttonWatched.addEventListener('click', onOpenWatchedFilms);
}

//-----------------------------------------------------------

function onOpenQueueFilms() {

  const moviesContainer = document.querySelector('.container_card');
  
  refs.buttonQueue.classList.add('button--active');
  refs.buttonWatched.classList.remove('button--active');
  
  const queueData = JSON.parse(localStorage.getItem(keys.STORAGE_KEY2));
  if (!queueData) {
    queueData = [];
  };
  moviesContainer.innerHTML = '';
  console.log('Рендер фильмов, поставленных в очередь');
}

function onOpenWatchedFilms() {
  refs.buttonWatched.classList.add('button--active');
  refs.buttonQueue.classList.remove('button--active');

  console.log('Рендер просмотренных фильмов');
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
