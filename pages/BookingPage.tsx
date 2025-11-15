
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import BookingInput from '../components/BookingInput';
import BookingSelect from '../components/BookingSelect';
import BookingTextArea from '../components/BookingTextArea';
import { PlusCircle, XCircle, Calendar, Clock } from 'lucide-react';
import { useBookings } from '../App';
import type { Booking } from '../types';


const BookingPage: React.FC = () => {
    const navigate = useNavigate();
    const { addBooking } = useBookings();

    const [pickup, setPickup] = useState('');
    const [dropOffs, setDropOffs] = useState(['']);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [availability, setAvailability] = useState('Saloon');
    const [vehicle, setVehicle] = useState('Available');
    const [passengers, setPassengers] = useState('1');
    const [suitcases, setSuitcases] = useState('0');
    const [waiting, setWaiting] = useState('0');
    const [miles, setMiles] = useState('10');
    const [passengerName, setPassengerName] = useState('');
    const [passengerEmail, setPassengerEmail] = useState('');
    const [passengerPhone, setPassengerPhone] = useState('');
    const [notes, setNotes] = useState('');

    const handleAddStop = () => {
        setDropOffs([...dropOffs, '']);
    };

    const handleRemoveStop = (index: number) => {
        if (dropOffs.length > 1) {
            const newDropOffs = dropOffs.filter((_, i) => i !== index);
            setDropOffs(newDropOffs);
        }
    };

    const handleDropOffChange = (index: number, value: string) => {
        const newDropOffs = [...dropOffs];
        newDropOffs[index] = value;
        setDropOffs(newDropOffs);
    };
    
    const handleSubmitBooking = (e: React.FormEvent) => {
        e.preventDefault();
        const bookingData: Omit<Booking, 'id' | 'status'> = {
            pickup,
            dropOffs,
            date,
            time,
            availability,
            vehicle,
            passengers,
            suitcases,
            waiting,
            miles,
            passengerName,
            passengerEmail,
            passengerPhone,
            notes
        };
        addBooking(bookingData);
        alert('Booking submitted! An operator will call you shortly to confirm.');
        navigate('/');
    };

    return (
        <div className="min-h-screen w-full bg-black text-white flex flex-col p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-950/60 via-black to-black opacity-90"></div>
            <div className="absolute top-10 left-10">
                <Link to="/" className="z-10 opacity-70 hover:opacity-100 transition-opacity">
                    <img src="/assets/logo.png" alt="Velvet Drivers Logo" className="w-[180px] h-auto" />
                </Link>
            </div>

            <main className="flex-grow flex items-center justify-center py-24">
                <form onSubmit={handleSubmitBooking} className="relative z-10 w-full max-w-3xl bg-[#1c1010]/80 border border-amber-900/50 rounded-2xl shadow-2xl shadow-red-950/50 backdrop-blur-lg p-8 space-y-8">
                    
                    {/* Journey Details Section */}
                    <div>
                        <h2 className="text-3xl font-bold font-display text-amber-400 mb-2">Book a Journey</h2>
                        <p className="text-sm text-gray-400 mb-6">No account needed — log in to manage bookings later.</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            <div className="md:col-span-2">
                                <BookingInput label="Pickup" id="pickup" placeholder="Address or postcode" value={pickup} onChange={e => setPickup(e.target.value)} required />
                            </div>
                            <div className="md:col-span-2 space-y-3">
                                {dropOffs.map((stop, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="flex-grow">
                                            <BookingInput 
                                                label={index === 0 ? "Drop-off" : `Stop ${index + 1}`}
                                                id={`dropoff-${index}`} 
                                                value={stop}
                                                onChange={(e) => handleDropOffChange(index, e.target.value)}
                                                placeholder="Address or postcode"
                                                required
                                            />
                                        </div>
                                        {index > 0 && (
                                            <button type="button" onClick={() => handleRemoveStop(index)} className="mt-5 text-red-500 hover:text-red-400 transition-colors">
                                                <XCircle size={24} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button type="button" onClick={handleAddStop} className="flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors pt-1">
                                    <PlusCircle size={18} /> Add another stop
                                 </button>
                            </div>

                            <BookingInput label="Date" id="date" type="text" onFocus={(e) => (e.target.type = 'date')} onBlur={(e) => (e.target.type = 'text')} placeholder="dd/mm/yyyy" icon={<Calendar size={20} className="text-gray-400" />} value={date} onChange={e => setDate(e.target.value)} required />
                            <BookingInput label="Time" id="time" type="text" onFocus={(e) => (e.target.type = 'time')} onBlur={(e) => (e.target.type = 'text')} placeholder="--:--" icon={<Clock size={20} className="text-gray-400" />} value={time} onChange={e => setTime(e.target.value)} required />
                            <BookingSelect label="Availability Slot" id="availability" value={availability} onChange={e => setAvailability(e.target.value)}>
                                <option>Available</option>
                                <option>Flexible</option>
                            </BookingSelect>
                             <BookingSelect label="Vehicle" id="vehicle" value={vehicle} onChange={e => setVehicle(e.target.value)}>
                                <option>Saloon</option>
                                <option>Estate</option>
                                <option>MPV</option>
                                <option>Executive</option>
                            </BookingSelect>
                            <BookingInput label="Passengers" id="passengers" type="number" value={passengers} onChange={e => setPassengers(e.target.value)} />
                            <BookingInput label="Suitcases" id="suitcases" type="number" value={suitcases} onChange={e => setSuitcases(e.target.value)} />
                            <BookingInput label="Waiting (Minutes)" id="waiting" type="number" value={waiting} onChange={e => setWaiting(e.target.value)} />
                            <BookingInput label="Miles" id="miles" type="number" value={miles} onChange={e => setMiles(e.target.value)} />
                        </div>
                    </div>

                    {/* Fare Estimate Section */}
                    <div className="bg-[#2a1a1a]/50 border border-amber-900/40 rounded-lg p-4">
                        <p className="text-sm text-amber-200/80">Live fare estimate</p>
                        <p className="text-4xl font-bold text-amber-400 my-1">£47</p>
                        <p className="text-xs text-gray-400">Includes base fare, mileage, additional passengers, luggage, and waiting time.</p>
                    </div>

                    {/* Passenger Details Section */}
                    <div>
                         <h2 className="text-3xl font-bold font-display text-amber-400 mb-6">Passenger Details</h2>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
                             <div className="md:col-span-1">
                                <BookingInput label="Name" id="name" value={passengerName} onChange={e => setPassengerName(e.target.value)} required />
                             </div>
                              <div className="md:col-span-1">
                                <BookingInput label="Email" id="email" type="email" value={passengerEmail} onChange={e => setPassengerEmail(e.target.value)} required />
                             </div>
                              <div className="md:col-span-1">
                                <BookingInput label="Phone" id="phone" type="tel" value={passengerPhone} onChange={e => setPassengerPhone(e.target.value)} required />
                             </div>
                             <div className="md:col-span-3">
                                 <BookingTextArea label="Notes for the driver" id="notes" placeholder="Flight number, child seats, meet and greet requirements" value={notes} onChange={e => setNotes(e.target.value)} />
                             </div>
                         </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-start gap-4 pt-4 border-t border-amber-900/50">
                        <button type="submit" className="w-full sm:w-auto px-8 py-3 font-semibold bg-amber-500 text-black rounded-lg hover:bg-amber-400 transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(251,191,36,0.5)]">
                            Confirm Booking
                        </button>
                         <button type="button" className="w-full sm:w-auto px-8 py-3 font-semibold bg-transparent border-2 border-amber-600 text-amber-400 rounded-lg hover:bg-amber-900/50 transition-colors">
                            Save Quote
                        </button>
                         <button 
                            type="button"
                            onClick={() => navigate('/client/signup')}
                            className="w-full sm:w-auto px-8 py-3 font-semibold bg-transparent border-2 border-amber-600 text-amber-400 rounded-lg hover:bg-amber-900/50 transition-colors">
                            Create Account
                        </button>
                    </div>
                </form>
            </main>
            <Footer />
        </div>
    );
};

export default BookingPage;
