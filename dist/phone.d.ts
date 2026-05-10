type KenyanNetwork = "Safaricom" | "Airtel" | "Telkom" | "Equitel" | "Faiba" | "Unknown";
type ParsedPhone = {
    e164: string;
    national: string;
    international: string;
    subscriber: string;
    network: KenyanNetwork;
    countryCode: "254";
};
declare function detectNetwork(input: string): KenyanNetwork;
declare function isValidKePhone(input: string): boolean;
declare function parsePhone(input: string): ParsedPhone | null;
declare function formatPhone(input: string, format?: "e164" | "national" | "international"): string;

export { type KenyanNetwork, type ParsedPhone, detectNetwork, formatPhone, isValidKePhone, parsePhone };
