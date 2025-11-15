import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Journey } from '../types';
import { useAuth } from '../App';
import Footer from '../components/Footer';

const mockJourneys: Journey[] = [
  { id: '1', date: '2023-10-27 14:00', pickup: 'Heathrow Airport, T5', destination: 'The Savoy, London', driver: 'James P.', car: 'Mercedes S-Class', status: 'Completed', price: 150 },
  { id: '2', date: '2023-11-15 09:30', pickup: 'Canary Wharf', destination: 'The Shard', driver: 'Robert K.', car: 'BMW 7 Series', status: 'Upcoming', price: 85 },
  { id: '3', date: '2023-10-20 18:00', pickup: 'Soho House', destination: 'Gatwick Airport, North', driver: 'David C.', car: 'Audi A8', status: 'Completed', price: 120 },
  { id: '4', date: '2023-09-05 12:00', pickup: 'Mayfair', destination: 'Claridge\'s', driver: 'James P.', car: 'Mercedes S-Class', status: 'Completed', price: 60 },
  { id: '5', date: '2023-12-01 20:00', pickup: 'The Ritz, London', destination: 'London City Airport', driver: 'TBC', car: 'Mercedes V-Class', status: 'Upcoming', price: 95 },
];

const StatusBadge: React.FC<{ status: Journey['status'] }> = ({ status }) => {
  const baseClasses = 'px-2 py-1 text-xs font-semibold rounded-full';
  const statusClasses = {
    Completed: 'bg-green-500/20 text-green-300',
    Upcoming: 'bg-yellow-500/20 text-yellow-300',
    Cancelled: 'bg-red-500/20 text-red-300',
  };
  return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};


const ClientDashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="w-full flex-grow p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-800">
            <div>
              <h1 className="text-3xl font-bold font-display text-amber-400">Client Dashboard</h1>
              <p className="text-gray-400">Welcome back, {user?.name}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 font-semibold bg-transparent border border-amber-400 text-amber-400 rounded-md hover:bg-amber-400 hover:text-black transition-colors"
            >
              Logout
            </button>
          </header>

          <main>
            <h2 className="text-2xl font-semibold mb-4">Journey History</h2>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                  <table className="w-full min-w-max text-left">
                    <thead className="bg-gray-800/60">
                      <tr>
                        <th className="p-4">Date & Time</th>
                        <th className="p-4">Pickup</th>
                        <th className="p-4">Destination</th>
                        <th className="p-4">Driver</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockJourneys.map((journey, index) => (
                        <tr key={journey.id} className={`border-t border-gray-800 ${index % 2 === 0 ? 'bg-black/20' : ''}`}>
                          <td className="p-4">{journey.date}</td>
                          <td className="p-4">{journey.pickup}</td>
                          <td className="p-4">{journey.destination}</td>
                          <td className="p-4">{journey.driver}</td>
                          <td className="p-4"><StatusBadge status={journey.status} /></td>
                          <td className="p-4 text-right font-semibold">£{journey.price.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ClientDashboardPage;
