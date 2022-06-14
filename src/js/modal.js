import { refs } from './refs';
import { keys } from './storage_key';

const backdrop = document.querySelector('.backdrop');
const onCloseBtn = document.querySelector('.modal__button-close');
const onModalBtn = document.querySelector('.onModalBtn');

// modal close - open  ******************************

onModalBtn.addEventListener('click', onOpenModal);

function onOpenModal(e) {
  console.log(e.target.src);
  document.body.classList.add('overflow');
  backdrop.classList.add('mount');
  document.addEventListener('keydown', modalCloseEsc);
  backdrop.addEventListener('click', modalCloseClickBackdrop);
  onCloseBtn.addEventListener('click', onCloseModal);
  refs.watchedBtn.addEventListener('click', onAddToWatched);
  refs.queueBtn.addEventListener('click', onAddToQueue);
}

function onCloseModal() {
  backdrop.classList.remove('mount');
  document.body.classList.remove('overflow');
  document.removeEventListener('keydown', modalCloseEsc);
  document.removeEventListener('click', modalCloseClickBackdrop);
  onCloseBtn.removeEventListener('click', onCloseModal);
  refs.watchedBtn.removeEventListener('click', onAddToQueue);
  refs.queueBtn.removeEventListener('click', onAddToQueue);
}

function modalCloseEsc(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
}

function modalCloseClickBackdrop(e) {
  if (e.target.nodeName === 'BACKDROP') {
    onCloseModal();
  }
}

// localStorage *******************************

const id = 'film';

function onAddToWatched() {
  const storageState = JSON.parse(localStorage.getItem(keys.STORAGE_KEY1)) || [];

  if (storageState?.includes(id)) {
    const filterSroregeState = storageState.filter(el => el !== id);

    localStorage.setItem(keys.STORAGE_KEY1, JSON.stringify(filterSroregeState));
    refs.watchedBtn.classList.remove('modal__button--active');
    return;
  }

  refs.watchedBtn.classList.add('modal__button--active');

  storageState.push(id);
  localStorage.setItem(keys.STORAGE_KEY1, JSON.stringify(storageState));
}

function onAddToQueue() {
  const storageState = JSON.parse(localStorage.getItem(keys.STORAGE_KEY2)) || [];

  if (storageState?.includes(id)) {
    const filterSroregeState = storageState.filter(el => el !== id);

    localStorage.setItem(keys.STORAGE_KEY2, JSON.stringify(filterSroregeState));
    refs.queueBtn.classList.remove('modal__button--active');
    return;
  }

  refs.queueBtn.classList.add('modal__button--active');

  storageState.push(id);
  localStorage.setItem(keys.STORAGE_KEY2, JSON.stringify(storageState));
}
