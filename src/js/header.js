import { refs } from './refs';
import { renderButton } from './button';
import MyLibrary from './mylibrary';
import FetchMovie from './api.fetch';
import renderCard from '../templates/card.hbs';
import onAddToQueue from './modal';

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

  //height header
  refs.header.style.paddingBottom = '0px';

  //show filter
  refs.filterBtn.classList.remove('is-hidden');
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
  //height header
  refs.header.style.paddingBottom = '0px';

  refs.headerForm.classList.add('visually-hidden');
  refs.headerListButtons.classList.remove('visually-hidden');

  refs.collection.style.gridTemplateColumns = '';

  //hide filter
  refs.filterBtn.classList.add('is-hidden');
  refs.filter.classList.add('visually-hidden');

  //hide pagination
  refs.pagination.classList.add('visually-hidden');

  refs.headerListButtons.innerHTML = '';
  renderButton();

  if (myLibrary.getLibrary().length === 0) {
    //height header
    refs.header.style.paddingBottom = '44px';

    refs.collection.style.gridTemplateColumns = 'repeat(1, 100%)';
    //hide button library
    refs.headerListButtons.classList.add('visually-hidden');
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
  refs.buttonWatched.classList.toggle('button--active');

  if (refs.buttonWatched.classList.contains('button--active')) {
    refs.buttonQueue.classList.remove('button--active');
  }

  if (!refs.buttonWatched.classList.contains('button--active')) {
    onOpenLibraryPage();
    return;
  }

  //render watched films
  refs.collection.style.gridTemplateColumns = '';
  myLibrary.clearInterval();
  myLibrary.renderWatchedFilm();

  if (myLibrary.getWatchedFilms().length === 0) {
    refs.collection.style.gridTemplateColumns = 'repeat(1, 100%)';
  }

  //delete watched films
  if (event.target.tagName === 'SPAN') {
    if (myLibrary.getWatchedFilms().length != 0) {
      let deleteWatched = confirm('Do you want clean watched films?');
      if (deleteWatched === true) {
        myLibrary.clearInterval();
        myLibrary.removeWatchedFilm();
        refs.collection.style.gridTemplateColumns = 'repeat(1, 100%)';
      }
    }
  }
}

function onOpenQueueFilms(event) {
  refs.buttonQueue.classList.toggle('button--active');
  if (refs.buttonQueue.classList.contains('button--active')) {
    refs.buttonWatched.classList.remove('button--active');
  }

  if (!refs.buttonQueue.classList.contains('button--active')) {
    onOpenLibraryPage();
    return;
  }

  //render queue films
  refs.collection.style.gridTemplateColumns = '';
  myLibrary.clearInterval();
  myLibrary.renderQueryFilms();

  if (myLibrary.getQueueFilms().length === 0) {
    refs.collection.style.gridTemplateColumns = 'repeat(1, 100%)';
  }

  //delete queue films
  if (event.target.tagName === 'SPAN') {
    if (myLibrary.getQueueFilms().length != 0) {
      let deleteQuestion = confirm('Do you want clean queue?');
      if (deleteQuestion === true) {
        myLibrary.clearInterval();
        myLibrary.removeQueryFilms();
        refs.collection.style.gridTemplateColumns = 'repeat(1, 100%)';
      }
    }
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
