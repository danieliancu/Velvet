
import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import FormLayout from '../components/FormLayout';
import Input from '../components/Input';
import Modal from '../components/Modal';
import { useAuth } from '../App';
import { Role } from '../types';
import ClientComplain from './client-dashboard/ClientComplain';
import ClientReview from './client-dashboard/ClientReview';
import ClientLostProperty from './client-dashboard/ClientLostProperty';

const ClientLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();
  const [isComplainModalOpen, setComplainModalOpen] = useState(false);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [isLostPropertyModalOpen, setLostPropertyModalOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(Role.CLIENT);
    navigate('/client/dashboard');
  };

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash === 'complain') setComplainModalOpen(true);
    if (hash === 'review') setReviewModalOpen(true);
    if (hash === 'lost-property') setLostPropertyModalOpen(true);
  }, [location.hash]);

  return (
    <FormLayout title="Client Sign In">
      <form onSubmit={handleLogin} className="space-y-6">
        <Input id="email" label="Email Address" type="email" required />
        <Input id="password" label="Password" type="password" required />
        <button
          type="submit"
          className="w-full px-8 py-3 text-lg font-semibold bg-amber-500 text-black rounded-md hover:bg-amber-400 transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(251,191,36,0.5)]"
        >
          Sign In
        </button>
        <div className="flex items-center !mt-4 !mb-4">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-700"></div>
        </div>
        <Link
          to="/booking"
          className="block text-center w-full px-8 py-3 text-lg font-semibold bg-transparent border-2 border-gray-600 text-gray-300 rounded-md hover:bg-gray-800 hover:border-gray-500 transition-all duration-300"
        >
          Continue as Guest
        </Link>
        <p className="text-center text-sm text-gray-400 !mt-8">
          Don't have an account?{' '}
          <Link to="/client/signup" className="font-medium text-amber-400 hover:underline">
            Sign up now
          </Link>
        </p>
        <p className="text-center text-sm text-gray-400">
          You have a corporate account?{' '}
          <Link to="/corporate/login" className="font-medium text-amber-400 hover:underline">
            Sign up now
          </Link>
        </p>
      </form>
      
      <div className="mt-8 pt-6 border-t border-gray-800 text-center">
        <h3 className="text-sm text-gray-400 mb-3">Need help with a journey?</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={() => setComplainModalOpen(true)} className="flex-1 text-sm text-amber-400 hover:underline">Complain</button>
          <button onClick={() => setReviewModalOpen(true)} className="flex-1 text-sm text-amber-400 hover:underline">Review</button>
          <button onClick={() => setLostPropertyModalOpen(true)} className="flex-1 text-sm text-amber-400 hover:underline">Lost Property</button>
        </div>
      </div>

      <Modal isOpen={isComplainModalOpen} onClose={() => setComplainModalOpen(false)} title="Submit a Complaint">
        <ClientComplain isGuest />
      </Modal>
      <Modal isOpen={isReviewModalOpen} onClose={() => setReviewModalOpen(false)} title="Leave a Review">
        <ClientReview isGuest />
      </Modal>
      <Modal isOpen={isLostPropertyModalOpen} onClose={() => setLostPropertyModalOpen(false)} title="Report Lost Property">
        <ClientLostProperty isGuest />
      </Modal>
    </FormLayout>
  );
};

export default ClientLoginPage;
