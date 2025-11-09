import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-auto">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm">
                        © {new Date().getFullYear()} Management Clinic. All rights reserved.
                    </p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="#" className="hover:text-blue-400">
                            Privacy
                        </a>
                        <a href="#" className="hover:text-blue-400">
                            Terms
                        </a>
                        <a href="#" className="hover:text-blue-400">
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
