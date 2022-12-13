import { cardTemplate } from './cardTemplate';

const gallery = document.querySelector('.gallery');

export function render(data) {
  const markup = data.hits.map(cardTemplate).join('');
  return gallery.insertAdjacentHTML('beforeend', markup);
}
