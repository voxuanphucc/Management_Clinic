import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';

/**
 * Redux Store - Quản lý GLOBAL STATE CHÍNH
 * - Authentication (token, user session)
 * - User data (profile, permissions)
 * - App configuration (settings, theme)
 */
export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['auth/login', 'auth/logout'],
            },
        }),
});

export default store;
