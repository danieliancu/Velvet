import React, { useMemo, useState } from 'react';
import { Clock, User, DollarSign, Car, Search } from 'lucide-react';
import AdminPageHeader from '../components/AdminPageHeader';
import PageShell from '../components/PageShell';

type DriverJob = {
  id: string;
  pickup: string;
  destination: string;
  client: string;
  time: string;
  pay: number;
  notes: string;
};

type DriverCar = {
  vrm: string;
  make: string;
  model: string;
  motExpiry: string;
  insuranceExpiry: string;
  phvExpiry: string;
  logbook: string;
  status: 'Active' | 'Reserve';
};

type StatementRow = {
  date: string;
  ref: string;
  pickup: string;
  dropoff: string;
  vehicle: string;
  miles: number;
  wait: number;
  fare: number;
  status: 'Paid' | 'Unpaid';
};

type DriverProfileData = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  license: string;
  pcoExpiry: string;
  rating: string;
  tenure: string;
  lastOnline: string;
  cars: DriverCar[];
  upcomingJobs: DriverJob[];
  completedJobs: DriverJob[];
  statementRows: StatementRow[];
};

const driverProfiles: DriverProfileData[] = [
  {
    id: 'james',
    name: 'James P.',
    phone: '+447479666343',
    email: 'james@velvetdrivers.co.uk',
    address: '17 Fleet Street, London, EC4M 9AF',
    license: 'PCO-70934',
    pcoExpiry: '2026-02-14',
    rating: '4.9 / 5',
    tenure: '6 yrs with Velvet',
    lastOnline: '01:20 UTC',
    cars: [
      {
        vrm: 'LC20 ABC',
        make: 'Mercedes-Benz',
        model: 'S-Class',
        motExpiry: '2025-10-15',
        insuranceExpiry: '2025-08-31',
        phvExpiry: '2025-09-20',
        logbook: 'Uploaded',
        status: 'Active'
      }
    ],
    upcomingJobs: [],
    completedJobs: [
      {
        id: 'VD-0998',
        pickup: 'Canary Wharf',
        destination: 'Gatwick North',
        client: 'Bob Builder',
        time: '14:00',
        pay: 92.0,
        notes: 'VIP water bottle'
      }
    ],
    statementRows: [
      {
        date: '2025-10-01',
        ref: 'VD-1001',
        pickup: 'WD3 4PQ',
        dropoff: 'Heathrow T5',
        vehicle: 'Saloon',
        miles: 18,
        wait: 10,
        fare: 64,
        status: 'Paid'
      },
      {
        date: '2025-10-04',
        ref: 'VD-1004',
        pickup: 'W1J 7NT',
        dropoff: 'Heathrow T3',
        vehicle: 'MPV',
        miles: 22,
        wait: 7,
        fare: 78,
        status: 'Unpaid'
      },
      {
        date: '2025-10-07',
        ref: 'VD-1006',
        pickup: 'SW1A 1AA',
        dropoff: 'City Airport',
        vehicle: 'Saloon',
        miles: 16,
        wait: 4,
        fare: 69,
        status: 'Paid'
      },
      {
        date: '2025-10-09',
        ref: 'VD-1009',
        pickup: 'E1 6AN',
        dropoff: 'Gatwick South',
        vehicle: 'MPV',
        miles: 29,
        wait: 10,
        fare: 102,
        status: 'Unpaid'
      }
    ]
  },
  {
    id: 'robert',
    name: 'Robert K.',
    phone: '+44 7700 900234',
    email: 'robert@velvetdrivers.co.uk',
    address: '23 Long Acre, London, WC2E 9LG',
    license: 'PCO-81422',
    pcoExpiry: '2026-05-18',
    rating: '4.8 / 5',
    tenure: '4 yrs with Velvet',
    lastOnline: '00:45 UTC',
    cars: [
      {
        vrm: 'BD68 XYZ',
        make: 'BMW',
        model: '7 Series',
        motExpiry: '2026-01-22',
        insuranceExpiry: '2025-12-01',
        phvExpiry: '2026-01-10',
        logbook: 'Uploaded',
        status: 'Active'
      },
      {
        vrm: 'LD19 MNV',
        make: 'Audi',
        model: 'A8',
        motExpiry: '2025-11-09',
        insuranceExpiry: '2025-10-26',
        phvExpiry: '2026-02-14',
        logbook: 'Uploaded',
        status: 'Reserve'
      }
    ],
    upcomingJobs: [],
    completedJobs: [
      {
        id: 'VD-1005',
        pickup: 'Soho',
        destination: 'Heathrow Terminal 2',
        client: 'Ravi Patel',
        time: '11:00',
        pay: 68.0,
        notes: 'Family of 3'
      },
      {
        id: 'VD-0995',
        pickup: 'Windsor',
        destination: 'London Bridge',
        client: 'Isla Fraser',
        time: '15:15',
        pay: 120.0,
        notes: 'Conference luggage'
      }
    ],
    statementRows: [
      {
        date: '2025-10-05',
        ref: 'VD-1007',
        pickup: 'UB8 2XG',
        dropoff: 'London City',
        vehicle: 'Saloon',
        miles: 30,
        wait: 0,
        fare: 92,
        status: 'Paid'
      },
      {
        date: '2025-10-08',
        ref: 'VD-1010',
        pickup: 'EN2 6LN',
        dropoff: 'LHR T5',
        vehicle: 'MPV',
        miles: 31,
        wait: 9,
        fare: 95,
        status: 'Paid'
      },
      {
        date: '2025-10-10',
        ref: 'VD-1011',
        pickup: 'SE1 9GF',
        dropoff: 'Southend',
        vehicle: 'Saloon',
        miles: 47,
        wait: 6,
        fare: 138,
        status: 'Unpaid'
      },
      {
        date: '2025-10-11',
        ref: 'VD-1012',
        pickup: 'GU1 4AZ',
        dropoff: 'Heathrow T4',
        vehicle: 'MPV',
        miles: 28,
        wait: 4,
        fare: 84,
        status: 'Paid'
      }
    ]
  },
  {
    id: 'anna',
    name: 'Anna B.',
    phone: '+44 7700 900456',
    email: 'anna@velvetdrivers.co.uk',
    address: '4 The Strand, London, WC2R 1DX',
    license: 'PCO-90588',
    pcoExpiry: '2026-07-30',
    rating: '4.7 / 5',
    tenure: '5 yrs with Velvet',
    lastOnline: '23:10 UTC',
    cars: [
      {
        vrm: 'WA15 LCK',
        make: 'Range Rover',
        model: 'Autobiography',
        motExpiry: '2025-09-22',
        insuranceExpiry: '2025-11-11',
        phvExpiry: '2026-03-05',
        logbook: 'Uploaded',
        status: 'Active'
      }
    ],
    upcomingJobs: [],
    completedJobs: [
      {
        id: 'VD-1002',
        pickup: 'Richmond',
        destination: 'City Airport',
        client: 'Cate Mills',
        time: '13:20',
        pay: 66.0,
        notes: 'Child seat required'
      },
      {
        id: 'VD-0997',
        pickup: 'Camden',
        destination: 'Gatwick North',
        client: 'Leo Rivers',
        time: '16:40',
        pay: 99.0,
        notes: 'Conference luggage'
      }
    ],
    statementRows: [
      {
        date: '2025-10-03',
        ref: 'VD-1003',
        pickup: 'Banbury',
        dropoff: 'Gatwick North',
        vehicle: 'Saloon',
        miles: 40,
        wait: 12,
        fare: 110,
        status: 'Paid'
      },
      {
        date: '2025-10-06',
        ref: 'VD-1008',
        pickup: 'Guildford',
        dropoff: 'London Bridge',
        vehicle: 'SUV',
        miles: 28,
        wait: 5,
        fare: 69,
        status: 'Unpaid'
      },
      {
        date: '2025-10-09',
        ref: 'VD-1013',
        pickup: 'Hammersmith',
        dropoff: 'Heathrow T2',
        vehicle: 'Saloon',
        miles: 33,
        wait: 7,
        fare: 95,
        status: 'Paid'
      },
      {
        date: '2025-10-12',
        ref: 'VD-1014',
        pickup: 'Camberwell',
        dropoff: 'Southend',
        vehicle: 'MPV',
        miles: 58,
        wait: 11,
        fare: 165,
        status: 'Unpaid'
      }
    ]
  }
  ,
  {
    id: 'david',
    name: 'David C.',
    phone: '+44 7700 900345',
    email: 'david@velvetdrivers.co.uk',
    address: '12 Regents Place, London, NW1 7NT',
    license: 'PCO-60122',
    pcoExpiry: '2026-04-12',
    rating: '4.85 / 5',
    tenure: '3 yrs with Velvet',
    lastOnline: '03:05 UTC',
    cars: [
      {
        vrm: 'MJ21 KLM',
        make: 'Mercedes-Benz',
        model: 'V-Class',
        motExpiry: '2026-02-10',
        insuranceExpiry: '2025-12-15',
        phvExpiry: '2026-03-25',
        logbook: 'Uploaded',
        status: 'Active'
      }
    ],
    upcomingJobs: [
      {
        id: 'VD-1020',
        pickup: 'Heathrow T3',
        destination: 'City Airport',
        client: 'Maya Lane',
        time: '09:00',
        pay: 88.0,
        notes: 'Meet at Transit Lounge'
      }
    ],
    completedJobs: [
      {
        id: 'VD-1008',
        pickup: 'Shoreditch',
        destination: 'Gatwick North',
        client: 'Kofi Adebayo',
        time: '16:10',
        pay: 110.0,
        notes: 'Four passengers'
      }
    ],
    statementRows: [
      {
        date: '2025-10-02',
        ref: 'VD-1009',
        pickup: 'W9 3XB',
        dropoff: 'Heathrow T5',
        vehicle: 'V-Class',
        miles: 25,
        wait: 6,
        fare: 108,
        status: 'Paid'
      },
      {
        date: '2025-10-04',
        ref: 'VD-1015',
        pickup: 'E3 2PA',
        dropoff: 'London City',
        vehicle: 'V-Class',
        miles: 19,
        wait: 3,
        fare: 86,
        status: 'Unpaid'
      },
      {
        date: '2025-10-10',
        ref: 'VD-1016',
        pickup: 'TW1 3PU',
        dropoff: 'Heathrow T5',
        vehicle: 'V-Class',
        miles: 21,
        wait: 5,
        fare: 92,
        status: 'Paid'
      },
      {
        date: '2025-10-13',
        ref: 'VD-1019',
        pickup: 'W6 9JZ',
        dropoff: 'LHR T5',
        vehicle: 'V-Class',
        miles: 17,
        wait: 4,
        fare: 74,
        status: 'Unpaid'
      }
    ]
  }
];

