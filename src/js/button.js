import { refs } from './refs';
import markupButton from '../templates/button.hbs';

export function renderButton() {
  const buttonsLibrary = [
    {
      dataAction: 'watched',
      buttonText: 'watched',
    },
    {
      dataAction: 'queue',
      buttonText: 'queue',
    },
  ];

  refs.headerListButtons.insertAdjacentHTML(
    'beforeend',
    markupButton(buttonsLibrary)
  );
}
