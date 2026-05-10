'use strict';

// src/kra-pin/index.ts
var KRA_PIN_REGEX = /^[AP]\d{9}[A-Z]$/;
var normalize = (input) => input.replace(
  /[\s-]/g,
  ""
).toUpperCase();
function isValidKraPin(input) {
  if (typeof input !== "string") return false;
  return KRA_PIN_REGEX.test(normalize(input));
}
function parseKraPin(input) {
  if (typeof input !== "string") return null;
  const pin = normalize(input);
  if (!KRA_PIN_REGEX.test(pin)) return null;
  const prefix = pin[0];
  return {
    pin,
    type: prefix === "A" ? "Individual" : "Non-Individual",
    prefix,
    sequence: pin.slice(1, 10),
    checkChar: pin[10]
  };
}
function formatKraPin(input) {
  const parsed = parseKraPin(input);
  return parsed ? parsed.pin : input;
}

exports.formatKraPin = formatKraPin;
exports.isValidKraPin = isValidKraPin;
exports.parseKraPin = parseKraPin;
//# sourceMappingURL=kra-pin.cjs.map
//# sourceMappingURL=kra-pin.cjs.map