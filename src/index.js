import ApiService from './js/api-service';
import Notiflix from 'notiflix';
import { render } from './js/render';
import SimpleLightbox from 'simplelightbox';
import './sass/index.scss';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoom: false,
});

const refs = {
  inputEl: document.querySelector('#search-form'),

  submitBtn: document.querySelector('button'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
const perPage = 40;

const apiService = new ApiService();
// console.log(apiService.page);
refs.inputEl.addEventListener('submit', onSubmitClick);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSubmitClick(event) {
  event.preventDefault();
  clearRender();

  apiService.query = event.target.elements.searchQuery.value;
  if (apiService.query.trim() === '') {
    return Notiflix.Notify.failure('Please entrer search query');
  }
  apiService.resetPage();
// ..............................................................................................................
  apiService.fetchImages().then(response => {
    if (response.data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
      if (response.data.totalHits === 0) {
        ifError();
      }
      Notiflix.Notify.success(
        `Hooray! We found ${response.data.totalHits} images.`
      );
      render(response);
      showButton();
      lightbox.refresh();
    

        const totalPages = Math.ceil(response.data.totalHits / perPage);
        if (apiService.page > totalPages) {
          refs.loadMoreBtn.classList.add('is-hidden');

          // ifError();
          hideButton();
          return;
        }
      });
      // console.log("apiService.fetchImages in INDEX", apiService.fetchImages)
    }

function onLoadMore() {
  apiService.fetchImages().then(response => {
    // console.log('response in onloadMore', response);
    if (response.data.hits.length === 0) {
      ifError();
      return;
    }
    render(response);
    lightbox.refresh();
    const totalPages = Math.ceil(response.data.totalHits / perPage);

    if (apiService.page > totalPages) {
      refs.loadMoreBtn.classList.add('is-hidden');

      ifError();

      return;
    }
  });
}

function clearRender() {
  refs.gallery.innerHTML = '';
}

function ifError() {
  Notiflix.Notify.failure(
    "Sorry, but you've reached the end of search results"
  );
}

function hideButton() {
  refs.loadMoreBtn.classList.add('is-hidden');
}
function showButton() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}