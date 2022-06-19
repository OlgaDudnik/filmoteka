import FetchApi from './api.fetch';
import * as basicLightbox from 'basiclightbox';

const newApiFetch = new FetchApi();

const trailer = document.querySelector('.card__btn');


if (trailer) {
    trailer.addEventListener('click', trailerFn);
}
let trailerKey;

function trailerFn(e) {
    if (e.target.nodeName !== 'BUTTON') {
        return;
    }
    newApiFetch.fetchTrailers().then(t => {
        trailerKey = t.results[0].key;

        const instance = basicLightbox.create(`
    <iframe src="https://www.youtube.com/embed/${trailerKey}" width="1200" height="800"></iframe>
`);

        instance.show();

    }).catch(error => {
        error;
    });

}