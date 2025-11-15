
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const FormLayout: React.FC<{ children: React.ReactNode; title: string }> = ({ children, title }) => {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/40 via-black to-black opacity-70"></div>
       <div className="absolute top-10 left-10">
            <Link to="/" className="z-10 opacity-70 hover:opacity-100 transition-opacity">
                <img src="/assets/logo.png" alt="Velvet Drivers Logo" className="w-[180px] h-auto" />
            </Link>
        </div>
      <div className="flex-grow flex items-center justify-center">
        <div className="relative z-10 w-full max-w-md bg-black/30 border border-white/10 rounded-2xl shadow-2xl shadow-red-950/50 backdrop-blur-lg p-8">
            <h2 className="text-4xl font-bold font-display text-center mb-8 text-amber-400">{title}</h2>
            {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FormLayout;