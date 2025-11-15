import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';

type AdminPageHeaderProps = {
  active: 'live' | 'older' | 'drivers';
  liveBadgeCount?: number;
};

const AdminPageHeader: React.FC<AdminPageHeaderProps> = ({ active, liveBadgeCount = 0 }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    {
      id: 'live',
      label: 'Live Bookings',
      to: '/admin/dashboard',
      badge: liveBadgeCount
    },
    {
      id: 'older',
      label: 'Older bookings',
      to: '/older-bookings'
    },
    {
      id: 'drivers',
      label: 'Drivers',
      to: '/driver/dashboard'
    }
  ] as const;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-800">
      <div>
        <h1 className="text-3xl font-display font-bold text-amber-400">Admin Dashboard</h1>
        <p className="text-gray-400">Welcome, Administrator</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => navigate(item.to)}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
                isActive
                  ? 'border-amber-400 bg-white/10 text-white'
                  : 'border-white/20 text-white hover:border-amber-400'
              }`}
            >
              {item.label}
              {item.id === 'live' && typeof item.badge === 'number' && (
                <span className="flex items-center justify-center rounded-full bg-red-600 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
        <button
          type="button"
          onClick={handleLogout}
          className="px-4 py-2 font-semibold bg-transparent border border-amber-400 text-amber-400 rounded-md hover:bg-amber-400 hover:text-black transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminPageHeader;
