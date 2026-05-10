// src/national-id/index.ts
var KE_ID_REGEX = /^\d{7,8}$/;
var stripWhitespace = (input) => input.replace(/[\s-]/g, "");
function isValidKeId(input) {
  if (typeof input !== "string") return false;
  return KE_ID_REGEX.test(stripWhitespace(input));
}
function parseKeId(input) {
  if (typeof input !== "string") return null;
  const id = stripWhitespace(input);
  if (!KE_ID_REGEX.test(id)) return null;
  const digits = id.length;
  return {
    id,
    digits,
    isLegacy: digits === 7
  };
}
function formatKeId(input) {
  const parsed = parseKeId(input);
  return parsed ? parsed.id : input;
}
var toDate = (value) => {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }
  if (typeof value !== "string") return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
};
function isMaishaCardExpired(expiry) {
  const d = toDate(expiry);
  if (!d) return false;
  return d.getTime() <= Date.now();
}
function parseMaishaCard(input) {
  const parsedId = parseKeId(input.id);
  if (!parsedId) return null;
  const expiryDate = toDate(input.expiry);
  if (!expiryDate) return null;
  const msPerDay = 1e3 * 60 * 60 * 24;
  const daysUntilExpiry = Math.ceil(
    (expiryDate.getTime() - Date.now()) / msPerDay
  );
  return {
    id: parsedId.id,
    expiryDate,
    isExpired: daysUntilExpiry <= 0,
    daysUntilExpiry
  };
}

export { formatKeId, isMaishaCardExpired, isValidKeId, parseKeId, parseMaishaCard };
//# sourceMappingURL=national-id.js.map
//# sourceMappingURL=national-id.js.map