import { formatKes, parseKes, toKesWords } from "./index";

  describe("formatKes", () => {
    it("formats with default options", () => {
      expect(formatKes(1234567)).toBe("Ksh 1,234,567.00");
    });

    it("respects decimals: 0", () => {
      expect(formatKes(1234567, { decimals: 0 })).toBe("Ksh 1,234,567");
    });

    it("supports KES symbol", () => {
      expect(formatKes(1234, { symbol: "KES" })).toBe("KES 1,234.00");
    });

    it("supports no symbol", () => {
      expect(formatKes(1234, { symbol: "" })).toBe("1,234.00");
    });

    it("supports no spacing", () => {
      expect(formatKes(1234, { spacing: false })).toBe("Ksh1,234.00");
    });

    it("formats decimals", () => {
      expect(formatKes(1234.5)).toBe("Ksh 1,234.50");
      expect(formatKes(0.5)).toBe("Ksh 0.50");
    });

    it("handles negatives", () => {
      expect(formatKes(-1234)).toBe("Ksh -1,234.00");
    });

    it("returns empty string on invalid input", () => {
      // @ts-expect-error testing runtime safety
      expect(formatKes("abc")).toBe("");
      expect(formatKes(NaN)).toBe("");
      expect(formatKes(Infinity)).toBe("");
    });
  });

  describe("parseKes", () => {
    it("parses Ksh-prefixed", () => {
      expect(parseKes("Ksh 1,234,567.50")).toBe(1234567.5);
    });

    it("parses KES-prefixed", () => {
      expect(parseKes("KES 1,234")).toBe(1234);
    });

    it("parses Sh-prefixed", () => {
      expect(parseKes("Sh. 100.00")).toBe(100);
    });

    it("parses 'shillings' suffix", () => {
      expect(parseKes("500 shillings")).toBe(500);
    });

    it("parses bare numbers", () => {
      expect(parseKes("1234.5")).toBe(1234.5);
    });

    it("handles negatives", () => {
      expect(parseKes("Ksh -1,234")).toBe(-1234);
    });

    it("returns null on garbage", () => {
      expect(parseKes("hello")).toBeNull();
      expect(parseKes("")).toBeNull();
      expect(parseKes("Ksh abc")).toBeNull();
    });
  });

  describe("toKesWords", () => {
    it("handles zero", () => {
      expect(toKesWords(0)).toBe("zero shillings");
    });

    it("handles one", () => {
      expect(toKesWords(1)).toBe("one shilling");
    });

    it("handles small amounts", () => {
      expect(toKesWords(15)).toBe("fifteen shillings");
      expect(toKesWords(42)).toBe("forty two shillings");
      expect(toKesWords(100)).toBe("one hundred shillings");
    });

    it("handles thousands", () => {
      expect(toKesWords(1000)).toBe("one thousand shillings");
      expect(toKesWords(1234)).toBe("one thousand two hundred thirty four shillings");
    });

    it("handles millions", () => {
      expect(toKesWords(1000000)).toBe("one million shillings");
      expect(toKesWords(2500000)).toBe("two million five hundred thousand shillings");
    });

    it("handles cents", () => {
      expect(toKesWords(0.5)).toBe("fifty cents");
      expect(toKesWords(0.01)).toBe("one cent");
      expect(toKesWords(1.5)).toBe("one shilling and fifty cents");
      expect(toKesWords(1234.5)).toBe(
        "one thousand two hundred thirty four shillings and fifty cents",
      );
    });

    it("avoids floating-point cent errors", () => {
      expect(toKesWords(0.1 + 0.2)).toBe("thirty cents");
    });

    it("handles negatives", () => {
      expect(toKesWords(-100)).toBe("negative one hundred shillings");
    });

    it("returns empty string on bad input", () => {
      expect(toKesWords(NaN)).toBe("");
      expect(toKesWords(Infinity)).toBe("");
      // @ts-expect-error testing runtime safety
      expect(toKesWords("100")).toBe("");
    });
  });