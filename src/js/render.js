import { getItemsTemplate } from "./cardTemplate";

const gallery = document.querySelector('.gallery');

export function render(items) {
  const markup = items.map(getItemsTemplate).join('');
  return gallery.insertAdjacentHTML('beforeend', markup);
}