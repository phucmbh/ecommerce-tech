import axios from '../config/axios';

export const apiGetCategories = () =>
  axios({
    url: '/prodcategory/',
    method: 'get'
  });
