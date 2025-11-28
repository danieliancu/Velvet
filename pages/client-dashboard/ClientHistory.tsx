
import React, { useState } from 'react';
import type { Journey } from '../../types';

export const mockJourneys: Journey[] = [
  { id: '1', date: '2023-10-27 14:00', pickup: 'Heathrow Airport, T5', destination: 'The Savoy, London', driver: 'James P.', car: 'Mercedes S-Class', plate: '1001', status: 'Completed', price: 150 },
  { id: '2', date: '2023-11-15 09:30', pickup: 'Canary Wharf', destination: 'The Shard', driver: 'Robert K.', car: 'BMW 7 Series', plate: '1002', status: 'Upcoming', price: 85 },
  { id: '6', date: '2023-11-20 11:00', pickup: 'Kensington', destination: 'Stop 1: Harrods, Stop 2: Buckingham Palace', driver: 'James P.', car: 'Mercedes S-Class', plate: '1001', status: 'Upcoming', price: 110 },
  { id: '3', date: '2023-10-20 18:00', pickup: 'Soho House', destination: 'Gatwick Airport, North', driver: 'David C.', car: 'Audi A8', plate: '1003', status: 'Completed', price: 120 },
  { id: '4', date: '2023-09-05 12:00', pickup: 'Mayfair', destination: 'Claridge\'s', driver: 'James P.', car: 'Mercedes S-Class', plate: '1001', status: 'Completed', price: 60 },
  { id: '5', date: '2023-12-01 20:00', pickup: 'The Ritz, London', destination: 'London City Airport', driver: 'TBC', car: 'Mercedes V-Class', plate: '1004', status: 'Upcoming', price: 95 },
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

type FilterStatus = 'All' | 'Completed' | 'Upcoming';

const ClientHistory: React.FC = () => {
    const [filter, setFilter] = useState<FilterStatus>('Upcoming');
    const [query, setQuery] = useState('');

    const filteredJourneys = mockJourneys.filter(journey => {
        const matchesStatus = filter === 'All' ? true : journey.status === filter;
        const search = query.trim().toLowerCase();
        const matchesQuery = !search
          ? true
          : `${journey.pickup} ${journey.destination} ${journey.driver} ${journey.car}`
              .toLowerCase()
              .includes(search);
        return matchesStatus && matchesQuery;
    });

    const FilterButton: React.FC<{ status: FilterStatus }> = ({ status }) => (
        <button
            onClick={() => setFilter(status)}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                filter === status
                ? 'bg-amber-400/90 text-black'
                : 'bg-gray-700/50 text-amber-300 hover:bg-gray-600/50'
            }`}
        >
            {status}
        </button>
    );
    
    return (
        <div>
            <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                <h2 className="text-2xl font-semibold font-display text-amber-300">Journey History</h2>
                <div className="flex items-center gap-2">
                    <FilterButton status="Upcoming" />
                    <FilterButton status="Completed" />
                    <FilterButton status="All" />
                </div>
            </div>
            <div className="relative mb-6">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by Pickup, Destination, Driver, Car"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-10 py-3 text-white placeholder-gray-500 focus:border-amber-400 focus:outline-none"
                />
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-max text-left">
                    <thead className="bg-gray-800/60">
                        <tr>
                        <th className="p-4">Date & Time</th>
                        <th className="p-4">Pickup</th>
                        <th className="p-4">Destination</th>
                        <th className="p-4">Driver</th>
                        <th className="p-4">Car</th>
                        <th className="p-4">Plate</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Price</th>
                        <th className="p-4">Invoice</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredJourneys.length > 0 ? filteredJourneys.map((journey, index) => (
                        <tr key={journey.id} className={`border-t border-gray-800 ${index % 2 === 0 ? 'bg-black/20' : ''}`}>
                            <td className="p-4 align-top">{journey.date}</td>
                            <td className="p-4 align-top">{journey.pickup}</td>
                            <td className="p-4 align-top">
                                {journey.destination.includes('Stop ') ? (
                                    journey.destination.split(', ').map((stop, i) => (
                                        <div key={i}>{stop}</div>
                                    ))
                                ) : (
                                    journey.destination
                                )}
                            </td>
                            <td className="p-4 align-top">{journey.driver}</td>
                            <td className="p-4 align-top">{journey.car}</td>
                            <td className="p-4 align-top">{journey.plate}</td>
                            <td className="p-4 align-top"><StatusBadge status={journey.status} /></td>
                            <td className="p-4 align-top text-right font-semibold">£{journey.price.toFixed(2)}</td>
                            <td className="p-4 align-top">
                                <button
                                  type="button"
                                  className="px-2 py-1 text-xs font-semibold rounded-full bg-amber-500/15 text-amber-200 border border-amber-400/40 hover:bg-amber-500/25 transition-colors"
                                >
                                  Download
                                </button>
                                <button
                                  type="button"
                                  className="ml-2 px-3 py-1 text-xs font-semibold rounded-full bg-green-500/20 text-green-200 border border-green-400/40 hover:bg-green-500/30 transition-colors"
                                >
                                  Book again
                                </button>
                            </td>
                        </tr>
                        )) : (
                            <tr>
                                <td colSpan={9} className="text-center p-8 text-gray-400">
                                    No {filter !== 'All' ? filter.toLowerCase() : ''} journeys found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                    </table>
                </div>
            </div>
      </div>
    );
};

export default ClientHistory;
