import axiosInstance from '../config/axios.config';

export const apiGetProducts = (params) =>
  axiosInstance({
    url: '/product/',
    method: 'GET',
    params,
  });
