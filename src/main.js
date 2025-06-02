import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  hideLoadMore,
  updateBtnStatus,
  loadMore,
} from './js/render-functions';
import { getImagesByQuery } from './js/pixabay-api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let query = null;
let currentPage = 1;
let maxPage = 1;

const form = document.querySelector('.form');
hideLoader();
hideLoadMore();
form.addEventListener('submit', onSubmit);
loadMore.addEventListener('click', onClick);

async function onSubmit(e) {
  e.preventDefault();

  query = e.target.elements['search-text'].value.trim();
  currentPage = 1;
  clearGallery();
  showLoader();
  try {
    const res = await getImagesByQuery(query, currentPage);
    maxPage = Math.ceil(res.totalHits / 15);
    if (query === '') {
      hideLoader();
      iziToast.warning({
        message: 'Search field cannot be empty.',
        position: 'topRight',
      });
      hideLoadMore();
      form.reset();
      return;
    }
    if (!res.hits || res.hits.length === 0) {
      hideLoader();
      iziToast.warning({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        color: 'red',
        position: 'topRight',
      });
      hideLoadMore();
      form.reset();
      return;
    }

    createGallery(res.hits);
    hideLoader();
    updateBtnStatus(currentPage, maxPage);
    form.reset();
  } catch (err) {
    hideLoader();
    iziToast.error({
      message: 'Something went wrong!!!',
      position: 'topRight',
    });
  }
}
async function onClick() {
  hideLoadMore();
  try {
    currentPage++;
    showLoader();

    const res = await getImagesByQuery(query, currentPage);
    createGallery(res.hits);
    hideLoader();
    window.scrollBy({
      top: document.querySelector('li').getBoundingClientRect().height * 3,
      behavior: 'smooth',
    });
    updateBtnStatus(currentPage, maxPage);
  } catch (err) {
    hideLoader();
    iziToast.error({
      message: 'Something went wrong!!!',
      position: 'topRight',
    });
  }
}
