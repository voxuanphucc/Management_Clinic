import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './privateRoutes';
import PublicRoute from './publicRoutes';
import Home from '@pages/Home';
import About from '@pages/About';
import Dashboard from '@pages/Dashboard';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route element={<PublicRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Route>

            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
