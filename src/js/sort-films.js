import FetchMovie from "./api.fetch";
import articlesTpl from '../templates/card.hbs';


const selectElements = document.querySelectorAll('.select > div')
const select = document.querySelector('#content')

const gallery = document.querySelector('.gallery-container_grid')

const fetchMovie = new FetchMovie();

function appendArticlesMarkup(markup) {
    gallery.insertAdjacentHTML('beforeend', articlesTpl(markup));
}

function sort(noSortArr, sortParam) {

    if (sortParam === 'raiting_down') {
        return noSortArr.sort((a, b) => a.vote_average - b.vote_average);
    }

    if (sortParam === 'raiting_up') {
        return noSortArr.sort((a, b) => b.vote_average - a.vote_average);
    }

    if (sortParam === 'popularity_down') {
        return noSortArr.sort((a, b) => a.popularity - b.popularity);
    }

    if (sortParam === 'popularity_up') {
        return noSortArr.sort((a, b) => b.popularity - a.popularity);
    } else {
        fetchMovie.fetchPopularFilms().then(({ results }) => {
            appendArticlesMarkup(results)
        })
    }
}
select.addEventListener('click', onSelection);

function onSelection(e) {
    // console.log(e);
    // selectElements.forEach((elem) => {
    //     console.log(elem.dataset.value);
    // })
    sortParam = e.target.dataset.value
    console.log(e.target.dataset.value);
    if (sortParam !== undefined) {
        fetchMovie.fetchPopularFilms().then(({ results }) => {
            gallery.innerHTML = '';
            appendArticlesMarkup(sort(results, sortParam));
        })
    }
}