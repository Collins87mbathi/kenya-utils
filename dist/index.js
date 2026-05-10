// src/phone/index.ts
var KE_PREFIX = "254";
var SUBSCRIBER_LEN = 9;
var clean = (input) => input.replace(/[\s\-().]/g, "");
function toSubscriber(input) {
  const trimmed = clean(input);
  if (!/^\+?\d+$/.test(trimmed)) return null;
  let digits = trimmed.replace(/^\+/, "");
  if (digits.startsWith(KE_PREFIX)) {
    digits = digits.slice(KE_PREFIX.length);
  } else if (digits.startsWith("0")) {
    digits = digits.slice(1);
  } else if (digits.length !== SUBSCRIBER_LEN) {
    return null;
  }
  return digits.length === SUBSCRIBER_LEN ? digits : null;
}
function detectNetwork(input) {
  const sub = toSubscriber(input);
  if (!sub) return "Unknown";
  const p3 = sub.slice(0, 3);
  const p2 = sub.slice(0, 2);
  if (sub.startsWith("747")) return "Faiba";
  if (["763", "764", "765", "766"].includes(p3)) return "Equitel";
  if (p3.startsWith("77") || [
    "120",
    "121",
    "122",
    "123",
    "124",
    "125",
    "126",
    "127",
    "128",
    "129"
  ].includes(p3)) {
    return "Telkom";
  }
  if ([
    "730",
    "731",
    "732",
    "733",
    "734",
    "735",
    "736",
    "737",
    "738",
    "739"
  ].includes(p3) || ["750", "751", "752", "753", "754", "755", "756"].includes(p3) || [
    "780",
    "781",
    "782",
    "783",
    "784",
    "785",
    "786",
    "787",
    "788",
    "789"
  ].includes(p3) || ["100", "101", "102"].includes(p3) || ["116", "117", "118", "119"].includes(p3)) {
    return "Airtel";
  }
  if (p2 === "70" || p2 === "71" || p2 === "72" || [
    "740",
    "741",
    "742",
    "743",
    "744",
    "745",
    "746",
    "748",
    "749"
  ].includes(p3) || ["757", "758", "759", "768", "769"].includes(p3) || p2 === "79" || ["110", "111", "112", "113", "114", "115"].includes(p3)) {
    return "Safaricom";
  }
  return "Unknown";
}
function isValidKePhone(input) {
  const sub = toSubscriber(input);
  if (!sub) return false;
  return /^[71]/.test(sub);
}
function parsePhone(input) {
  const subscriber = toSubscriber(input);
  if (!subscriber || !/^[71]/.test(subscriber)) return null;
  return {
    e164: `+${KE_PREFIX}${subscriber}`,
    national: `0${subscriber}`,
    international: [
      `+${KE_PREFIX}`,
      subscriber.slice(0, 3),
      subscriber.slice(3, 6),
      subscriber.slice(6)
    ].join(" "),
    subscriber,
    network: detectNetwork(subscriber),
    countryCode: "254"
  };
}
function formatPhone(input, format = "e164") {
  const parsed = parsePhone(input);
  return parsed ? parsed[format] : input;
}

// src/kra-pin/index.ts
var KRA_PIN_REGEX = /^[AP]\d{9}[A-Z]$/;
var normalize = (input) => input.replace(
  /[\s-]/g,
  ""
).toUpperCase();
function isValidKraPin(input) {
  if (typeof input !== "string") return false;
  return KRA_PIN_REGEX.test(normalize(input));
}
function parseKraPin(input) {
  if (typeof input !== "string") return null;
  const pin = normalize(input);
  if (!KRA_PIN_REGEX.test(pin)) return null;
  const prefix = pin[0];
  return {
    pin,
    type: prefix === "A" ? "Individual" : "Non-Individual",
    prefix,
    sequence: pin.slice(1, 10),
    checkChar: pin[10]
  };
}
function formatKraPin(input) {
  const parsed = parseKraPin(input);
  return parsed ? parsed.pin : input;
}

