import axiosInstance from '../config/axios.config';

export const apiGetCategories = () =>
  axiosInstance({
    url: '/prodcategory/',
    method: 'GET',
  });
