import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { appointmentService } from '@services/api/appointmentService';
import { showSuccess, showError } from '@/utils/toast';

/**
 * Hook to fetch all appointments
 */
export const useAppointments = (filters = {}, options = {}) => {
    return useQuery({
        queryKey: ['appointments', filters],
        queryFn: async () => {
            const response = await appointmentService.getAllAppointments(filters);
            return response.data;
        },
        ...options,
    });
};

/**
 * Hook to fetch a single appointment by ID
 */
export const useAppointment = (appointmentId, options = {}) => {
    return useQuery({
        queryKey: ['appointments', appointmentId],
        queryFn: async () => {
            const response = await appointmentService.getAppointmentById(appointmentId);
            return response.data;
        },
        enabled: !!appointmentId,
        ...options,
    });
};

/**
 * Hook to fetch appointments by patient ID
 */
export const usePatientAppointments = (patientId, options = {}) => {
    return useQuery({
        queryKey: ['appointments', 'patient', patientId],
        queryFn: async () => {
            const response = await appointmentService.getAppointmentsByPatient(patientId);
            return response.data;
        },
        enabled: !!patientId,
        ...options,
    });
};

/**
 * Hook to fetch appointments by doctor ID
 */
export const useDoctorAppointments = (doctorId, options = {}) => {
    return useQuery({
        queryKey: ['appointments', 'doctor', doctorId],
        queryFn: async () => {
            const response = await appointmentService.getAppointmentsByDoctor(doctorId);
            return response.data;
        },
        enabled: !!doctorId,
        ...options,
    });
};

/**
 * Hook to create a new appointment
 */
export const useCreateAppointment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (appointmentData) => appointmentService.createAppointment(appointmentData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['appointments'] });
            showSuccess('Đặt lịch hẹn thành công!');
        },
        onError: (error) => {
            showError(error?.response?.data?.message || 'Có lỗi xảy ra khi đặt lịch!');
        },
    });
};

/**
 * Hook to update an appointment
 */
export const useUpdateAppointment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ appointmentId, appointmentData }) =>
            appointmentService.updateAppointment(appointmentId, appointmentData),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['appointments', variables.appointmentId],
            });
            queryClient.invalidateQueries({ queryKey: ['appointments'] });
            showSuccess('Cập nhật lịch hẹn thành công!');
        },
        onError: (error) => {
            showError(error?.response?.data?.message || 'Có lỗi xảy ra khi cập nhật!');
        },
    });
};

/**
 * Hook to cancel an appointment
 */
export const useCancelAppointment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (appointmentId) => appointmentService.cancelAppointment(appointmentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['appointments'] });
            showSuccess('Hủy lịch hẹn thành công!');
        },
        onError: (error) => {
            showError(error?.response?.data?.message || 'Có lỗi xảy ra khi hủy lịch!');
        },
    });
};

/**
 * Hook to confirm an appointment
 */
export const useConfirmAppointment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (appointmentId) => appointmentService.confirmAppointment(appointmentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['appointments'] });
            showSuccess('Xác nhận lịch hẹn thành công!');
        },
        onError: (error) => {
            showError(error?.response?.data?.message || 'Có lỗi xảy ra khi xác nhận!');
        },
    });
};
