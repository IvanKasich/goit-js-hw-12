import axios from 'axios';

const API_KEY = '50463047-2395de4a1fa17e590ab2adb36';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 15,
  });
  const res = await axios.get(`${BASE_URL}?${params}`);
  return res.data;
}
