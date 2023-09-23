
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from "notiflix";
import NewApi from './api.js'

const registerForm = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

const newApi = new NewApi();

gallery.innerHTML = '';

let simpleLightbox;
registerForm.addEventListener('submit', createImgCards);
loadMoreBtn.addEventListener('click', onMoresearch);

async function createImgCards(event) {
  event.preventDefault();
  newApi.query = event.currentTarget.elements.searchQuery.value.trim();
  newApi.resetPage();
  clearGallery();
  loadMoreBtn.style.display = 'none';


  if (newApi.query.trim() === ''){
    Notiflix.Notify.info('Please enter a search query.');
    return;
  }
    try {
    const data = await newApi.fetchImage();

    if (data.hits.length === 0) {
      Notiflix.Notify.info('No more images to load.');
    }

    renderGallery(data.hits);
    simpleLightbox = new SimpleLightbox ('.photo-card a');
    simpleLightbox.refresh(); 
    Notiflix.Notify.info(`We found ${data.totalHits} results`);

    if (data.hits.length >= newApi._perPage) {
    loadMoreBtn.style.display = 'block';
  } 

}
  catch (error) {
    Notiflix.Notify.failure(error.message);
    console.log(error.message);
  }
}

async function onMoresearch(event) {

  loadMoreBtn.style.display = 'block';

  try {
    const data = await  newApi.fetchImage();
    renderGallery(data.hits);
    simpleLightbox.refresh();

    const totalHits = Math.ceil(data.totalHits / newApi._perPage);

    if( newApi.page > totalHits ){
newApi.newPerPage = data.totalHits - totalHits * 40;
      Notiflix.Notify.info('We are sorry, but you have reached the end of search results.');
      loadMoreBtn.style.display = 'none';
    } 
  }
  catch (error) {
    Notiflix.Notify.failure(error.message);

  }
}

function renderGallery(images) {
  gallery.innerHTML += images.map(image => `
    <div class="photo-card">
      <a href=${image.largeImageURL}>
        <img src=${image.webformatURL} alt=${image.tags} loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>${image.likes}
        </p>
        <p class="info-item">
          <b>Views</b>${image.views}
        </p>
        <p class="info-item">
          <b>Comments</b>${image.comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>${image.downloads}
        </p>
      </div>
    </div>`
  ).join('');
}

function clearGallery(){
  gallery.innerHTML = '';
}









































































  

