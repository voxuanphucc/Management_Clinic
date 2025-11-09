import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import handleAPIError from '@/utils/errorHandler';

// Cấu hình axios instance
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Kiểm tra token có hết hạn không
const isTokenExpired = (token) => {
    try {
        const decoded = jwtDecode(token);
        return decoded.exp * 1000 < Date.now();
    } catch (error) {
        return true;
    }
};

// Request interceptor - Tự động thêm JWT token vào header
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            // Kiểm tra token còn hạn không
            if (isTokenExpired(token)) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
                return Promise.reject(new Error('Token expired'));
            }

            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Xử lý lỗi theo từng API cụ thể
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { response, config } = error;

        // Xử lý 401 - Token không hợp lệ hoặc hết hạn
        if (response?.status === 401) {
            // Kiểm tra xem có đang ở trang login không
            const isLoginPage = window.location.pathname === '/login';

            if (!isLoginPage) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
            }
        }

        // Xử lý lỗi theo endpoint cụ thể
        // Sử dụng error handler đã định nghĩa
        handleAPIError(error);

        return Promise.reject(error);
    }
);

export default instance;
