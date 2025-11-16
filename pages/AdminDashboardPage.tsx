import React, { useState } from 'react';
import AdminPageHeader from '../components/AdminPageHeader';

const driverDirectory = {
  james: { name: 'James P.', phone: '+447404494690', email: 'james@velvetdrivers.co.uk' },
  robert: { name: 'Robert K.', phone: '+44 7700 900234', email: 'robert@velvetdrivers.co.uk' },
  david: { name: 'David C.', phone: '+44 7700 900345', email: 'david@velvetdrivers.co.uk' },
  anna: { name: 'Anna B.', phone: '+44 7700 900456', email: 'anna@velvetdrivers.co.uk' },
  oliver: { name: 'Oliver T.', phone: '+44 7700 900567', email: 'oliver@velvetdrivers.co.uk' }
} as const;

const formatPhoneForWhatsApp = (phone: string) => phone.replace(/\D/g, '');

const mockLiveBookings = [
  {
    id: 'VD-1009',
    pickup: 'Heathrow Terminal 5',
    dropOff: 'The Ritz London',
    passenger: 'Alice Wonderland',
    phone: '+44 7700 123456',
    notes: 'Flight BA909 - Meet Door 15',
    time: '10:00',
    date: '16/11/2025',
    priceDetails: '£111.00 ( £101.00 + £10.00 Pick-up fee)',
    drivers: ['james', 'robert', 'david']
  },
  {
    id: 'VD-1010',
    pickup: 'Gatwick South Terminal',
    dropOff: 'Kings Cross Hotel',
    passenger: 'Bob Builder',
    phone: '+44 7700 654321',
    notes: 'Needs Wi-Fi & water onboard',
    time: '12:45',
    date: '16/11/2025',
    priceDetails: '£89.00 ( £79.00 + £10.00 Pick-up fee)',
    drivers: ['anna', 'oliver']
  }
] as const;

const buildBookingSummary = (booking: (typeof mockLiveBookings)[number]) => {
  return `Time: ${booking.time}
Date: ${booking.date}
Passanger: ${booking.passenger}
Phone: ${booking.phone}
Pickup: ${booking.pickup}
Drop-off: ${booking.dropOff}

Price:  ${booking.priceDetails}

Notes: ${booking.notes}`;
};

