import axios from '@config/axios';

/**
 * Appointment Service
 * Xử lý các API liên quan đến đặt lịch khám
 */
const appointmentService = {
    // Lấy danh sách lịch hẹn
    getAppointments: async (filters = {}) => {
        try {
            const response = await axios.get('/appointments', { params: filters });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Lấy chi tiết lịch hẹn
    getAppointmentById: async (id) => {
        try {
            const response = await axios.get(`/appointments/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Tạo lịch hẹn mới
    createAppointment: async (appointmentData) => {
        try {
            const response = await axios.post('/appointments', appointmentData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Cập nhật lịch hẹn
    updateAppointment: async (id, appointmentData) => {
        try {
            const response = await axios.put(`/appointments/${id}`, appointmentData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Hủy lịch hẹn
    cancelAppointment: async (id, reason) => {
        try {
            const response = await axios.patch(`/appointments/${id}/cancel`, { reason });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Xác nhận lịch hẹn
    confirmAppointment: async (id) => {
        try {
            const response = await axios.patch(`/appointments/${id}/confirm`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Lấy các khung giờ trống
    getAvailableSlots: async (doctorId, date) => {
        try {
            const response = await axios.get('/appointments/available-slots', {
                params: { doctorId, date },
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
};

export default appointmentService;
