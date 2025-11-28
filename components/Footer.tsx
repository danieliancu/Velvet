
import React from 'react';
import { Link } from 'react-router-dom';

const FooterLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
    <li>
        <Link to={to} className="hover:text-amber-400 transition-colors text-gray-400 text-sm">
            {children}
        </Link>
    </li>
);

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 px-4 text-gray-500 z-10 relative">
      <div className="max-w-7xl mx-auto border-t border-white/10 pt-10">
        <div className="flex flex-col md:flex-row items-start gap-10 md:gap-16">
          <div className="flex flex-col items-start gap-3 md:max-w-xs">
            <Link to="/" className="shrink-0">
              <img src="/assets/logo.png" alt="Velvet Drivers Logo" className="w-32 h-auto" />
            </Link>
            <div className="text-sm text-gray-400">
              <p className="text-white font-semibold">Velvet Drivers Limited</p>
              <p>Licensed, professional, and passenger-first private hire services.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 md:gap-10 w-full md:w-auto md:ml-auto">
            <div className="min-w-[170px]">
              <h4 className="font-bold font-display text-white text-lg mb-4">Discover</h4>
              <ul className="space-y-2">
                <FooterLink to="/blog">Our Blog</FooterLink>
                <FooterLink to="/reviews">Client Reviews</FooterLink>
              </ul>
            </div>
            <div className="min-w-[170px]">
              <h4 className="font-bold font-display text-white text-lg mb-4">Company</h4>
              <ul className="space-y-2">
                <FooterLink to="/client/login">Client</FooterLink>
                <FooterLink to="/driver/login">Driver</FooterLink>
                <FooterLink to="/booking">Booking</FooterLink>
                <FooterLink to="/corporate/login">Corporate</FooterLink>
              </ul>
            </div>
            <div className="min-w-[170px]">
              <h4 className="font-bold font-display text-white text-lg mb-4">Legal</h4>
              <ul className="space-y-2">
                <FooterLink to="/legal/operator-policies">Operator Policies</FooterLink>
                <FooterLink to="/legal/passenger-policies">Passenger Policies</FooterLink>
                <FooterLink to="/legal/corporate">Corporate</FooterLink>
                <FooterLink to="/corporate-payment-policy">Corporate Payment Policy</FooterLink>
                <FooterLink to="/legal/safety-accessibility">Safety &amp; Accessibility</FooterLink>
                <FooterLink to="/legal/privacy-data">Privacy &amp; Data</FooterLink>
              </ul>
            </div>
            <div className="min-w-[170px]">
              <h4 className="font-bold font-display text-white text-lg mb-4">Support</h4>
              <ul className="space-y-2">
                <FooterLink to="/client/login#complain">Complain</FooterLink>
                <FooterLink to="/client/login#review">Review</FooterLink>
                <FooterLink to="/client/login#lost-property">Lost Property</FooterLink>
                <FooterLink to="/contact">Contact Us</FooterLink>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Velvet Drivers. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
