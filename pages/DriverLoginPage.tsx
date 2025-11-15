
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FormLayout from '../components/FormLayout';
import Input from '../components/Input';
import { useAuth } from '../App';
import { Role } from '../types';

const DriverLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(Role.DRIVER);
    navigate('/driver/dashboard');
  };

  return (
    <FormLayout title="Driver Sign In">
      <form onSubmit={handleLogin} className="space-y-6">
        <Input id="email" label="Email Address" type="email" required />
        <Input id="password" label="Password" type="password" required />
        <button
          type="submit"
          className="w-full px-8 py-3 text-lg font-semibold bg-amber-500 text-black rounded-md hover:bg-amber-400 transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(251,191,36,0.5)]"
        >
          Sign In
        </button>
        <p className="text-center text-sm text-gray-400">
          Not a registered driver?{' '}
          <Link to="/driver/signup" className="font-medium text-amber-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </FormLayout>
  );
};

export default DriverLoginPage;