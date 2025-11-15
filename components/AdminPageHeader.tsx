import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';

type AdminPageHeaderProps = {
  active: 'live' | 'older' | 'drivers';
  liveBadgeCount?: number;
};

const Logo = () => (
  <img src="/assets/logo.png" alt="Velvet Drivers Logo" className="w-[220px] h-auto" />
);

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
      to: '/admin/drivers'
    }
  ] as const;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-black via-[#2d0303] to-black">
      <div className="border-b border-gray-900/80 px-6 py-8" style={{ display:"none" }}>
        <div className="flex justify-center">
          <Logo />
        </div>
      </div>
      <div className="px-6 py-6">
        <div className="border-b border-gray-800/80 pb-6">
          <div>
            <h1 className="text-3xl font-display font-bold uppercase text-amber-400">Admin Dashboard</h1>
            <p className="text-gray-400">Welcome, Administrator</p>
          </div>
        </div>
        <div className="flex items-center gap-3 pt-5">
          <div className="flex-1 min-w-0">
            <div className="flex flex-nowrap gap-3 overflow-x-auto pr-2">
              {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(item.to)}
                  className={`flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
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
           </div>
          </div>
          <div>
            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 font-semibold bg-transparent border border-amber-400 text-amber-400 rounded-md hover:bg-amber-400 hover:text-black transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPageHeader;
