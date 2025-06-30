import axios from 'axios';

const token = import.meta.env.VITE_TOKEN;
const apiKey = import.meta.env.VITE_API_KEY;

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1',
  headers: {
    Authorization: `Bearer ${token}`,
    'API-KEY': apiKey,
  },
});
