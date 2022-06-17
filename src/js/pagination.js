/*
list.addEventListener('click', (e) => {
    let target = e.target;
    if (!['SPAN', 'svg', 'path'].includes(target.nodeName)) {
        return;
    }

    if (['svg', 'path'].includes(target.nodeName)) {
        target = target.closest('span');
    }

    if (target.classList.contains('disabled-arrow')) {
        return;
    }

    if (target.dataset.action === 'left') {
        page -= 1;
        renderPagination(totalPages, page);
    } else if (target.dataset.action === 'right') {
        page += 1;
        renderPagination(totalPages, page);
    } else if (target.dataset.action === 'change') {
        renderPagination(totalPages, +target.dataset.page);
    }
});
 */

