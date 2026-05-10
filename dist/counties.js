// src/counties/index.ts
var counties = Object.freeze([
  {
    code: 1,
    name: "Mombasa",
    capital: "Mombasa",
    slug: "mombasa",
    region: "Coast",
    subCounties: ["Mvita", "Kisauni", "Nyali", "Likoni", "Changamwe", "Jomvu"]
  },
  {
    code: 2,
    name: "Kwale",
    capital: "Kwale",
    slug: "kwale",
    region: "Coast",
    subCounties: ["Msambweni", "Lunga Lunga", "Matuga", "Kinango"]
  },
  {
    code: 3,
    name: "Kilifi",
    capital: "Kilifi",
    slug: "kilifi",
    region: "Coast",
    subCounties: [
      "Kilifi North",
      "Kilifi South",
      "Kaloleni",
      "Rabai",
      "Ganze",
      "Malindi",
      "Magarini"
    ]
  },
  {
    code: 4,
    name: "Tana River",
    capital: "Hola",
    slug: "tana-river",
    region: "Coast",
    subCounties: ["Garsen", "Galole", "Bura"]
  },
  {
    code: 5,
    name: "Lamu",
    capital: "Lamu",
    slug: "lamu",
    region: "Coast",
    subCounties: ["Lamu East", "Lamu West"]
  },
  {
    code: 6,
    name: "Taita Taveta",
    capital: "Wundanyi",
    slug: "taita-taveta",
    region: "Coast",
    subCounties: ["Taveta", "Wundanyi", "Mwatate", "Voi"]
  },
  {
    code: 7,
    name: "Garissa",
    capital: "Garissa",
    slug: "garissa",
    region: "North Eastern",
    subCounties: [
      "Garissa Township",
      "Balambala",
      "Lagdera",
      "Dadaab",
      "Fafi",
      "Ijara",
      "Hulugho"
    ]
  },
  {
    code: 8,
    name: "Wajir",
    capital: "Wajir",
    slug: "wajir",
    region: "North Eastern",
    subCounties: [
      "Wajir North",
      "Wajir East",
      "Tarbaj",
      "Wajir West",
      "Eldas",
      "Wajir South"
    ]
  },
  {
    code: 9,
    name: "Mandera",
    capital: "Mandera",
    slug: "mandera",
    region: "North Eastern",
    subCounties: [
      "Mandera West",
      "Banissa",
      "Mandera North",
      "Mandera South",
      "Mandera East",
      "Lafey"
    ]
  },
  {
    code: 10,
    name: "Marsabit",
    capital: "Marsabit",
    slug: "marsabit",
    region: "Eastern",
    subCounties: ["Moyale", "North Horr", "Saku", "Laisamis"]
  },
  {
    code: 11,
    name: "Isiolo",
    capital: "Isiolo",
    slug: "isiolo",
    region: "Eastern",
    subCounties: ["Isiolo", "Garbatulla", "Merti"]
  },
  {
    code: 12,
    name: "Meru",
    capital: "Meru",
    slug: "meru",
    region: "Eastern",
    subCounties: [
      "Igembe South",
      "Igembe Central",
      "Igembe North",
      "Tigania West",
      "Tigania East",
      "North Imenti",
      "Buuri",
      "Central Imenti",
      "South Imenti"
    ]
  },
  {
    code: 13,
    name: "Tharaka-Nithi",
    capital: "Kathwana",
    slug: "tharaka-nithi",
    region: "Eastern",
    subCounties: ["Maara", "Chuka/Igambang'ombe", "Tharaka"]
  },
  {
    code: 14,
    name: "Embu",
    capital: "Embu",
    slug: "embu",
    region: "Eastern",
    subCounties: ["Manyatta", "Runyenjes", "Mbeere South", "Mbeere North"]
  },
  {
    code: 15,
    name: "Kitui",
    capital: "Kitui",
    slug: "kitui",
    region: "Eastern",
    subCounties: [
      "Mwingi North",
      "Mwingi West",
      "Mwingi Central",
      "Kitui West",
      "Kitui Rural",
      "Kitui Central",
      "Kitui East",
      "Kitui South"
    ]
  },
  {
    code: 16,
    name: "Machakos",
    capital: "Machakos",
    slug: "machakos",
    region: "Eastern",
    subCounties: [
      "Masinga",
      "Yatta",
      "Kangundo",
      "Matungulu",
      "Kathiani",
      "Mavoko",
      "Machakos Town",
      "Mwala"
    ]
  },
  {
    code: 17,
    name: "Makueni",
    capital: "Wote",
    slug: "makueni",
    region: "Eastern",
    subCounties: [
      "Mbooni",
      "Kilome",
      "Kaiti",
      "Makueni",
      "Kibwezi West",
      "Kibwezi East"
    ]
  },
  {
    code: 18,
    name: "Nyandarua",
    capital: "Ol Kalou",
    slug: "nyandarua",
    region: "Central",
    subCounties: [
      "Kinangop",
      "Kipipiri",
      "Ol Kalou",
      "Ol Joro Orok",
      "Ndaragwa"
    ]
  },
  {
    code: 19,
    name: "Nyeri",
    capital: "Nyeri",
    slug: "nyeri",
    region: "Central",
    subCounties: [
      "Tetu",
      "Kieni",
      "Mathira",
      "Othaya",
      "Mukurwe-ini",
      "Nyeri Town"
    ]
  },
  {
    code: 20,
    name: "Kirinyaga",
    capital: "Kerugoya",
    slug: "kirinyaga",
    region: "Central",
    subCounties: ["Mwea", "Gichugu", "Ndia", "Kirinyaga Central"]
  },
  {
    code: 21,
    name: "Murang'a",
    capital: "Murang'a",
    slug: "muranga",
    region: "Central",
    subCounties: [
      "Kangema",
      "Mathioya",
      "Kiharu",
      "Kigumo",
      "Maragwa",
      "Kandara",
      "Gatanga"
    ]
  },
  {
    code: 22,
    name: "Kiambu",
    capital: "Kiambu",
    slug: "kiambu",
    region: "Central",
    subCounties: [
      "Gatundu South",
      "Gatundu North",
      "Juja",
      "Thika Town",
      "Ruiru",
      "Githunguri",
      "Kiambu",
      "Kiambaa",
      "Kabete",
      "Kikuyu",
      "Limuru",
      "Lari"
    ]
  },
  {
    code: 23,
    name: "Turkana",
    capital: "Lodwar",
    slug: "turkana",
    region: "Rift Valley",
    subCounties: [
      "Turkana North",
      "Turkana West",
      "Turkana Central",
      "Loima",
      "Turkana South",
      "Turkana East"
    ]
  },
  {
    code: 24,
    name: "West Pokot",
    capital: "Kapenguria",
    slug: "west-pokot",
    region: "Rift Valley",
    subCounties: ["Kapenguria", "Sigor", "Kacheliba", "Pokot South"]
  },
  {
    code: 25,
    name: "Samburu",
    capital: "Maralal",
    slug: "samburu",
    region: "Rift Valley",
    subCounties: ["Samburu West", "Samburu North", "Samburu East"]
  },
  {
    code: 26,
    name: "Trans-Nzoia",
    capital: "Kitale",
    slug: "trans-nzoia",
    region: "Rift Valley",
    subCounties: ["Cherangany", "Endebess", "Saboti", "Kiminini", "Kwanza"]
  },
  {
    code: 27,
    name: "Uasin Gishu",
    capital: "Eldoret",
    slug: "uasin-gishu",
    region: "Rift Valley",
    subCounties: ["Soy", "Turbo", "Moiben", "Ainabkoi", "Kapseret", "Kesses"]
  },
  {
    code: 28,
    name: "Elgeyo-Marakwet",
    capital: "Iten",
    slug: "elgeyo-marakwet",
    region: "Rift Valley",
    subCounties: [
      "Marakwet East",
      "Marakwet West",
      "Keiyo North",
      "Keiyo South"
    ]
  },
  {
    code: 29,
    name: "Nandi",
    capital: "Kapsabet",
    slug: "nandi",
    region: "Rift Valley",
    subCounties: [
      "Tinderet",
      "Aldai",
      "Nandi Hills",
      "Chesumei",
      "Emgwen",
      "Mosop"
    ]
  },
  {
    code: 30,
    name: "Baringo",
    capital: "Kabarnet",
    slug: "baringo",
    region: "Rift Valley",
    subCounties: [
      "Tiaty",
      "Baringo North",
      "Baringo Central",
      "Baringo South",
      "Mogotio",
      "Eldama Ravine"
    ]
  },
  {
    code: 31,
    name: "Laikipia",
    capital: "Nanyuki",
    slug: "laikipia",
    region: "Rift Valley",
    subCounties: ["Laikipia West", "Laikipia East", "Laikipia North"]
  },
  {
    code: 32,
    name: "Nakuru",
    capital: "Nakuru",
    slug: "nakuru",
    region: "Rift Valley",
    subCounties: [
      "Molo",
      "Njoro",
      "Naivasha",
      "Gilgil",
      "Kuresoi South",
      "Kuresoi North",
      "Subukia",
      "Rongai",
      "Bahati",
      "Nakuru Town West",
      "Nakuru Town East"
    ]
  },
  {
    code: 33,
    name: "Narok",
    capital: "Narok",
    slug: "narok",
    region: "Rift Valley",
    subCounties: [
      "Kilgoris",
      "Emurua Dikirr",
      "Narok North",
      "Narok East",
      "Narok South",
      "Narok West"
    ]
  },
  {
    code: 34,
    name: "Kajiado",
    capital: "Kajiado",
    slug: "kajiado",
    region: "Rift Valley",
    subCounties: [
      "Kajiado North",
      "Kajiado Central",
      "Kajiado East",
      "Kajiado West",
      "Kajiado South"
    ]
  },
  {
    code: 35,
    name: "Kericho",
    capital: "Kericho",
    slug: "kericho",
    region: "Rift Valley",
    subCounties: [
      "Kipkelion East",
      "Kipkelion West",
      "Ainamoi",
      "Bureti",
      "Belgut",
      "Sigowet/Soin"
    ]
  },
  {
    code: 36,
    name: "Bomet",
    capital: "Bomet",
    slug: "bomet",
    region: "Rift Valley",
    subCounties: [
      "Sotik",
      "Chepalungu",
      "Bomet East",
      "Bomet Central",
      "Konoin"
    ]
  },
  {
    code: 37,
    name: "Kakamega",
    capital: "Kakamega",
    slug: "kakamega",
    region: "Western",
    subCounties: [
      "Lugari",
      "Likuyani",
      "Malava",
      "Lurambi",
      "Navakholo",
      "Mumias West",
      "Mumias East",
      "Matungu",
      "Butere",
      "Khwisero",
      "Shinyalu",
      "Ikolomani"
    ]
  },
  {
    code: 38,
    name: "Vihiga",
    capital: "Mbale",
    slug: "vihiga",
    region: "Western",
    subCounties: ["Vihiga", "Sabatia", "Hamisi", "Luanda", "Emuhaya"]
  },
  {
    code: 39,
    name: "Bungoma",
    capital: "Bungoma",
    slug: "bungoma",
    region: "Western",
    subCounties: [
      "Mt. Elgon",
      "Sirisia",
      "Kabuchai",
      "Bumula",
      "Kanduyi",
      "Webuye East",
      "Webuye West",
      "Kimilili",
      "Tongaren"
    ]
  },
  {
    code: 40,
    name: "Busia",
    capital: "Busia",
    slug: "busia",
    region: "Western",
    subCounties: [
      "Teso North",
      "Teso South",
      "Nambale",
      "Matayos",
      "Butula",
      "Funyula",
      "Budalang'i"
    ]
  },
  {
    code: 41,
    name: "Siaya",
    capital: "Siaya",
    slug: "siaya",
    region: "Nyanza",
    subCounties: [
      "Ugenya",
      "Ugunja",
      "Alego Usonga",
      "Gem",
      "Bondo",
      "Rarieda"
    ]
  },
  {
    code: 42,
    name: "Kisumu",
    capital: "Kisumu",
    slug: "kisumu",
    region: "Nyanza",
    subCounties: [
      "Kisumu East",
      "Kisumu West",
      "Kisumu Central",
      "Seme",
      "Nyando",
      "Muhoroni",
      "Nyakach"
    ]
  },
  {
    code: 43,
    name: "Homa Bay",
    capital: "Homa Bay",
    slug: "homa-bay",
    region: "Nyanza",
    subCounties: [
      "Kasipul",
      "Kabondo Kasipul",
      "Karachuonyo",
      "Rangwe",
      "Homa Bay Town",
      "Ndhiwa",
      "Suba North",
      "Suba South"
    ]
  },
  {
    code: 44,
    name: "Migori",
    capital: "Migori",
    slug: "migori",
    region: "Nyanza",
    subCounties: [
      "Rongo",
      "Awendo",
      "Suna East",
      "Suna West",
      "Uriri",
      "Nyatike",
      "Kuria West",
      "Kuria East"
    ]
  },
  {
    code: 45,
    name: "Kisii",
    capital: "Kisii",
    slug: "kisii",
    region: "Nyanza",
    subCounties: [
      "Bonchari",
      "South Mugirango",
      "Bomachoge Borabu",
      "Bobasi",
      "Bomachoge Chache",
      "Nyaribari Masaba",
      "Nyaribari Chache",
      "Kitutu Chache North",
      "Kitutu Chache South"
    ]
  },
  {
    code: 46,
    name: "Nyamira",
    capital: "Nyamira",
    slug: "nyamira",
    region: "Nyanza",
    subCounties: [
      "Kitutu Masaba",
      "West Mugirango",
      "North Mugirango",
      "Borabu"
    ]
  },
  {
    code: 47,
    name: "Nairobi",
    capital: "Nairobi",
    slug: "nairobi",
    region: "Nairobi",
    subCounties: [
      "Westlands",
      "Dagoretti North",
      "Dagoretti South",
      "Langata",
      "Kibra",
      "Roysambu",
      "Kasarani",
      "Ruaraka",
      "Embakasi South",
      "Embakasi North",
      "Embakasi Central",
      "Embakasi East",
      "Embakasi West",
      "Makadara",
      "Kamukunji",
      "Starehe",
      "Mathare"
    ]
  }
]);
var byCode = new Map(counties.map((c) => [c.code, c]));
var byNameLower = new Map(
  counties.map((c) => [c.name.toLowerCase(), c])
);
var bySlug = new Map(counties.map((c) => [c.slug, c]));
function findCountyByCode(code) {
  return byCode.get(code) ?? null;
}
function findCountyByName(name) {
  if (typeof name !== "string") return null;
  return byNameLower.get(name.trim().toLowerCase()) ?? null;
}
function findCountyBySlug(slug) {
  if (typeof slug !== "string") return null;
  return bySlug.get(slug.trim().toLowerCase()) ?? null;
}
function findCounty(query) {
  if (typeof query === "number") return findCountyByCode(query);
  if (typeof query !== "string") return null;
  const q = query.trim().toLowerCase();
  return byNameLower.get(q) ?? bySlug.get(q) ?? null;
}
function countiesByRegion(region) {
  return counties.filter((c) => c.region === region);
}
function findCountyBySubCounty(subCountyName) {
  if (typeof subCountyName !== "string") return null;
  const q = subCountyName.trim().toLowerCase();
  return counties.find((c) => c.subCounties.some((s) => s.toLowerCase() === q)) ?? null;
}
function allSubCounties() {
  return counties.flatMap(
    (c) => c.subCounties.map((name) => ({ name, countyCode: c.code }))
  );
}

export { allSubCounties, counties, countiesByRegion, findCounty, findCountyByCode, findCountyByName, findCountyBySlug, findCountyBySubCounty };
//# sourceMappingURL=counties.js.map
//# sourceMappingURL=counties.js.map