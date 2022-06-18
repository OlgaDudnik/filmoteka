import FetchMovie from './api.fetch';
import { refs } from './refs';

// This line generate error
//const WHY_THIS_DOES_NOT_WORK = new FetchMovie();

refs.pagination.addEventListener('click', onPaginationClick);

let page = 1;
let totalPages = 100;

function onPaginationClick(e) {
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

    console.log(page, totalPages);

    if (target.dataset.action === 'left') {
        page -= 1;
        generatePaginationMarkup(totalPages, page);
    } else if (target.dataset.action === 'right') {
        page += 1;
        generatePaginationMarkup(totalPages, page);
    } else if (target.dataset.action === 'change') {
        generatePaginationMarkup(totalPages, +target.dataset.page);
    }
}

export default function generatePaginationMarkup(page, totalPages) {
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
        activeItem = page === pageLength ? 'active' : '';
        liItems += `<li class='${activeItem}'><span data-action='change' data-page='${pageLength}' class='pagination__button__link'>${pageLength}</span></li>`;
    }

    if (isNeedToAddDotsAfter) {
        liItems += `<li><span class='pagination__button__dots'>...</span></li>`;
        liItems += `<li><span data-action='' data-page='${totalPages}' class='pagination__button__link'>${totalPages}</span></li>`;
    }

    liItems += `<li><span data-action='right' class='pagination__arrow--right ${rightDisabledClass}'>${forwardArrow}</span></li>`;

    return liItems;
}

