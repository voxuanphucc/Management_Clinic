import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

/**
 * UI State Store - Quản lý UI STATE
 * - Modal open/close
 * - Sidebar toggle
 * - Active tab
 * - UI preferences
 */
const useUIStore = create(
    devtools(
        (set) => ({
            // Modal states
            modals: {
                appointment: false,
                patient: false,
                doctor: false,
                settings: false,
            },
            openModal: (modalName) =>
                set((state) => ({
                    modals: { ...state.modals, [modalName]: true },
                })),
            closeModal: (modalName) =>
                set((state) => ({
                    modals: { ...state.modals, [modalName]: false },
                })),
            closeAllModals: () =>
                set({
                    modals: {
                        appointment: false,
                        patient: false,
                        doctor: false,
                        settings: false,
                    },
                }),

            // Sidebar state
            isSidebarOpen: true,
            toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
            setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),

            // Active tab/section
            activeTab: 'overview',
            setActiveTab: (tab) => set({ activeTab: tab }),

            // Drawer state
            isDrawerOpen: false,
            drawerContent: null,
            openDrawer: (content) => set({ isDrawerOpen: true, drawerContent: content }),
            closeDrawer: () => set({ isDrawerOpen: false, drawerContent: null }),
        }),
        { name: 'ui-store' }
    )
);

export default useUIStore;
