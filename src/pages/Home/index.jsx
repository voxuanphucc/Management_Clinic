import React from 'react';
import Navbar from '@components/layout/Navbar';
import Footer from '@components/layout/Footer';

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-4">Chào mừng đến với Management Clinic</h1>
                <p className="text-lg text-gray-600">
                    Hệ thống quản lý phòng khám hiện đại và chuyên nghiệp
                </p>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
