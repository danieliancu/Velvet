
import React from 'react';
import DashboardInput from '../../components/DashboardInput';
import DashboardSelect from '../../components/DashboardSelect';
import type { Journey } from '../../types';

interface ClientLostPropertyProps {
  isGuest?: boolean;
  completedJourneys?: Journey[];
}

const ClientLostProperty: React.FC<ClientLostPropertyProps> = ({ isGuest = false, completedJourneys = [] }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Lost property report submitted. We will contact you shortly.');
    // Here you would typically handle form submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isGuest ? (
        <DashboardInput id="booking-ref-lost" label="Booking Reference or Date of Journey" type="text" required />
      ) : (
        <DashboardSelect id="booking-ref-lost" label="Your Bookings" required>
          <option value="" disabled className="bg-gray-900 text-white">Select the relevant journey</option>
          {completedJourneys.map(journey => (
            <option key={journey.id} value={journey.id} className="bg-gray-900 text-white">
              {journey.date} - {journey.pickup} to {journey.destination.split(',')[0]}
            </option>
          ))}
        </DashboardSelect>
      )}
      <DashboardInput id="item-description" label="Description of Item" type="text" required />
      
      <div>
        <label htmlFor="lost-details" className="block text-xs font-semibold text-amber-200/70 uppercase tracking-wider mb-2">
          Additional Details
        </label>
        <textarea
          id="lost-details"
          rows={4}
          className="w-full bg-gray-900 border border-amber-900/60 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
          placeholder="E.g., where you think you left it, brand, color..."
        />
      </div>
      <div className="pt-2 flex justify-start">
        <button type="submit" className="px-10 py-2.5 font-semibold bg-amber-500 text-black rounded-lg hover:bg-amber-400 transition-colors">
          Report Item
        </button>
      </div>
    </form>
  );
};

export default ClientLostProperty;