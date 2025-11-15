export type OlderBooking = {
  id: string;
  date: string;
  time: string;
  pickup: string;
  dropOffs: string[];
  passengerName: string;
  driverName: string;
  vehicle: string;
  notes: string;
};

export const olderBookingsData: OlderBooking[] = [
  {
    id: 'VD-0978',
    date: '2025-11-10',
    time: '07:35',
    pickup: 'Heathrow Terminal 2',
    dropOffs: ['The Langham London'],
    passengerName: 'Elena Brooks',
    driverName: 'James P.',
    vehicle: 'Mercedes-Benz S-Class',
    notes: 'Baby seat ready, arrival from Munich.'
  },
  {
    id: 'VD-0974',
    date: '2025-11-10',
    time: '11:20',
    pickup: 'London City Airport',
    dropOffs: ['Grosvenor House'],
    passengerName: 'Marco Silva',
    driverName: 'Robert K.',
    vehicle: 'BMW 7 Series',
    notes: 'Corporate guest, needs Wi-Fi and water on board.'
  },
  {
    id: 'VD-0969',
    date: '2025-11-09',
    time: '19:15',
    pickup: 'Gatwick South Terminal',
    dropOffs: ['St. Pancras International'],
    passengerName: 'Amina Patel',
    driverName: 'David C.',
    vehicle: 'Range Rover Autobiography',
    notes: 'Waiting for clients from Zurich.'
  },
  {
    id: 'VD-0965',
    date: '2025-11-09',
    time: '08:05',
    pickup: 'Heathrow Terminal 5',
    dropOffs: ['The Ritz London'],
    passengerName: 'Charles Montgomery',
    driverName: 'James P.',
    vehicle: 'Mercedes-Benz Maybach',
    notes: 'Requires cool towels and privacy screen.'
  },
  {
    id: 'VD-0958',
    date: '2025-11-08',
    time: '13:50',
    pickup: 'St. Pancras International',
    dropOffs: ['Gatwick North Terminal'],
    passengerName: 'Naomi Rivers',
    driverName: 'Robert K.',
    vehicle: 'Audi A8 L',
    notes: 'Late afternoon cancellation, rebooked.'
  },
  {
    id: 'VD-0951',
    date: '2025-11-07',
    time: '05:55',
    pickup: 'Heathrow Terminal 3',
    dropOffs: ['Wimbledon Village'],
    passengerName: 'Liam Gallagher',
    driverName: 'David C.',
    vehicle: 'Bentley Flying Spur',
    notes: 'Early arrival, premium security clearance.'
  }
];