const AdminDashboardPage: React.FC = () => {
  const [clientConfirmed, setClientConfirmed] = useState<Record<string, boolean>>({});
  const [driverConfirmed, setDriverConfirmed] = useState<Record<string, boolean>>({});
  const [whatsappOpen, setWhatsappOpen] = useState<Record<string, boolean>>({});
  const [driverMessages, setDriverMessages] = useState<Record<string, string>>({});
  const [driversExpanded, setDriversExpanded] = useState<Record<string, boolean>>({});

  const pendingClientConfirmations = mockLiveBookings.filter(
    (booking) => !clientConfirmed[booking.id]
  ).length;
  const liveBadgeCount = pendingClientConfirmations;
  const toggleClientConfirmation = (bookingId: string) => {
    setClientConfirmed((prev) => ({ ...prev, [bookingId]: !prev[bookingId] }));
  };

  const toggleDriverConfirmation = (driverKey: string) => {
    setDriverConfirmed((prev) => ({ ...prev, [driverKey]: !prev[driverKey] }));
  };

  const toggleWhatsApp = (driverKey: string) => {
    setWhatsappOpen((prev) => ({ ...prev, [driverKey]: !prev[driverKey] }));
  };

  const handlePasteInfo = (
    driverKey: string,
    booking: (typeof mockLiveBookings)[number]
  ) => {
    setDriverMessages((prev) => ({ ...prev, [driverKey]: buildBookingSummary(booking) }));
  };

  const toggleDriversSection = (bookingId: string) => {
    setDriversExpanded((prev) => ({
      ...prev,
      [bookingId]: !prev[bookingId]
    }));
  };

  const openWhatsAppChat = (driverKey: string, text: string) => {
    if (!text) return;
    const driverId = driverKey.split('-').at(-1);
    if (!driverId) return;
    const driver = driverDirectory[driverId as keyof typeof driverDirectory];
    if (!driver) return;
    const digits = formatPhoneForWhatsApp(driver.phone);
    if (!digits) return;
    const params = new URLSearchParams();
    params.set('text', text);
    const url = `whatsapp://send?phone=${digits}&${params.toString()}`;
    if (typeof window !== 'undefined') {
      window.location.href = url;
    }
  };

  const handleSend = (driverKey: string, fallbackMessage?: string) => {
    const draft = (driverMessages[driverKey] ?? '').trim();
    const message = draft || fallbackMessage?.trim() || '';
    if (!message) {
      return;
    }
    openWhatsAppChat(driverKey, message);
    setDriverMessages((prev) => ({ ...prev, [driverKey]: '' }));
  };

  const handleClear = (driverKey: string) => {
    setDriverMessages((prev) => ({ ...prev, [driverKey]: '' }));
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="w-full flex-grow p-4 sm:p-6 md:p-8">
        <div className="max-w-6xl mx-auto w-full space-y-8">
          <AdminPageHeader active="live" liveBadgeCount={liveBadgeCount} />

          <main className="w-full">
            <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 space-y-6">
              <div className="flex flex-col gap-6">
                {mockLiveBookings.map((booking) => {
                  const confirmed = clientConfirmed[booking.id];
                  const bookingDrivers = booking.drivers
                    .map((driverId) => {
                      const driver = driverDirectory[driverId];
                      if (!driver) return null;
                      return { id: driverId, ...driver };
                    })
                    .filter(Boolean);
                  return (
                    <article
                      key={booking.id}
                      className="flex flex-col md:flex-row rounded-2xl border border-white/10 bg-black/40 p-5 gap-12"
                    >
                      <div className="flex flex-col gap-6 lg:flex-column">
                        <div className="flex-1 lg:basis-[40%] space-y-3">
                          <p className="text-sm font-semibold tracking-wide text-white">{booking.id}</p>
                          <p className="text-sm text-gray-300">
                            Pickup: {booking.pickup} · Drop-off: {booking.dropOff}
                          </p>
                          <p className="text-sm text-gray-300">
                            Time: {booking.time} · Date: {booking.date}
                          </p>
                          <p className="text-sm text-gray-300">
                            Passanger: {booking.passenger} · Phone: {booking.phone}
                          </p>
                          <p className="text-sm text-gray-300">
                            Price:{'  '}
                            <span className="font-semibold text-white">{booking.priceDetails}</span>
                          </p>
                          <p className="text-xs text-gray-400">Notes: {booking.notes}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 pt-2">
                              <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-green-400"></span>
                                <span className="text-sm font-semibold text-green-400">Client request</span>
                              </div>
                            <button
                              type="button"
                              onClick={() => toggleClientConfirmation(booking.id)}
                              className={`flex items-center gap-2 text-sm font-semibold transition ${
                                confirmed ? 'text-green-400' : 'text-gray-300'
                              }`}
                            >
                              <span
                                className={`w-3 h-3 rounded-full ${
                              confirmed
                                ? 'bg-green-400'
                                : 'bg-red-500 animate-[pulse_0.6s_infinite]'
                                }`}
                              ></span>
                              <span className={`${confirmed ? 'text-green-400' : 'text-gray-300'}`}>
                                Client confirmation
                              </span>
                            </button>
                          </div>
                        </div>
                        <div
                          className={`space-y-3 rounded-2xl border border-white/10 bg-black/60 p-4 lg:basis-[60%] transition-[height] duration-300 overflow-hidden ${
                            (driversExpanded[booking.id] ?? false) ? '' : 'h-[50px]'
                          }`}
                        >
                          {(() => {
                            const isExpanded = driversExpanded[booking.id] ?? false;
                            const bookingConfirmed = bookingDrivers.some((driver) => {
                              const driverKey = `${booking.id}-${driver.id}`;
                              return Boolean(driverConfirmed[driverKey]);
                            });
                              return (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => toggleDriversSection(booking.id)}
                                    className="flex w-full items-center justify-between text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400"
                                  >
                                    <span
                                      className={`flex items-center gap-2 ${
                                        bookingConfirmed ? 'text-green-300' : 'text-gray-400'
                                      }`}
                                    >
                                      {bookingConfirmed ? (
                                        <>
                                          <span className="flex h-3 w-3 items-center justify-center rounded-full bg-green-400">
                                            <svg viewBox="0 0 8 8" className="h-2 w-2 text-black">
                                              <path d="M1 3.5L3.2 5.6 6.7 1.3" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                                            </svg>
                                          </span>
                                          Driver confirmed
                                        </>
                                      ) : (
                                        <>Drivers available</>
                                      )}
                                      <svg
                                        className={`h-3 w-3 transition-transform ${
                                          isExpanded ? 'rotate-180' : ''
                                        }`}
                                        viewBox="0 0 10 6"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.25" />
                                      </svg>
                                    </span>
                                    <span className="sr-only">toggle</span>
                                  </button>
                                  {isExpanded && (
                                    <div className="space-y-3 pt-3">
                                      {bookingDrivers.map((driver) => {
                                        const driverKey = `${booking.id}-${driver.id}`;
                                        const confirmedDriver = driverConfirmed[driverKey];
                                        const isWhatsappOpen = whatsappOpen[driverKey];
                                        const messageValue = driverMessages[driverKey] ?? '';
                                        const bookingLocked =
                                          bookingConfirmed && !confirmedDriver;
                                        return (
                                          <div
                                            key={driverKey}
                                            className="space-y-2 rounded-2xl border border-white/5 bg-black/40 p-3"
                                          >
                                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                              <div>
                                                <p className="text-sm font-semibold text-white">
                                                  {driver.name}
                                                </p>
                                                <p className="text-[11px] text-gray-400">
                                                  Phone: {driver.phone}
                                                </p>
                                                <p className="text-[11px] text-gray-400">
                                                  Email: {driver.email}
                                                </p>
                                              </div>
                                              <div className="flex flex-wrap items-center gap-3">
                                                <button
                                                  type="button"
                                                  onClick={() => toggleDriverConfirmation(driverKey)}
                                                  disabled={bookingLocked}
                                                  className={`bg-gray-900 flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold transition ${
                                                    confirmedDriver
                                                      ? 'bg-green-600/30 text-green-200'
                                                      : 'text-gray-300'
                                                  } ${bookingLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                >
                                                  <span
                                                    className={`w-3 h-3 rounded-full border border-white ${
                                                      confirmedDriver ? 'bg-green-400' : 'bg-white'
                                                    }`}
                                                  ></span>
                                                  <span className="text-[11px]">
                                                    {confirmedDriver ? 'Driver confirmed' : 'Driver confirmation'}
                                                  </span>
                                                </button>
                                                <button
                                                  type="button"
                                                  onClick={() => toggleWhatsApp(driverKey)}
                                                  className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.4em] text-white transition-colors opacity-80 hover:opacity-100"
                                                >
                                                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/80 text-[10px]">
                                                    <svg viewBox="0 0 24 24" className="h-3 w-3 text-white">
                                                      <path
                                                        fill="currentColor"
                                                        d="M12 2C6.476 2 2 6.477 2 12a10 10 0 0016.546 8.657l3.225.48-.726-3.734A9.963 9.963 0 0022 12c0-5.523-4.477-10-10-10zm0 18a8 8 0 01-6.325-12.816l.004-.005a7.977 7.977 0 0111.146 11.221A7.952 7.952 0 0112 20zm1.5-5.5h-1l-.2-.006c-.5-.05-1.35-.6-1.8-1.25-.41-.56-.79-1.35-.77-1.89 0-.67.3-.9.8-.96.58-.08 1.02.32 1.5.32.5 0 .86-.15 1.2-.35.22-.13.38-.29.4-.75.02-.2 0-.55-.01-.76-.02-.31-.25-.55-.56-.57-.27-.01-.52.16-.68.28-.38.32-.8.85-1.08 1.2-.2.26-.5.26-.8.17-.3-.09-.62-.28-.92-.44a5.548 5.548 0 00-.82-.34c-.59-.17-1.2-.06-1.64.38a2.148 2.148 0 00-.58 1.6c-.07.7.14 1.46.48 2.03.4.7.92 1.38 1.6 1.88.32.24.64.4 1.04.49.63.13 1.35-.03 1.77-.36.19-.15.36-.3.5-.36.19-.08.4-.1.64-.05.3.06.6.22.82.46.5.52.72 1.24 1.04 2.02.33.82.85 1.67 1.46 2.19H13z"
                                                      />
                                                    </svg>
                                                  </span>
                                                  WhatsApp
                                                </button>                                                
                                              </div>
                                            </div>
                                            {isWhatsappOpen && (
                                              <div className="space-y-2">
                                                <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400">
                                                  Send the booking details via WhatsApp.
                                                </p>
                                                <textarea
                                                  className="w-full rounded-xl border border-white/15 bg-black/70 px-3 py-2 text-xs text-gray-100 placeholder:text-gray-500"
                                                  rows={3}
                                                  value={messageValue}
                                                  onChange={(event) =>
                                                    setDriverMessages((prev) => ({
                                                      ...prev,
                                                      [driverKey]: event.target.value
                                                    }))
                                                  }
                                                  placeholder="Write your message..."
                                                />
                                                <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-300">
                                                  <button
                                                    type="button"
                                                    onClick={() => handlePasteInfo(driverKey, booking)}
                                                    className="rounded-full border border-white/20 px-3 py-1 text-xs text-white transition hover:border-amber-400"
                                                  >
                                                    Paste booking info
                                                  </button>
                                                  <button
                                                    type="button"
                                                    onClick={() => handleSend(driverKey, buildBookingSummary(booking))}
                                                    disabled={!messageValue.trim()}
                                                    className="rounded-full border border-white/20 px-3 py-1 text-xs text-white transition hover:border-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                                  >
                                                    Send
                                                  </button>
                                                  <button
                                                    type="button"
                                                    onClick={() => handleClear(driverKey)}
                                                    className="rounded-full border border-white/20 px-3 py-1 text-xs text-white transition hover:border-amber-400"
                                                  >
                                                    Clear
                                                  </button>
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </>
                              );
                            })()}
                          </div>
                    </article>
                  );
                })}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
