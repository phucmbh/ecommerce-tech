import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URI,
});

let store;

export const injectStore = (_store) => {
  store = _store;
};

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().users.token;
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    console.log('Axios instance: Error: ' + error);
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response?.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error.response?.data;
  }
);

export default axiosInstance;
