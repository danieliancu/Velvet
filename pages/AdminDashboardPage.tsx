import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useBookings } from '../App';
import Footer from '../components/Footer';

const AdminDashboardPage: React.FC = () => {
  const { logout } = useAuth();
  const { bookings } = useBookings();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending Confirmation':
        return 'text-yellow-400';
      case 'Driver Assigned':
        return 'text-green-400';
      case 'Completed':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="w-full flex-grow p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-800">
            <div>
              <h1 className="text-3xl font-bold font-display text-amber-400">Admin Dashboard</h1>
              <p className="text-gray-400">Welcome, Administrator</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 font-semibold bg-transparent border border-amber-400 text-amber-400 rounded-md hover:bg-amber-400 hover:text-black transition-colors"
            >
              Logout
            </button>
          </header>

          <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Live Bookings</h2>
              {bookings.length > 0 ? (
                <ul>
                  {bookings
                    .map((booking) => (
                      <li key={booking.id} className="flex justify-between items-center p-3 hover:bg-gray-800/50 rounded-md">
                        <span>
                          {booking.id}: {booking.pickup} to {booking.dropOffs[0]}
                        </span>
                        <span className={getStatusColor(booking.status)}>{booking.status}</span>
                      </li>
                    ))
                    .reverse()}
                </ul>
              ) : (
                <p className="text-gray-400 text-center py-8">No bookings yet.</p>
              )}
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Driver Status</h2>
              <ul>
                <li className="flex justify-between items-center p-2">
                  <span>James P.</span>
                  <span className="text-green-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400"></span>
                    Available
                  </span>
                </li>
                <li className="flex justify-between items-center p-2">
                  <span>Robert K.</span>
                  <span className="text-red-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-400"></span>
                    On Job
                  </span>
                </li>
                <li className="flex justify-between items-center p-2">
                  <span>David C.</span>
                  <span className="text-gray-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                    Offline
                  </span>
                </li>
              </ul>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboardPage;
