
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

type PlaceResult = {
    formatted_address?: string;
    geometry?: { location?: { lat: () => number; lng: () => number } };
    location?: { lat: number; lng: number };
};

type FlightDetails = {
    number: string;
    status?: string;
    dep?: string;
    arr?: string;
    depTimeUtc?: string;
    arrTimeUtc?: string;
    latitude?: number;
    longitude?: number;
    altitudeMeters?: number;
    speedKmh?: number;
};

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
    const [legBreakdown, setLegBreakdown] = useState<Array<{
        miles: number;
        originLabel: string;
        destinationLabel: string;
        originZone: number | null;
        destinationZone: number | null;
        appliedZone: number | null;
    }>>([]);
    const googleLoadPromise = useRef<Promise<void> | null>(null);
    const pickupInputRef = useRef<HTMLInputElement | null>(null);
    const dropoffInputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const dropoffAutocompleteRefs = useRef<any[]>([]);
    const distanceServiceRef = useRef<any>(null);
    const placeAutocompleteCleanupRef = useRef<Array<() => void>>([]);
    const [passengerName, setPassengerName] = useState('');
    const [passengerEmail, setPassengerEmail] = useState('');
    const [passengerPhone, setPassengerPhone] = useState('');
    const [specialEvents, setSpecialEvents] = useState('');
    const [notes, setNotes] = useState('');
    const [flightNumber, setFlightNumber] = useState('');
    const [flightDetails, setFlightDetails] = useState<FlightDetails | null>(null);
    const [flightLoading, setFlightLoading] = useState(false);
    const [flightError, setFlightError] = useState<string | null>(null);

    const passengersCount = Math.max(0, Number(passengers) || 0);
    const smallSuitcasesCount = Math.max(0, Number(smallSuitcases) || 0);
    const largeSuitcasesCount = Math.max(0, Number(largeSuitcases) || 0);
    const waitingMinutes = Math.max(0, Number(waiting) || 0);

    const LONDON_CENTER = { lat: 51.509865, lng: -0.118092 }; // Charing Cross
    // Zones are concentric rings around central London; tweak radii to match your own map pricing.
    const zoneRings = [
        { id: 1, name: 'Zone 1', radiusMiles: 3 },
        { id: 2, name: 'Zone 2', radiusMiles: 6 },
        { id: 3, name: 'Zone 3', radiusMiles: 9 },
        { id: 4, name: 'Zone 4', radiusMiles: 12 },
        { id: 5, name: 'Zone 5', radiusMiles: 15 },
        { id: 6, name: 'Zone 6', radiusMiles: 20 },
        { id: 7, name: 'Zone 7', radiusMiles: 25 },
        { id: 8, name: 'Zone 8', radiusMiles: 30 },
        { id: 9, name: 'Zone 9', radiusMiles: 40 },
    ];

    const haversineMiles = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) => {
        const toRad = (deg: number) => (deg * Math.PI) / 180;
        const R = 6371; // km
        const dLat = toRad(b.lat - a.lat);
        const dLon = toRad(b.lng - a.lng);
        const lat1 = toRad(a.lat);
        const lat2 = toRad(b.lat);
        const sinLat = Math.sin(dLat / 2);
        const sinLon = Math.sin(dLon / 2);
        const aHarv = sinLat * sinLat + Math.cos(lat1) * Math.cos(lat2) * sinLon * sinLon;
        const c = 2 * Math.atan2(Math.sqrt(aHarv), Math.sqrt(1 - aHarv));
        const distanceKm = R * c;
        return distanceKm * 0.621371; // miles
    };

    const getZoneForCoords = (coords: { lat: number; lng: number }) => {
        const milesFromCenter = haversineMiles(coords, LONDON_CENTER);
        const zone = zoneRings.find((z) => milesFromCenter <= z.radiusMiles);
        return zone ?? zoneRings[zoneRings.length - 1];
    };

    // Mileage rates by vehicle and zone bands (inner = zones 1-3, mid = 4-6, outer = 7-9).
    const zoneMileageRates: Record<string, { inner: number; mid: number; outer: number }> = {
        Executive: { inner: 6.25, mid: 2.5, outer: 2 },
        Luxury: { inner: 8.75, mid: 3.5, outer: 3 },
        'Luxury MPV': { inner: 10, mid: 4, outer: 3.5 },
    };

    const getZoneMileageRate = (veh: string, zoneId: number | null) => {
        const bands = zoneMileageRates[veh] ?? zoneMileageRates['Luxury MPV'];
        if (!zoneId) return bands.mid;
        if (zoneId <= 3) return bands.inner;
        if (zoneId <= 6) return bands.mid;
        return bands.outer;
    };

    const pickAppliedZone = (originZone: number | null, destinationZone: number | null) => {
        if (originZone && destinationZone) return Math.max(originZone, destinationZone);
        return originZone ?? destinationZone ?? null;
    };

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
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async`;
            script.async = true;
            script.defer = true;
            script.onload = () => resolve();
            script.onerror = (err) => reject(err);
            document.head.appendChild(script);
        });
        return googleLoadPromise.current;
    };

    const attachLegacyAutocomplete = () => {
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

    const attachPlaceAutocomplete = async () => {
        const maps = (window as any).google?.maps;
        const places = maps?.places;
        // Use PlaceAutocompleteElement only if available and supports inputElement; otherwise fallback to legacy.
        const PlaceAutocompleteElement = places?.PlaceAutocompleteElement;
        if (!PlaceAutocompleteElement) {
            attachLegacyAutocomplete();
            return;
        }

        const tryAttach = (input: HTMLInputElement | null, onSelect: (place: PlaceResult | null) => void) => {
            if (!input) return false;
            let element: any;
            try {
                element = new PlaceAutocompleteElement();
                (element as any).inputElement = input;
            } catch {
                return false;
            }

            const handler = () => {
                const place = (element as any).getPlace ? (element as any).getPlace() : null;
                onSelect(place);
            };
            ['placechange', 'gmp-placeselect', 'gmpx-placechange', 'place_changed'].forEach((evt) =>
                element.addEventListener(evt, handler)
            );
            placeAutocompleteCleanupRef.current.push(() => {
                ['placechange', 'gmp-placeselect', 'gmpx-placechange', 'place_changed'].forEach((evt) =>
                    element.removeEventListener(evt, handler)
                );
            });
            return true;
        };

        const pickupOk = tryAttach(pickupInputRef.current, (place) => {
            if (place?.formatted_address) setPickup(place.formatted_address);
            const loc = place?.location ?? place?.geometry?.location;
            if (loc) {
                const lat = typeof loc.lat === 'function' ? loc.lat() : loc.lat;
                const lng = typeof loc.lng === 'function' ? loc.lng() : loc.lng;
                setPickupLatLng({ lat, lng });
            }
        });

        let allDropsOk = true;
        dropoffInputRefs.current.forEach((input, index) => {
            const ok = tryAttach(input, (place) => {
                if (place?.formatted_address) handleDropOffChange(index, place.formatted_address);
                const loc = place?.location ?? place?.geometry?.location;
                if (loc) {
                    const lat = typeof loc.lat === 'function' ? loc.lat() : loc.lat;
                    const lng = typeof loc.lng === 'function' ? loc.lng() : loc.lng;
                    const coords = [...stopCoords];
                    coords[index] = { lat, lng };
                    setStopCoords(coords);
                    if (index === 0) setDropOffLatLng({ lat, lng });
                }
            });
            if (!ok) allDropsOk = false;
        });

        if (!pickupOk || !allDropsOk) {
            placeAutocompleteCleanupRef.current.forEach((fn) => fn());
            placeAutocompleteCleanupRef.current = [];
            attachLegacyAutocomplete();
        }
    };

    useEffect(() => {
        loadGoogleMaps()
            .then(() => {
                const retryAttach = (attempt = 0) => {
                    const mapsReady = (window as any).google?.maps?.places;
                    if (!mapsReady && attempt < 5) {
                        setTimeout(() => retryAttach(attempt + 1), 250);
                        return;
                    }
                    attachPlaceAutocomplete();
                };
                retryAttach();
            })
            .catch((err) => console.error('Failed to load Google Maps', err));
        // Re-attach when count changes so new stops get autocomplete

        return () => {
            placeAutocompleteCleanupRef.current.forEach((fn) => fn());
        };
    }, [dropOffs.length]);

    useEffect(() => {
        const maps = (window as any).google?.maps;
        if (!maps || !distanceServiceRef.current) return;
        const waypoints = [pickup.trim(), ...dropOffs.map((d) => d.trim())].filter(Boolean);
        const coordChain = [pickupLatLng, ...stopCoords];
        if (waypoints.length < 2) {
            setMiles('');
            setLegBreakdown([]);
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
            const legs: Array<{
                miles: number;
                originLabel: string;
                destinationLabel: string;
                originZone: number | null;
                destinationZone: number | null;
                appliedZone: number | null;
            }> = [];
            for (let i = 0; i < waypoints.length - 1; i += 1) {
                const originCandidate = coordChain[i];
                const destCandidate = coordChain[i + 1];
                const origin = originCandidate ?? waypoints[i];
                const destination = destCandidate ?? waypoints[i + 1];
                const meters = await getLegDistance(origin, destination);
                if (meters == null) continue;
                totalMeters += meters;
                const milesValueLeg = meters / 1609.34;
                const originZone = originCandidate ? getZoneForCoords(originCandidate) : null;
                const destinationZone = destCandidate ? getZoneForCoords(destCandidate) : null;
                const appliedZone = pickAppliedZone(originZone?.id ?? null, destinationZone?.id ?? null);
                legs.push({
                    miles: milesValueLeg,
                    originLabel: waypoints[i],
                    destinationLabel: waypoints[i + 1],
                    originZone: originZone?.id ?? null,
                    destinationZone: destinationZone?.id ?? null,
                    appliedZone,
                });
            }
            if (!isCancelled && totalMeters > 0) {
                setLegBreakdown(legs);
                const milesValue = (totalMeters / 1609.34).toFixed(1);
                setMiles(milesValue);
            } else if (!isCancelled) {
                setMiles('');
                setLegBreakdown([]);
            }
        })();

        return () => {
            isCancelled = true;
        };
    }, [pickup, dropOffs, pickupLatLng, dropOffLatLng, stopCoords]);

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

    const milesValue = Number(miles) || 0;
    const isAirportOrTerminal = (value: string) => /(airport|terminal)/i.test(value);
    const airportDetected = isAirportOrTerminal(pickup) || dropOffs.some((addr) => isAirportOrTerminal(addr));

    const getMileageRate = (veh: string, dist: number) => {
        if (veh === 'Executive') {
            if (dist <= 10) return 6.25;
            if (dist <= 40) return 2.5;
            return 2;
        }
        if (veh === 'Luxury') {
            if (dist <= 10) return 8.75;
            if (dist <= 40) return 3.5;
            return 3;
        }
        // Luxury MPV and fallback
        if (dist <= 10) return 10;
        if (dist <= 40) return 4;
        return 3.5;
    };

    const extras: string[] = [];
    let totalFare = 0;
    const waitingRatePerHour = vehicle === 'Executive' ? 40 : 60;
    const waitingCost = serviceType === 'As Directed' ? 0 : waitingMinutes * (waitingRatePerHour / 60);
    const hourlyRate = vehicle === 'Executive' ? 40 : 60;

    const includesZoneOneToFour =
        legBreakdown.length > 0 &&
        legBreakdown.some((leg) => {
            const zones = [leg.appliedZone, leg.originZone, leg.destinationZone].filter((z): z is number => z != null);
            return zones.some((z) => z <= 4);
        });

    const zoneMileageFare =
        serviceType === 'As Directed'
            ? 0
            : legBreakdown.length && legBreakdown.every((leg) => leg.appliedZone !== null)
                ? legBreakdown.reduce((sum, leg) => sum + leg.miles * getZoneMileageRate(vehicle, leg.appliedZone), 0)
                : null;

    const mileageFare =
        serviceType === 'As Directed'
            ? hourlyRate
            : includesZoneOneToFour
                ? milesValue * getMileageRate(vehicle, 10) // force 1-10 mile rate for any ride touching zones 1-4
                : (zoneMileageFare ?? milesValue * getMileageRate(vehicle, milesValue));

    totalFare = mileageFare;

    if (serviceType !== 'As Directed') {
        if (waitingCost > 0) extras.push(`Waiting time GBP${waitingCost.toFixed(2)}`);
        totalFare += waitingCost;
    }

    if (isNightTime()) {
        totalFare += 30;
        extras.push('Night surcharge GBP30');
    }
    if (isAirportOrTerminal(pickup)) {
        totalFare += 15;
        extras.push('Airport/terminal pickup GBP15');
    }
    if (dropOffs.some(addr => isAirportOrTerminal(addr))) {
        totalFare += 7;
        extras.push('Airport/terminal drop-off GBP7');
    }
    totalFare = Math.round(totalFare * 100) / 100;

    const extrasAmount = serviceType === 'As Directed' ? totalFare - hourlyRate : 0;
    const fareDisplay = serviceType === 'As Directed'
        ? extrasAmount > 0
            ? `GBP${hourlyRate.toFixed(2)}/h + GBP${extrasAmount.toFixed(2)}`
            : `GBP${hourlyRate.toFixed(2)}/h`
        : `GBP${totalFare.toFixed(2)}`;

    const extrasText =
        extras.length
            ? `Extras applied: ${extras.join('; ')}`
            : serviceType === 'As Directed'
                ? 'Includes hourly rate. No extras applied.'
                : 'Includes mileage (tiered by vehicle). No extras applied.';

    const zoneIds = legBreakdown
        .flatMap((leg) => [leg.originZone, leg.destinationZone, leg.appliedZone])
        .filter((z): z is number => z != null);
    const zonesCovered = Array.from(new Set(zoneIds)).sort((a, b) => a - b);
    const zoneText = serviceType === 'As Directed'
        ? ''
        : includesZoneOneToFour && zonesCovered.length
            ? `Zones detected: ${zonesCovered.map((z) => `Zone ${z}`).join(', ')}`
            : '';

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

    useEffect(() => {
        if (!airportDetected) {
            setFlightNumber('');
            setFlightDetails(null);
            setFlightLoading(false);
            setFlightError(null);
        }
    }, [airportDetected]);

    useEffect(() => {
        if (!flightNumber.trim()) {
            setFlightDetails(null);
            setFlightLoading(false);
            setFlightError(null);
            return;
        }

        const baseUrl = import.meta.env.VITE_AIRLABS_PROXY_URL || 'https://airlabs.co/api/v9';
        const apiKey = import.meta.env.VITE_AIRLABS_API_KEY;
        if (!apiKey) {
            setFlightError('Configure VITE_AIRLABS_API_KEY to fetch live flight data.');
            setFlightDetails(null);
            setFlightLoading(false);
            return;
        }

        const callsign = flightNumber.trim().toUpperCase();
        setFlightLoading(true);
        setFlightError(null);
        const controller = new AbortController();

        const fetchFlight = async () => {
            try {
                const isIcao = /^[A-Z]{3}\d+/i.test(callsign);
                const queryKey = isIcao ? 'flight_icao' : 'flight_iata';
                const fetchOnce = async (base: string) => {
                    const res = await fetch(`${base}/flight?${queryKey}=${encodeURIComponent(callsign)}&api_key=${apiKey}`, {
                        signal: controller.signal,
                    });
                    return res;
                };

                let res = await fetchOnce(baseUrl);
                if (res.status === 404 && baseUrl.startsWith('/api/')) {
                    // Likely missing proxy in production; retry direct AirLabs
                    res = await fetchOnce('https://airlabs.co/api/v9');
                }

                if (!res.ok) {
                    if (res.status === 401) throw new Error('AirLabs auth failed (401). Check API key or quota.');
                    if (res.status === 404) throw new Error('AirLabs flight endpoint not found.');
                    throw new Error(`AirLabs responded ${res.status}`);
                }
                const data = await res.json();
                if (data?.error) {
                    throw new Error(data.error.message || 'AirLabs error');
                }
                const flight = data?.response;
                if (!flight) {
                    setFlightDetails(null);
                    setFlightError('No live flight found for this flight code right now.');
                    return;
                }
                const detail: FlightDetails = {
                    number: flight.flight_icao || flight.flight_iata || callsign,
                    status: flight.status,
                    dep: flight.dep_iata || flight.dep_icao,
                    arr: flight.arr_iata || flight.arr_icao,
                    depTimeUtc: flight.dep_time_utc,
                    arrTimeUtc: flight.arr_time_utc,
                    latitude: flight.lat,
                    longitude: flight.lng,
                    altitudeMeters: typeof flight.alt === 'number' ? flight.alt : undefined,
                    speedKmh: typeof flight.speed === 'number' ? Math.round(flight.speed) : undefined,
                };
                setFlightDetails(detail);
            } catch (err: any) {
                if (controller.signal.aborted) return;
                setFlightDetails(null);
                setFlightError(err?.message || 'Failed to fetch flight');
            } finally {
                if (!controller.signal.aborted) setFlightLoading(false);
            }
        };

        const timer = setTimeout(fetchFlight, 450);
        return () => {
            controller.abort();
            clearTimeout(timer);
        };
    }, [flightNumber]);

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

                            {airportDetected && (
                                <div className="md:col-span-2 bg-[#2a1a1a]/60 border border-amber-900/40 rounded-lg p-4 space-y-3">
                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                        <p className="text-sm font-semibold text-amber-200">Airport detected</p>
                                        <p className="text-xs text-gray-400">Add flight number so we prep meet & greet</p>
                                    </div>
                                    <BookingInput
                                        label="Flight number"
                                        id="flight-number"
                                        placeholder="e.g. BA984"
                                        value={flightNumber}
                                        onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
                                    />
                                    {flightNumber && (
                                        <div className="bg-black/30 border border-amber-900/40 rounded-md p-3 text-sm text-amber-100 space-y-2">
                                            {flightLoading && <p className="text-gray-400">Fetching live flight details...</p>}
                                            {!flightLoading && flightError && (
                                                <p className="text-red-300">{flightError}</p>
                                            )}
                                            {!flightLoading && flightDetails && (
                                                <div className="space-y-1">
                                                    <p className="text-amber-300 font-semibold">{flightDetails.number} {flightDetails.status ? `· ${flightDetails.status}` : ''}</p>
                                                    <p className="text-gray-200">Route: {flightDetails.dep || '—'} → {flightDetails.arr || '—'}</p>
                                                    {flightDetails.depTimeUtc && (
                                                        <p className="text-gray-200 text-xs">Dep (UTC): {flightDetails.depTimeUtc}</p>
                                                    )}
                                                    {flightDetails.arrTimeUtc && (
                                                        <p className="text-gray-200 text-xs">Arr (UTC): {flightDetails.arrTimeUtc}</p>
                                                    )}
                                                    {flightDetails.latitude != null && flightDetails.longitude != null && (
                                                        <p className="text-gray-200">Position: {flightDetails.latitude.toFixed(2)}, {flightDetails.longitude.toFixed(2)}</p>
                                                    )}
                                                    {flightDetails.altitudeMeters != null && (
                                                        <p className="text-gray-200">Altitude: {Math.round(flightDetails.altitudeMeters)} m</p>
                                                    )}
                                                    {flightDetails.speedKmh != null && (
                                                        <p className="text-gray-200">Speed: {flightDetails.speedKmh} km/h</p>
                                                    )}
                                                </div>
                                            )}
                                            {!flightLoading && !flightDetails && !flightError && (
                                                <p className="text-gray-400">Add a valid flight number to see live telemetry.</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

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
                            <BookingInput
                                label="Waiting Time (minutes)"
                                id="waiting"
                                type="number"
                                value={waiting}
                                onChange={e => setWaiting(e.target.value)}
                                disabled={serviceType === 'As Directed'}
                            />
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


                    {/* Fare Estimate Section */}
                    <div className="bg-[#2a1a1a]/50 border border-amber-900/40 rounded-lg p-4">
                        <p className="text-sm text-amber-200/80">Live fare estimate</p>
                        <p className="text-4xl font-bold text-amber-400 my-1">{fareDisplay}</p>
                        <p className="text-xs text-gray-400">{extrasText}</p>
                        {zoneText ? <p className="text-xs text-gray-500 mt-1">{zoneText}</p> : null}
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
