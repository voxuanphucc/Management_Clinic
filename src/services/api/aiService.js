import axios from '@config/axios';

/**
 * AI Service
 * Xử lý các API liên quan đến AI predictions và analysis
 */
const aiService = {
    // Dự đoán bệnh dựa trên triệu chứng
    predictDisease: async (symptoms) => {
        try {
            const response = await axios.post('/ai/predict-disease', { symptoms });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Phân tích hình ảnh y tế (X-ray, CT scan...)
    analyzeImage: async (imageData) => {
        try {
            const formData = new FormData();
            formData.append('image', imageData);

            const response = await axios.post('/ai/analyze-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Gợi ý thuốc và liều lượng
    suggestMedication: async (patientData) => {
        try {
            const response = await axios.post('/ai/suggest-medication', patientData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Phân tích kết quả xét nghiệm
    analyzeTestResults: async (testData) => {
        try {
            const response = await axios.post('/ai/analyze-test-results', testData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Đánh giá mức độ nghiêm trọng
    assessSeverity: async (symptoms) => {
        try {
            const response = await axios.post('/ai/assess-severity', { symptoms });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
};

export default aiService;
