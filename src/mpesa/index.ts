// M-PESA helpers: paybill/till validation and a best-effort SMS parser.
// The parser handles the common Safaricom formats: sent, received,
// paybill, buygoods, withdraw, airtime. If Safaricom changes the wording
// we'll need to update the regexes.

export type MpesaTransactionType =
  | "sent"
  | "received"
  | "paybill"
  | "buygoods"
  | "withdraw"
  | "airtime"
  | "unknown";

export type ParsedMpesaSms = {
  transactionId: string;
  type: MpesaTransactionType;
  amount: number;
  party?: string;
  partyPhone?: string;
  accountNumber?: string;
  date: Date | null;
  balance: number | null;
  transactionCost: number | null;
  raw: string;
};

const PAYBILL_REGEX = /^\d{5,7}$/;
const TILL_REGEX = /^\d{5,7}$/;

export function isValidPaybill(input: string | number): boolean {
  return PAYBILL_REGEX.test(String(input).trim());
}

export function isValidTillNumber(input: string | number): boolean {
  return TILL_REGEX.test(String(input).trim());
}

const reTxId = /^([A-Z0-9]{10})\s+Confirmed/;
const reMoney = /Ksh\s*([\d,]+(?:\.\d{1,2})?)/i;
const reBalance = /M-?PESA balance is\s*Ksh\s*([\d,]+(?:\.\d{1,2})?)/i;
const reCost = /Transaction cost[,\s]*Ksh\s*([\d,]+(?:\.\d{1,2})?)/i;
const reDate =
  /on\s+(\d{1,2}\/\d{1,2}\/\d{2,4})\s+at\s+(\d{1,2}:\d{2}\s*(?:AM|PM)?)/i;

const rePhone = /(\+?254\d{9}|0\d{9})/;

const reReceived =
  /received\s+Ksh[\d,.]+\s+from\s+(.+?)\s+(\+?254\d{9}|0\d{9})\s+on/i;
const rePaybill =
  /sent to\s+(.+?)\s+for account\s+(\S+)\s+on/i;
const reSentToPerson =
  /sent to\s+(.+?)\s+(\+?254\d{9}|0\d{9})\s+on/i;
const reBuygoods =
  /sent to\s+(.+?)\s+on\s+\d/i;

const toNumber = (s: string) => Number(s.replace(/,/g, ""));

function parseDate(dateStr: string, timeStr: string): Date | null {
  const parts = dateStr.split("/");
  if (parts.length !== 3) return null;
  const [d, m, yRaw] = parts.map((p) => parseInt(p, 10));
  if (!d || !m || !yRaw) return null;
  const y = yRaw < 100 ? 2000 + yRaw : yRaw;

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

type Classified = {
  type: MpesaTransactionType;
  party?: string;
  partyPhone?: string;
  accountNumber?: string;
};

// Order matters: try specific patterns before generic ones.
function classify(text: string): Classified {
  if (/airtime/i.test(text)) return { type: "airtime" };
  if (/withdraw/i.test(text)) return { type: "withdraw" };

  const recv = text.match(reReceived);
  if (recv) {
    return {
      type: "received",
      party: recv[1]?.trim(),
      partyPhone: recv[2],
    };
  }

  const pay = text.match(rePaybill);
  if (pay) {
    return {
      type: "paybill",
      party: pay[1]?.trim(),
      accountNumber: pay[2],
    };
  }

  const sent = text.match(reSentToPerson);
  if (sent) {
    return {
      type: "sent",
      party: sent[1]?.trim(),
      partyPhone: sent[2],
    };
  }

  const buy = text.match(reBuygoods);
  if (buy) {
    return {
      type: "buygoods",
      party: buy[1]?.trim(),
    };
  }

  return { type: "unknown" };
}

export function isMpesaSms(text: string): boolean {
  return typeof text === "string" && reTxId.test(text.trim());
}

export function parseMpesaSms(text: string): ParsedMpesaSms | null {
  if (typeof text !== "string") return null;
  const trimmed = text.trim();

  const txMatch = trimmed.match(reTxId);
  if (!txMatch) return null;
  const transactionId = txMatch[1] as string;

  const moneyMatch = trimmed.match(reMoney);
  if (!moneyMatch) return null;
  const amount = toNumber(moneyMatch[1] as string);

  const classified = classify(trimmed);

  const balanceMatch = trimmed.match(reBalance);
  const balance = balanceMatch ? toNumber(balanceMatch[1] as string) : null;

  const costMatch = trimmed.match(reCost);
  const transactionCost = costMatch ? toNumber(costMatch[1] as string) : null;

  const dateMatch = trimmed.match(reDate);
  const date = dateMatch
    ? parseDate(dateMatch[1] as string, dateMatch[2] as string)
    : null;

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
    raw: trimmed,
  };
}
