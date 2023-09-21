
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from "notiflix";
import newApi from './api.js'

const registerForm = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

const NewApi = new newApi();

gallery.innerHTML = '';
let simpleLightbox;
registerForm.addEventListener('submit', createImgCards);
loadMoreBtn.addEventListener('click', onMoresearch);

async function createImgCards(event) {
  event.preventDefault();
  NewApi.query = event.currentTarget.elements.searchQuery.value.trim();
  NewApi.incrementPage();

  if (NewApi.query === '') {
    Notiflix.Notify.info('Please enter a search query.');
    return;
  }
  try {
    const data = await NewApi.fetchImage();

    if (data.hits.length === 0) {
      Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
      return;
    }
    clearGallery();
    renderGallery(data.hits);
    simpleLightbox = new SimpleLightbox ('.photo-card a');
    simpleLightbox.refresh(); 
    Notiflix.Notify.info(`We found ${data.totalHits} results`);
    loadMoreBtn.style.display = 'block';

  } catch (error) {
    Notiflix.Notify.failure(error.message);
    console.log(error.message);
  }
}

async function onMoresearch(event) {

  loadMoreBtn.style.display = 'block';

  try {
    const data = await  NewApi.fetchImage();
    renderGallery(data.hits);
    simpleLightbox.refresh();

    const totalHits = data.totalHits / NewApi._perPage;

    if( NewApi.page > totalHits ){
      newPerPage=(data.totalHits - totalHits* NewApi._perPage);
      Notiflix.Notify.info('We are sorry, but you have reached the end of search results.');
      loadMoreBtn.style.display = 'none';
      console.log(newPerPage);

    } 
  }
  catch (error) {
    Notiflix.Notify.failure(error.message);
    console.log(error.message);

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









































































  

