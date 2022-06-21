import FetchApi from './api.fetch';
import * as basicLightbox from 'basiclightbox';

const newApiFetch = new FetchApi();

export async function onTrailer(e) {
    newApiFetch
        .fetchTrailers(Number(e.target.dataset.id))
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
        instance.show();
    });
}