const tabs = ['Details', 'Jobs', 'Car(s)', 'Monthly Statement'] as const;

const InfoItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
    <p className="text-xs uppercase tracking-wider text-amber-200/70">{label}</p>
    <p className="text-lg font-semibold text-white/90">{value}</p>
  </div>
);

const JobCard: React.FC<{ job: DriverJob }> = ({ job }) => (
  <div className="space-y-2 rounded-2xl border border-gray-800/80 bg-gray-900/60 p-4">
    <div className="flex flex-col gap-2">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-amber-300">{job.pickup}</h3>
          <p className="text-sm text-white/80">to {job.destination}</p>
        </div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">#{job.id}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-300">
        <span className="flex items-center gap-1">
          <Clock size={14} /> {job.time}
        </span>
        <span className="flex items-center gap-1">
          <User size={14} /> {job.client}
        </span>
        <span className="flex items-center gap-1">
          <DollarSign size={14} /> £{job.pay.toFixed(2)}
        </span>
      </div>
      <p className="text-sm text-gray-400">{job.notes}</p>
    </div>
  </div>
);

const CarCard: React.FC<{ car: DriverCar }> = ({ car }) => (
  <div className="space-y-3 rounded-2xl border border-gray-800/80 bg-gradient-to-br from-[#111111] to-black p-4">
    <div className="flex items-center gap-3">
      <Car className="text-amber-400" size={20} />
      <div>
        <p className="text-lg font-bold text-white">
          {car.make} {car.model}
        </p>
        <p className="text-sm text-gray-400">{car.vrm}</p>
      </div>
      <span className="ml-auto rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-200 border-amber-500/50">
        {car.status}
      </span>
    </div>
    <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
      <span>MOT: {car.motExpiry}</span>
      <span>Insurance: {car.insuranceExpiry}</span>
      <span>PHV: {car.phvExpiry}</span>
      <span>Logbook: {car.logbook}</span>
    </div>
  </div>
);

