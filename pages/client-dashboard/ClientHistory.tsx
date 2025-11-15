
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
    const [filter, setFilter] = useState<FilterStatus>('All');

    const filteredJourneys = mockJourneys.filter(journey => {
        if (filter === 'All') return true;
        return journey.status === filter;
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
                    <FilterButton status="All" />
                    <FilterButton status="Completed" />
                    <FilterButton status="Upcoming" />
                </div>
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
                        </tr>
                        )) : (
                            <tr>
                                <td colSpan={8} className="text-center p-8 text-gray-400">
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
