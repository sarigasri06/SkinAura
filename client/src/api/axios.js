import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.PROD ? '/api' : '/api',
});

// Attach token to every request
API.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  if (userInfo && userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }

  return config;
});

export default API;
