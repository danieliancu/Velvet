
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageShell from '../components/PageShell';
import BookingInput from '../components/BookingInput';
import BookingSelect from '../components/BookingSelect';
import BookingTextArea from '../components/BookingTextArea';
import { PlusCircle, XCircle, Calendar, Clock } from 'lucide-react';
import { useBookings } from '../App';
import { useAlert } from '../components/AlertProvider';
import type { Booking } from '../types';


const BookingPage: React.FC = () => {
    const navigate = useNavigate();
    const { addBooking } = useBookings();

    const [pickup, setPickup] = useState('');
    const [dropOffs, setDropOffs] = useState(['']);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [vehicle, setVehicle] = useState('Luxury MPV');
    const [serviceType, setServiceType] = useState('Transfer');
    const [passengers, setPassengers] = useState('1');
    const [smallSuitcases, setSmallSuitcases] = useState('0');
    const [largeSuitcases, setLargeSuitcases] = useState('0');
    const [waiting, setWaiting] = useState('0');
    const [miles, setMiles] = useState('');
    const [pickupLatLng, setPickupLatLng] = useState<{ lat: number; lng: number } | null>(null);
    const [dropOffLatLng, setDropOffLatLng] = useState<{ lat: number; lng: number } | null>(null);
    const [stopCoords, setStopCoords] = useState<Array<{ lat: number; lng: number } | null>>([null]);
    const googleLoadPromise = useRef<Promise<void> | null>(null);
    const pickupInputRef = useRef<HTMLInputElement | null>(null);
    const dropoffInputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const dropoffAutocompleteRefs = useRef<any[]>([]);
    const distanceServiceRef = useRef<any>(null);
    const [passengerName, setPassengerName] = useState('');
    const [passengerEmail, setPassengerEmail] = useState('');
    const [passengerPhone, setPassengerPhone] = useState('');
    const [specialEvents, setSpecialEvents] = useState('');
    const [notes, setNotes] = useState('');

    const passengersCount = Math.max(0, Number(passengers) || 0);
    const smallSuitcasesCount = Math.max(0, Number(smallSuitcases) || 0);
    const largeSuitcasesCount = Math.max(0, Number(largeSuitcases) || 0);
    const waitingMinutes = Math.max(0, Number(waiting) || 0);

    const withinLuxuryExecLuggage = () => {
        const largeOk = largeSuitcasesCount <= 2;
        const smallOk = smallSuitcasesCount <= 2;
        const altComboOk = largeSuitcasesCount <= 1 && smallSuitcasesCount <= 4;
        return (largeOk && smallOk) || altComboOk;
    };

    const luxuryAllowed = passengersCount <= 4 && withinLuxuryExecLuggage();
    const executiveAllowed = passengersCount <= 4 && withinLuxuryExecLuggage();
    const luxuryMpvAllowed = passengersCount <= 7;

    const loadGoogleMaps = () => {
        if ((window as any).google?.maps?.places) {
            return Promise.resolve();
        }
        if (googleLoadPromise.current) {
            return googleLoadPromise.current;
        }
        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
        if (!apiKey) {
            console.warn('Missing VITE_GOOGLE_MAPS_API_KEY');
            return Promise.resolve();
        }
        googleLoadPromise.current = new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
            script.async = true;
            script.onload = () => resolve();
            script.onerror = (err) => reject(err);
            document.head.appendChild(script);
        });
        return googleLoadPromise.current;
    };

    const attachAutocomplete = () => {
        const maps = (window as any).google?.maps;
        if (!maps?.places || !pickupInputRef.current) return;
        distanceServiceRef.current = new maps.DistanceMatrixService();
        const opts = { fields: ['formatted_address', 'geometry'], types: ['geocode'], componentRestrictions: { country: ['gb'] } } as any;

        const pickupAuto = new maps.places.Autocomplete(pickupInputRef.current, opts);
        pickupAuto.addListener('place_changed', () => {
            const place = pickupAuto.getPlace();
            if (place?.formatted_address) setPickup(place.formatted_address);
            if (place?.geometry?.location) {
                setPickupLatLng({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() });
            }
        });

        dropoffAutocompleteRefs.current.forEach((auto) => maps.event.clearInstanceListeners(auto));
        dropoffAutocompleteRefs.current = [];

        dropoffInputRefs.current.forEach((input, index) => {
            if (!input) return;
            const dropAuto = new maps.places.Autocomplete(input, opts);
            dropAuto.addListener('place_changed', () => {
                const place = dropAuto.getPlace();
                if (place?.formatted_address) handleDropOffChange(index, place.formatted_address);
                if (place?.geometry?.location) {
                    const coords = [...stopCoords];
                    coords[index] = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
                    setStopCoords(coords);
                    if (index === 0) {
                        setDropOffLatLng({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() });
                    }
                }
            });
            dropoffAutocompleteRefs.current.push(dropAuto);
        });
    };

    useEffect(() => {
        loadGoogleMaps()
            .then(() => attachAutocomplete())
            .catch((err) => console.error('Failed to load Google Maps', err));
        // Re-attach when count changes so new stops get autocomplete
    }, [dropOffs.length]);

    useEffect(() => {
        const maps = (window as any).google?.maps;
        if (!maps || !distanceServiceRef.current) return;
        const waypoints = [pickup.trim(), ...dropOffs.map((d) => d.trim())].filter(Boolean);
        if (waypoints.length < 2) {
            setMiles('');
            return;
        }

        const getLegDistance = (origin: any, destination: any) =>
            new Promise<number | null>((resolve) => {
                distanceServiceRef.current.getDistanceMatrix(
                    {
                        origins: [origin],
                        destinations: [destination],
                        travelMode: maps.TravelMode.DRIVING,
                    },
                    (response: any, status: string) => {
                        if (status !== 'OK') return resolve(null);
                        const meters = response?.rows?.[0]?.elements?.[0]?.distance?.value;
                        resolve(typeof meters === 'number' ? meters : null);
                    }
                );
            });

        let isCancelled = false;
        (async () => {
            let totalMeters = 0;
            for (let i = 0; i < waypoints.length - 1; i += 1) {
                const origin = i === 0 && pickupLatLng ? pickupLatLng : stopCoords[i] ?? waypoints[i];
                const destination = stopCoords[i + 1] ?? waypoints[i + 1];
                const meters = await getLegDistance(origin, destination);
                if (meters == null) {
                    continue;
                }
                totalMeters += meters;
            }
            if (!isCancelled && totalMeters > 0) {
                const milesValue = (totalMeters / 1609.34).toFixed(1);
                setMiles(milesValue);
            } else if (!isCancelled) {
                setMiles('');
            }
        })();

        return () => {
            isCancelled = true;
        };
    }, [pickup, dropOffs, pickupLatLng, dropOffLatLng]);

    useEffect(() => {
        if (vehicle === 'Luxury' && !luxuryAllowed) {
            setVehicle('Luxury MPV');
        } else if (vehicle === 'Executive' && !executiveAllowed) {
            setVehicle('Luxury MPV');
        } else if (vehicle === 'Luxury MPV' && !luxuryMpvAllowed) {
            setPassengers('7');
        }
    }, [vehicle, luxuryAllowed, executiveAllowed, luxuryMpvAllowed]);

    const isNightTime = () => {
        if (!time) return false;
        const [hoursStr] = time.split(':');
        const hours = Number(hoursStr);
        if (Number.isNaN(hours)) return false;
        return hours >= 23 || hours < 4;
    };

    const baseFare = 47;
    const nightSurcharge = isNightTime() ? 30 : 0;
    const waitingRatePerHour = vehicle === 'Executive' ? 40 : 60;
    const waitingCost = waitingMinutes * (waitingRatePerHour / 60);
    const totalFare = Math.round((baseFare + nightSurcharge + waitingCost) * 100) / 100;

    const handleAddStop = () => {
        setDropOffs([...dropOffs, '']);
        setStopCoords([...stopCoords, null]);
    };

    const handleRemoveStop = (index: number) => {
        if (dropOffs.length > 1) {
            const newDropOffs = dropOffs.filter((_, i) => i !== index);
            const newCoords = stopCoords.filter((_, i) => i !== index);
            setDropOffs(newDropOffs);
            setStopCoords(newCoords);
        }
    };

    const handleDropOffChange = (index: number, value: string) => {
        const newDropOffs = [...dropOffs];
        newDropOffs[index] = value;
        setDropOffs(newDropOffs);
        const newCoords = [...stopCoords];
        newCoords[index] = null;
        setStopCoords(newCoords);
        if (index === 0) setDropOffLatLng(null);
    };
    
    const { showAlert } = useAlert();

    const handleSubmitBooking = (e: React.FormEvent) => {
        e.preventDefault();
        const bookingData: Omit<Booking, 'id' | 'status'> = {
            pickup,
            dropOffs,
            date,
            time,
            vehicle,
            serviceType,
            passengers,
            smallSuitcases,
            largeSuitcases,
            waiting,
            miles,
            passengerName,
            passengerEmail,
            passengerPhone,
            specialEvents,
            notes
        };
        addBooking(bookingData);
        showAlert('Booking submitted! An operator will call you shortly to confirm.');
        navigate('/');
    };

    return (
        <PageShell mainClassName="flex items-center justify-center py-24">
            <form onSubmit={handleSubmitBooking} className="relative z-10 w-full max-w-3xl bg-[#1c1010]/80 border border-amber-900/50 rounded-2xl shadow-2xl shadow-red-950/50 backdrop-blur-lg p-8 space-y-8">
                    
                    {/* Journey Details Section */}
                    <div>
                        <h2 className="text-3xl font-bold font-display text-amber-400 mb-2">Book a Journey</h2>
                        <p className="text-sm text-gray-400 mb-6">No account needed -- log in to manage bookings later.</p>
                        <div className="flex gap-3 mb-6 text-sm flex-nowrap overflow-x-auto no-scrollbar">
                            {['Transfer', 'Wait and Return', 'As Directed'].map((option) => (
                                <label
                                    key={option}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-900/60 bg-[#2a1a1a]/60 text-amber-100 cursor-pointer hover:border-amber-600 transition-colors flex-shrink-0 whitespace-nowrap"
                                    style={{ fontSize: 'clamp(0.75rem, 1vw, 0.95rem)' }}
                                >
                                    <input
                                        type="radio"
                                        name="serviceType"
                                        value={option}
                                        checked={serviceType === option}
                                        onChange={(e) => setServiceType(e.target.value)}
                                        className="text-amber-500 focus:ring-amber-500"
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            <div className="flex flex-col gap-1 w-full">
                                <BookingInput
                                    ref={pickupInputRef}
                                    label="Pickup"
                                    id="pickup"
                                    placeholder="Address or postcode"
                                    value={pickup}
                                    onChange={e => {
                                        setPickup(e.target.value);
                                        setPickupLatLng(null);
                                    }}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full space-y-3">
                                {dropOffs.map((stop, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="flex-grow">
                                            <BookingInput 
                                                label={index === 0 ? "Drop-off" : `Stop ${index + 1}`}
                                                id={`dropoff-${index}`} 
                                                ref={(el) => { dropoffInputRefs.current[index] = el; }}
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
                             <BookingSelect label="Vehicle" id="vehicle" value={vehicle} onChange={e => setVehicle(e.target.value)}>
                                <option value="Luxury MPV">Luxury MPV</option>
                                <option value="Luxury" disabled={!luxuryAllowed}>Luxury</option>
                                <option value="Executive" disabled={!executiveAllowed}>Executive</option>
                            </BookingSelect>
                            <BookingInput label="Passengers" id="passengers" type="number" min="1" max="7" value={passengers} onChange={e => setPassengers(e.target.value)} />
                            <BookingInput label="Small Suitcases" id="small-suitcases" type="number" min="0" value={smallSuitcases} onChange={e => setSmallSuitcases(e.target.value)} />
                            <BookingInput label="Large Suitcases" id="large-suitcases" type="number" min="0" value={largeSuitcases} onChange={e => setLargeSuitcases(e.target.value)} />
                            <BookingInput label="Waiting Time (minutes)" id="waiting" type="number" value={waiting} onChange={e => setWaiting(e.target.value)} />
                            <div className="flex flex-col gap-1 w-full">
                                <BookingInput
                                    label="Miles (auto)"
                                    id="miles"
                                    type="number"
                                    value={miles}
                                    placeholder="Auto when pickup & drop-off selected"
                                    readOnly
                                />
                                <p className="text-[11px] text-gray-400">Auto-calculated after you choose Pickup and all Drop-off stops.</p>
                            </div>
                        </div>
                    </div>

                    {/* Special Events Section */}
                    <div className="bg-[#2a1a1a]/50 border border-amber-900/40 rounded-lg p-4 space-y-3">
                        <BookingTextArea
                            label="Special events"
                            id="special-events"
                            placeholder="Corporate roadshows, red carpet, weddings, security details..."
                            value={specialEvents}
                            onChange={(e) => setSpecialEvents(e.target.value)}
                        />
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => navigate('/contact')}
                                className="px-4 py-2 text-sm font-semibold bg-transparent border border-amber-600 text-amber-400 rounded-md hover:bg-amber-900/50 transition-colors"
                            >
                                Contact us
                            </button>
                        </div>
                    </div>


                    {/* Fare Estimate Section */}
                    <div className="bg-[#2a1a1a]/50 border border-amber-900/40 rounded-lg p-4">
                        <p className="text-sm text-amber-200/80">Live fare estimate</p>
                        <p className="text-4xl font-bold text-amber-400 my-1">&#163;{totalFare}</p>
                        {nightSurcharge > 0 ? (
                            <p className="text-xs text-amber-300">Includes &#163;{nightSurcharge} night surcharge.</p>
                        ) : (
                            <p className="text-xs text-gray-400">Includes base fare, mileage, additional passengers, luggage, and waiting time.</p>
                        )}
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
        </PageShell>
    );
};

export default BookingPage;


