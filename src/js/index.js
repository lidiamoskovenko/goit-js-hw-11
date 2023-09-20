
import { fetchImage } from "./api";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from "notiflix";
import OnlyScrollbar from 'only-scrollbar';

const registerForm = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
const message = document.querySelector('.message');

let page = 1;
let searchQuery = '';
gallery.innerHTML = '';
let simpleLightbox = new SimpleLightbox ('.photo-card a');
registerForm.addEventListener('submit', createImgCards);
loadMoreBtn.addEventListener('click', onMoresearch);

async function createImgCards(event) {
  event.preventDefault();
  searchQuery = event.currentTarget.elements.searchQuery.value;
  if (searchQuery === '') {
    Notiflix.Notify.info('Please enter a search query.');
    return;
  }
  try {
    const data = await fetchImage(searchQuery);
    if (data.hits.length === 0) {
      Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
      return;
    }
    renderGallery(data.hits);
    simpleLightbox.refresh(); 
    let galleryScrollbar = new OnlyScrollbar(gallery,{ damping: 0.8,
      eventContainer: window,
      mode: 'free'})
    galleryScrollbar.refresh(); 

    Notiflix.Notify.info(`We found ${data.totalHits} results`);
    loadMoreBtn.style.display = 'block';
  } catch (error) {
    Notiflix.Notify.failure(error.message);
    console.log(error.message);
  }
}
async function onMoresearch(event) {
  page +=1;

  try {
    const data = await fetchImage(searchQuery, page);
      renderGallery(data.hits);
      simpleLightbox.refresh();
    }
  catch (error) {
    Notiflix.Notify.failure(error.message);
  }
    console.log(page, searchQuery)

}

function renderGallery(images) {
  gallery.innerHTML = images.map(image => `
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

