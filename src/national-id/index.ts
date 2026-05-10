export type ParsedKeId = {
    id: string;
    digits: 7 | 8;
    /** True for 7-digit IDs. Most are now 8. */
    isLegacy: boolean;
  };

  const KE_ID_REGEX = /^\d{7,8}$/;

  const stripWhitespace = (input: string) => input.replace(/[\s-]/g, "");

  export function isValidKeId(input: string): boolean {
    if (typeof input !== "string") return false;
    return KE_ID_REGEX.test(stripWhitespace(input));
  }

  export function parseKeId(input: string): ParsedKeId | null {
    if (typeof input !== "string") return null;
    const id = stripWhitespace(input);
    if (!KE_ID_REGEX.test(id)) return null;
    const digits = id.length as 7 | 8;
    return {
      id,
      digits,
      isLegacy: digits === 7,
    };
  }

  /** Normalises an ID by stripping whitespace and hyphens. Returns input
  as-is on failure. */
  export function formatKeId(input: string): string {
    const parsed = parseKeId(input);
    return parsed ? parsed.id : input;
  }

  // Maisha Card
  // The Maisha Namba (number) is just an ID number — same format as before,
  // so isValidKeId / parseKeId already cover it. What's actually new is the
  // physical card: it has an expiry date now (10 years for adults). These
  // helpers handle the card-level concerns.

  export type MaishaCardInput = {
    id: string;
    expiry: string | Date;
  };

  export type ParsedMaishaCard = {
    id: string;
    expiryDate: Date;
    isExpired: boolean;
    /** Negative if already expired. Useful for "expires in N days" UI. */
    daysUntilExpiry: number;
  };

  const toDate = (value: string | Date): Date | null => {
    if (value instanceof Date) {
      return Number.isNaN(value.getTime()) ? null : value;
    }
    if (typeof value !== "string") return null;
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  };

  export function isMaishaCardExpired(expiry: string | Date): boolean {
    const d = toDate(expiry);
    if (!d) return false; // can't tell, treat as not expired
    return d.getTime() <= Date.now();
  }

  /**
   * Parses a Maisha Card. Note: a card is "structurally valid" even when
   * expired — check `isExpired` on the result if you care about that.
   */
  export function parseMaishaCard(input: MaishaCardInput): ParsedMaishaCard
  | null {
    const parsedId = parseKeId(input.id);
    if (!parsedId) return null;

    const expiryDate = toDate(input.expiry);
    if (!expiryDate) return null;

    const msPerDay = 1000 * 60 * 60 * 24;
    const daysUntilExpiry = Math.ceil(
      (expiryDate.getTime() - Date.now()) / msPerDay,
    );

    return {
      id: parsedId.id,
      expiryDate,
      isExpired: daysUntilExpiry <= 0,
      daysUntilExpiry,
    };
  }