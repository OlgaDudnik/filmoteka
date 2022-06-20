import data from "../data-base/genres.json";

const refs = {
    dropdown: document.querySelectorAll(".filter__structure"),
    placeholder: document.querySelectorAll('.placeholder'),
    filterLink: document.querySelector('.filter__link'),
    select: document.querySelector('.filter'),
    genreSelect: document.querySelector('.filter__structure--genre'),
};

let dataAction = '';

const genreMurkup = () => {
    const markup = data.map((elem) => {
        return `
    <div id="${elem.id}" data-value="${elem.name}">
        ${elem.name}
    </div>
`
    }).join('')

    refs.genreSelect.insertAdjacentHTML('afterbegin', markup)
}

genreMurkup();

const openDropdown = (e) => {
    dataAction = e.target.dataset.action;
    refs.dropdown.forEach((elem) => {
        if (elem.dataset.action === dataAction) {
            elem.classList.remove("hide");
            elem.classList.add("input__selected");
            document.addEventListener('keydown', dropdownCloseEsc);
            document.addEventListener('click', onCloseBtn)
            selectDropdown();
        }
    })
};

const selectDropdown = () => {
    const nameSelect = document.querySelectorAll('.filter__structure > div');

    nameSelect.forEach(value => {
        value.addEventListener("click", selectOption);
    });
};

const selectOption = (e) => {
    refs.placeholder.forEach((elem) => {

        if (elem.dataset.action === dataAction) {
            elem.textContent = e.target.textContent;
            elem.classList.add('input__selected');
            onCloseDropdown();
        }
    })
};

const onCloseDropdown = () => {
    refs.dropdown.forEach((elem) => {
        if (!elem.classList.value.includes('hide')) {
            elem.classList.add('hide');
            removeListener();
        }
    })
};

const dropdownCloseEsc = (e) => {
    if (e.code === 'Escape') {
        onCloseDropdown();
    }
};

const removeListener = () => {
    refs.dropdown.forEach((elem) => {
        if (!elem.classList.value.includes('hide')) {
            document.removeEventListener('keydown', dropdownCloseEsc)
        }
    })
};

const onCloseBtn = (e) => {
    if (e.target.id === 'content' || e.target.classList.contains('container') || e.target.nodeName === 'MAIN' || e.target.classList.contains('gallery-container_grid')) {
        onCloseDropdown()
    }
    if (e.target.classList.contains('input__placeholder') || e.target.classList.contains('placeholder')) {
        onCloseDropdown()
    }
};

const openFilterMenu = () => {
    refs.select.classList.toggle('hide')
};


refs.select.addEventListener("click", openDropdown);
refs.filterLink.addEventListener('click', openFilterMenu);
