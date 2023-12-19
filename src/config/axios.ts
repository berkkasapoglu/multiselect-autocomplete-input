import axios from 'axios';
import API from '../constants/api';

const axiosInstance = axios.create({
  baseURL: API.url,
});

export default axiosInstance;
