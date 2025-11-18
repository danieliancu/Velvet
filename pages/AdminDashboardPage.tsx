import React, { useState } from 'react';
import AdminPageHeader from '../components/AdminPageHeader';

type DriverDirectoryEntry = {
  name: string;
  phone: string;
  plateNo: string;
  make: string;
  model: string;
};

type Severity = 'critical' | 'warning' | 'info' | 'success';

type NotificationItem = {
  id: string;
  category: string;
  title: string;
  message: string;
  datetime: string;
  severity: Severity;
  tags: string[];
};

const driverDirectory: Record<string, DriverDirectoryEntry> = {
  james: {
    name: 'James P.',
    phone: '+447404494690',
    plateNo: 'DL 123 ABC',
    make: 'Mercedes-Benz',
    model: 'S-Class'
  },
  robert: {
    name: 'Robert K.',
    phone: '+44 7700 900234',
    plateNo: 'RX70 DVE',
    make: 'BMW',
    model: '7 Series'
  },
  david: {
    name: 'David C.',
    phone: '+44 7700 900345',
    plateNo: 'DC19 PCO',
    make: 'Audi',
    model: 'A8'
  },
  anna: {
    name: 'Anna B.',
    phone: '+44 7700 900456',
    plateNo: 'AB21 LUX',
    make: 'Mercedes-Benz',
    model: 'E-Class'
  },
  oliver: {
    name: 'Oliver T.',
    phone: '+44 7700 900567',
    plateNo: 'OT69 VEL',
    make: 'Lexus',
    model: 'RX'
  }
};

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

const notifications: NotificationItem[] = [
  {
    id: 'notif-driver-pco',
    category: 'Driver Document',
    title: 'PCO licence expiring in 14 days',
    message: 'James P. (PCO-70934) needs renewal submitted before 02 Dec.',
    datetime: '2025-11-18T09:10:00Z',
    severity: 'critical',
    tags: ['Driver: James P.', 'PCO Licence', 'Renewal']
  },
  {
    id: 'notif-car-mot',
    category: 'Vehicle MOT',
    title: 'MOT expiring soon for LC20 ABC',
    message: 'Mercedes-Benz S-Class MOT due 15 Oct 2025. Schedule inspection.',
    datetime: '2025-11-17T17:00:00Z',
    severity: 'warning',
    tags: ['VRM: LC20 ABC', 'MOT', 'Vehicle']
  },
  {
    id: 'notif-car-insurance',
    category: 'Vehicle Insurance',
    title: 'Insurance expiring for BD68 XYZ',
    message: 'BMW 7 Series insurance ends 01 Dec 2025. Upload renewed certificate.',
    datetime: '2025-11-17T08:00:00Z',
    severity: 'critical',
    tags: ['VRM: BD68 XYZ', 'Insurance', 'Upload needed']
  },
  {
    id: 'notif-car-phv',
    category: 'PHV Vehicle Licence',
    title: 'PHV licence renewal required for OT69 VEL',
    message: 'Lexus RX PHV licence expires 10 Jan 2026. Start renewal pack.',
    datetime: '2025-11-16T14:20:00Z',
    severity: 'warning',
    tags: ['VRM: OT69 VEL', 'PHV Licence', 'Vehicle']
  },
  {
    id: 'notif-complaint',
    category: 'Client Submission',
    title: 'Complaint submitted (Ref: VD-1001)',
    message: 'Passenger reported driver punctuality issue. Review and respond within SLA.',
    datetime: '2025-11-18T11:35:00Z',
    severity: 'critical',
    tags: ['Complaint', 'Client', 'SLA 48h']
  },
  {
    id: 'notif-review',
    category: 'Client Submission',
    title: 'New 5* review received',
    message: '"Great ride, clean car, on time." from Kings Cross Hotel transfer.',
    datetime: '2025-11-17T19:40:00Z',
    severity: 'success',
    tags: ['Review', 'Customer', 'Reputation']
  },
  {
    id: 'notif-lost',
    category: 'Lost Property',
    title: 'Lost property form submitted',
    message: 'Client reports missing laptop bag on VD-1010. Check vehicle BD68 XYZ.',
    datetime: '2025-11-17T21:15:00Z',
    severity: 'info',
    tags: ['Lost Property', 'VD-1010', 'Follow-up']
  },
  {
    id: 'notif-booking',
    category: 'Booking Request',
    title: 'Book a Journey request received',
    message: 'New Heathrow to The Ned booking request. Awaiting client confirmation.',
    datetime: '2025-11-18T08:55:00Z',
    severity: 'info',
    tags: ['New Booking', 'Dispatch', 'Heathrow']
  },
  {
    id: 'notif-login',
    category: 'Security',
    title: 'New admin login detected',
    message: 'Admin session opened from London IP 81.xx. Verify if expected.',
    datetime: '2025-11-18T06:45:00Z',
    severity: 'warning',
    tags: ['Login', 'Audit', 'Security']
  }
] as const;

