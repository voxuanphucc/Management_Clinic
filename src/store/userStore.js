import { create } from 'zustand';

// User Store với Zustand
const useUserStore = create((set) => ({
    // State
    users: [],
    currentUser: null,
    loading: false,
    error: null,

    // Actions
    setUsers: (users) => set({ users }),

    setCurrentUser: (user) => set({ currentUser: user }),

    addUser: (user) =>
        set((state) => ({
            users: [...state.users, user],
        })),

    updateUser: (userId, updatedData) =>
        set((state) => ({
            users: state.users.map((user) =>
                user.id === userId ? { ...user, ...updatedData } : user
            ),
            currentUser:
                state.currentUser?.id === userId
                    ? { ...state.currentUser, ...updatedData }
                    : state.currentUser,
        })),

    deleteUser: (userId) =>
        set((state) => ({
            users: state.users.filter((user) => user.id !== userId),
            currentUser: state.currentUser?.id === userId ? null : state.currentUser,
        })),

    setLoading: (loading) => set({ loading }),

    setError: (error) => set({ error }),

    clearError: () => set({ error: null }),

    clearUsers: () => set({ users: [], currentUser: null }),
}));

export default useUserStore;
