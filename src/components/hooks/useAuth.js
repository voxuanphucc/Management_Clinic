import { useSelector, useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure, logout } from '@store/slices/authSlice';
import { authService } from '@services/authService';

// Custom hook cho xác thực
export const useAuth = () => {
    const dispatch = useDispatch();
    const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth);

    const login = async (credentials) => {
        try {
            dispatch(loginStart());
            const data = await authService.login(credentials);
            localStorage.setItem('token', data.token);
            dispatch(loginSuccess(data));
            return data;
        } catch (error) {
            dispatch(loginFailure(error.message));
            throw error;
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(logout());
    };

    return {
        user,
        isAuthenticated,
        loading,
        error,
        login,
        logout: handleLogout,
    };
};

export default useAuth;
