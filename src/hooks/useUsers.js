import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@services/userService';
import { showSuccess, showError } from '@/utils/toast';

/**
 * Hook to fetch all users
 */
export const useUsers = (options = {}) => {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await userService.getAllUsers();
            return response.data;
        },
        ...options,
    });
};

/**
 * Hook to fetch a single user by ID
 */
export const useUser = (userId, options = {}) => {
    return useQuery({
        queryKey: ['users', userId],
        queryFn: async () => {
            const response = await userService.getUserById(userId);
            return response.data;
        },
        enabled: !!userId, // Only run query if userId exists
        ...options,
    });
};

/**
 * Hook to create a new user
 */
export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userData) => userService.createUser(userData),
        onSuccess: (data) => {
            // Invalidate and refetch users list
            queryClient.invalidateQueries({ queryKey: ['users'] });
            showSuccess('Tạo người dùng thành công!');
        },
        onError: (error) => {
            showError(error?.response?.data?.message || 'Có lỗi xảy ra khi tạo người dùng!');
        },
    });
};

/**
 * Hook to update a user
 */
export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ userId, userData }) => userService.updateUser(userId, userData),
        onSuccess: (data, variables) => {
            // Invalidate specific user and users list
            queryClient.invalidateQueries({ queryKey: ['users', variables.userId] });
            queryClient.invalidateQueries({ queryKey: ['users'] });
            showSuccess('Cập nhật người dùng thành công!');
        },
        onError: (error) => {
            showError(error?.response?.data?.message || 'Có lỗi xảy ra khi cập nhật!');
        },
    });
};

/**
 * Hook to delete a user
 */
export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userId) => userService.deleteUser(userId),
        onSuccess: () => {
            // Invalidate users list
            queryClient.invalidateQueries({ queryKey: ['users'] });
            showSuccess('Xóa người dùng thành công!');
        },
        onError: (error) => {
            showError(error?.response?.data?.message || 'Có lỗi xảy ra khi xóa!');
        },
    });
};
