import FetchMovie from "./api.fetch";
import articlesTpl from '../templates/card.hbs';


const select = document.querySelector('.select')
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
select.addEventListener('change', onSelection);

function onSelection(e) {
    sortParam = e.target.value

    fetchMovie.fetchPopularFilms().then(({ results }) => {
        gallery.innerHTML = '';
        appendArticlesMarkup(sort(results, sortParam));
    })
}