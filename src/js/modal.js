
export const STORAGE_KEY1 = 'state-of-watched-movies';
export const STORAGE_KEY2 = 'state-of-queue';

const backdrop = document.querySelector('.backdrop');
const onCloseBtn = document.querySelector('.modal__button-close');
const onModalBtn = document.querySelector('.onModalBtn');
const watchedBtn = document.querySelector('#watched');
const queueBtn = document.querySelector('#queue');


watchedBtn.addEventListener('click', onAddToWatched);
queueBtn.addEventListener('click', onAddToQueue);


onModalBtn.addEventListener('click', onOpenModal);

function onOpenModal(e) {
  console.log(e.target.src);
  document.body.classList.add('overflow');
  backdrop.classList.add('mount');
  document.addEventListener('keydown', modalCloseEsc);
  backdrop.addEventListener('click', modalCloseClickBackdrop);
  onCloseBtn.addEventListener('click', onCloseModal);
  watchedBtn.addEventListener('click', onAddToWatched);
  queueBtn.addEventListener('click', onAddToQueue);
}

function onCloseModal() {
  backdrop.classList.remove('mount');
  document.body.classList.remove('overflow');
  document.removeEventListener('keydown', modalCloseEsc);
  document.removeEventListener('click', modalCloseClickBackdrop);
  onCloseBtn.removeEventListener('click', onCloseModal);
  watchedBtn.removeEventListener('click', onAddToQueue);
  queueBtn.removeEventListener('click', onAddToQueue);
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

  const watchedList = [];
  const storageState = localStorage.getItem(STORAGE_KEY1);

  if (storageState) {
    watchedList.push(...JSON.parse(storageState));
  }
  if (storageState?.includes(id)) {
    return;
  }
  watchedList.push(id);
  const records = JSON.stringify(Object.values(watchedList));
  return localStorage.setItem(STORAGE_KEY1, records);
}

function onAddToQueue() {
  const queueList = [];
  const storageState = localStorage.getItem(STORAGE_KEY2);

  if (storageState) {
    queueList.push(...JSON.parse(storageState));
  }

  if (storageState?.includes(id)) {
    const filterSroregeState = storageState.filter(el => el !== id);

    localStorage.setItem(STORAGE_KEY2, JSON.stringify(filterSroregeState));
    queueBtn.classList.remove('modal__button--active');
    return;
  }
 bugfix/FT-03
  queueList.push(id);
  const records = JSON.stringify(Object.values(queueList));
  return localStorage.setItem(STORAGE_KEY2, records);

}
