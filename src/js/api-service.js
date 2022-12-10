export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    // console.log('before', this);
    const BASE_URL =
      'https://pixabay.com/api/?key=31187962-e7df80d652d1f0f281ee6ae38';
    return fetch(
      `${BASE_URL}&q=${this.searchQuery}&&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=30`
    )
      .then(response => response.json())
      .then(data => {
        this.page += 1;

        return data.hits;
      })
      .catch(error => (console.log(error)));
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
