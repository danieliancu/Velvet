
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FormLayout from '../components/FormLayout';
import Input from '../components/Input';
import { useAuth } from '../App';
import { Role } from '../types';

const ClientSignUpPage: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle form submission, API calls etc.
        // For this demo, we just log in the user and navigate.
        login(Role.CLIENT);
        navigate('/client/dashboard');
    };

    return (
        <FormLayout title="Book & Sign Up">
            <form onSubmit={handleSignUp} className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-300 pt-4 pb-2 border-b border-gray-700">Journey Details</h3>
                <Input id="pickup" label="Pickup Location" type="text" required />
                <Input id="destination" label="Destination" type="text" required />
                <Input id="date" label="Date & Time" type="datetime-local" required />

                <h3 className="text-lg font-semibold text-gray-300 pt-4 pb-2 border-b border-gray-700">Personal Details</h3>
                <Input id="name" label="Full Name" type="text" required />
                <Input id="email" label="Email Address" type="email" required />
                <Input id="phone" label="Phone Number" type="tel" required />
                <Input id="password" label="Create Password" type="password" required />

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full px-8 py-3 text-lg font-semibold bg-amber-500 text-black rounded-md hover:bg-amber-400 transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(251,191,36,0.5)]"
                    >
                        Confirm Booking & Create Account
                    </button>
                </div>
                <p className="text-center text-sm text-gray-400 pt-4">
                    Already have an account?{' '}
                    <Link to="/client/login" className="font-medium text-amber-400 hover:underline">
                        Sign In
                    </Link>
                </p>
            </form>
        </FormLayout>
    );
};

export default ClientSignUpPage;
