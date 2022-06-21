import card from '../templates/modal-card.hbs';
import FetchApi from './api.fetch';
import * as basicLightbox from 'basiclightbox';
import { refs } from './refs';
const newApiFetch = new FetchApi();

refs.collection.addEventListener('click', e => {
    e.preventDefault();
    if (e.target.nodeName !== 'BUTTON') {
        return
    }
    newApiFetch.idFilm = e.target.dataset.btn;
    onTrailer();
})

async function onTrailer() {
    await newApiFetch
        .fetchTrailers()
        .then(({ results }) => {
            trailerRender({ results });

        })
        .catch(error => {
            error;
        });
}

function trailerRender({ results }) {
    const trailerBtn = document.querySelector('.card__btn');
    const instance = basicLightbox.create(`
    <iframe class="iframe" src="https://www.youtube.com/embed/${results[0].key}" width="800" height="600"></iframe>
`, {
        closable: true,
        onShow: (instance) => { window.addEventListener('keydown', onEscClose) },
        onClose: (instance) => { window.removeEventListener('keydown', onEscClose) },
    });

    trailerBtn.addEventListener('click', instance.show());

    function onEscClose(event) {
        if (event.code === 'Escape') {
            trailerBtn.removeEventListener('click', instance.close());
            instance.close();
        }
    }

}