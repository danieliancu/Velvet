
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-left">
                    <div>
                    <h4 className="font-bold font-display text-white text-lg mb-4">Company</h4>
                        <ul className="space-y-2">
                           <FooterLink to="/client/login">Client</FooterLink>
                           <FooterLink to="/driver/login">Driver</FooterLink>
                           <FooterLink to="/booking">Booking</FooterLink>
                           <FooterLink to="/contact">Contact</FooterLink>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold font-display text-white text-lg mb-4">Legal</h4>
                        <ul className="space-y-2">
                           <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
                           <FooterLink to="/terms-of-service">Terms of Service</FooterLink>
                           <FooterLink to="/cookie-policy">Cookie Policy</FooterLink>
                           <FooterLink to="/booking-terms">Booking Terms</FooterLink>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold font-display text-white text-lg mb-4">Support</h4>
                        <ul className="space-y-2">
                            <FooterLink to="/safety-policy">Safety</FooterLink>
                            <FooterLink to="/complaints-policy">Complaints</FooterLink>
                            <FooterLink to="/refund-policy">Refund & Cancellation</FooterLink>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold font-display text-white text-lg mb-4">For Drivers</h4>
                        <ul className="space-y-2">
                            <FooterLink to="/driver-hub">Driver Hub</FooterLink>
                        </ul>
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
