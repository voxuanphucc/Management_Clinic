import axios from '@config/axios';

/**
 * Patient Service
 * Xử lý các API liên quan đến bệnh nhân
 */
const patientService = {
    // Lấy danh sách bệnh nhân
    getPatients: async (filters = {}) => {
        try {
            const response = await axios.get('/patients', { params: filters });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Lấy chi tiết bệnh nhân
    getPatientById: async (id) => {
        try {
            const response = await axios.get(`/patients/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Tạo hồ sơ bệnh nhân mới
    createPatient: async (patientData) => {
        try {
            const response = await axios.post('/patients', patientData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Cập nhật thông tin bệnh nhân
    updatePatient: async (id, patientData) => {
        try {
            const response = await axios.put(`/patients/${id}`, patientData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Xóa bệnh nhân
    deletePatient: async (id) => {
        try {
            const response = await axios.delete(`/patients/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Lấy lịch sử khám bệnh
    getMedicalHistory: async (patientId) => {
        try {
            const response = await axios.get(`/patients/${patientId}/medical-history`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Lấy kết quả xét nghiệm
    getTestResults: async (patientId) => {
        try {
            const response = await axios.get(`/patients/${patientId}/test-results`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Upload hình ảnh y tế
    uploadMedicalImage: async (patientId, imageData) => {
        try {
            const formData = new FormData();
            formData.append('image', imageData);

            const response = await axios.post(`/patients/${patientId}/medical-images`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
};

export default patientService;
