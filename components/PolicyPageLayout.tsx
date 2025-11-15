
import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface PolicyPageLayoutProps {
  title: string;
  children: React.ReactNode;
}

const PolicyPageLayout: React.FC<PolicyPageLayoutProps> = ({ title, children }) => {
  return (
    <div className="min-h-screen w-full bg-black text-white overflow-hidden relative flex flex-col">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/80 via-black to-black opacity-80"></div>
      
      <Header />

      <main className="relative z-10 flex-grow px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="max-w-4xl mx-auto bg-black/30 border border-white/10 rounded-2xl shadow-2xl shadow-red-950/50 backdrop-blur-lg p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-amber-400 mb-8 border-b border-amber-400/20 pb-4">{title}</h1>
          <div className="space-y-6 text-gray-300 leading-relaxed">
            {children}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export const PolicySection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <section className="space-y-4">
        <h2 className="text-2xl font-display font-semibold text-amber-400">{title}</h2>
        {children}
    </section>
);

export const PolicyList: React.FC<{ items: string[] }> = ({ items }) => (
    <ul className="list-disc list-inside space-y-2 pl-4">
        {items.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
);

export default PolicyPageLayout;
