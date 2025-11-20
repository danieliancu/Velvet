
export enum Role {
  GUEST,
  CLIENT,
  DRIVER,
  ADMIN
}

export interface User {
  name: string;
  email: string;
  role: Role;
}

export interface Journey {
  id: string;
  date: string;
  pickup: string;
  destination: string;
  driver: string;
  car: string;
  plate: string;
  status: 'Completed' | 'Upcoming' | 'Cancelled';
  price: number;
}

export interface Booking {
  id: string;
  pickup: string;
  dropOffs: string[];
  date: string;
  time: string;
  vehicle: string;
  passengers: string;
  serviceType: string;
  smallSuitcases: string;
  largeSuitcases: string;
  waiting: string;
  miles: string;
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  specialEvents: string;
  notes: string;
  status: 'Pending Confirmation' | 'Driver Assigned' | 'Completed';
}
