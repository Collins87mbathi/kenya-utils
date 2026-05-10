type KesFormatOptions = {
    decimals?: 0 | 2;
    symbol?: "Ksh" | "KES" | "Sh" | "";
    spacing?: boolean;
};
declare function formatKes(amount: number, options?: KesFormatOptions): string;
declare function parseKes(input: string): number | null;
declare function toKesWords(amount: number): string;

export { type KesFormatOptions, formatKes, parseKes, toKesWords };
