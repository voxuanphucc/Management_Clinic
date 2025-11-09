import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

/**
 * Filter Store - Quản lý FILTER STATE
 * - Search filters
 * - Date range filters
 * - Sort options
 * - Pagination
 */
const useFilterStore = create(
    devtools(
        persist(
            (set, get) => ({
                // Appointment filters
                appointmentFilters: {
                    search: '',
                    status: 'all',
                    dateRange: { from: null, to: null },
                    doctorId: null,
                    sortBy: 'date',
                    sortOrder: 'desc',
                },
                setAppointmentFilters: (filters) =>
                    set((state) => ({
                        appointmentFilters: {
                            ...state.appointmentFilters,
                            ...filters,
                        },
                    })),
                resetAppointmentFilters: () =>
                    set({
                        appointmentFilters: {
                            search: '',
                            status: 'all',
                            dateRange: { from: null, to: null },
                            doctorId: null,
                            sortBy: 'date',
                            sortOrder: 'desc',
                        },
                    }),

                // Patient filters
                patientFilters: {
                    search: '',
                    status: 'all',
                    ageRange: { min: null, max: null },
                    gender: 'all',
                    sortBy: 'name',
                    sortOrder: 'asc',
                },
                setPatientFilters: (filters) =>
                    set((state) => ({
                        patientFilters: {
                            ...state.patientFilters,
                            ...filters,
                        },
                    })),
                resetPatientFilters: () =>
                    set({
                        patientFilters: {
                            search: '',
                            status: 'all',
                            ageRange: { min: null, max: null },
                            gender: 'all',
                            sortBy: 'name',
                            sortOrder: 'asc',
                        },
                    }),

                // Pagination
                pagination: {
                    page: 1,
                    pageSize: 10,
                    total: 0,
                },
                setPagination: (paginationData) =>
                    set((state) => ({
                        pagination: { ...state.pagination, ...paginationData },
                    })),
                resetPagination: () => set({ pagination: { page: 1, pageSize: 10, total: 0 } }),

                // Reset all filters
                resetAllFilters: () => {
                    get().resetAppointmentFilters();
                    get().resetPatientFilters();
                    get().resetPagination();
                },
            }),
            {
                name: 'filter-storage',
                partialize: (state) => ({
                    appointmentFilters: state.appointmentFilters,
                    patientFilters: state.patientFilters,
                }),
            }
        ),
        { name: 'filter-store' }
    )
);

export default useFilterStore;
