// Toma solo los campos permitidos del body (el cliente no decide active, availableCopies, role, etc.)
export const pick = (obj = {}, fields = []) =>
  Object.fromEntries(
    fields.filter((f) => obj[f] !== undefined).map((f) => [f, obj[f]])
  );
