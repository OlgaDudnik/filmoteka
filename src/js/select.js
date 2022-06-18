const refs = {
    nameSelect: document.querySelectorAll('.structure > div'),
    input: document.querySelector('.input'),
    dropdown: document.querySelector(".structure"),
    text: document.querySelector('.placeholder'),
    listener: document.querySelector('.content__container'),
};

const openDropdown = () => {
    refs.dropdown.classList.remove("hide");
    refs.input.classList.add("input__selected");
    document.addEventListener('keydown', dropdownCloseEsc);
    document.addEventListener('click', onCloseBtn)
    selectDropdown();
};

const selectDropdown = () => {
    refs.nameSelect.forEach(value => {
        value.addEventListener("click", selectOption);
    });
};

const selectOption = (e) => {
    refs.text.textContent = e.target.textContent;
    refs.text.classList.add('input__selected');
    onCloseDropdown();
};

const onCloseDropdown = () => {
    refs.dropdown.classList.add('hide');
    removeListener();
}

const dropdownCloseEsc = (e) => {
    if (e.code === 'Escape') {
        onCloseDropdown();
    }
}

const removeListener = () => {
    if (refs.dropdown.classList.contains('hide')) {
        document.removeEventListener('keydown', dropdownCloseEsc)
    }
}

const onCloseBtn = (e) => {
    if (e.target.id === 'content' || e.target.classList.contains('container') || e.target.nodeName === 'MAIN' || e.target.classList.contains('gallery-container_grid')) {
        onCloseDropdown()
    }
    if (e.target.classList.contains('input__placeholder') || e.target.classList.contains('placeholder')) {
        onCloseDropdown()
    }
}

refs.input.addEventListener("click", openDropdown)

