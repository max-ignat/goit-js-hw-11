import { cardTemplate } from './cardTemplate';

export function render(hits) {
  const markup = hits.map(cardTemplate).join('');
  return gallery.insertAdjacentHTML('beforeend', markup);
}
