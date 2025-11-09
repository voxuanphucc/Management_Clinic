import axios from '@config/axios';
import useAuthStore from '@store/authStore';

// Service xác thực với JWT và Zustand
export const authService = {
    // Đăng nhập
    login: async (credentials) => {
        try {
            const response = await axios.post('/auth/login', credentials);
            const { user, token } = response.data;

            // Lưu vào Zustand store
            useAuthStore.getState().login(user, token);

            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Đăng ký
    register: async (userData) => {
        try {
            const response = await axios.post('/auth/register', userData);
            const { user, token } = response.data;

            // Tự động đăng nhập sau khi đăng ký
            useAuthStore.getState().login(user, token);

            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Đăng xuất
    logout: async () => {
        try {
            await axios.post('/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Luôn clear store dù API có lỗi
            useAuthStore.getState().logout();
        }
    },

    // Refresh token
    refreshToken: async () => {
        try {
            const response = await axios.post('/auth/refresh');
            const { token } = response.data;

            useAuthStore.getState().setToken(token);

            return token;
        } catch (error) {
            useAuthStore.getState().logout();
            throw error.response?.data || error.message;
        }
    },

    // Lấy thông tin user hiện tại
    getCurrentUser: async () => {
        try {
            const response = await axios.get('/auth/me');
            const user = response.data;

            useAuthStore.getState().setUser(user);

            return user;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Đổi mật khẩu
    changePassword: async (passwords) => {
        try {
            const response = await axios.post('/auth/change-password', passwords);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Quên mật khẩu
    forgotPassword: async (email) => {
        try {
            const response = await axios.post('/auth/forgot-password', { email });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Reset mật khẩu
    resetPassword: async (token, newPassword) => {
        try {
            const response = await axios.post('/auth/reset-password', {
                token,
                newPassword,
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
};

export default authService;
