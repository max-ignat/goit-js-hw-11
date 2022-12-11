import { cardTemplate } from './cardTemplate';

export function render(hits) {
  const markup = hits.map(cardTemplate).join('');
  return refs.gallery.insertAdjacentHTML('beforeend', markup);
}
