
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
  status: 'Completed' | 'Upcoming' | 'Cancelled';
  price: number;
}
