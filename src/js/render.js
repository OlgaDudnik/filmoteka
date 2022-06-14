import FetchMovie from './api.fetch';
import { refs } from './refs';

const newApiFetch = new FetchMovie();

refs.headerForm.addEventListener('submit', keyWordSearch);

function keyWordSearch(e) {
    e.preventDefault();


    // newApiFetch.query = e.target.closest('.header-form').querySelector('.header-search-input').value.trim()
    newApiFetch.query = (e.target.elements.searchQuery.value).trim();
    if (newApiFetch.query === '') {
        console.log('SOrry')
        return
    }
    newApiFetch.resetPage();
}