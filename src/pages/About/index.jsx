import React from 'react';
import Navbar from '@components/layout/Navbar';
import Footer from '@components/layout/Footer';

const About = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-4">Giới thiệu</h1>
                <p className="text-lg text-gray-600">
                    Đây là trang giới thiệu về Management Clinic
                </p>
            </main>
            <Footer />
        </div>
    );
};

export default About;
