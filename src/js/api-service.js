import axios from 'axios';
import Notiflix from 'notiflix';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '26822311-a0e098b2f5216f801fe0726a9';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async searchImages() {
    try {
      const response = await axios.get(
        `?key=${KEY}&q=${this.searchQuery}&&image_type=photo&orientation=horizontal&safesearch=false&page=${this.page}&per_page=40`
      );
      this.page += 1;

      // return console.log(response.data.hits);
      return response;
    } catch {
      Notiflix.Notify.failure(
        'Ups something went wrong. Please contact your admin'
      );
    }
  }

  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
