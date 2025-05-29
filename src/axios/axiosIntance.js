import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'https://5c26-14-186-95-201.ngrok-free.app',
  timeout: 10000,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
    async (config) => {
        return config

    },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;