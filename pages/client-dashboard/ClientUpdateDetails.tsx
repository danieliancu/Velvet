
import React from 'react';
import DashboardInput from '../../components/DashboardInput';
import { useAlert } from '../../components/AlertProvider';

const ClientUpdateDetails: React.FC = () => {
  const { showAlert } = useAlert();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showAlert('Details updated successfully.');
    // Here you would typically handle form submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DashboardInput id="full-name" label="Full Name" type="text" autoComplete="name" required />
          <DashboardInput id="phone" label="Phone Number" type="tel" autoComplete="tel" required />
      </div>
      <DashboardInput id="email" label="Email Address" type="email" autoComplete="email" required />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DashboardInput id="new-password" label="New Password" type="password" />
          <DashboardInput id="confirm-password" label="Confirm New Password" type="password" />
      </div>
      
      <div className="pt-2 flex justify-start">
        <button type="submit" className="px-10 py-2.5 font-semibold bg-amber-500 text-black rounded-lg hover:bg-amber-400 transition-colors">
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default ClientUpdateDetails;
