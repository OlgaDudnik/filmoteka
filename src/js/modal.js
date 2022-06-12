const backdrop = document.querySelector('.backdrop');
const onCloseBtn = document.querySelector('.modal__button-close');
const onModalBtn = document.querySelector('.onModalBtn');

onModalBtn.addEventListener('click', onOpenModal);

function onOpenModal(e) {
  console.log(e.target.src);
  document.body.classList.add('overflow');
  backdrop.classList.add('mount');
  document.addEventListener('keydown', modalCloseEsc);
  backdrop.addEventListener('click', modalCloseClickBackdrop);
  onCloseBtn.addEventListener('click', onCloseModal);
}

function onCloseModal() {
  backdrop.classList.remove('mount');
  document.body.classList.remove('overflow');
  document.removeEventListener('keydown', modalCloseEsc);
  document.removeEventListener('click', modalCloseClickBackdrop);
  onCloseBtn.removeEventListener('click', onCloseModal);
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
