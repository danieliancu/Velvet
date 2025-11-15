import React from 'react';
import PageShell from '../components/PageShell';
import OlderBookingsList from '../components/OlderBookingsList';

const OlderBookingsPage: React.FC = () => (
  <PageShell mainClassName="flex flex-col px-4 sm:px-6 lg:px-8 py-10">
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="space-y-3">
        <p className="text-sm text-gray-400 uppercase tracking-wide">Admin archive</p>
        <h1 className="text-4xl font-display font-bold text-amber-400">Older Bookings</h1>
      </div>
      <OlderBookingsList />
    </div>
  </PageShell>
);

export default OlderBookingsPage;
