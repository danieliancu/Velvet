
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { useAlert } from '../components/AlertProvider';
import { Clock, User, DollarSign, Car } from 'lucide-react';
import PageShell from '../components/PageShell';
import DashboardInput from '../components/DashboardInput';

const mockJobs = [
    { id: 'j1', client: 'Alice Wonderland', time: '14:30', pickup: 'Heathrow T5', destination: 'The Ritz Hotel', pay: 75.00 },
    { id: 'j2', client: 'Bob Builder', time: '18:00', pickup: 'Canary Wharf', destination: 'Gatwick North', pay: 90.00 },
];

const mockCompletedJobs = [
    { id: 'c1', client: 'Charlie Chaplin', time: '2023-10-28 10:00', pickup: 'The Savoy', destination: 'Heathrow T2', pay: 80.00 },
    { id: 'c2', client: 'Diana Prince', time: '2023-10-25 15:00', pickup: 'Buckingham Palace', destination: 'Windsor Castle', pay: 120.00 },
    { id: 'c3', client: 'Peter Parker', time: '2023-10-22 09:00', pickup: 'Daily Bugle', destination: 'Stark Tower', pay: 55.00 },
];

const mockStatementData = [
    { date: '2025-09-01', ref: 'VD-1001', pickup: 'WD3 4PQ', dropoff: 'Heathrow T5', vehicle: 'Saloon', miles: 18, wait: 10, fare: 64.00 },
    { date: '2025-09-03', ref: 'VD-1002', pickup: 'HA4 0HJ', dropoff: 'LHR T3', vehicle: 'MPV', miles: 12, wait: 0, fare: 52.50 },
];

const mockCars = [
    {
        id: 'car-1',
        vrm: 'LC20 ABC',
        make: 'Mercedes-Benz',
        model: 'S-Class',
        motExpiry: '2025-10-15',
        insuranceExpiry: '2025-08-31',
        phvExpiry: '2025-09-20',
        logbookStatus: 'Uploaded',
    },
    {
        id: 'car-2',
        vrm: 'BD68 XYZ',
        make: 'BMW',
        model: '7 Series',
        motExpiry: '2026-01-22',
        insuranceExpiry: '2025-12-01',
        phvExpiry: '2026-01-10',
        logbookStatus: 'Uploaded',
    }
];

const actionButtonClass = (isSaving: boolean) =>
  `px-10 py-2.5 font-semibold rounded-lg transition-colors ${
    isSaving ? 'bg-green-600 text-white hover:bg-green-500' : 'bg-amber-500 text-black hover:bg-amber-400'
  }`;
const uploadButtonClass = "cursor-pointer bg-amber-500 text-black px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-amber-400 transition-colors";