// src/national-id/index.ts
var KE_ID_REGEX = /^\d{7,8}$/;
var stripWhitespace = (input) => input.replace(/[\s-]/g, "");
function isValidKeId(input) {
  if (typeof input !== "string") return false;
  return KE_ID_REGEX.test(stripWhitespace(input));
}
function parseKeId(input) {
  if (typeof input !== "string") return null;
  const id = stripWhitespace(input);
  if (!KE_ID_REGEX.test(id)) return null;
  const digits = id.length;
  return {
    id,
    digits,
    isLegacy: digits === 7
  };
}
function formatKeId(input) {
  const parsed = parseKeId(input);
  return parsed ? parsed.id : input;
}
var toDate = (value) => {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }
  if (typeof value !== "string") return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
};
function isMaishaCardExpired(expiry) {
  const d = toDate(expiry);
  if (!d) return false;
  return d.getTime() <= Date.now();
}
function parseMaishaCard(input) {
  const parsedId = parseKeId(input.id);
  if (!parsedId) return null;
  const expiryDate = toDate(input.expiry);
  if (!expiryDate) return null;
  const msPerDay = 1e3 * 60 * 60 * 24;
  const daysUntilExpiry = Math.ceil(
    (expiryDate.getTime() - Date.now()) / msPerDay
  );
  return {
    id: parsedId.id,
    expiryDate,
    isExpired: daysUntilExpiry <= 0,
    daysUntilExpiry
  };
}

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

