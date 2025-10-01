import { FILTER_KEY } from "@/constants/filterConstants";
import type { FilterData } from "@/types/Filter";

export function setStartOfDay(d: Date): Date {
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function setEndOfDay(d: Date): Date {
  const date = new Date(d);
  date.setHours(23, 59, 59, 999);
  return date;
}

export function setDateToYesterday(d: Date): Date {
  const date = new Date(d);
  date.setDate(d.getDate() - 1);
  return date;
}

export function defaultFilterData(): FilterData {
  return {
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
  };
}

export function loadFilterData(): FilterData {
  const raw = localStorage.getItem(FILTER_KEY);
  if (!raw) return defaultFilterData();

  const parsed = JSON.parse(raw);

  return {
    ...parsed,
    startDate: new Date(parsed.startDate),
    endDate: new Date(parsed.endDate),
  };
}
