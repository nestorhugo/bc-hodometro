import apiCall, { type ApiResponse } from "@/functions/apiCall";
import type { Vehicle } from "@/types/Vehicle";
import { defineStore } from "pinia";

export const useVehicleTrackerStore = defineStore("vehicle", () => {
  const vehiclesData = ref<ApiResponse<Vehicle>>();

  function getVehiclesData(payload: {
    startDate: string;
    endDate: string;
    idTms?: string[];
    licensePlate?: string[];
    divisionId?: number[];
    rows: number;
    page: number;
  }) {
    return apiCall<Vehicle>({
      method: "get",
      path: "/Vehicles/TrackerOdometer",
      queries: {
        StartDate: payload.startDate,
        EndDate: payload.endDate,
        IdTms: payload.idTms,
        LicensePlate: payload.licensePlate,
        DivisionId: payload.divisionId,
        Rows: payload.rows,
        Page: payload.page,
      },
    }).then((res) => {
      vehiclesData.value = res;
      return res;
    });
  }

  return { vehiclesData, getVehiclesData };
});
