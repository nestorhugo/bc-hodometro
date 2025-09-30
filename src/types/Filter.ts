export interface FilterData {
  startDate: Date;
  endDate: Date;
  idTms: string[];
  licensePlates: string[];
  divisionIds: number[];
  pagination: {
    itemsPerPage: number;
    totalPages: number;
    pageActive: number;
    totalItems: number;
  };
}
