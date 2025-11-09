import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { patientService } from '@services/api/patientService';
import { showSuccess, showError } from '@/utils/toast';

/**
 * Hook to fetch all patients
 */
export const usePatients = (filters = {}, options = {}) => {
    return useQuery({
        queryKey: ['patients', filters],
        queryFn: async () => {
            const response = await patientService.getAllPatients(filters);
            return response.data;
        },
        ...options,
    });
};

/**
 * Hook to fetch a single patient by ID
 */
export const usePatient = (patientId, options = {}) => {
    return useQuery({
        queryKey: ['patients', patientId],
        queryFn: async () => {
            const response = await patientService.getPatientById(patientId);
            return response.data;
        },
        enabled: !!patientId,
        ...options,
    });
};

/**
 * Hook to search patients
 */
export const useSearchPatients = (searchQuery, options = {}) => {
    return useQuery({
        queryKey: ['patients', 'search', searchQuery],
        queryFn: async () => {
            const response = await patientService.searchPatients(searchQuery);
            return response.data;
        },
        enabled: !!searchQuery && searchQuery.length >= 2,
        ...options,
    });
};

/**
 * Hook to create a new patient
 */
export const useCreatePatient = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (patientData) => patientService.createPatient(patientData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['patients'] });
            showSuccess('Thêm bệnh nhân thành công!');
        },
        onError: (error) => {
            showError(error?.response?.data?.message || 'Có lỗi xảy ra khi thêm bệnh nhân!');
        },
    });
};

/**
 * Hook to update a patient
 */
export const useUpdatePatient = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ patientId, patientData }) =>
            patientService.updatePatient(patientId, patientData),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['patients', variables.patientId] });
            queryClient.invalidateQueries({ queryKey: ['patients'] });
            showSuccess('Cập nhật thông tin bệnh nhân thành công!');
        },
        onError: (error) => {
            showError(error?.response?.data?.message || 'Có lỗi xảy ra khi cập nhật!');
        },
    });
};

/**
 * Hook to delete a patient
 */
export const useDeletePatient = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (patientId) => patientService.deletePatient(patientId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['patients'] });
            showSuccess('Xóa bệnh nhân thành công!');
        },
        onError: (error) => {
            showError(error?.response?.data?.message || 'Có lỗi xảy ra khi xóa!');
        },
    });
};

/**
 * Hook to fetch patient medical history
 */
export const usePatientHistory = (patientId, options = {}) => {
    return useQuery({
        queryKey: ['patients', patientId, 'history'],
        queryFn: async () => {
            const response = await patientService.getPatientHistory(patientId);
            return response.data;
        },
        enabled: !!patientId,
        ...options,
    });
};
