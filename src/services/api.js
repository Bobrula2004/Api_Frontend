// api/axios.js
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Enable CORS by default
axiosInstance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default axiosInstance;