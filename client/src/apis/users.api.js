import axiosInstance from '../config/axios.config';

export const apiRegister = (data) =>
  axiosInstance({
    url: '/user/register',
    method: 'POST',
    data,
  });

export const apiVerifyEmail = (token) =>
  axiosInstance({
    url: `/user/verifyemail/${token}`,
    method: 'GET',
  });

export const apiLogin = (data) =>
  axiosInstance({
    url: '/user/login',
    method: 'POST',
    data,
  });
