type KenyanRegion = "Nairobi" | "Coast" | "North Eastern" | "Eastern" | "Central" | "Rift Valley" | "Western" | "Nyanza";
type County = {
    code: number;
    name: string;
    capital: string;
    slug: string;
    region: KenyanRegion;
    subCounties: readonly string[];
};
declare const counties: readonly County[];
declare function findCountyByCode(code: number): County | null;
declare function findCountyByName(name: string): County | null;
declare function findCountyBySlug(slug: string): County | null;
declare function findCounty(query: string | number): County | null;
declare function countiesByRegion(region: KenyanRegion): County[];
/** Find which county a sub-county belongs to. Case-insensitive. */
declare function findCountyBySubCounty(subCountyName: string): County | null;
/** Flat list of all sub-counties with their parent county code. */
declare function allSubCounties(): {
    name: string;
    countyCode: number;
}[];

export { type County, type KenyanRegion, allSubCounties, counties, countiesByRegion, findCounty, findCountyByCode, findCountyByName, findCountyBySlug, findCountyBySubCounty };
