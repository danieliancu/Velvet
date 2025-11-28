import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FormLayout from '../components/FormLayout';
import Input from '../components/Input';
import { useAlert } from '../components/AlertProvider';
import { useAuth } from '../App';
import { Role } from '../types';

const CorporateLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { login } = useAuth();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    login(Role.CLIENT);
    navigate('/corporate/dashboard');
  };

  return (
    <FormLayout title="Corporate Sign In">
      <form onSubmit={handleLogin} className="space-y-6">
        <Input id="email" label="Work Email Address" type="email" required />
        <Input id="password" label="Password" type="password" required />
        <button
          type="submit"
          className="w-full px-8 py-3 text-lg font-semibold bg-amber-500 text-black rounded-md hover:bg-amber-400 transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(251,191,36,0.5)]"
        >
          Sign In
        </button>
        <p className="text-center text-sm text-gray-400">
          Need a corporate account?{' '}
          <Link to="/corporate/signup" className="font-medium text-amber-400 hover:underline">
            Request access
          </Link>
        </p>
      </form>
    </FormLayout>
  );
};

export default CorporateLoginPage;
