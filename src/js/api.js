import axios from "axios";

export default 
class newApi{
    constructor () {
        this.searchQuery = '';
        this.page = 1;
        this._perPage = 40;

    }
    
    fetchImage() {
        const key = "39495937-d101ccae04c4959456f6b5596";
        const BASE_URL = 'https://pixabay.com/api/?&image_type=photo&orientation=horizontal&safesearch=tru';
      
        return axios.get(`${BASE_URL}&q=${this.searchQuery}&key=${key}&page=${this.page}&per_page=${this._perPage}`)
          .then(response => {
            this.incrementPage();
            return response.data; 
          })
          .catch(error => {
            throw new Error('Error fetching images: ' + error.message);
          });
      }
incrementPage(){
    this.page +=1;
}
resetPage(){
    this.page = 1;
}

    get query(){
        return this.searchQuery;
    }
    set query (newQuery) {
        this.searchQuery = newQuery;}

        get perPage(){
            return _perPage;
        }
        set perPage (newPerPage) {
            this._perPage = newPerPage;}
          
        }
        