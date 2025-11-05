import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '@hooks/useAuth';
import useTheme from '@hooks/useTheme';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="text-xl font-bold text-blue-600">
                        Management Clinic
                    </Link>

                    {/* Menu */}
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="hover:text-blue-600">
                            Trang chủ
                        </Link>
                        <Link to="/about" className="hover:text-blue-600">
                            Giới thiệu
                        </Link>
                        {isAuthenticated && (
                            <Link to="/dashboard" className="hover:text-blue-600">
                                Dashboard
                            </Link>
                        )}

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            {theme === 'light' ? '🌙' : '☀️'}
                        </button>

                        {/* Auth */}
                        {isAuthenticated ? (
                            <button
                                onClick={logout}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Đăng xuất
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Đăng nhập
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
