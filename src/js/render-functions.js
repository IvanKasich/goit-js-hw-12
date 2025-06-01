import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const loader = document.querySelector('.loader');

const gallery = document.querySelector('.gallery');
function imageTemplate({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  const alt = tags.split(',').slice(0, 3).join(', ');
  return `<li>
          <a href="${largeImageURL}"><img src="${webformatURL}" alt="${alt}" width="360" height="152" />
          <div class="thumb">
          <h2>Likes<span class="item-text">${likes}</span></h2>
          <h2>Views<span class="item-text">${views}</span></h2>
          <h2>Comments<span class="item-text">${comments}</span></h2>
          <h2>Downloads<span class="item-text">${downloads}</span></h2>
          </div>
          </a>
        </li>`;
}
function imagesTemplate(imgs) {
  return imgs.map(imageTemplate).join('\n');
}
const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
  captions: true,
});

export function clearGallery() {
  gallery.innerHTML = '';
}
export function createGallery(images) {
  const markup = imagesTemplate(images);
  gallery.insertAdjacentHTML('afterbegin', markup);
  lightbox.refresh();
}
export function showLoader() {
  loader.classList.remove('hidden');
}
export function hideLoader() {
  loader.classList.add('hidden');
}
