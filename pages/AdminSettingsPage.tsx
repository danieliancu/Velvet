import React, { useState } from 'react';
import AdminPageHeader from '../components/AdminPageHeader';

type SettingsState = {
  asDirected: {
    executive: string;
    luxury: string;
  };
  nightSurcharge: string;
  mileage: {
    executive: { tier1: string; tier2: string; tier3: string };
    luxury: { tier1: string; tier2: string; tier3: string };
    mpv: { tier1: string; tier2: string; tier3: string };
  };
  surcharges: {
    airportPickup: string;
    airportDropoff: string;
    congestion: string;
  };
};

const AdminSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SettingsState>({
    asDirected: {
      executive: '40',
      luxury: '60'
    },
    nightSurcharge: '30',
    mileage: {
      executive: { tier1: '6.25', tier2: '2.5', tier3: '2' },
      luxury: { tier1: '8.75', tier2: '3.5', tier3: '3' },
      mpv: { tier1: '10', tier2: '4', tier3: '3.5' }
    },
    surcharges: {
      airportPickup: '15',
      airportDropoff: '7',
      congestion: '15'
    }
  });
  const [saved, setSaved] = useState(false);

  const updateAsDirected = (key: keyof SettingsState['asDirected'], value: string) => {
    setSettings((prev) => ({
      ...prev,
      asDirected: { ...prev.asDirected, [key]: value }
    }));
  };

  const updateNightSurcharge = (value: string) => {
    setSettings((prev) => ({
      ...prev,
      nightSurcharge: value
    }));
  };

  const updateMileage = (
    vehicle: keyof SettingsState['mileage'],
    key: keyof SettingsState['mileage']['executive'],
    value: string
  ) => {
    setSettings((prev) => ({
      ...prev,
      mileage: {
        ...prev.mileage,
        [vehicle]: { ...prev.mileage[vehicle], [key]: value }
      }
    }));
  };

  const updateSurcharge = (key: keyof SettingsState['surcharges'], value: string) => {
    setSettings((prev) => ({
      ...prev,
      surcharges: { ...prev.surcharges, [key]: value }
    }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    // In a real app, call an API here.
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="w-full flex-grow p-4 sm:p-6 md:p-8">
        <div className="max-w-6xl mx-auto w-full space-y-8">
          <AdminPageHeader active="settings" />

          <main className="w-full space-y-6">
            <section className="bg-[#0f0b0b] border border-gray-800 rounded-2xl p-6 space-y-6 shadow-[0_0_50px_rgba(255,193,7,0.08)]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-amber-500">Settings</p>
                  <h2 className="text-2xl font-semibold text-white">Pricing & Charges</h2>
                  <p className="text-sm text-gray-400">Reference rates visible only to admins.</p>
                </div>
                <div className="flex items-center gap-3">
                  {saved && <span className="text-sm text-green-400">Saved</span>}
                  <button
                    type="button"
                    onClick={handleSave}
                    className="px-4 py-2 font-semibold bg-amber-500 text-black rounded-md hover:bg-amber-400 transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/10 bg-black/50 p-4 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">As Directed</h3>
                    <p className="text-xs text-gray-400">Hourly waiting charges</p>
                  </div>
                  <div className="flex flex-col gap-3 text-sm">
                    <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3 text-gray-200">
                      <span>Executive</span>
                      <input
                        type="number"
                        className="w-28 rounded-md border border-white/10 bg-[#1c1c1c] px-3 py-2 text-right text-white"
                        value={settings.asDirected.executive}
                        onChange={(e) => updateAsDirected('executive', e.target.value)}
                      />
                      <span className="text-xs text-gray-400">£/h</span>
                    </div>
                    <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3 text-gray-200">
                      <span>Luxury, Luxury MPV</span>
                      <input
                        type="number"
                        className="w-28 rounded-md border border-white/10 bg-[#1c1c1c] px-3 py-2 text-right text-white"
                        value={settings.asDirected.luxury}
                        onChange={(e) => updateAsDirected('luxury', e.target.value)}
                      />
                      <span className="text-xs text-gray-400">£/h</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/50 p-4 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Night surcharge</h3>
                    <p className="text-xs text-gray-400">Applies 23:00 - 04:00 across all categories</p>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-sm text-gray-200">
                    <span>Fixed per booking</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        className="w-24 rounded-md border border-white/10 bg-[#1c1c1c] px-3 py-2 text-right text-white"
                        value={settings.nightSurcharge}
                        onChange={(e) => updateNightSurcharge(e.target.value)}
                      />
                      <span className="text-xs text-gray-400">£</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/50 p-4 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold text-white">Wait & Return / Transfer (A → B)</h3>
                  <p className="text-xs text-gray-400">Mileage tiers by vehicle</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { key: 'executive', label: 'Executive' },
                    { key: 'luxury', label: 'Luxury' },
                    { key: 'mpv', label: 'Luxury MPV' }
                  ].map((tier) => (
                    <div key={tier.key} className="rounded-lg border border-white/10 bg-[#161010] p-3 space-y-3">
                      <p className="text-sm font-semibold text-white">{tier.label}</p>
                      <div className="space-y-3 text-xs text-gray-300">
                        <div className="flex items-center justify-between gap-2">
                          <span>1-10 mile</span>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              className="w-24 rounded-md border border-white/10 bg-[#1c1c1c] px-2 py-1 text-right text-white"
                              value={settings.mileage[tier.key as keyof SettingsState['mileage']].tier1}
                              onChange={(e) =>
                                updateMileage(tier.key as keyof SettingsState['mileage'], 'tier1', e.target.value)
                              }
                            />
                            <span className="text-[11px] text-gray-500">£/mile</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <span>10-40 mile</span>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              className="w-24 rounded-md border border-white/10 bg-[#1c1c1c] px-2 py-1 text-right text-white"
                              value={settings.mileage[tier.key as keyof SettingsState['mileage']].tier2}
                              onChange={(e) =>
                                updateMileage(tier.key as keyof SettingsState['mileage'], 'tier2', e.target.value)
                              }
                            />
                            <span className="text-[11px] text-gray-500">£/mile</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <span>&gt; 40 mile</span>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              className="w-24 rounded-md border border-white/10 bg-[#1c1c1c] px-2 py-1 text-right text-white"
                              value={settings.mileage[tier.key as keyof SettingsState['mileage']].tier3}
                              onChange={(e) =>
                                updateMileage(tier.key as keyof SettingsState['mileage'], 'tier3', e.target.value)
                              }
                            />
                            <span className="text-[11px] text-gray-500">£/mile</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/50 p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold text-white">Google Maps surcharges</h3>
                  <p className="text-xs text-gray-400">Control fees applied in fare calculation</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-200">
                  <label className="rounded-lg border border-white/10 bg-[#161010] p-3 flex items-center justify-between gap-2">
                    <span>Pick-up aeroport</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        className="w-20 rounded-md border border-white/10 bg-[#1c1c1c] px-2 py-1 text-right text-white"
                        value={settings.surcharges.airportPickup}
                        onChange={(e) => updateSurcharge('airportPickup', e.target.value)}
                      />
                      <span className="text-[11px] text-gray-500">£</span>
                    </div>
                  </label>
                  <label className="rounded-lg border border-white/10 bg-[#161010] p-3 flex items-center justify-between gap-2">
                    <span>Drop-off aeroport</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        className="w-20 rounded-md border border-white/10 bg-[#1c1c1c] px-2 py-1 text-right text-white"
                        value={settings.surcharges.airportDropoff}
                        onChange={(e) => updateSurcharge('airportDropoff', e.target.value)}
                      />
                      <span className="text-[11px] text-gray-500">£</span>
                    </div>
                  </label>
                  <label className="rounded-lg border border-white/10 bg-[#161010] p-3 flex items-center justify-between gap-2">
                    <span>Central London (Congestion)</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        className="w-20 rounded-md border border-white/10 bg-[#1c1c1c] px-2 py-1 text-right text-white"
                        value={settings.surcharges.congestion}
                        onChange={(e) => updateSurcharge('congestion', e.target.value)}
                      />
                      <span className="text-[11px] text-gray-500">£</span>
                    </div>
                  </label>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
