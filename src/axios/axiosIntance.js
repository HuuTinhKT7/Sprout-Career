import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'https://5c26-14-186-95-201.ngrok-free.app',
  timeout: 10000,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true' // Bỏ qua cảnh báo ngrok
  },
});


axiosInstance.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token')
      if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }      
        return config;

    },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
     if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Gọi API refresh token
        const response = await axios.post('/auth/refresh', {}, {
          withCredentials: true
        });
        const newToken = response.data.access_token;
        // Lưu token mới
        localStorage.setItem('access_token', newToken);
        
        // Thử lại request ban đầu với token mới
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Xử lý khi refresh token thất bại
        console.error('Refresh token failed:', refreshError);
        // Có thể redirect về trang login ở đây
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;