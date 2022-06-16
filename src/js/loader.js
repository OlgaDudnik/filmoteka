window.onload = function () {
  setTimeout(() => {
    const loader = document.querySelector('.loader');

    if (!loader.classList.contains('done')) {
      loader.classList.add('done');
    }
  }, 1000);
};
