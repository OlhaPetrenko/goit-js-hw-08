// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');

const GalleryItemsMarkup = creatGalleryItemsMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', GalleryItemsMarkup);

function creatGalleryItemsMarkup(images) {
  return images
    .map(({ preview, original, description } = {}) => {
      return `
      <div class="gallery__item">
        <a  href="${original}">
            <img class="gallery__image" src="${preview}" alt="${description}" />
        </a>
        </div>
        `;
    })
    .join('');
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
