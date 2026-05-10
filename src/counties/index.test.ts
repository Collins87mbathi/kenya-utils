import {                                                                                                                             
    counties,
    findCounty,                                                                                                                        
    findCountyByCode,
    findCountyByName,
    findCountyBySlug,
    countiesByRegion,
    findCountyBySubCounty,
    allSubCounties,
  } from "./index";

  describe("counties dataset", () => {
    it("contains exactly 47 counties", () => {
      expect(counties).toHaveLength(47);
    });

    it("has unique codes 1-47", () => {
      const codes = counties.map((c) => c.code).sort((a, b) => a - b);
      expect(codes).toEqual(Array.from({ length: 47 }, (_, i) => i + 1));
    });

    it("has unique slugs", () => {
      const slugs = new Set(counties.map((c) => c.slug));
      expect(slugs.size).toBe(47);
    });

    it("is frozen (immutable)", () => {
      expect(Object.isFrozen(counties)).toBe(true);
    });
  });

  describe("findCountyByCode", () => {
    it("finds Nairobi (47)", () => {
      expect(findCountyByCode(47)?.name).toBe("Nairobi");
    });

    it("finds Mombasa (1)", () => {
      expect(findCountyByCode(1)?.name).toBe("Mombasa");
    });

    it("returns null for out-of-range codes", () => {
      expect(findCountyByCode(0)).toBeNull();
      expect(findCountyByCode(48)).toBeNull();
      expect(findCountyByCode(-1)).toBeNull();
    });
  });

  describe("findCountyByName", () => {
    it("matches exact name", () => {
      expect(findCountyByName("Kakamega")?.code).toBe(37);
    });

    it("is case-insensitive", () => {
      expect(findCountyByName("nairobi")?.code).toBe(47);
      expect(findCountyByName("KISUMU")?.code).toBe(42);
    });

    it("trims whitespace", () => {
      expect(findCountyByName("  Nyeri  ")?.code).toBe(19);
    });

    it("returns null for unknown names", () => {
      expect(findCountyByName("Atlantis")).toBeNull();
    });
  });

  describe("findCountyBySlug", () => {
    it("matches by slug", () => {
      expect(findCountyBySlug("tana-river")?.name).toBe("Tana River");
      expect(findCountyBySlug("elgeyo-marakwet")?.name).toBe("Elgeyo-Marakwet");
    });

    it("returns null for unknown slug", () => {
      expect(findCountyBySlug("not-a-county")).toBeNull();
    });
  });

  describe("findCounty (smart)", () => {
    it("accepts a numeric code", () => {
      expect(findCounty(47)?.name).toBe("Nairobi");
    });

    it("accepts a name", () => {
      expect(findCounty("Mombasa")?.code).toBe(1);
    });

    it("accepts a slug", () => {
      expect(findCounty("tana-river")?.code).toBe(4);
    });

    it("returns null for garbage", () => {
      expect(findCounty("Atlantis")).toBeNull();
      expect(findCounty(999)).toBeNull();
    });
  });

  describe("countiesByRegion", () => {
    it("returns all Coast counties", () => {
      const coast = countiesByRegion("Coast");
      expect(coast).toHaveLength(6);
      expect(coast.map((c) => c.name)).toContain("Mombasa");
    });

    it("returns Nairobi only for Nairobi region", () => {
      const nairobi = countiesByRegion("Nairobi");
      expect(nairobi).toHaveLength(1);
      expect(nairobi[0]?.name).toBe("Nairobi");
    });
  });

  describe("subCounties", () => {
    it("Nairobi has 17 sub-counties", () => {
      const nairobi = findCountyByCode(47);
      expect(nairobi?.subCounties).toHaveLength(17);
      expect(nairobi?.subCounties).toContain("Kibra");
    });

    it("Mombasa lists all six", () => {
      const mombasa = findCountyByCode(1);
      expect(mombasa?.subCounties).toEqual(
        expect.arrayContaining([
          "Mvita",
          "Kisauni",
          "Nyali",
          "Likoni",
          "Changamwe",
          "Jomvu",
        ]),
      );
    });
  });

  describe("findCountyBySubCounty", () => {
    it("finds the parent county", () => {
      expect(findCountyBySubCounty("Westlands")?.name).toBe("Nairobi");
      expect(findCountyBySubCounty("Mvita")?.name).toBe("Mombasa");
    });

    it("is case-insensitive", () => {
      expect(findCountyBySubCounty("KIBRA")?.code).toBe(47);
    });

    it("returns null for unknown", () => {
      expect(findCountyBySubCounty("Atlantis")).toBeNull();
    });
  });

  describe("allSubCounties", () => {
    it("returns a flat list with county codes attached", () => {
      const all = allSubCounties();
      expect(all.length).toBeGreaterThan(280);
      expect(all.length).toBeLessThan(310);
      expect(all[0]).toHaveProperty("name");
      expect(all[0]).toHaveProperty("countyCode");
    });
  });