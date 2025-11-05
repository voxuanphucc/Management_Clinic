import React from 'react';
import Navbar from '@components/layout/Navbar';
import Sidebar from '@components/layout/Sidebar';
import Footer from '@components/layout/Footer';

const Dashboard = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex flex-grow">
                <Sidebar />
                <main className="flex-grow p-8 bg-gray-50 dark:bg-gray-900">
                    <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Stats Cards */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold mb-2">Tổng bệnh nhân</h3>
                            <p className="text-3xl font-bold text-blue-600">1,234</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold mb-2">Lịch hẹn hôm nay</h3>
                            <p className="text-3xl font-bold text-green-600">45</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold mb-2">Bác sĩ</h3>
                            <p className="text-3xl font-bold text-purple-600">12</p>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
