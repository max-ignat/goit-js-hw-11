import ApiService from './js/api-service';
import { cardTemplate } from './js/cardTemplate';
import { render } from './js/render';

const refs = {
  inputEl: document.querySelector('#search-form'),

  submitBtn: document.querySelector('button'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const apiService = new ApiService();

refs.inputEl.addEventListener('submit', onSubmitClick);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSubmitClick(event) {
  event.preventDefault();
  apiService.query = event.target.elements.searchQuery.value;
  apiService.resetPage();
  apiService.fetchImages().then(render);
}

function onLoadMore() {
  apiService.fetchImages().then(render);
}
function render(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', cardTemplate(hits));
}