const severityStyleMap: Record<
  Severity,
  { card: string; pill: string; accent: string; button: string; label: string }
> = {
  critical: {
    card: 'border-red-500/40 bg-red-950/40 shadow-red-900/30',
    pill: 'bg-red-500 text-white',
    accent: 'text-red-200',
    button: 'border-red-400/60 text-red-200 hover:bg-red-500 hover:text-white',
    label: 'Critical'
  },
  warning: {
    card: 'border-amber-500/40 bg-amber-950/30 shadow-amber-900/20',
    pill: 'bg-amber-500 text-black',
    accent: 'text-amber-200',
    button: 'border-amber-400/70 text-amber-200 hover:bg-amber-400 hover:text-black',
    label: 'Warning'
  },
  info: {
    card: 'border-blue-400/40 bg-blue-950/30 shadow-blue-900/20',
    pill: 'bg-blue-400 text-black',
    accent: 'text-blue-200',
    button: 'border-blue-400/70 text-blue-100 hover:bg-blue-400 hover:text-black',
    label: 'Info'
  },
  success: {
    card: 'border-emerald-500/40 bg-emerald-950/30 shadow-emerald-900/20',
    pill: 'bg-emerald-500 text-black',
    accent: 'text-emerald-200',
    button: 'border-emerald-400/70 text-emerald-100 hover:bg-emerald-400 hover:text-black',
    label: 'Positive'
  }
};

const notificationActions = ['Go To', 'Archive', 'Delete', 'Save'] as const;

const severityRank: Record<Severity, number> = {
  critical: 0,
  warning: 1,
  info: 2,
  success: 3
};

const formatDateTime = (iso: string) =>
  new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short' }).format(
    new Date(iso)
  );

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
  const sortedNotifications = [...notifications].sort((a, b) => {
    const severityDiff = severityRank[a.severity] - severityRank[b.severity];
    if (severityDiff !== 0) return severityDiff;
    return new Date(b.datetime).getTime() - new Date(a.datetime).getTime();
  });

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
                                                  Plate no: {driver.plateNo}
                                                </p>
                                                <p className="text-[11px] text-gray-400">
                                                  Make: {driver.make}
                                                </p>
                                                <p className="text-[11px] text-gray-400">
                                                  Model: {driver.model}
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
            <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-white">Notifications</h2>
                  <p className="text-sm text-gray-400">
                    Document expiries, client submissions, logins — sorted by urgency & date.
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                {sortedNotifications.map((item) => {
                  const styles = severityStyleMap[item.severity];
                  return (
                    <article
                      key={item.id}
                      className={`rounded-2xl border p-4 md:p-5 shadow-lg ${styles.card}`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className={`text-[11px] font-semibold uppercase tracking-[0.3em] ${styles.accent}`}>
                            {item.category}
                          </span>
                          <span className={`text-[11px] px-2 py-1 rounded-full font-bold uppercase ${styles.pill}`}>
                            {styles.label}
                          </span>
                        </div>
                        <p className="text-xs text-gray-300">{formatDateTime(item.datetime)}</p>
                      </div>
                      <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div className="space-y-1">
                          <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                          <p className="text-sm text-gray-300">{item.message}</p>
                          <div className="flex flex-wrap gap-2 pt-2">
                            {item.tags.map((tag) => (
                              <span
                                key={`${item.id}-${tag}`}
                                className="text-[11px] rounded-full border border-white/10 bg-white/5 px-2 py-1 text-gray-200"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {notificationActions.map((action) => (
                            <button
                              key={`${item.id}-${action}`}
                              type="button"
                              className={`px-3 py-1 text-xs font-semibold rounded-full border transition ${styles.button}`}
                            >
                              {action}
                            </button>
                          ))}
                        </div>
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
