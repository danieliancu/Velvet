
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FormLayout from '../components/FormLayout';
import Input from '../components/Input';

const DriverSignUpPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would submit the application, call DVLA API etc.
    // For now, just navigate to login.
    alert('Application submitted for review. You will be notified via email.');
    navigate('/driver/login');
  };

  return (
    <FormLayout title="Driver Application">
      <form onSubmit={handleSignUp} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <Input id="firstName" label="First Name" type="text" required />
            <Input id="lastName" label="Last Name" type="text" required />
        </div>
        <Input id="email" label="Email Address" type="email" required />
        <Input id="phone" label="Phone Number" type="tel" required />
        <Input id="password" label="Create Password" type="password" required />
        <Input id="confirmPassword" label="Confirm Password" type="password" required />
        <Input id="dvlaCode" label="DVLA Check Code" type="text" required />
        <p className="text-xs text-gray-500 -mt-4 pb-2">
            Generate a code from the official DVLA website to share your driving licence information.
        </p>
        
        <div className="pt-4">
            <button
              type="submit"
              className="w-full px-8 py-3 text-lg font-semibold bg-amber-500 text-black rounded-md hover:bg-amber-400 transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(251,191,36,0.5)]"
            >
              Submit Application
            </button>
        </div>
        <p className="text-center text-sm text-gray-400 pt-4">
          Already have an account?{' '}
          <Link to="/driver/login" className="font-medium text-amber-400 hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </FormLayout>
  );
};

export default DriverSignUpPage;
