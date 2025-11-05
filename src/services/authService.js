import axios from '@config/axios';

// Service xác thực
export const authService = {
    // Đăng nhập
    login: async (credentials) => {
        const response = await axios.post('/auth/login', credentials);
        return response.data;
    },

    // Đăng ký
    register: async (userData) => {
        const response = await axios.post('/auth/register', userData);
        return response.data;
    },

    // Đăng xuất
    logout: async () => {
        const response = await axios.post('/auth/logout');
        return response.data;
    },

    // Refresh token
    refreshToken: async () => {
        const response = await axios.post('/auth/refresh');
        return response.data;
    },
};

export default authService;