const downloadStatementCSV = (rows: StatementRow[]) => {
  const headers = ['Date', 'Ref', 'Pickup', 'Dropoff', 'Vehicle', 'Miles', 'Wait', 'Fare', 'Status'];
  const csvRows = [
    headers.join(','),
    ...rows.map((row) =>
      [
        row.date,
        row.ref,
        `"${row.pickup}"`,
        `"${row.dropoff}"`,
        row.vehicle,
        row.miles,
        row.wait,
        row.fare.toFixed(2),
        row.status
      ].join(',')
    )
  ];
  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'driver-statement.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const AdminDriversPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeTabs, setActiveTabs] = useState<Record<string, (typeof tabs)[number]>>({});
  const [rowStatuses, setRowStatuses] = useState<Record<string, Record<string, 'Paid' | 'Unpaid'>>>(() => {
    const initial: Record<string, Record<string, 'Paid' | 'Unpaid'>> = {};
    driverProfiles.forEach((driver) => {
      initial[driver.id] = {};
      driver.statementRows.forEach((row) => {
        initial[driver.id][row.ref] = row.status;
      });
    });
    return initial;
  });

  const getActiveTab = (driverId: string) => activeTabs[driverId] ?? tabs[0];
  const handleTabChange = (driverId: string, tab: (typeof tabs)[number]) => {
    setActiveTabs((prev) => ({ ...prev, [driverId]: tab }));
  };

  const filteredDrivers = useMemo(() => {
    if (!query.trim()) return driverProfiles;
    const searchTerm = query.toLowerCase();
    return driverProfiles.filter((driver) => {
      return (
        driver.name.toLowerCase().includes(searchTerm) ||
        driver.email.toLowerCase().includes(searchTerm) ||
        driver.id.toLowerCase().includes(searchTerm) ||
        driver.phone.toLowerCase().includes(searchTerm)
      );
    });
  }, [query]);

  const getRowStatus = (driverId: string, ref: string): 'Paid' | 'Unpaid' => {
    return rowStatuses[driverId]?.[ref] ?? 'Unpaid';
  };

  const toggleRowStatus = (driverId: string, ref: string) => {
    setRowStatuses((prev) => ({
      ...prev,
      [driverId]: {
        ...prev[driverId],
        [ref]: prev[driverId]?.[ref] === 'Paid' ? 'Unpaid' : 'Paid'
      }
    }));
  };

  const renderTabContent = (driver: DriverProfileData) => {
    const tab = getActiveTab(driver.id);
    switch (tab) {
      case 'Details':
        return (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <InfoItem label="Phone" value={driver.phone} />
            <InfoItem label="Email" value={driver.email} />
            <InfoItem label="Address" value={driver.address} />
            <InfoItem label="PCO Licence" value={driver.license} />
            <InfoItem label="PCO Expiry" value={driver.pcoExpiry} />
            <InfoItem label="Rating" value={driver.rating} />
            <InfoItem label="Tenure" value={driver.tenure} />
            <InfoItem label="Last online" value={driver.lastOnline} />
          </div>
        );
      case 'Jobs':
        return (
          <div className="space-y-6">
            {driver.upcomingJobs.length > 0 && (
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-amber-300">Upcoming Jobs</h3>
                  <p className="text-xs text-gray-400">{driver.upcomingJobs.length} pending</p>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {driver.upcomingJobs.map((job) => (
                    <JobCard job={job} key={job.id} />
                  ))}
                </div>
              </div>
            )}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-amber-300">Completed Jobs</h3>
                <p className="text-xs text-gray-400">{driver.completedJobs.length} logged</p>
              </div>
              {driver.completedJobs.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {driver.completedJobs.map((job) => (
                    <JobCard job={job} key={job.id} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">No completed jobs recorded.</p>
              )}
            </div>
          </div>
        );
      case 'Car(s)':
        return (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {driver.cars.map((car) => (
              <CarCard car={car} key={car.vrm} />
            ))}
          </div>
        );
      case 'Monthly Statement':
        const rowsWithStatus = driver.statementRows.map((row) => ({
          ...row,
          status: getRowStatus(driver.id, row.ref)
        }));
        return (
          <div className="space-y-4">
            <div className="overflow-x-auto rounded-2xl border border-amber-900/50 bg-gradient-to-br from-[#1E1212] via-[#100808] to-black p-4">
              <table className="w-full min-w-max text-left text-sm text-white/80">
                <thead>
                  <tr className="border-b border-amber-900/50 text-xs uppercase tracking-wider text-amber-300">
                    <th className="py-2 px-3">Date</th>
                    <th className="py-2 px-3">Ref</th>
                    <th className="py-2 px-3">Pickup</th>
                    <th className="py-2 px-3">Dropoff</th>
                    <th className="py-2 px-3">Vehicle</th>
                    <th className="py-2 px-3 text-right">Fare (£)</th>
                    <th className="py-2 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rowsWithStatus.map((row) => (
                    <tr key={row.ref} className="border-b border-white/5">
                      <td className="py-2 px-3 text-white/90">{row.date}</td>
                      <td className="py-2 px-3 text-white/90">{row.ref}</td>
                      <td className="py-2 px-3 text-white/90">{row.pickup}</td>
                      <td className="py-2 px-3 text-white/90">{row.dropoff}</td>
                      <td className="py-2 px-3 text-white/90">{row.vehicle}</td>
                      <td className="py-2 px-3 text-right text-amber-300 font-semibold">£{row.fare.toFixed(2)}</td>
                      <td className="py-2 px-3 text-right">
                        <button
                          type="button"
                          onClick={() => toggleRowStatus(driver.id, row.ref)}
                          className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full transition ${
                            row.status === 'Paid'
                              ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/40'
                              : 'bg-amber-500 text-black shadow-lg shadow-amber-500/40'
                          }`}
                        >
                          {row.status}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              type="button"
              onClick={() => downloadStatementCSV(rowsWithStatus)}
              className="w-max rounded-full border border-amber-500/60 bg-transparent px-6 py-2 text-sm font-semibold uppercase tracking-wide text-amber-300 transition hover:border-amber-400 hover:text-black hover:bg-amber-400"
            >
              Download CSV
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <PageShell mainClassName="flex flex-col px-4 sm:px-6 md:px-8 py-10" hideFooter hideHeader>
      <div className="w-full flex-grow">
        <div className="max-w-6xl mx-auto space-y-8">
          <AdminPageHeader active="drivers" />
          <section className="space-y-10">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <Search size={16} />
              </span>
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search drivers by name, email or ID..."
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-10 py-3 text-white placeholder-gray-500 focus:border-amber-400 focus:outline-none"
              />
            </div>
            {filteredDrivers.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-black/40 p-6 text-center text-gray-400">
                No drivers match your search. Try a different name or ID.
              </div>
            ) : (
              <>
                {filteredDrivers.map((driver) => (
                  <article
                    key={driver.id}
                    className="space-y-6 rounded-3xl border border-white/10 bg-black/60 p-6 shadow-lg shadow-black/60"
                  >
                    <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-amber-300/70">
                          Driver ID {driver.id.toUpperCase()}
                        </p>
                        <h2 className="text-2xl font-bold text-white">{driver.name}</h2>
                        <p className="text-sm text-gray-400">{driver.email}</p>
                      </div>
                      <div className="text-sm text-gray-300">
                        <p>Phone: {driver.phone}</p>
                        <p>PCO Expiry: {driver.pcoExpiry}</p>
                      </div>
                    </header>
                    <nav className="flex flex-nowrap items-center gap-2 overflow-x-auto pb-2">
                      {tabs.map((tab) => (
                        <button
                          key={tab}
                          type="button"
                          onClick={() => handleTabChange(driver.id, tab)}
                          className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-colors whitespace-nowrap ${
                            getActiveTab(driver.id) === tab
                              ? "bg-amber-400 text-black shadow-md shadow-amber-400/30"
                              : "bg-gray-800/40 text-amber-300 hover:bg-gray-700/40"
                          }`}
                        >
                          {tab}
                          {tab === "Jobs" && driver.upcomingJobs.length > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[11px] font-bold text-white">
                              {driver.upcomingJobs.length}
                            </span>
                          )}
                        </button>
                      ))}
                    </nav>
                    <div>{renderTabContent(driver)}</div>
                  </article>
                ))}
              </>
            )}
          </section>
        </div>
      </div>
    </PageShell>
  );
};

export default AdminDriversPage;
