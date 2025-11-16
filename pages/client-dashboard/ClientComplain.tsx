
import React from 'react';
import DashboardInput from '../../components/DashboardInput';
import DashboardSelect from '../../components/DashboardSelect';
import { useAlert } from '../../components/AlertProvider';
import type { Journey } from '../../types';

interface ClientComplainProps {
  isGuest?: boolean;
  completedJourneys?: Journey[];
}

const ClientComplain: React.FC<ClientComplainProps> = ({ isGuest = false, completedJourneys = [] }) => {
  const { showAlert } = useAlert();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showAlert('Complaint submitted. We will get back to you within 48 hours.');
    // Here you would typically handle form submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isGuest ? (
        <DashboardInput id="booking-ref" label="Booking Reference or Date of Journey" type="text" required />
      ) : (
        <DashboardSelect id="booking-ref" label="Your Bookings" required>
          <option value="" disabled className="bg-gray-900 text-white">Select a completed journey</option>
          {completedJourneys.map(journey => (
            <option key={journey.id} value={journey.id} className="bg-gray-900 text-white">
              {journey.date} - {journey.pickup} to {journey.destination.split(',')[0]}
            </option>
          ))}
        </DashboardSelect>
      )}
      <DashboardInput id="subject" label="Subject" type="text" required />
      <div>
        <label htmlFor="details" className="block text-xs font-semibold text-amber-200/70 uppercase tracking-wider mb-2">
          Complaint Details
        </label>
        <textarea
          id="details"
          rows={5}
          required
          className="w-full bg-gray-900 border border-amber-900/60 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
          placeholder="Please provide as much detail as possible..."
        />
      </div>
      <div className="pt-2 flex justify-start">
        <button type="submit" className="px-10 py-2.5 font-semibold bg-amber-500 text-black rounded-lg hover:bg-amber-400 transition-colors">
          Submit Complaint
        </button>
      </div>
    </form>
  );
};

export default ClientComplain;
