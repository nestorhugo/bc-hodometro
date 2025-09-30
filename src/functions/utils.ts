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
