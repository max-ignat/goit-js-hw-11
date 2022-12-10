import { getItemsTemplate } from "./cardTemplate";

const gallery = document.querySelector('.gallery');

export function render(hits) {
  const markup = hits.map(getItemsTemplate).join('');
  return gallery.insertAdjacentHTML('beforeend', markup);
}