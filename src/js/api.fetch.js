import renderCard from '../templates/card.hbs';
import { refs } from './refs.js';
import { showSpiner, hideSpiner } from './loader';

const LOCALSTORAGE_KEY = 'current-film';

export default class FetchMovie {

    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.URL = 'https://api.themoviedb.org/3/';
        this.key = '0eaaf2516690b5ff52877c678f040000';
        this.id = '';
    }

    get pageNum() {
        return this.page;
    }

    set pageNum(newPage) {
        this.page = newPage;
    }

    get totalPagesNum() {
        return this.totalPages;
    }

    set totalPagesNum(totalPages) {
        this.totalPages = totalPages;
    }

    // Получение фильмов
    async fetchFilms() {
        try {
            showSpiner();

            const searchFilms = await fetch(
                `${this.URL}search/movie?api_key=${this.key}&language=en-US&page=${this.page}&include_adult=false&query=${this.searchQuery}`,
            );

            hideSpiner();

            let result = await searchFilms.json();
            this.pageNum = result.page;
            this.totalPagesNum = result.total_pages;
            this.renderPagination('fetchFilms');
            return result;
        } catch (error) {
            console.log(error);
        }
    }


    // Получение актеров
    async fetchPeople() {
        try {
            const searchPeople = await fetch(
                `${this.URL}search/person?api_key=${this.key}&language=en-US&page=${this.page}&include_adult=false`,
            );
            let result = await searchPeople.json();
            this.pageNum = result.page;
            this.totalPagesNum = result.total_pages;
            this.renderPagination('fetchPeople');
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    //Получение фильма по id
    async fetchFilmsById() {
        try {
            const searchFilms = await fetch(
                `https://api.themoviedb.org/3/movie/${this.id}?api_key=${this.key}&page=${this.page}`,
            );
            let result = await searchFilms.json();
            this.pageNum = result.page;
            this.totalPagesNum = result.total_pages;
            this.renderPagination('fetchFilmsById');
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    // Получение жанров
    async fetchGenres() {
        try {
            const searchGenres = await fetch(
                `${this.URL}genre/movie/list?api_key=${this.key}&language=en-US`,
            );
            return await searchGenres.json();
        } catch (error) {
            console.log(error);
        }
    }

    // Получение популярных фильмов

    async fetchPopularFilms() {
        try {
            const searchFilms = await fetch(
                `${this.URL}movie/popular?api_key=${this.key}&language=en-US&page=${this.page}`,
            );
            let result = await searchFilms.json();
            this.pageNum = result.page;
            this.totalPagesNum = result.total_pages;
            this.renderPagination('fetchPopularFilms');
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    // Получение фильмов по рейтингу
    async fetchTopRatedFilms() {
        try {
            const searchFilms = await fetch(
                `${this.URL}movie/top_rated?api_key=${this.key}&language=en-US&page=${this.page}`,
            );
            let result = await searchFilms.json();
            this.pageNum = result.page;
            this.totalPagesNum = result.total_pages;
            this.renderPagination('fetchTopRatedFilms');
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    // Получение телепередач
    async fetchTelecast() {
        try {
            const searchTelecast = await fetch(
                `${this.URL}search/tv?api_key=${this.key}&language=en-US&page=${this.page}&include_adult=false`,
            );
            let result = await searchTelecast.json();
            this.pageNum = result.page;
            this.totalPagesNum = result.total_pages;
            this.renderPagination('fetchTelecast');
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    renderMovieList() {
        const movieList = refs.collection;
        const parsedStorage = JSON.parse(
            localStorage.getItem(LOCALSTORAGE_KEY),
        ).result;

        movieList.innerHTML = renderCard(parsedStorage);
    }

    renderPagination(functionName) {
        refs.pagination.innerHTML = this.generatePaginationMarkup(functionName);
    }

    generatePaginationMarkup(functionName) {
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
        let beforePages = this.pageNum - 1;
        let afterPages = this.pageNum + 1;
        let leftDisabledClass = this.pageNum > 1 ? '' : 'disabled-arrow';
        let rightDisabledClass = this.pageNum < this.totalPagesNum ? '' : 'disabled-arrow';
        const isNeedToAddDotsBefore = this.pageNum > 10;
        const isNeedToAddDotsAfter = this.pageNum > 10 && this.pageNum < this.totalPagesNum;

        liItems += `<li><span onclick='${functionName}' data-action='left' class='pagination__arrow--left ${leftDisabledClass}'>${backArrow}</span></li>`;

        if (isNeedToAddDotsBefore) {
            liItems += `<li><span onclick='${functionName}' data-action='change' data-page='1' class='pagination__button__link'>1</span></li>`;
            liItems += `<li><span class='pagination__button__dots'>...</span></li>`;
        }

        for (let pageLength = beforePages; pageLength <= afterPages; pageLength++) {
            if (!pageLength || pageLength > this.totalPagesNum) {
                continue;
            }

            if (this.pageNum === pageLength) {
                activeItem = 'active';
            } else {
                activeItem = '';
            }
            liItems += `<li class='${activeItem}'><span onclick='${functionName}' data-action='change' data-page='${pageLength}' class='pagination__button__link'>${pageLength}</span></li>`;
        }

        if (isNeedToAddDotsAfter) {
            liItems += `<li><span onclick='${functionName}' class='pagination__button__dots'>...</span></li>`;
            liItems += `<li><span data-action='change' data-page='${this.totalPagesNum}' class='pagination__button__link'>${this.totalPagesNum}</span></li>`;
        }

        liItems += `<li><span onclick='${functionName}' data-action='right' class='pagination__arrow--right ${rightDisabledClass}'>${forwardArrow}</span></li>`;

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
