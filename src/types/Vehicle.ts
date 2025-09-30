export interface Vehicle {
  vehicleId: number;
  vehicleIdTms: string;
  divisionId: number;
  divisionName: string;
  operationId: number;
  operationName: string;
  connector: string;
  licensePlate: string;
  driverId: number | null;
  driverName: string;
  driverIdTms: string;
  driverDivisionId: number | null;
  driverDivisionName: string;
  driverOperationId: number | null;
  driverOperationName: string;
  dateProcess: string;
  interval: number;
  timezone: number;
  moving: boolean;
  id: string;
  delayed: boolean;
  odometer: number | null;
  odometerKm: number | null;
  ignition: boolean;
  ignitionStatus: string;
  bearing: number | null;
  point: PointCoordinates;
  speed: number;
  quality: number;
  date: string;
}

export interface PointCoordinates {
  latitude: number;
  longitude: number;
}
