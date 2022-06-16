import { refs } from './refs';
import { markupButton } from './button';
import MyLibrary from './mylibrary';
import FetchMovie from './api.fetch';
import renderCard from '../templates/card.hbs';

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

  refs.paginationContainer.classList.remove('is-hidden');
  refs.headerForm.classList.remove('is-hidden');

  refs.headerForm.innerHTML = `<input
      type="text"
      class="header-search-input"
      name="searchQuery"
      placeholder="Поиск фильма"
    />
    <button type="submit" class="search-btn">
      <svg class="icon-search" width="24" height="24">
        <use href="/src/images/header-main/search.svg#icon-search"></use>
      </svg>
    </button>`;

  myLibrary.clearRenderLibrary();
  myLibrary.clearInterval();
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

  if (myLibrary.getMyLibraryId().length === 0) {
    refs.headerForm.classList.add('is-hidden');
    refs.paginationContainer.classList.add('is-hidden');
  } else {
    refs.headerForm.classList.remove('is-hidden');
    refs.paginationContainer.classList.remove('is-hidden');
  }

  myLibrary.clearInterval();
  myLibrary.renderLibrary();
  //refs.collection.innerHTML = ``;

  refs.buttonQueue = document.querySelector('[data-action="queue"]');
  refs.buttonWatched = document.querySelector('[data-action="watched"]');

  refs.buttonQueue.addEventListener('click', onOpenQueueFilms);
  refs.buttonWatched.addEventListener('click', onOpenWatchedFilms);
}

//-----------------------------------------------------------

function onOpenQueueFilms() {
  refs.buttonQueue.classList.add('button--active');
  refs.buttonWatched.classList.remove('button--active');

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
