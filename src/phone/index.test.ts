import {
  parsePhone,
  isValidKePhone,
  formatPhone,
  detectNetwork,
} from "./index";

describe("parsePhone", () => {
  it("parses E.164 format", () => {
    expect(parsePhone("+254712345678")).toEqual({
      e164: "+254712345678",
      national: "0712345678",
      international: "+254 712 345 678",
      subscriber: "712345678",
      network: "Safaricom",
      countryCode: "254",
    });
  });

  it("parses 254-prefixed (no plus)", () => {
    expect(parsePhone("254712345678")?.e164).toBe("+254712345678");
  });

  it("parses local 0-prefixed format", () => {
    expect(parsePhone("0712345678")?.e164).toBe("+254712345678");
  });

  it("parses bare 9-digit subscriber", () => {
    expect(parsePhone("712345678")?.e164).toBe("+254712345678");
  });

  it("strips whitespace, hyphens, dots, parens", () => {
    expect(parsePhone("+254 (712) 345-678")?.e164).toBe("+254712345678");
    expect(parsePhone("0712.345.678")?.e164).toBe("+254712345678");
  });

  it("returns null for non-Kenyan country code", () => {
    expect(parsePhone("+1234567890")).toBeNull();
  });

  it("returns null for too-short numbers", () => {
    expect(parsePhone("071234")).toBeNull();
  });

  it("returns null for landlines (02X, 04X)", () => {
    expect(parsePhone("0202345678")).toBeNull();
  });

  it("returns null for garbage input", () => {
    expect(parsePhone("not a phone")).toBeNull();
    expect(parsePhone("")).toBeNull();
  });
});

describe("isValidKePhone", () => {
  it("accepts valid mobile formats", () => {
    expect(isValidKePhone("+254712345678")).toBe(true);
    expect(isValidKePhone("0712345678")).toBe(true);
    expect(isValidKePhone("0110123456")).toBe(true); // newer 1XX range
  });

  it("rejects landlines and garbage", () => {
    expect(isValidKePhone("0202345678")).toBe(false);
    expect(isValidKePhone("hello")).toBe(false);
  });
});

describe("formatPhone", () => {
  it("formats to e164 by default", () => {
    expect(formatPhone("0712345678")).toBe("+254712345678");
  });

  it("formats to national", () => {
    expect(formatPhone("+254712345678", "national")).toBe("0712345678");
  });

  it("formats to international (pretty)", () => {
    expect(formatPhone("+254712345678", "international")).toBe(
      "+254 712 345 678",
    );
  });

  it("returns the original input on failure", () => {
    expect(formatPhone("garbage")).toBe("garbage");
  });
});

describe("detectNetwork", () => {
  it("detects Safaricom", () => {
    expect(detectNetwork("0712345678")).toBe("Safaricom");
    expect(detectNetwork("0790123456")).toBe("Safaricom");
    expect(detectNetwork("0110123456")).toBe("Safaricom");
  });

  it("detects Airtel", () => {
    expect(detectNetwork("0730123456")).toBe("Airtel");
    expect(detectNetwork("0780123456")).toBe("Airtel");
  });

  it("detects Telkom", () => {
    expect(detectNetwork("0770123456")).toBe("Telkom");
  });

  it("detects Equitel", () => {
    expect(detectNetwork("0763123456")).toBe("Equitel");
  });

  it("detects Faiba", () => {
    expect(detectNetwork("0747123456")).toBe("Faiba");
  });

  it("returns Unknown for unrecognized prefix", () => {
    expect(detectNetwork("garbage")).toBe("Unknown");
  });

  it("detects Airtel", () => {
    expect(detectNetwork("0730123456")).toBe("Airtel");
    expect(detectNetwork("0780123456")).toBe("Airtel");
  });

  it("detects Telkom", () => {
    expect(detectNetwork("0770123456")).toBe("Telkom");
  });

  it("detects Equitel", () => {
    expect(detectNetwork("0763123456")).toBe("Equitel");
  });

  it("detects Faiba", () => {
    expect(detectNetwork("0747123456")).toBe("Faiba");
  });

  it("returns Unknown for unrecognized prefix", () => {
    expect(detectNetwork("garbage")).toBe("Unknown");
  });
});