const DriverJobs: React.FC = () => (
    <div>
        <h2 className="text-2xl font-semibold mb-4">Tomorrow's Jobs</h2>
        {mockJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockJobs.map(job => (
                <div key={job.id} className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 space-y-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-xl font-bold text-amber-400">{job.pickup}</h3>
                            <p className="text-lg text-white">to {job.destination}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold flex items-center gap-2"><Clock size={20} /> {job.time}</p>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 pt-4 space-y-2">
                    <p className="flex items-center gap-2 text-gray-300"><User size={16} /> Client: {job.client}</p>
                    <p className="flex items-center gap-2 text-gray-300"><DollarSign size={16} /> Est. Pay: £{job.pay.toFixed(2)}</p>
                    </div>
                    <div className="flex gap-4 pt-2">
                        <button className="flex-1 px-4 py-2 bg-green-600/80 hover:bg-green-600 rounded-md transition-colors">Accept</button>
                        <button className="flex-1 px-4 py-2 bg-red-600/80 hover:bg-red-600 rounded-md transition-colors">Decline</button>
                    </div>
                </div>
            ))}
        </div>
        ) : (
        <div className="text-center py-16 bg-gray-900/50 border border-gray-800 rounded-lg">
            <p className="text-gray-400">No new jobs available at the moment.</p>
        </div>
        )}

        <h2 className="text-2xl font-semibold mt-12 mb-4">Completed Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockCompletedJobs.map(job => (
                <div key={job.id} className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 space-y-4 opacity-70">
                    <div className="flex flex-col md:flex-row md:justify-between items-start gap-2">
                        <div>
                            <h3 className="text-xl font-bold text-amber-400/80">{job.pickup}</h3>
                            <p className="text-lg text-white/80">to {job.destination}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-semibold flex items-center gap-2 text-gray-400"><Clock size={16} /> {job.time}</p>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 pt-4 space-y-2">
                    <p className="flex items-center gap-2 text-gray-400"><User size={16} /> Client: {job.client}</p>
                    <p className="flex items-center gap-2 text-gray-400"><DollarSign size={16} /> Pay: £{job.pay.toFixed(2)}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
  
const StatusPill: React.FC<{ text: string }> = ({ text }) => (
  <span className="text-[11px] font-semibold rounded-full bg-emerald-600 px-3 py-0.5 text-white">
    {text}
  </span>
);

const NewUploadButton: React.FC<{ htmlFor: string }> = ({ htmlFor }) => (
  <label
    htmlFor={htmlFor}
    className="rounded-full border border-amber-500 bg-amber-500 px-4 py-1 text-xs font-semibold text-black uppercase transition hover:bg-amber-400 cursor-pointer"
  >
    New Upload
  </label>
);

const UploadStatusItem: React.FC<{ label: string }> = ({ label }) => {
  const id = `upload-${label.toLowerCase().replace(/[^a-z0-9]+/gi, '-')}`;
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3 border-b border-amber-900/40">
      <span className="text-white/90 text-sm">{label}</span>
      <div className="flex items-center gap-3">
        <StatusPill text="Uploaded" />
        <NewUploadButton htmlFor={id} />
        <input id={id} type="file" className="hidden" />
      </div>
    </div>
  );
};
  
const initialDriverDetails = {
  firstName: 'Daniel',
  lastName: 'Iancu',
  email: 'daniel@velvetdrivers.co.uk',
  phone: '+44 7700 112233',
  drivingLicense: 'D1234567',
  address: '25 Green Park, London',
  pcoLicenceNo: 'PCO-908172',
  pcoExpiry: '2026-10-15'
};

const DriverProfile = () => {
  const [detailsEditable, setDetailsEditable] = useState(false);
  const [details, setDetails] = useState(initialDriverDetails);

  const handleDetailChange = (field: keyof typeof initialDriverDetails) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetails((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const toggleDetailsEdit = () => {
    setDetailsEditable((prev) => !prev);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
      <div className="xl:col-span-3 bg-gradient-to-br from-[#1E1212] via-[#100808] to-black border border-amber-900/50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold font-display text-amber-400 mb-6">Your Details</h2>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DashboardInput
            id="first-name"
            label="First Name"
            type="text"
            value={details.firstName}
            readOnly={!detailsEditable}
            onChange={handleDetailChange('firstName')}
          />
          <DashboardInput
            id="last-name"
            label="Last Name"
            type="text"
            value={details.lastName}
            readOnly={!detailsEditable}
            onChange={handleDetailChange('lastName')}
          />
          <DashboardInput
            id="email"
            label="Email"
            type="email"
            value={details.email}
            readOnly={!detailsEditable}
            onChange={handleDetailChange('email')}
          />
          <DashboardInput
            id="phone"
            label="Phone"
            type="tel"
            value={details.phone}
            readOnly={!detailsEditable}
            onChange={handleDetailChange('phone')}
          />
          <div className="sm:col-span-2">
            <DashboardInput
              id="driving-license"
              label="Driving License"
              type="text"
              value={details.drivingLicense}
              readOnly={!detailsEditable}
              onChange={handleDetailChange('drivingLicense')}
            />
          </div>
          <div className="sm:col-span-2">
            <DashboardInput
              id="address"
              label="Address"
              type="text"
              value={details.address}
              readOnly={!detailsEditable}
              onChange={handleDetailChange('address')}
            />
          </div>
          <DashboardInput
            id="pco-licence-no"
            label="PCO Licence No"
            type="text"
            value={details.pcoLicenceNo}
            readOnly={!detailsEditable}
            onChange={handleDetailChange('pcoLicenceNo')}
          />
          <DashboardInput
            id="pco-expiry"
            label="PCO Expiry"
            type="date"
            value={details.pcoExpiry}
            readOnly={!detailsEditable}
            onChange={handleDetailChange('pcoExpiry')}
          />
          <div className="sm:col-span-2 mt-2 flex justify-start">
            <button
              type="button"
              onClick={toggleDetailsEdit}
              className={actionButtonClass(detailsEditable)}
            >
              {detailsEditable ? 'Save' : 'Edit'}
            </button>
          </div>
        </form>
      </div>

      <div className="xl:col-span-2 bg-gradient-to-br from-[#1E1212] via-[#100808] to-black border border-amber-900/50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold font-display text-amber-400 mb-6">Upload Documents</h2>
        <div className="space-y-1">
          <UploadStatusItem label="PCO Licence No" />
          <UploadStatusItem label="Driving License front" />
          <UploadStatusItem label="Driving License back side" />
        </div>
        <p className="text-xs text-amber-200/60 mt-6">
          We store all documents securely. Reminders are sent before expiry.
        </p>
      </div>
    </div>
  );
};

const MonthlyStatement: React.FC = () => {
    const handleDownloadCSV = () => {
        const headers = ['Date', 'Ref', 'Pickup', 'Dropoff', 'Vehicle', 'Miles', 'Wait', 'Fare (£)'];
        const csvRows = [
            headers.join(','),
            ...mockStatementData.map(row => 
                [
                    row.date,
                    row.ref,
                    `"${row.pickup}"`,
                    `"${row.dropoff}"`,
                    row.vehicle,
                    row.miles,
                    row.wait,
                    row.fare.toFixed(2)
                ].join(',')
            )
        ];
        
        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'monthly-statement.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="bg-gradient-to-br from-[#1E1212] via-[#100808] to-black border border-amber-900/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold font-display text-amber-400 mb-2">Monthly Statement</h2>
            <p className="text-sm text-amber-200/60 mb-8">Export bookings and earnings</p>
            
            <div className="overflow-x-auto">
                <table className="w-full min-w-max text-left">
                    <thead>
                        <tr className="border-b-2 border-amber-900/50">
                            <th className="p-3 text-sm font-semibold text-amber-400 uppercase tracking-wider">Date</th>
                            <th className="p-3 text-sm font-semibold text-amber-400 uppercase tracking-wider">Ref</th>
                            <th className="p-3 text-sm font-semibold text-amber-400 uppercase tracking-wider">Pickup</th>
                            <th className="p-3 text-sm font-semibold text-amber-400 uppercase tracking-wider">Dropoff</th>
                            <th className="p-3 text-sm font-semibold text-amber-400 uppercase tracking-wider">Vehicle</th>
                            <th className="p-3 text-sm font-semibold text-amber-400 uppercase tracking-wider">Miles</th>
                            <th className="p-3 text-sm font-semibold text-amber-400 uppercase tracking-wider">Wait</th>
                            <th className="p-3 text-sm font-semibold text-amber-400 uppercase tracking-wider text-right">Fare (£)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockStatementData.map((row, index) => (
                            <tr key={row.ref} className="border-b border-amber-900/40">
                                <td className="p-3 text-white/90">{row.date}</td>
                                <td className="p-3 text-white/90">{row.ref}</td>
                                <td className="p-3 text-white/90">{row.pickup}</td>
                                <td className="p-3 text-white/90">{row.dropoff}</td>
                                <td className="p-3 text-white/90">{row.vehicle}</td>
                                <td className="p-3 text-white/90">{row.miles}</td>
                                <td className="p-3 text-white/90">{row.wait}</td>
                                <td className="p-3 text-amber-400 font-semibold text-right">£{row.fare.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-8">
                <button 
                    onClick={handleDownloadCSV}
                    className="px-10 py-2.5 font-semibold bg-transparent border-2 border-amber-500 text-amber-400 rounded-lg hover:bg-amber-500 hover:text-black transition-colors"
                >
                    Download CSV
                </button>
            </div>
        </div>
    );
};

const UploadItemWithExpiry: React.FC<{ label: string }> = ({ label }) => {
    const id = label.toLowerCase().replace(/ /g, '-');
    return (
        <div className="flex flex-col sm:flex-row justify-between py-2 border-b border-amber-900/40 gap-2">
            <span className="text-white/90 text-sm flex-grow">{label}</span>
            <div className="flex items-center gap-2">
                <span style={{ fontSize:"12px" }}>Expiring:</span> 
                <input type="date" className="bg-gray-100/90 border border-amber-900/60 rounded-md px-2 py-1 text-xs text-black w-32" />
                 <label htmlFor={id} className="cursor-pointer bg-amber-500 text-black px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-amber-400 transition-colors">
                    Upload
                </label>
                <input type="file" id={id} className="hidden" />
            </div>
        </div>
    );
}

const AddCarUploadItem: React.FC<{ label: string; showExpiry?: boolean }> = ({ label, showExpiry = true }) => {
    const id = `add-car-${label.toLowerCase().replace(/ /g, '-')}`;
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3 border-b border-amber-900/40">
            <span className="text-white/90 text-sm">{label}</span>
            <div className="flex items-center gap-3">
                {showExpiry && (
                    <>
                        <span className="text-xs text-white/80 uppercase tracking-[0.3em]">Expiring:</span>
                        <input
                            type="date"
                            className="add-car-date bg-white border border-amber-900/60 rounded-md px-3 py-1 text-xs text-black w-32"
                        />
                    </>
                )}
                <label htmlFor={id} className="cursor-pointer bg-amber-500 text-black px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-amber-400 transition-colors">
                    Upload
                </label>
                <input type="file" id={id} className="hidden" />
            </div>
        </div>
    );
}

const CarsPage: React.FC = () => {
    const [vrm, setVrm] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const { showAlert } = useAlert();
    const [cars, setCars] = useState(mockCars);
    const [carEditing, setCarEditing] = useState<Record<string, boolean>>(() =>
        mockCars.reduce((acc, car) => ({ ...acc, [car.id]: false }), {})
    );

    const toggleCarEdit = (carId: string) => {
        setCarEditing(prev => ({ ...prev, [carId]: !prev[carId] }));
    };

    const handleCarChange = (carId: string, field: keyof typeof mockCars[number]) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setCars(prev => prev.map(car => (car.id === carId ? { ...car, [field]: value } : car)));
    };

    const handleFindVehicle = () => {
        // TODO: Integrate with DVLA API
        // For now, we'll mock the response
        if (vrm.toUpperCase().startsWith('LC20')) {
            setMake('Mercedes-Benz');
            setModel('S-Class');
        } else if (vrm.toUpperCase().startsWith('BD68')) {
            setMake('BMW');
            setModel('7 Series');
          } else {
            showAlert('Vehicle not found. Please check the VRM and try again.');
          }
    }
    
    return (
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
            <div className="xl:col-span-3 bg-gradient-to-br from-[#1E1212] via-[#100808] to-black border border-amber-900/50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold font-display text-amber-400 mb-6">My Car(s)</h2>
                 <div className="space-y-6">
                      {cars.map(car => {
                          const editing = !!carEditing[car.id];
                          return (
                          <div key={car.id} className="border-b-2 border-amber-900/50 pb-6 last:border-b-0 last:pb-0">
                                  <div className="flex items-center justify-between gap-3 mb-3">
                                      <div className="flex items-center gap-4">
                                          <Car className="text-amber-400" size={24} />
                                          <h3 className="text-xl font-bold text-amber-400">{car.make} {car.model}</h3>
                                      </div>
                                      <button
                                          type="button"
                                          onClick={() => toggleCarEdit(car.id)}
                                      className={actionButtonClass(editing)}
                                  >
                                      {editing ? 'Save' : 'Edit'}
                                  </button>
                                  </div>
                             <div className="space-y-1 pl-10">
                                  <DashboardInput
                                      id={`${car.id}-vrm`}
                                     label="Vehicle Reg (VRM)"
                                     type="text"
                                     value={car.vrm}
                                     readOnly={!editing}
                                      onChange={handleCarChange(car.id, 'vrm')}
                                 />
                                  <div className="flex items-end gap-3">
                                      <div className="flex-1">
                                          <DashboardInput
                                              id={`${car.id}-mot`}
                                             label="MOT Expiry"
                                             type="date"
                                             value={car.motExpiry}
                                             readOnly={!editing}
                                              onChange={handleCarChange(car.id, 'motExpiry')}
                                         />
                                      </div>
                                      {editing && (
                                          <div className="pb-1">
                                              <label htmlFor={`${car.id}-mot-upload`} className={uploadButtonClass}>
                                                  Upload
                                              </label>
                                              <input type="file" id={`${car.id}-mot-upload`} className="hidden" />
                                          </div>
                                      )}
                                  </div>
                                  <div className="flex items-end gap-3">
                                      <div className="flex-1">
                                          <DashboardInput
                                              id={`${car.id}-insurance`}
                                             label="Insurance Expiry"
                                             type="date"
                                             value={car.insuranceExpiry}
                                             readOnly={!editing}
                                              onChange={handleCarChange(car.id, 'insuranceExpiry')}
                                         />
                                      </div>
                                      {editing && (
                                          <div className="pb-1">
                                              <label htmlFor={`${car.id}-insurance-upload`} className={uploadButtonClass}>
                                                  Upload
                                              </label>
                                              <input type="file" id={`${car.id}-insurance-upload`} className="hidden" />
                                          </div>
                                      )}
                                  </div>
                                  <div className="flex items-end gap-3">
                                      <div className="flex-1">
                                          <DashboardInput
                                              id={`${car.id}-phv`}
                                             label="PHV Car License Expiry"
                                             type="date"
                                             value={car.phvExpiry}
                                             readOnly={!editing}
                                              onChange={handleCarChange(car.id, 'phvExpiry')}
                                         />
                                      </div>
                                      {editing && (
                                          <div className="pb-1">
                                              <label htmlFor={`${car.id}-phv-upload`} className={uploadButtonClass}>
                                                  Upload
                                              </label>
                                              <input type="file" id={`${car.id}-phv-upload`} className="hidden" />
                                          </div>
                                      )}
                                  </div>
                                  <div className="flex items-center justify-between py-2 gap-3">
                                      <span className="text-white/90 text-sm">Logbook V5a</span>
                                      <div className="flex items-center gap-3">
                                          <span className="text-[11px] font-semibold rounded-full bg-emerald-600 px-3 py-0.5 text-white">{car.logbookStatus}</span>

                                          <input id={`${car.vrm}-logbook`} type="file" className="hidden" />
                                      </div>
                                  </div>
                             </div>
                         </div>
                         );
                     })}
                 </div>
            </div>

            <div className="xl:col-span-2 bg-gradient-to-br from-[#1E1212] via-[#100808] to-black border border-amber-900/50 rounded-2xl p-8">
                 <h2 className="text-2xl font-bold font-display text-amber-400 mb-6">Add New Car</h2>
                 <form className="space-y-4">
                    <div>
                        <label htmlFor="vrm" className="block text-xs font-semibold text-amber-200/70 uppercase tracking-wider mb-2">Vehicle Reg (VRM)</label>
                        <div className="flex gap-2">
                            <input id="vrm" type="text" value={vrm} onChange={(e) => setVrm(e.target.value)} className="flex-grow w-full bg-black/40 border border-amber-900/60 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500" />
                            <button type="button" onClick={handleFindVehicle} className="px-4 py-2 font-semibold bg-amber-600 text-black rounded-lg hover:bg-amber-500 transition-colors text-sm">Find</button>
                        </div>
                        <p className="text-xs text-amber-200/60 mt-1">Link to DVLA API to find Make and Model.</p>
                    </div>
                    
                    <DashboardInput id="make" label="Make" type="text" value={make} readOnly />
                    <DashboardInput id="model" label="Model" type="text" value={model} readOnly />

                    <div className="pt-2">
                        <AddCarUploadItem label="MOT" />
                        <AddCarUploadItem label="Insurance" />
                        <AddCarUploadItem label="PHV Car License" />
                        <AddCarUploadItem label="Logbook V5" showExpiry={false} />
                    </div>
                    
                    <div className="pt-4 flex justify-start">
                        <button type="submit" className="px-10 py-2.5 font-semibold bg-amber-500 text-black rounded-lg hover:bg-amber-400 transition-colors">
                            Save New Car
                        </button>
                    </div>
                 </form>
            </div>
        </div>
    );
};


const DriverDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = ['Dashboard', 'Jobs', 'Car(s)', 'Monthly Statement'];

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <DriverProfile />;
      case 'Jobs':
        return <DriverJobs />;
      case 'Car(s)':
        return <CarsPage />;
      case 'Monthly Statement':
        return <MonthlyStatement />;
      default:
        return <DriverProfile />;
    }
  };
  
  return (
    <PageShell mainClassName="flex flex-col px-4 sm:px-6 md:px-8 py-10">
      <div className="w-full flex-grow">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <div className="flex flex-wrap justify-between items-center gap-4 pb-4 border-b border-gray-800">
              <div>
                <h1 className="text-3xl font-bold font-display text-amber-400">Driver Dashboard</h1>
                <p className="text-gray-400">Welcome back, {user?.name}</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 font-semibold bg-transparent border border-amber-400 text-amber-400 rounded-md hover:bg-amber-400 hover:text-black transition-colors"
              >
                Logout
              </button>
            </div>
            <nav className="mt-6 flex items-center space-x-2 overflow-x-auto pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-4 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                      : 'bg-gray-800/50 text-amber-300 hover:bg-gray-700/50'
                  }`}
                >
                  {tab}
                  {tab === 'Jobs' && mockJobs.length > 0 && (
                    <span className="absolute -top-0 -right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                      {mockJobs.length}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </header>

          <main>{renderContent()}</main>
        </div>
      </div>
    </PageShell>
  );
};

export default DriverDashboardPage;
