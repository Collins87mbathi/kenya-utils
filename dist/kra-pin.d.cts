type KraPinType = "Individual" | "Non-Individual";
type ParsedKraPin = {
    pin: string;
    type: KraPinType;
    prefix: "A" | "P";
    sequence: string;
    checkChar: string;
};
declare function isValidKraPin(input: string): boolean;
declare function parseKraPin(input: string): ParsedKraPin | null;
declare function formatKraPin(input: string): string;

export { type KraPinType, type ParsedKraPin, formatKraPin, isValidKraPin, parseKraPin };
