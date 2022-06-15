// const IMAGE_PATH_ENDPOINT = 'https://image.tmdb.org/t/p/w500';

const ENDPOINT = 'https://api.themoviedb.org/3/';
const API_KEY = '0eaaf2516690b5ff52877c678f040000';
const URL = 'https://api.themoviedb.org/3/movie?api_key=0eaaf2516690b5ff52877c678f040000&language=en&page=1';
let page = 1;
const list = document.querySelector('ul.pagination__list');
//------------------------------------------------------ SVG --------------------------------------------------------------------------------//

const backArrow = `<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'> 
    <path d='M12.6666 8H3.33325' stroke-width='1.33333' stroke-linecap='round' stroke-linejoin='round'/>
    <path d='M7.99992 12.6667L3.33325 8.00004L7.99992 3.33337' stroke-width='1.33333' stroke-linecap='round' stroke-linejoin='round'/>
    </svg>`;
const forwardArrow = `<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M3.33341 8H12.6667' stroke-width='1.33333' stroke-linecap='round' stroke-linejoin='round'/>
    <path d='M8.00008 12.6667L12.6667 8.00004L8.00008 3.33337' stroke-width='1.33333' stroke-linecap='round' stroke-linejoin='round'/>
    </svg>`;

//-------------------------------------------------------------------------------------------------------------------------------------------//

function renderPagination(totalPages, page) {
    let liItems = '';
    if (page > 1) {
        liItems = `<li>
      <a href='#' class='pagination__arrow--left'>
        ${backArrow}
      </a>
    </li>`;
    }
    list.innerHTML = liItems;
}

// renderPagination(500, 5);


// делает неактивными кнопки-стрелки на первой и последней  странице
// function disableArrowBtn(totalPages) {
//   if (currentPage === 1) {
//     arrowLeft.classList.add('disabled-arrow');
//   } else {
//     arrowLeft.classList.remove('disabled-arrow');
//   }
//
//   if (currentPage === totalPages) {
//     arrowRight.classList.add('disabled-arrow');
//   } else {
//     arrowRight.classList.remove('disabled-arrow');
//   }
// }

