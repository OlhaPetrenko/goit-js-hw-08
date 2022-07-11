// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);
const galleryContainer = document.querySelector('.gallery');

const galleryItemsMarkup = creatGalleryItemsMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', galleryItemsMarkup);

function creatGalleryItemsMarkup(images) {
  return images
    .map(({ preview, original, description } = {}) => {
      return `
    <div class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
        </a>
    </div>
    `;
    })
    .join('');
  console.log(markup);
}

let instance;

galleryContainer.addEventListener('click', onImageClick);
function onImageClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  instance = basicLightbox.create(`
    <div class="modal">
        <img src="${event.target.dataset.source}" width="800" height="600">
    </div>
`);
  instance.show();

  window.addEventListener('keydown', onEscBtnPush);
}

// Закриття мoдалки по Escape

function onEscBtnPush(event) {
  if (event.code !== 'Escape') {
    return;
  }

  instance.close();
  window.removeEventListener('keydown', onEscBtnPush);
}
