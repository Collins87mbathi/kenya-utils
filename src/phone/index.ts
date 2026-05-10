  // Kenyan numbers come in three common shapes: +254712345678,             
  // 254712345678, and 0712345678. We normalise everything to a 9-digit
  // subscriber number first, then build the other formats from that.
  //
  // Mobile prefixes start with 7 or 1; anything else (e.g. 020 landlines)
  // is rejected. Network detection is best-effort — number portability
  // means a "Safaricom prefix" can actually be on Airtel, but the original
  // carrier is right ~95% of the time.

  export type KenyanNetwork =
    | "Safaricom"
    | "Airtel"
    | "Telkom"
    | "Equitel"
    | "Faiba"
    | "Unknown";

  export type ParsedPhone = {
    e164: string;
    national: string;
    international: string;
    subscriber: string;
    network: KenyanNetwork;
    countryCode: "254";
  };

  const KE_PREFIX = "254";
  const SUBSCRIBER_LEN = 9;

  const clean = (input: string) => input.replace(/[\s\-().]/g, "");

  function toSubscriber(input: string): string | null {
    const trimmed = clean(input);
    if (!/^\+?\d+$/.test(trimmed)) return null;

    let digits = trimmed.replace(/^\+/, "");

    if (digits.startsWith(KE_PREFIX)) {
      digits = digits.slice(KE_PREFIX.length);
    } else if (digits.startsWith("0")) {
      digits = digits.slice(1);
    } else if (digits.length !== SUBSCRIBER_LEN) {
      return null;
    }

    return digits.length === SUBSCRIBER_LEN ? digits : null;
  }

  export function detectNetwork(input: string): KenyanNetwork {
    const sub = toSubscriber(input);
    if (!sub) return "Unknown";

    const p3 = sub.slice(0, 3);
    const p2 = sub.slice(0, 2);

    if (sub.startsWith("747")) return "Faiba";

    if (["763", "764", "765", "766"].includes(p3)) return "Equitel";

    if (
      p3.startsWith("77") ||
      ["120", "121", "122", "123", "124", "125", "126", "127", "128",
  "129"].includes(p3)
    ) {
      return "Telkom";
    }

    if (
      ["730", "731", "732", "733", "734", "735", "736", "737", "738",
  "739"].includes(p3) ||
      ["750", "751", "752", "753", "754", "755", "756"].includes(p3) ||
      ["780", "781", "782", "783", "784", "785", "786", "787", "788",
  "789"].includes(p3) ||
      ["100", "101", "102"].includes(p3) ||
      ["116", "117", "118", "119"].includes(p3)
    ) {
      return "Airtel";
    }

    if (
      p2 === "70" ||
      p2 === "71" ||
      p2 === "72" ||
      ["740", "741", "742", "743", "744", "745", "746", "748",
  "749"].includes(p3) ||
      ["757", "758", "759", "768", "769"].includes(p3) ||
      p2 === "79" ||
      ["110", "111", "112", "113", "114", "115"].includes(p3)
    ) {
      return "Safaricom";
    }

    return "Unknown";
  }

  export function isValidKePhone(input: string): boolean {
    const sub = toSubscriber(input);
    if (!sub) return false;
    return /^[71]/.test(sub);
  }

  export function parsePhone(input: string): ParsedPhone | null {
    const subscriber = toSubscriber(input);
    if (!subscriber || !/^[71]/.test(subscriber)) return null;

    return {
      e164: `+${KE_PREFIX}${subscriber}`,
      national: `0${subscriber}`,
      international: [
        `+${KE_PREFIX}`,
        subscriber.slice(0, 3),
        subscriber.slice(3, 6),
        subscriber.slice(6),
      ].join(" "),
      subscriber,
      network: detectNetwork(subscriber),
      countryCode: "254",
    };
  }

  export function formatPhone(
    input: string,
    format: "e164" | "national" | "international" = "e164",
  ): string {
    const parsed = parsePhone(input);
    return parsed ? parsed[format] : input;
  }