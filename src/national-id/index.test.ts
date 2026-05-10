import {                                                                  
    isValidKeId,  
    parseKeId,
    formatKeId,
    isMaishaCardExpired,
    parseMaishaCard,
  } from "./index";

  describe("isValidKeId", () => {
    it("accepts 8-digit IDs", () => {
      expect(isValidKeId("12345678")).toBe(true);
    });

    it("accepts older 7-digit IDs", () => {
      expect(isValidKeId("1234567")).toBe(true);
    });

    it("keeps leading zeros valid", () => {
      expect(isValidKeId("00123456")).toBe(true);
    });

    it("ignores whitespace and hyphens", () => {
      expect(isValidKeId("1234 5678")).toBe(true);
      expect(isValidKeId("1234-5678")).toBe(true);
    });

    it("rejects too short", () => {
      expect(isValidKeId("123456")).toBe(false);
    });

    it("rejects too long", () => {
      expect(isValidKeId("123456789")).toBe(false);
    });

    it("rejects non-numeric", () => {
      expect(isValidKeId("12A45678")).toBe(false);
    });

    it("rejects empty and non-string input", () => {
      expect(isValidKeId("")).toBe(false);
      // @ts-expect-error testing runtime guard
      expect(isValidKeId(null)).toBe(false);
    });
  });

  describe("parseKeId", () => {
    it("parses an 8-digit ID", () => {
      expect(parseKeId("12345678")).toEqual({
        id: "12345678",
        digits: 8,
        isLegacy: false,
      });
    });

    it("flags 7-digit IDs as legacy", () => {
      expect(parseKeId("1234567")).toEqual({
        id: "1234567",
        digits: 7,
        isLegacy: true,
      });
    });

    it("returns null on garbage", () => {
      expect(parseKeId("hi")).toBeNull();
    });
  });

  describe("formatKeId", () => {
    it("strips whitespace from valid IDs", () => {
      expect(formatKeId("1234 5678")).toBe("12345678");
    });

    it("returns input unchanged when it can't parse", () => {
      expect(formatKeId("garbage")).toBe("garbage");
    });
  });

  describe("isMaishaCardExpired", () => {
    it("flags past dates as expired", () => {
      expect(isMaishaCardExpired("2020-01-01")).toBe(true);
    });

    it("flags future dates as not expired", () => {
      const future = new Date();
      future.setFullYear(future.getFullYear() + 5);
      expect(isMaishaCardExpired(future)).toBe(false);
    });

    it("treats unparseable dates as not expired", () => {
      expect(isMaishaCardExpired("not a date")).toBe(false);
    });
  });

  describe("parseMaishaCard", () => {
    it("parses a card with a future expiry", () => {
      const future = new Date();
      future.setFullYear(future.getFullYear() + 3);

      const result = parseMaishaCard({ id: "12345678", expiry: future });

      expect(result).not.toBeNull();
      expect(result?.id).toBe("12345678");
      expect(result?.isExpired).toBe(false);
      expect(result?.daysUntilExpiry).toBeGreaterThan(0);
    });

    it("flags expired cards", () => {
      const result = parseMaishaCard({
        id: "12345678",
        expiry: "2020-01-01",
      });
      expect(result?.isExpired).toBe(true);
      expect(result?.daysUntilExpiry).toBeLessThan(0);
    });

    it("returns null when the ID is invalid", () => {
      expect(
        parseMaishaCard({ id: "garbage", expiry: "2030-01-01" }),
      ).toBeNull();
    });

    it("returns null when the expiry won't parse", () => {
      expect(
        parseMaishaCard({ id: "12345678", expiry: "not a date" }),
      ).toBeNull();
    });
  });