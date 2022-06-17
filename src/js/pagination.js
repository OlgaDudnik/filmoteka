
import FetchMovie from './api.fetch';
import { refs } from './refs';


const FetchMovieInstance = new FetchMovie();
const ENDPOINT = 'https://api.themoviedb.org/3/';
const API_KEY = '0eaaf2516690b5ff52877c678f040000';
const URL = 'https://api.themoviedb.org/3/movie?api_key=0eaaf2516690b5ff52877c678f040000&language=en&page=1';
let page = FetchMovieInstance.pageNum;
let totalPages = 0;


const list = document.querySelector('ul.pagination__list');

//---------------------------------------------------------------------- SVG ---------------------------------------------------------------

const backArrow = `<svg class='icon icon-arrow-left' width='16' height='16' viewBox='0 0 16 16' fill='none'
                     xmlns='http://www.w3.org/2000/svg'>
                    <path d='M12.6666 8H3.33325' stroke-width='1.33333' stroke-linecap='round'
                        stroke-linejoin='round' />
                    <path d='M7.99992 12.6667L3.33325 8.00004L7.99992 3.33337' stroke-width='1.33333'
                        stroke-linecap='round' stroke-linejoin='round' />
                    </svg>`;
const forwardArrow = `<svg class='icon icon-arrow-right' width='16' height='16' viewBox='0 0 16 16' fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path d='M3.33341 8H12.6667' stroke-width='1.33333' stroke-linecap='round'
                        stroke-linejoin='round' />
                      <path d='M8.00008 12.6667L12.6667 8.00004L8.00008 3.33337' stroke-width='1.33333'
                        stroke-linecap='round' stroke-linejoin='round' />
                      </svg>`;

//---------------------------------------------------------------------- SVG ---------------------------------------------------------------

function renderPagination(totalPages, page) {
    let liItems = '';
    let activeItem;
    let beforePages = page - 1;
    let afterPages = page + 1;
    let leftDisabledClass = page > 1 ? '' : 'disabled-arrow';
    let rightDisabledClass = page < totalPages ? '' : 'disabled-arrow';
    const isNeedToAddDotsBefore = page > 10;
    const isNeedToAddDotsAfter = page > 10 && page < totalPages;

    liItems += `<li><span data-action='left' class='pagination__arrow--left ${leftDisabledClass}'>${backArrow}</span></li>`;

    if (isNeedToAddDotsBefore) {
        liItems += `<li><span data-action='change' data-page='1' class='pagination__button__link'>1</span></li>`;
        liItems += `<li><span class='pagination__button__dots'>...</span></li>`;
    }

    for (let pageLength = beforePages; pageLength <= afterPages; pageLength++) {
        if (!pageLength || pageLength > totalPages) {
            continue;
        }

        if (page === pageLength) {
            activeItem = 'active';
        } else {
            activeItem = '';
        }
        liItems += `<li class='${activeItem}'><span data-action='change' data-page='${pageLength}' class='pagination__button__link'>${pageLength}</span></li>`;
    }

    if (isNeedToAddDotsAfter) {
        liItems += `<li><span class='pagination__button__dots'>...</span></li>`;
        liItems += `<li><span data-action='change' data-page='${totalPages}' class='pagination__button__link'>${totalPages}</span></li>`;

    }

    liItems += `<li><span data-action='right' class='pagination__arrow--right ${rightDisabledClass}'>${forwardArrow}</span></li>`;

    list.innerHTML = liItems;
}

list.addEventListener('click', (e) => {
    let target = e.target;
    if (!['SPAN', 'svg', 'path'].includes(target.nodeName)) {
        return;
    }

    if (['svg', 'path'].includes(target.nodeName)) {
        target = target.closest('span');
    }

    if (target.classList.contains('disabled-arrow')) {
        return;
    }

    if (target.dataset.action === 'left') {
        page -= 1;
        renderPagination(totalPages, page);
    } else if (target.dataset.action === 'right') {
        page += 1;
        renderPagination(totalPages, page);
    } else if (target.dataset.action === 'change') {
        renderPagination(totalPages, +target.dataset.page);
    }
});

renderPagination(totalPages, page);

