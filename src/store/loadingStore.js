import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

/**
 * Loading Store - Quản lý LOADING STATE
 * - Global loading overlay
 * - Component loading states
 * - Loading text and type
 */
const useLoadingStore = create(
    devtools(
        (set) => ({
            // Global loading
            isLoading: false,
            loadingText: 'Đang xử lý...',
            loadingType: 'oval', // 'oval', 'dots', 'tailspin', 'puff', 'rings'

            // Component loading states
            componentLoading: {},

            // Bật global loading
            showLoading: (text = 'Đang xử lý...', type = 'oval') =>
                set({ isLoading: true, loadingText: text, loadingType: type }),

            // Tắt global loading
            hideLoading: () => set({ isLoading: false }),

            // Set loading text
            setLoadingText: (text) => set({ loadingText: text }),

            // Set loading type
            setLoadingType: (type) => set({ loadingType: type }),

            // Component-specific loading
            setComponentLoading: (componentName, isLoading) =>
                set((state) => ({
                    componentLoading: {
                        ...state.componentLoading,
                        [componentName]: isLoading,
                    },
                })),

            // Check if component is loading
            isComponentLoading: (componentName) =>
                set((state) => state.componentLoading[componentName] || false),
        }),
        { name: 'loading-store' }
    )
);

export default useLoadingStore;
