'use strict';

// src/currency/index.ts
var ONES = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen"
];
var TENS = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety"
];
var SCALES = ["", "thousand", "million", "billion", "trillion"];
function formatKes(amount, options = {}) {
  if (typeof amount !== "number" || !Number.isFinite(amount)) return "";
  const { decimals = 2, symbol = "Ksh", spacing = true } = options;
  const formatted = amount.toLocaleString("en-KE", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
  if (!symbol) return formatted;
  return `${symbol}${spacing ? " " : ""}${formatted}`;
}
function parseKes(input) {
  if (typeof input !== "string") return null;
  const cleaned = input.replace(/shillings?|ksh|kes|sh\.?/gi, "").replace(/[,\s]/g, "").trim();
  if (!cleaned || !/^-?\d+(\.\d+)?$/.test(cleaned)) return null;
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : null;
}
function chunkToWords(n) {
  if (n === 0) return "";
  if (n < 20) return ONES[n] ?? "";
  if (n < 100) {
    const t = Math.floor(n / 10);
    const o = n % 10;
    return o === 0 ? TENS[t] ?? "" : `${TENS[t]} ${ONES[o]}`;
  }
  const h = Math.floor(n / 100);
  const rest = n % 100;
  const head = `${ONES[h]} hundred`;
  return rest === 0 ? head : `${head} ${chunkToWords(rest)}`;
}
function intToWords(n) {
  if (n === 0) return "zero";
  const parts = [];
  let scaleIdx = 0;
  let remaining = n;
  while (remaining > 0 && scaleIdx < SCALES.length) {
    const chunk = remaining % 1e3;
    if (chunk > 0) {
      const chunkWords = chunkToWords(chunk);
      const scaleWord = SCALES[scaleIdx];
      parts.unshift(scaleWord ? `${chunkWords} ${scaleWord}` : chunkWords);
    }
    remaining = Math.floor(remaining / 1e3);
    scaleIdx += 1;
  }
  return parts.join(" ").trim();
}
function toKesWords(amount) {
  if (typeof amount !== "number" || !Number.isFinite(amount)) return "";
  const negative = amount < 0;
  const abs = Math.abs(amount);
  const totalCents = Math.round(abs * 100);
  const shillings = Math.floor(totalCents / 100);
  const cents = totalCents % 100;
  const shillingWords = `${intToWords(shillings)} shilling${shillings === 1 ? "" : "s"}`;
  let result;
  if (cents === 0) {
    result = shillingWords;
  } else {
    const suffix = cents === 1 ? "" : "s";
    const centWords = `${intToWords(cents)} cent${suffix}`;
    if (shillings === 0) {
      result = centWords;
    } else {
      result = `${shillingWords} and ${centWords}`;
    }
  }
  return negative ? `negative ${result}` : result;
}

exports.formatKes = formatKes;
exports.parseKes = parseKes;
exports.toKesWords = toKesWords;
//# sourceMappingURL=currency.cjs.map
//# sourceMappingURL=currency.cjs.map