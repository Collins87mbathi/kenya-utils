import { isValidKraPin, parseKraPin, formatKraPin } from "./index";

  describe("isValidKraPin", () => {
    it("accepts an Individual PIN (A prefix)", () => {
      expect(isValidKraPin("A123456789B")).toBe(true);
    });

    it("accepts a Non-Individual PIN (P prefix)", () => {
      expect(isValidKraPin("P987654321Z")).toBe(true);
    });

    it("accepts lowercase and mixed case", () => {
      expect(isValidKraPin("a123456789b")).toBe(true);
      expect(isValidKraPin("p987654321z")).toBe(true);
    });

    it("strips whitespace and hyphens", () => {
      expect(isValidKraPin("A 123 456 789 B")).toBe(true);
      expect(isValidKraPin("A-123-456-789-B")).toBe(true);
    });

    it("rejects wrong prefix", () => {
      expect(isValidKraPin("B123456789C")).toBe(false);
      expect(isValidKraPin("1123456789B")).toBe(false);
    });

    it("rejects wrong length", () => {
      expect(isValidKraPin("A12345678B")).toBe(false); // 10 chars
      expect(isValidKraPin("A1234567890B")).toBe(false); // 12 chars
    });

    it("rejects letters in the middle", () => {
      expect(isValidKraPin("A12345A789B")).toBe(false);
    });

    it("rejects digit at the end", () => {
      expect(isValidKraPin("A1234567899")).toBe(false);
    });

    it("rejects garbage", () => {
      expect(isValidKraPin("")).toBe(false);
      expect(isValidKraPin("hello")).toBe(false);
      // @ts-expect-error testing runtime safety
      expect(isValidKraPin(null)).toBe(false);
      // @ts-expect-error testing runtime safety
      expect(isValidKraPin(undefined)).toBe(false);
    });
  });

  describe("parseKraPin", () => {
    it("parses an Individual PIN", () => {
      expect(parseKraPin("A123456789B")).toEqual({
        pin: "A123456789B",
        type: "Individual",
        prefix: "A",
        sequence: "123456789",
        checkChar: "B",
      });
    });

    it("parses a Non-Individual PIN", () => {
      expect(parseKraPin("P987654321Z")).toEqual({
        pin: "P987654321Z",
        type: "Non-Individual",
        prefix: "P",
        sequence: "987654321",
        checkChar: "Z",
      });
    });

    it("normalizes case and whitespace", () => {
      expect(parseKraPin("a 123-456-789 b")?.pin).toBe("A123456789B");
    });

    it("returns null on invalid input", () => {
      expect(parseKraPin("garbage")).toBeNull();
      expect(parseKraPin("")).toBeNull();
    });
  });

  describe("formatKraPin", () => {
    it("normalizes a valid PIN", () => {
      expect(formatKraPin("a 123 456 789 b")).toBe("A123456789B");
    });

    it("returns input unchanged on failure", () => {
      expect(formatKraPin("garbage")).toBe("garbage");
    });
  });