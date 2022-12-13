import { cardTemplate } from './cardTemplate';

const gallery = document.querySelector('.gallery');

export function render(response) {
  console.log('response in render ', response.data)
  const data = response.data

  const markup = data.hits.map(cardTemplate).join('');
  return gallery.insertAdjacentHTML('beforeend', markup);
}
