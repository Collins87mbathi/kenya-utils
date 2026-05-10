'use strict';

// src/mpesa/index.ts
var PAYBILL_REGEX = /^\d{5,7}$/;
var TILL_REGEX = /^\d{5,7}$/;
function isValidPaybill(input) {
  return PAYBILL_REGEX.test(String(input).trim());
}
function isValidTillNumber(input) {
  return TILL_REGEX.test(String(input).trim());
}
var reTxId = /^([A-Z0-9]{10})\s+Confirmed/;
var reMoney = /Ksh\s*([\d,]+(?:\.\d{1,2})?)/i;
var reBalance = /M-?PESA balance is\s*Ksh\s*([\d,]+(?:\.\d{1,2})?)/i;
var reCost = /Transaction cost[,\s]*Ksh\s*([\d,]+(?:\.\d{1,2})?)/i;
var reDate = /on\s+(\d{1,2}\/\d{1,2}\/\d{2,4})\s+at\s+(\d{1,2}:\d{2}\s*(?:AM|PM)?)/i;
var reReceived = /received\s+Ksh[\d,.]+\s+from\s+(.+?)\s+(\+?254\d{9}|0\d{9})\s+on/i;
var rePaybill = /sent to\s+(.+?)\s+for account\s+(\S+)\s+on/i;
var reSentToPerson = /sent to\s+(.+?)\s+(\+?254\d{9}|0\d{9})\s+on/i;
var reBuygoods = /sent to\s+(.+?)\s+on\s+\d/i;
var toNumber = (s) => Number(s.replace(/,/g, ""));
function parseDate(dateStr, timeStr) {
  const parts = dateStr.split("/");
  if (parts.length !== 3) return null;
  const [d, m, yRaw] = parts.map((p) => parseInt(p, 10));
  if (!d || !m || !yRaw) return null;
  const y = yRaw < 100 ? 2e3 + yRaw : yRaw;
  const t = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (!t) return null;
  let hour = parseInt(t[1] ?? "0", 10);
  const min = parseInt(t[2] ?? "0", 10);
  const meridiem = t[3]?.toUpperCase();
  if (meridiem === "PM" && hour < 12) hour += 12;
  if (meridiem === "AM" && hour === 12) hour = 0;
  const out = new Date(y, m - 1, d, hour, min);
  return Number.isNaN(out.getTime()) ? null : out;
}
function classify(text) {
  if (/airtime/i.test(text)) return { type: "airtime" };
  if (/withdraw/i.test(text)) return { type: "withdraw" };
  const recv = text.match(reReceived);
  if (recv) {
    return {
      type: "received",
      party: recv[1]?.trim(),
      partyPhone: recv[2]
    };
  }
  const pay = text.match(rePaybill);
  if (pay) {
    return {
      type: "paybill",
      party: pay[1]?.trim(),
      accountNumber: pay[2]
    };
  }
  const sent = text.match(reSentToPerson);
  if (sent) {
    return {
      type: "sent",
      party: sent[1]?.trim(),
      partyPhone: sent[2]
    };
  }
  const buy = text.match(reBuygoods);
  if (buy) {
    return {
      type: "buygoods",
      party: buy[1]?.trim()
    };
  }
  return { type: "unknown" };
}
function isMpesaSms(text) {
  return typeof text === "string" && reTxId.test(text.trim());
}
function parseMpesaSms(text) {
  if (typeof text !== "string") return null;
  const trimmed = text.trim();
  const txMatch = trimmed.match(reTxId);
  if (!txMatch) return null;
  const transactionId = txMatch[1];
  const moneyMatch = trimmed.match(reMoney);
  if (!moneyMatch) return null;
  const amount = toNumber(moneyMatch[1]);
  const classified = classify(trimmed);
  const balanceMatch = trimmed.match(reBalance);
  const balance = balanceMatch ? toNumber(balanceMatch[1]) : null;
  const costMatch = trimmed.match(reCost);
  const transactionCost = costMatch ? toNumber(costMatch[1]) : null;
  const dateMatch = trimmed.match(reDate);
  const date = dateMatch ? parseDate(dateMatch[1], dateMatch[2]) : null;
  return {
    transactionId,
    type: classified.type,
    amount,
    party: classified.party,
    partyPhone: classified.partyPhone,
    accountNumber: classified.accountNumber,
    date,
    balance,
    transactionCost,
    raw: trimmed
  };
}

exports.isMpesaSms = isMpesaSms;
exports.isValidPaybill = isValidPaybill;
exports.isValidTillNumber = isValidTillNumber;
exports.parseMpesaSms = parseMpesaSms;
//# sourceMappingURL=mpesa.cjs.map
//# sourceMappingURL=mpesa.cjs.map