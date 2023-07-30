import axiosInstance from '../config/axios.config';

export const apiGetProducts = (params) =>
  axiosInstance({
    url: '/product/',
    method: 'GET',
    params,
  });

export const apiGetProduct = (pid) =>
  axiosInstance({
    url: '/product/' + pid,
    method: 'GET',
  });
export const apiRating = (data) =>
  axiosInstance({
    url: '/product/ratings',
    method: 'PUT',
    data,
  });
