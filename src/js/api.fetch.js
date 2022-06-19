import renderCard from '../templates/card.hbs';
import { refs } from './refs.js';
import { showSpiner, hideSpiner } from './loader';
//import generatePaginationMarkup from './pagination';

const LOCALSTORAGE_KEY = 'current-film';

String.prototype.replaceArray = function(find, replace) {
    let replaceString = this;
    let regex;
    for (let i = 0; i < find.length; i++) {
        regex = new RegExp(find[i], 'g');
        replaceString = replaceString.replace(regex, replace[i]);
    }
    return replaceString;
};

export default class FetchMovie {

    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.URL = 'https://api.themoviedb.org/3/';
        this.key = '0eaaf2516690b5ff52877c678f040000';
        this.id = '';
        this.urlTemplates = {
            searchFilms: 'search/movie?api_key={API_KEY}&language=en-US&page={PAGE}&include_adult=false&query={QUERY}',
            searchActors: 'search/person?api_key={API_KEY}&language=en-US&page={PAGE}&include_adult=false',
            getFilmById: 'movie/{ID}?api_key={API_KEY}',
            getGenres: 'genre/movie/list?api_key={API_KEY}&language=en-US',
            getPopularFilms: 'movie/popular?api_key={API_KEY}&language=en-US&page={PAGE}',
            getTopRatedFilms: 'movie/top_rated?api_key={API_KEY}&language=en-US&page={PAGE}',
            getTelecast: 'search/tv?api_key={API_KEY}&language=en-US&page={PAGE}&include_adult=false',
        };
    }

    get pageNum() {
        return typeof this.page === 'undefined' ? 1 : this.page;
    }

    set pageNum(newPage) {
        if (Number(newPage) > 500) {
            newPage = 500;
        }
        this.page = newPage;
    }

    get totalPagesNum() {
        return typeof this.totalPages === 'undefined' ? 0 : this.totalPages;
    }

    set totalPagesNum(totalPages) {
        this.totalPages = totalPages;
    }

    async sendQuery(action) {
        showSpiner();

        // first generate url based on required data
        const url = this.urlTemplates[action].replaceArray(['{API_KEY}', '{PAGE}', '{QUERY}', '{ID}'], [this.key, this.pageNum, this.searchQuery, this.id]);

        // second - fetch
        try {
            const responsePromise = await fetch(this.URL + url);
            let result = await responsePromise.json();
            if (result.hasOwnProperty('page')) {
                this.pageNum = result.page;
            }

            if (result.hasOwnProperty('total_pages')) {
                this.totalPagesNum = result.total_pages;
            }

            console.log(this.URL + url, this.pageNum, this.totalPagesNum);

            this.renderPagination();

            hideSpiner();

            // third - return result
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    // Получение фильмов
    async fetchFilms() {
        return this.sendQuery('searchFilms');
    }

    // Получение актеров
    async fetchPeople() {
        return this.sendQuery('searchActors');
    }

    //Получение фильма по id
    async fetchFilmsById() {
        return this.sendQuery('getFilmById');
    }

    // Получение жанров
    async fetchGenres() {
        return this.sendQuery('getGenres');
    }

    // Получение популярных фильмов

    async fetchPopularFilms() {
        return this.sendQuery('getPopularFilms');
    }

    // Получение фильмов по рейтингу
    async fetchTopRatedFilms() {
        return this.sendQuery('getTopRatedFilms');
    }

    // Получение телепередач
    async fetchTelecast() {
        return this.sendQuery('getTelecast');
    }

    renderMovieList() {
        const movieList = refs.collection;
        const parsedStorage = JSON.parse(
            localStorage.getItem(LOCALSTORAGE_KEY),
        ).results;

        movieList.innerHTML = renderCard(parsedStorage);
    }

    renderPagination() {
        refs.pagination.innerHTML = this.generatePaginationMarkup(this.pageNum, this.totalPagesNum);
    }

    generatePaginationMarkup(page, totalPages) {
        if (Number(totalPages) > 500) {
            totalPages = 500;
        }

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
        const isNeedToAddDotsAfter = page > 10 && page < (totalPages - 1);

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
            liItems += `<li><span data-action='change' data-page='${totalPages}' class='pagination__button__link'>${totalPages}</span></li>`;
        }

        liItems += `<li><span data-action='right' class='pagination__arrow--right ${rightDisabledClass}'>${forwardArrow}</span></li>`;

        return liItems;
    }

    // Получение трейлеров
    async fetchTrailers(id) {
        try {
            const searchTrailer = await fetch(
                `${this.URL}movie/${id}/videos?api_key=${this.key}&language=en-US`,
            );
            return await searchTrailer.json();
        } catch (error) {
            console.log(error);
        }
    }

    saveLocaleStorage(films) {
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(films));
    }

    getLocaleStorage() {
        return JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    }

    incrementPage() {
        this.page += 1;
    }

    decrementPage() {
        this.page -= 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

    get idFilm() {
        return this.id;
    }

    set idFilm(newid) {
        this.id = newid;
    }
}