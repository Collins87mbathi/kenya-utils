  // KRA PIN is 11 chars: prefix letter + 9 digits + check letter.
  // A = Individual, P = Non-Individual (company, partnership, etc.).

  export type KraPinType = "Individual" | "Non-Individual";

  export type ParsedKraPin = {
    pin: string;
    type: KraPinType;
    prefix: "A" | "P";
    sequence: string;
    checkChar: string;
  };

  const KRA_PIN_REGEX = /^[AP]\d{9}[A-Z]$/;
  const normalize = (input: string) => input.replace(/[\s-]/g,
  "").toUpperCase();

  export function isValidKraPin(input: string): boolean {
    if (typeof input !== "string") return false;
    return KRA_PIN_REGEX.test(normalize(input));
  }

  export function parseKraPin(input: string): ParsedKraPin | null {
    if (typeof input !== "string") return null;
    const pin = normalize(input);
    if (!KRA_PIN_REGEX.test(pin)) return null;

    const prefix = pin[0] as "A" | "P";
    return {
      pin,
      type: prefix === "A" ? "Individual" : "Non-Individual",
      prefix,
      sequence: pin.slice(1, 10),
      checkChar: pin[10] as string,
    };
  }

  export function formatKraPin(input: string): string {
    const parsed = parseKraPin(input);
    return parsed ? parsed.pin : input;
  }