import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="w-full text-center py-6 px-4 text-gray-500 text-sm z-10 relative">
            <div className="max-w-7xl mx-auto border-t border-white/10 pt-6">
                <p>&copy; {new Date().getFullYear()} Velvet Drivers. All Rights Reserved.</p>
                <div className="mt-2 space-x-4">
                    <Link to="#" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
                    <span>|</span>
                    <Link to="#" className="hover:text-amber-400 transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
