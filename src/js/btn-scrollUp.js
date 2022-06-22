const scrollUpBtn = document.querySelector('#arrUp');

scrollUpBtn.addEventListener('click', scrollTop);

function scrollTop(e) {
  e.preventDefault();

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

setInterval(function displayScrollTopBtn() {
  if (window.scrollY > 200) {
     scrollUpBtn.style.display = 'flex';
  } else {
    scrollUpBtn.style.display = 'none';
  }
}, 300);