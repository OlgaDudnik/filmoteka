window.onload = function () {
  setTimeout(() => {
    const preLoader = document.querySelector('.preloader');

    if (!preLoader.classList.contains('done')) {
      preLoader.classList.add('done');
    }
  }, 1000);
};
