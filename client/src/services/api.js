import axios from 'axios';

// Create an Axios instance
const API = axios.create({
  baseURL: '/api', // Using proxy from vite
});

// Interceptor to add the token to requests
API.interceptors.request.use((req) => {
  if (localStorage.getItem('userInfo')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`;
  }
  return req;
});

export default API;
