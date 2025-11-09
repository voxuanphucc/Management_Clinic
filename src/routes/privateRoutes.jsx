import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@store/authStore';

// Route yêu cầu đăng nhập - Sử dụng Zustand
const PrivateRoute = () => {
    const { isAuthenticated } = useAuthStore();

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
