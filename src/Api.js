import axios from 'axios';

const API_KEY = '33063582-bd88d5aaf715a71a39133f1fd';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = (searchQuery, currentPage) => {
  const URL = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&page=${currentPage}&per_page=12`;

  return axios
    .get(URL)
    .then(response => response.data)
    .catch(error => Promise.reject(error));
};
