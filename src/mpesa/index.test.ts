import {
    isValidPaybill,
    isValidTillNumber,
    isMpesaSms,
    parseMpesaSms,
  } from "./index";

  describe("isValidPaybill", () => {
    it("accepts 5-7 digit paybills", () => {
      expect(isValidPaybill("12345")).toBe(true);
      expect(isValidPaybill(123456)).toBe(true);
      expect(isValidPaybill("1234567")).toBe(true);
    });

    it("rejects bad input", () => {
      expect(isValidPaybill("1234")).toBe(false);
      expect(isValidPaybill("12345678")).toBe(false);
      expect(isValidPaybill("ABC123")).toBe(false);
    });
  });

  describe("isValidTillNumber", () => {
    it("accepts 5-7 digit tills", () => {
      expect(isValidTillNumber("123456")).toBe(true);
    });

    it("rejects bad input", () => {
      expect(isValidTillNumber("12")).toBe(false);
    });
  });

  describe("isMpesaSms", () => {
    it("recognises a real M-PESA SMS by its transaction ID prefix", () => {
      expect(
        isMpesaSms(
          "QHJ7K8L9M0 Confirmed. Ksh1,000.00 sent to JOHN DOE 0712345678 on 9/5/26 at 10:30 AM. New M-PESA balance is Ksh5,000.00. Transaction cost, Ksh23.00.",
        ),
      ).toBe(true);
    });

    it("rejects random text", () => {
      expect(isMpesaSms("hello world")).toBe(false);
    });
  });

  describe("parseMpesaSms", () => {
    it("parses a sent-to-person transaction", () => {
      const sms =
        "QHJ7K8L9M0 Confirmed. Ksh1,000.00 sent to JOHN DOE 0712345678 on 9/5/26 at 10:30 AM. New M-PESA balance is Ksh5,000.00. Transaction cost, Ksh23.00.";
      const r = parseMpesaSms(sms);

      expect(r?.transactionId).toBe("QHJ7K8L9M0");
      expect(r?.type).toBe("sent");
      expect(r?.amount).toBe(1000);
      expect(r?.party).toBe("JOHN DOE");
      expect(r?.partyPhone).toBe("0712345678");
      expect(r?.balance).toBe(5000);
      expect(r?.transactionCost).toBe(23);
      expect(r?.date).toBeInstanceOf(Date);
    });

    it("parses a received transaction", () => {
      const sms =
        "QHJ7K8L9M0 Confirmed. You have received Ksh1,500.00 from JANE DOE 0722123456 on 9/5/26 at 11:00 AM. New M-PESA balance is Ksh6,500.00.";
      const r = parseMpesaSms(sms);

      expect(r?.type).toBe("received");
      expect(r?.amount).toBe(1500);
      expect(r?.party).toBe("JANE DOE");
      expect(r?.partyPhone).toBe("0722123456");
    });

    it("parses a paybill transaction", () => {
      const sms =
        "ABC123XYZ0 Confirmed. Ksh500.00 sent to KENYA POWER for account 12345678 on 9/5/26 at 9:00 AM. New M-PESA balance is Ksh4,500.00. Transaction cost, Ksh23.00.";
      const r = parseMpesaSms(sms);

      expect(r?.type).toBe("paybill");
      expect(r?.party).toBe("KENYA POWER");
      expect(r?.accountNumber).toBe("12345678");
    });

    it("parses a buy-goods transaction (no phone)", () => {
      const sms =
        "DEF456ABC0 Confirmed. Ksh50.00 sent to JAVA HOUSE on 9/5/26 at 12:00 PM. New M-PESA balance is Ksh4,450.00.";
      const r = parseMpesaSms(sms);

      expect(r?.type).toBe("buygoods");
      expect(r?.party).toBe("JAVA HOUSE");
      expect(r?.partyPhone).toBeUndefined();
    });

    it("returns null for non-M-PESA text", () => {
      expect(parseMpesaSms("just a string")).toBeNull();
    });
  });