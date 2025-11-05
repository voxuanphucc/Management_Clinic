import React from 'react';
import { Outlet } from 'react-router-dom';

// Route không yêu cầu đăng nhập
const PublicRoute = () => {
    return <Outlet />;
};

export default PublicRoute;
