import {fetchImage} from "./api";

const input = document.querySelector('input');
const submitBtn = document.querySelector('button');
const gallery = document.querySelector('.gallery');


submitBtn.addEventListener('submit', (e)=>{
    e.preventDefault();
   })
    const urlId = e.target.element.value;
    console.log(urlId)

//  function createImgCards(images){
//     fetchImage().then(images=>{
//      gallery.innerHTML = '<div>
//          <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy"/>
//          <div class="info">
//            <p class="info-item">
//              <b>Likes</b>'${image.likes}'
//            </p>
//            <p class="info-item">
//              <b>Views</b>'${image.views}'
//            </p>
//            <p class="info-item">
//              <b>Comments</b>'${image.comments}'
//            </p>
//            <p class="info-item">
//              <b>Downloads</b>'${image.downloads}'
//            </p></div></div>'
     
//     })}

// })
// axios.get('${BASE_URL}&q=${urlId}')
// .then(response => console.log(response.data))
