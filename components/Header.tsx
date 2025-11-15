
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => (
    <Link to="/" className="flex items-center gap-2 text-white z-10">
        <div className="w-10 h-10 border border-amber-400 flex items-center justify-center font-display text-2xl font-bold text-amber-400">
            V
        </div>
        <h1 className="font-display text-3xl tracking-wider uppercase">
            Velvet Drivers
        </h1>
    </Link>
);


const Header: React.FC = () => {
    return (
        <header className="absolute top-0 left-0 right-0 p-6 md:p-8 z-50">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent absolute top-0 left-0"></div>
            <div className="max-w-7xl mx-auto flex justify-center">
                <Logo />
            </div>
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent absolute bottom-0 left-0"></div>
        </header>
    );
};

export default Header;
