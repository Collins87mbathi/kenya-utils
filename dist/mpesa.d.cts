type MpesaTransactionType = "sent" | "received" | "paybill" | "buygoods" | "withdraw" | "airtime" | "unknown";
type ParsedMpesaSms = {
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
declare function isValidPaybill(input: string | number): boolean;
declare function isValidTillNumber(input: string | number): boolean;
declare function isMpesaSms(text: string): boolean;
declare function parseMpesaSms(text: string): ParsedMpesaSms | null;

export { type MpesaTransactionType, type ParsedMpesaSms, isMpesaSms, isValidPaybill, isValidTillNumber, parseMpesaSms };
