export interface Vehicle {
  vehicleId: number;
  vehicleIdTms: string;
  divisionId?: number;
  divisionName?: string;
  operationId?: number;
  operationName?: string;
  connector: string;
  licensePlate: string;
  driverId?: number;
  driverName?: string;
  driverIdTms?: string;
  driverDivisionId?: number;
  driverDivisionName?: string;
  driverOperationId?: number;
  driverOperationName?: string;
  dateProcess?: string;
  interval?: number;
  timezone: number;
  moving: boolean;
  id: string;
  delayed: boolean;
  odometer?: number;
  odometerKm?: number;
  ignition: boolean;
  ignitionStatus: string;
  bearing?: number;
  point?: PointCoordinates;
  speed?: number;
  quality?: number;
  date: string;
}

export interface PointCoordinates {
  latitude: number;
  longitude: number;
}

export interface FilterHeaders {
  title: string;
  key: string;
}
