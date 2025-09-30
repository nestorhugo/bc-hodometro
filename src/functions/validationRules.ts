export function validateNotEmpty(value: any): true | string {
  const isEmpty =
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "") ||
    (Array.isArray(value) && value.length === 0);

  return isEmpty ? "Campo não pode ficar vazio" : true;
}
