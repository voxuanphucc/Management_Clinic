import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

/**
 * Auth Store với Zustand (DEPRECATED - Sẽ chuyển sang Redux)
 * Giữ lại để tương thích, nhưng khuyến khích dùng Redux authSlice
 *
 * LƯU Ý: Store này sẽ được migrate sang Redux Toolkit
 * Hiện tại vẫn giữ để không break code cũ
 */
const useAuthStore = create(
    devtools(
        persist(
            (set, get) => ({
                // State
                user: null,
                token: null,
                isAuthenticated: false,
                loading: false,
                error: null,

                // Actions
                setUser: (user) => set({ user, isAuthenticated: !!user }),

                setToken: (token) => {
                    if (token) {
                        localStorage.setItem('token', token);
                        try {
                            const decoded = jwtDecode(token);
                            set({
                                token,
                                user: decoded,
                                isAuthenticated: true,
                            });
                        } catch (error) {
                            console.error('Invalid token:', error);
                            get().logout();
                        }
                    } else {
                        set({ token: null });
                    }
                },

                login: (userData, token) => {
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(userData));
                    set({
                        user: userData,
                        token,
                        isAuthenticated: true,
                        error: null,
                    });
                },

                logout: () => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    set({
                        user: null,
                        token: null,
                        isAuthenticated: false,
                        error: null,
                    });
                },

                setLoading: (loading) => set({ loading }),

                setError: (error) => set({ error }),

                clearError: () => set({ error: null }),

                // Khởi tạo từ localStorage khi app load
                initAuth: () => {
                    const token = localStorage.getItem('token');
                    const userStr = localStorage.getItem('user');

                    if (token && userStr) {
                        try {
                            const decoded = jwtDecode(token);
                            const now = Date.now() / 1000;

                            if (decoded.exp > now) {
                                const user = JSON.parse(userStr);
                                set({
                                    token,
                                    user,
                                    isAuthenticated: true,
                                });
                            } else {
                                get().logout();
                            }
                        } catch (error) {
                            console.error('Error initializing auth:', error);
                            get().logout();
                        }
                    }
                },
            }),
            {
                name: 'auth-storage',
                partialize: (state) => ({
                    user: state.user,
                    token: state.token,
                    isAuthenticated: state.isAuthenticated,
                }),
            }
        ),
        { name: 'auth-store' }
    )
);

export default useAuthStore;
