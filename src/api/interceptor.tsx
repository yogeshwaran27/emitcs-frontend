import axios from 'axios';
// import { apiURL } from '../constants/constants';
const axiosInstance = axios.create({
  baseURL: "/api",
  // baseURL:apiURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

export default axiosInstance;
