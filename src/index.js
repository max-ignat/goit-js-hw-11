import ApiService from './js/api-service';
// import Notiflix from 'notiflix';
import { cardTemplate } from './js/cardTemplate';
import { render } from './js/render';
// import SimpleLightbox from 'simplelightbox';
import './sass/index.scss';
// import 'simplelightbox/dist/simple-lightbox.min.css';
// import './css/simplelight-box.css';
// const lightbox = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
//   scrollZoom: false,
// });

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
  clearRender();

  apiService.query = event.target.elements.searchQuery.value;
  if (apiService.query.trim() === '') {
    return ;
    // return Notiflix.Notify.failure('Please entrer search query');
  }
  apiService.resetPage();

  apiService.fetchImages().then(data => {
    if (data.length === 0) {
      console.log('mistake'
      );
      // Notiflix.Notify.failure(
      //   'Sorry, there are no images matching your search query. Please try again.'
      // );
      return;
    }
    console.log('succes');
    // Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    render(data);
    // lightbox.refresh();
  });
}

function onLoadMore() {
  apiService.fetchImages().then(data => {
    if (data.length === 0) {
      console.log('mistake');
      return;
    }
    console.log('succes');
    // Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    render(data);
    // lightbox.refresh();
  });
}
function render(data) {
  refs.gallery.insertAdjacentHTML('beforeend', cardTemplate(data));
}

function clearRender() {
  refs.gallery.innerHTML = '';
}
