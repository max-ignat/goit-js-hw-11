import { cardTemplate } from "./cardTemplate";

const gallery = document.querySelector('.gallery');

export function render(hits) {
  const markup = hits.map(cardTemplate).join('');
  return gallery.insertAdjacentHTML('beforeend', markup);
}