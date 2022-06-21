import card from '../templates/modal-card.hbs';
import FetchApi from './api.fetch';
import * as basicLightbox from 'basiclightbox';
import { refs } from './refs';
const newApiFetch = new FetchApi();

refs.collection.addEventListener('click', e => {
    if (e.target.nodeName === 'BUTTON') {
        const { id } = e.target.dataset;
        onTrailer(id)
    }
})

async function onTrailer(id) {
    newApiFetch.idFilm = id;
    await newApiFetch
        .fetchTrailers()
        .then(data => {
            trailerRender(data);
        })
        .catch(error => {
            error;
        });
}

function trailerRender(data) {
    const trailerBtn = document.querySelector('.card__btn');
    const instance = basicLightbox.create(
        `<div class="modal-trailer__backdrop">
          <iframe class="iframe" width="640" height="480" frameborder="0" allowfullscreen allow='autoplay'
            src="https://www.youtube.com/embed/${data.results[0].key}?autoplay=1" >
          </iframe>
    </div>`, {
            onShow: instance => {
                instance.element().onclick = instance.close;
                document.addEventListener('keydown', onEscClose);
            },
        }, {
            onClose: instance => {
                document.removeEventListener('keydown', onEscClose);
                console.log(instance);
            },
        },
    );

    function onEscClose(event) {
        if (event.code === 'Escape') {
            instance.close();
        }
    }
    trailerBtn.addEventListener('click', () => {
        // onAddToWatched(data)
        instance.show();
    });
}

// function onAddToWatched(data) {
//     const storageWatched =
//         JSON.parse(localStorage.getItem('storage')) || [];

//     const arreyWatched = [];
//     storageWatched.map(el => arreyWatched.push(el.id));

//     addFilmIdWatchedLocSt(data, storageWatched);
// }

// function addFilmIdWatchedLocSt(data, storageWatched) {
//     storageWatched.push(data);
//     localStorage.setItem('storage', JSON.stringify(storageWatched));
// }