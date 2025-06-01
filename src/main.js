import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';
import { getImagesByQuery } from './js/pixabay-api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let query = null;

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmit);
hideLoader();

function onSubmit(e) {
  e.preventDefault();

  query = e.target.elements['search-text'].value.trim();
  clearGallery();
  showLoader();
  getImagesByQuery(query)
    .then(res => {
      if (query === '') {
        hideLoader();
        iziToast.warning({
          message: 'Search field cannot be empty.',
          position: 'topRight',
        });
        form.reset();
        return;
      }
      if (!res.data.hits || res.data.hits.length === 0) {
        hideLoader();
        iziToast.warning({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          color: 'red',
          position: 'topRight',
        });
        form.reset();
        return;
      }

      createGallery(res.data.hits);
      hideLoader();
      form.reset();
    })
    .catch(err => {
      hideLoader();
      iziToast.error({
        message: 'Something went wrong!!!',
        position: 'topRight',
      });
    });
}
