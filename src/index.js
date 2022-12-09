import ApiService from './js/api-service';
import { cardTemplate } from './js/cardTemplate';


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
  apiService.fetchImages().then(renderMarkUp);
}

function onLoadMore() {
  apiService.fetchImages().then(renderMarkUp);
}
function renderMarkUp(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', cardTemplate(hits));
}
