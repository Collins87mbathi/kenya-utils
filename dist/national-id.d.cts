type ParsedKeId = {
    id: string;
    digits: 7 | 8;
    /** True for 7-digit IDs. Most are now 8. */
    isLegacy: boolean;
};
declare function isValidKeId(input: string): boolean;
declare function parseKeId(input: string): ParsedKeId | null;
/** Normalises an ID by stripping whitespace and hyphens. Returns input
as-is on failure. */
declare function formatKeId(input: string): string;
type MaishaCardInput = {
    id: string;
    expiry: string | Date;
};
type ParsedMaishaCard = {
    id: string;
    expiryDate: Date;
    isExpired: boolean;
    /** Negative if already expired. Useful for "expires in N days" UI. */
    daysUntilExpiry: number;
};
declare function isMaishaCardExpired(expiry: string | Date): boolean;
/**
 * Parses a Maisha Card. Note: a card is "structurally valid" even when
 * expired — check `isExpired` on the result if you care about that.
 */
declare function parseMaishaCard(input: MaishaCardInput): ParsedMaishaCard | null;

export { type MaishaCardInput, type ParsedKeId, type ParsedMaishaCard, formatKeId, isMaishaCardExpired, isValidKeId, parseKeId, parseMaishaCard };