// src/currency/index.ts
var ONES = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen"
];
var TENS = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety"
];
var SCALES = ["", "thousand", "million", "billion", "trillion"];
function formatKes(amount, options = {}) {
  if (typeof amount !== "number" || !Number.isFinite(amount)) return "";
  const { decimals = 2, symbol = "Ksh", spacing = true } = options;
  const formatted = amount.toLocaleString("en-KE", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
  if (!symbol) return formatted;
  return `${symbol}${spacing ? " " : ""}${formatted}`;
}
function parseKes(input) {
  if (typeof input !== "string") return null;
  const cleaned = input.replace(/shillings?|ksh|kes|sh\.?/gi, "").replace(/[,\s]/g, "").trim();
  if (!cleaned || !/^-?\d+(\.\d+)?$/.test(cleaned)) return null;
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : null;
}
function chunkToWords(n) {
  if (n === 0) return "";
  if (n < 20) return ONES[n] ?? "";
  if (n < 100) {
    const t = Math.floor(n / 10);
    const o = n % 10;
    return o === 0 ? TENS[t] ?? "" : `${TENS[t]} ${ONES[o]}`;
  }
  const h = Math.floor(n / 100);
  const rest = n % 100;
  const head = `${ONES[h]} hundred`;
  return rest === 0 ? head : `${head} ${chunkToWords(rest)}`;
}
function intToWords(n) {
  if (n === 0) return "zero";
  const parts = [];
  let scaleIdx = 0;
  let remaining = n;
  while (remaining > 0 && scaleIdx < SCALES.length) {
    const chunk = remaining % 1e3;
    if (chunk > 0) {
      const chunkWords = chunkToWords(chunk);
      const scaleWord = SCALES[scaleIdx];
      parts.unshift(scaleWord ? `${chunkWords} ${scaleWord}` : chunkWords);
    }
    remaining = Math.floor(remaining / 1e3);
    scaleIdx += 1;
  }
  return parts.join(" ").trim();
}
function toKesWords(amount) {
  if (typeof amount !== "number" || !Number.isFinite(amount)) return "";
  const negative = amount < 0;
  const abs = Math.abs(amount);
  const totalCents = Math.round(abs * 100);
  const shillings = Math.floor(totalCents / 100);
  const cents = totalCents % 100;
  const shillingWords = `${intToWords(shillings)} shilling${shillings === 1 ? "" : "s"}`;
  let result;
  if (cents === 0) {
    result = shillingWords;
  } else {
    const suffix = cents === 1 ? "" : "s";
    const centWords = `${intToWords(cents)} cent${suffix}`;
    if (shillings === 0) {
      result = centWords;
    } else {
      result = `${shillingWords} and ${centWords}`;
    }
  }
  return negative ? `negative ${result}` : result;
}

// src/mpesa/index.ts
var PAYBILL_REGEX = /^\d{5,7}$/;
var TILL_REGEX = /^\d{5,7}$/;
function isValidPaybill(input) {
  return PAYBILL_REGEX.test(String(input).trim());
}
function isValidTillNumber(input) {
  return TILL_REGEX.test(String(input).trim());
}
var reTxId = /^([A-Z0-9]{10})\s+Confirmed/;
var reMoney = /Ksh\s*([\d,]+(?:\.\d{1,2})?)/i;
var reBalance = /M-?PESA balance is\s*Ksh\s*([\d,]+(?:\.\d{1,2})?)/i;
var reCost = /Transaction cost[,\s]*Ksh\s*([\d,]+(?:\.\d{1,2})?)/i;
var reDate = /on\s+(\d{1,2}\/\d{1,2}\/\d{2,4})\s+at\s+(\d{1,2}:\d{2}\s*(?:AM|PM)?)/i;
var reReceived = /received\s+Ksh[\d,.]+\s+from\s+(.+?)\s+(\+?254\d{9}|0\d{9})\s+on/i;
var rePaybill = /sent to\s+(.+?)\s+for account\s+(\S+)\s+on/i;
var reSentToPerson = /sent to\s+(.+?)\s+(\+?254\d{9}|0\d{9})\s+on/i;
var reBuygoods = /sent to\s+(.+?)\s+on\s+\d/i;
var toNumber = (s) => Number(s.replace(/,/g, ""));
function parseDate(dateStr, timeStr) {
  const parts = dateStr.split("/");
  if (parts.length !== 3) return null;
  const [d, m, yRaw] = parts.map((p) => parseInt(p, 10));
  if (!d || !m || !yRaw) return null;
  const y = yRaw < 100 ? 2e3 + yRaw : yRaw;
  const t = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (!t) return null;
  let hour = parseInt(t[1] ?? "0", 10);
  const min = parseInt(t[2] ?? "0", 10);
  const meridiem = t[3]?.toUpperCase();
  if (meridiem === "PM" && hour < 12) hour += 12;
  if (meridiem === "AM" && hour === 12) hour = 0;
  const out = new Date(y, m - 1, d, hour, min);
  return Number.isNaN(out.getTime()) ? null : out;
}
function classify(text) {
  if (/airtime/i.test(text)) return { type: "airtime" };
  if (/withdraw/i.test(text)) return { type: "withdraw" };
  const recv = text.match(reReceived);
  if (recv) {
    return {
      type: "received",
      party: recv[1]?.trim(),
      partyPhone: recv[2]
    };
  }
  const pay = text.match(rePaybill);
  if (pay) {
    return {
      type: "paybill",
      party: pay[1]?.trim(),
      accountNumber: pay[2]
    };
  }
  const sent = text.match(reSentToPerson);
  if (sent) {
    return {
      type: "sent",
      party: sent[1]?.trim(),
      partyPhone: sent[2]
    };
  }
  const buy = text.match(reBuygoods);
  if (buy) {
    return {
      type: "buygoods",
      party: buy[1]?.trim()
    };
  }
  return { type: "unknown" };
}
function isMpesaSms(text) {
  return typeof text === "string" && reTxId.test(text.trim());
}
function parseMpesaSms(text) {
  if (typeof text !== "string") return null;
  const trimmed = text.trim();
  const txMatch = trimmed.match(reTxId);
  if (!txMatch) return null;
  const transactionId = txMatch[1];
  const moneyMatch = trimmed.match(reMoney);
  if (!moneyMatch) return null;
  const amount = toNumber(moneyMatch[1]);
  const classified = classify(trimmed);
  const balanceMatch = trimmed.match(reBalance);
  const balance = balanceMatch ? toNumber(balanceMatch[1]) : null;
  const costMatch = trimmed.match(reCost);
  const transactionCost = costMatch ? toNumber(costMatch[1]) : null;
  const dateMatch = trimmed.match(reDate);
  const date = dateMatch ? parseDate(dateMatch[1], dateMatch[2]) : null;
  return {
    transactionId,
    type: classified.type,
    amount,
    party: classified.party,
    partyPhone: classified.partyPhone,
    accountNumber: classified.accountNumber,
    date,
    balance,
    transactionCost,
    raw: trimmed
  };
}

export { allSubCounties, counties, countiesByRegion, detectNetwork, findCounty, findCountyByCode, findCountyByName, findCountyBySlug, findCountyBySubCounty, formatKeId, formatKes, formatKraPin, formatPhone, isMaishaCardExpired, isMpesaSms, isValidKeId, isValidKePhone, isValidKraPin, isValidPaybill, isValidTillNumber, parseKeId, parseKes, parseKraPin, parseMaishaCard, parseMpesaSms, parsePhone, toKesWords };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map