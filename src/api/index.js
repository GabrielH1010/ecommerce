import axios from 'axios';

export const BASE_URL = 'http://localhost:8080/ecommerce';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  json:  true
});


export default api;