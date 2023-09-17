import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "39495937-d101ccae04c4959456f6b5596";
const BASE_URL = 'https://pixabay.com/api/?&image_type=photo&orientation=horizontal&safesearch=true';


export function fetchImage(imageId){
    return  fetch('https://pixabay.com/api/?&image_type=photo&orientation=horizontal&safesearch=true&q=${imageId}&key=39495937-d101ccae04c4959456f6b5596')
    .then(responsive=>
         {return responsive.json()});
}
