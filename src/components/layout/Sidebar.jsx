import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const menuItems = [
        { path: '/dashboard', label: 'Dashboard', icon: '📊' },
        { path: '/patients', label: 'Bệnh nhân', icon: '👥' },
        { path: '/appointments', label: 'Lịch hẹn', icon: '📅' },
        { path: '/doctors', label: 'Bác sĩ', icon: '👨‍⚕️' },
        { path: '/settings', label: 'Cài đặt', icon: '⚙️' },
    ];

    return (
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-md h-screen">
            <div className="p-4">
                <h2 className="text-lg font-bold mb-4">Menu</h2>
                <nav>
                    <ul className="space-y-2">
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className="flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <span>{item.icon}</span>
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
