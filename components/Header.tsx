
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => (
    <Link to="/" className="z-10">
        <img src="/assets/logo.png" alt="Velvet Drivers Logo" className="w-[220px] h-auto" />
    </Link>
);


const Header: React.FC = () => {
    return (
        <header className="relative top-0 left-0 right-0 p-6 md:p-8 pb-0 md:pb-0 z-50" style={{ display:"none" }}>
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent absolute top-0 left-0"></div>
            <div className="max-w-7xl mx-auto flex justify-center">
                <Logo />
            </div>
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent absolute bottom-0 left-0"></div>
        </header>
    );
};

export default Header;