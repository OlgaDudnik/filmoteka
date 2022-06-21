(() => {
    const refs = {
        openModalBtn: document.querySelector('[data-modal-open]'),
        closeModalBtn: document.querySelector('[data-modal-close]'),
        modal: document.querySelector('[data-modal]'),
        backSide: document.querySelectorAll('.students__card'),
        backdrop: document.querySelector('.backdrop__students'),
    };

    refs.openModalBtn.addEventListener('click', toggleModal);
    refs.backdrop.addEventListener('click', modalCloseClickBackdrop);
    // document.addEventListener('keydown', modalCloseEsc);

    refs.backSide.forEach((elem) => {
        elem.addEventListener('click', toggleBackSide);
        function toggleBackSide() {
            elem.classList.toggle('active');
        }
    })

    // refs.closeModalBtn.addEventListener('click', toggleModal);

    function modalCloseClickBackdrop(e) {
        if (e.target.nodeName === 'BACKDROP') {
            refs.modal.classList.toggle('is-hidden');
            refs.modal.classList.toggle('mount')
        }
    }

    function toggleModal(e) {
        e.preventDefault()
        refs.modal.classList.toggle('is-hidden');
        refs.modal.classList.toggle('mount')
    }

    function modalCloseEsc(e) {
        console.log(e);
        if (e.code === 'Escape') {
            refs.modal.classList.add('is-hidden');
            refs.modal.classList.remove('mount')
        }
    }
})();