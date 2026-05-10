  // Kenyan Shilling helpers. Formatting uses Intl with the en-KE locale,
  // then we tack on the symbol ourselves so callers can pick "Ksh" / "KES"
  // / "Sh".
  //
  // toKesWords does cents math via integers (Math.round(x * 100)) to dodge
  // floating-point pain like 0.1 + 0.2 = 0.30000000000000004.

  const ONES = [
    "zero", "one", "two", "three", "four", "five", "six", "seven", "eight",
  "nine",
    "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
    "seventeen", "eighteen", "nineteen",
  ];

  const TENS = [
    "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy",
  "eighty", "ninety",
  ];

  const SCALES = ["", "thousand", "million", "billion", "trillion"];

  export type KesFormatOptions = {
    decimals?: 0 | 2;
    symbol?: "Ksh" | "KES" | "Sh" | "";
    spacing?: boolean;
  };

  export function formatKes(amount: number, options: KesFormatOptions = {}):
   string {
    if (typeof amount !== "number" || !Number.isFinite(amount)) return "";
    const { decimals = 2, symbol = "Ksh", spacing = true } = options;

    const formatted = amount.toLocaleString("en-KE", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

    if (!symbol) return formatted;
    return `${symbol}${spacing ? " " : ""}${formatted}`;
  }

  export function parseKes(input: string): number | null {
    if (typeof input !== "string") return null;
    const cleaned = input
      .replace(/shillings?|ksh|kes|sh\.?/gi, "")
      .replace(/[,\s]/g, "")
      .trim();
    if (!cleaned || !/^-?\d+(\.\d+)?$/.test(cleaned)) return null;
    const num = Number(cleaned);
    return Number.isFinite(num) ? num : null;
  }

  function chunkToWords(n: number): string {
    if (n === 0) return "";
    if (n < 20) return ONES[n] ?? "";

    if (n < 100) {
      const t = Math.floor(n / 10);
      const o = n % 10;
      return o === 0 ? (TENS[t] ?? "") : `${TENS[t]} ${ONES[o]}`;
    }

    const h = Math.floor(n / 100);
    const rest = n % 100;
    const head = `${ONES[h]} hundred`;
    return rest === 0 ? head : `${head} ${chunkToWords(rest)}`;
  }

  function intToWords(n: number): string {
    if (n === 0) return "zero";
    const parts: string[] = [];
    let scaleIdx = 0;
    let remaining = n;

    while (remaining > 0 && scaleIdx < SCALES.length) {
      const chunk = remaining % 1000;
      if (chunk > 0) {
        const chunkWords = chunkToWords(chunk);
        const scaleWord = SCALES[scaleIdx];
        parts.unshift(scaleWord ? `${chunkWords} ${scaleWord}` :
  chunkWords);
      }
      remaining = Math.floor(remaining / 1000);
      scaleIdx += 1;
    }

    return parts.join(" ").trim();
  }

  export function toKesWords(amount: number): string {
    if (typeof amount !== "number" || !Number.isFinite(amount)) return "";

    const negative = amount < 0;
    const abs = Math.abs(amount);

    const totalCents = Math.round(abs * 100);
    const shillings = Math.floor(totalCents / 100);
    const cents = totalCents % 100;

    const shillingWords = `${intToWords(shillings)} shilling${shillings ===
  1 ? "" : "s"}`;

    let result: string;
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