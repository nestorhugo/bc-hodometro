import { FILTER_KEY } from "@/constants/filterConstants";
import apiCall, { type ApiResponse } from "@/functions/apiCall";
import {
  setDateToYesterday,
  setEndOfDay,
  setStartOfDay,
} from "@/functions/utils";
import type { FilterData } from "@/types/Filter";
import type { Vehicle } from "@/types/Vehicle";
import { defineStore } from "pinia";

const filterLocalData: FilterData = JSON.parse(
  window.localStorage.getItem(FILTER_KEY)
);

export const useVehicleTrackerStore = defineStore("vehicle", () => {
  const vehiclesData = ref<ApiResponse<Vehicle>>();

  const filterData = reactive<FilterData>({
    startDate: filterLocalData?.startDate ?? setDateToYesterday(new Date()),
    endDate: filterLocalData?.endDate ?? new Date(),
    idTms: filterLocalData?.idTms ?? [],
    licensePlates: filterLocalData?.licensePlates ?? [],
    divisionIds: filterLocalData?.divisionIds ?? [],
    pagination: {
      itemsPerPage: filterLocalData?.pagination.itemsPerPage ?? 10,
      totalPages: filterLocalData?.pagination.totalPages ?? 0,
      pageActive: filterLocalData?.pagination.pageActive ?? 1,
      totalItems: filterLocalData?.pagination.totalItems ?? 0,
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

      window.localStorage.setItem(FILTER_KEY, JSON.stringify(filterData));
      return res;
    });
  }

  return { vehiclesData, filterData, getVehiclesData };
});
