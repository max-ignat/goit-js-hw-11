import ApiService from './js/api-service';
import Notiflix from 'notiflix';
// import { cardTemplate } from './js/cardTemplate';
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
// class ApiService {

//   constructor() {
//     this.searchQuery = '';
//     this.page = 1;
//   }

//   fetchImages() {
//     console.log('before', this);
//     const BASE_URL =
//       'https://pixabay.com/api/?key=31187962-e7df80d652d1f0f281ee6ae38';
//     return fetch(
//       `${BASE_URL}&q=${this.searchQuery}&&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=30`
//     )
//       .then(response => response.json())
//       .then(data => {
//         this.page += 1;

//         return data.hits;
//       })
//       .catch(error => console.log(error));
//   }

//   resetPage() {
//     this.page = 1;
//   }
//   get query() {
//     return this.searchQuery;
//   }

//   set query(newQuery) {
//     this.searchQuery = newQuery;
//   }
// }

const apiService = new ApiService();
console.log(apiService.page);
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

  apiService.fetchImages().then(data => {
    if (data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    if (data.totalHits === 0) {
      ifError();
    }
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    render(data);
    lightbox.refresh();
  });
}

function onLoadMore() {
  apiService.fetchImages().then(data => {
    if (data.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
 render(data);
    lightbox.refresh();
    const totalPages = Math.ceil(data.totalHits / perPage);

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
