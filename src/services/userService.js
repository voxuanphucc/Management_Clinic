import axios from '@config/axios';

// Service người dùng
export const userService = {
    // Lấy danh sách người dùng
    getUsers: async () => {
        const response = await axios.get('/users');
        return response.data;
    },

    // Lấy thông tin người dùng theo ID
    getUserById: async (id) => {
        const response = await axios.get(`/users/${id}`);
        return response.data;
    },

    // Cập nhật thông tin người dùng
    updateUser: async (id, userData) => {
        const response = await axios.put(`/users/${id}`, userData);
        return response.data;
    },

    // Xóa người dùng
    deleteUser: async (id) => {
        const response = await axios.delete(`/users/${id}`);
        return response.data;
    },
};

export default userService;
