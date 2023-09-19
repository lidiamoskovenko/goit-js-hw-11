import axios from "axios";

const key = "39495937-d101ccae04c4959456f6b5596";
const BASE_URL = 'https://pixabay.com/api/?&image_type=photo&orientation=horizontal&safesearch=true&per_page=40';
let page=1;


export function fetchImage(searchQuery) {
    return axios.get(`${BASE_URL}&q=${searchQuery}&key=${key}&page=${page}`)
        .then(response => response.data);
}
