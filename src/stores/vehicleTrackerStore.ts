import apiCall, { type ApiResponse } from "@/functions/apiCall";
import {
  setDateToYesterday,
  setEndOfDay,
  setStartOfDay,
} from "@/functions/utils";
import type { FilterData } from "@/types/Filter";
import type { Vehicle } from "@/types/Vehicle";
import { defineStore } from "pinia";

export const useVehicleTrackerStore = defineStore("vehicle", () => {
  const vehiclesData = ref<ApiResponse<Vehicle>>();

  const filterData = reactive<FilterData>({
    startDate: setDateToYesterday(new Date()),
    endDate: new Date(),
    idTms: [],
    licensePlates: [],
    divisionIds: [],
    pagination: {
      itemsPerPage: 10,
      totalPages: 0,
      pageActive: 1,
      totalItems: 0,
    },
  });

  function getVehiclesData() {
    return apiCall<Vehicle>({
      method: "get",
      path: "/Vehicles/TrackerOdometer",
      queries: {
        StartDate: setStartOfDay(filterData.startDate),
        EndDate: setEndOfDay(filterData.endDate),
        IdTms: filterData.idTms,
        LicensePlate: filterData.licensePlates,
        DivisionId: filterData.divisionIds,
        Rows: filterData.pagination.itemsPerPage,
        Page: filterData.pagination.pageActive,
      },
    }).then((res) => {
      vehiclesData.value = res;

      filterData.pagination.totalItems = res.totalItems;
      filterData.pagination.totalPages = res.totalPages;
      filterData.pagination.pageActive = res.pageActive;
      return res;
    });
  }

  return { vehiclesData, filterData, getVehiclesData };
});
