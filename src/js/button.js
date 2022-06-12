import { refs } from './refs';
export function markupButton(buttonText, dataAction) {
  refs.headerForm.insertAdjacentHTML(
    'beforeend',
    `
    <button type="button" class="button" data-action="${dataAction}">${buttonText}</button>
  `
  );
}
