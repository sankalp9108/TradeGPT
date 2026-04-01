import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getCurrentUser: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
};

// Stock endpoints
export const stockService = {
  getStockPrice: (query) => api.get(`/stockprice?query=${encodeURIComponent(query)}`),
};

// News endpoints
export const newsService = {
  getNews: (query) => api.get(`/news?query=${encodeURIComponent(query)}`),
};

// Crypto endpoints
export const cryptoService = {
  getExchangeRate: (query) => api.get(`/crypto?query=${encodeURIComponent(query)}`),
};

// Gold/Silver endpoints
export const metalService = {
  getSpotPrice: (symbol) => api.get(`/metals/spot-price?symbol=${symbol}`),
};

export default api;
