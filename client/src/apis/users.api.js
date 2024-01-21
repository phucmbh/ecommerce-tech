import axiosInstance from '../config/axios.config';
// Nen tach ra 2 cai public va private nghien cuu them
export const apiRegister = (data) =>
  axiosInstance({
    url: '/user/register',
    method: 'POST',
    data,
  });

export const apiVerifyEmail = (token) =>
  axiosInstance({
    url: `/user/verify-email/${token}`,
    method: 'GET',
  });

export const apiLogin = (data) =>
  axiosInstance({
    url: '/user/login',
    method: 'POST',
    data,
  });

export const apiForgotPassword = (email) =>
  axiosInstance({
    url: '/user/forgot-password',
    method: 'POST',
    data: email,
  });

export const apiResetPassword = (data) =>
  axiosInstance({
    url: '/user/reset-password',
    method: 'PUT',
    data,
  });

export const apiGetUserCurrent = () =>
  axiosInstance({
    url: '/user/current',
    method: 'GET',
  });

export const apiGetAllUsers = (params) =>
  axiosInstance({
    url: '/user',
    method: 'GET',
    params,
  });
