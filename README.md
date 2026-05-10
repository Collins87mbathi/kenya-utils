# kenya-utils

Helpers for Kenya-specific data in JavaScript and TypeScript — phone numbers, KRA PINs, national IDs (including Maisha cards), the 47 counties, M-PESA, and shilling formatting.

I built this because I kept copying the same regexes between projects. If you've been doing the same, this is for you.

[![npm](https://img.shields.io/npm/v/kenya-utils.svg)](https://www.npmjs.com/package/kenya-utils)
[![bundle size](https://img.shields.io/bundlephobia/minzip/kenya-utils)](https://bundlephobia.com/package/kenya-utils)
[![license](https://img.shields.io/npm/l/kenya-utils.svg?cacheSeconds=60)](./LICENSE)

## Install

```bash
npm install kenya-utils
yarn add kenya-utils
pnpm add kenya-utils
```

Works in Node 18+, browsers, Next.js (server and client), Cloudflare Workers, Deno, Bun. No dependencies.

## A quick taste

```ts
import { parsePhone, isValidKraPin, findCounty, formatKes } from "kenya-utils";

parsePhone("0712345678");
// { e164: "+254712345678", network: "Safaricom", ... }

isValidKraPin("A123456789B"); // true

findCounty("nairobi");
// { code: 47, name: "Nairobi", capital: "Nairobi", ... }

formatKes(1234567); // "Ksh 1,234,567.00"
```

You can also import only the module you need so unused code doesn't ship with your bundle:

```ts
import { parsePhone } from "kenya-utils/phone";
import { findCounty } from "kenya-utils/counties";
```

## What's in it

### `phone`

Parse, validate, format, and detect the network of any Kenyan mobile number.

```ts
import { parsePhone, isValidKePhone, formatPhone, detectNetwork } from "kenya-utils/phone";

parsePhone("+254 712 345 678");
// {
//   e164: "+254712345678",
//   national: "0712345678",
//   international: "+254 712 345 678",
//   subscriber: "712345678",
//   network: "Safaricom",
//   countryCode: "254"
// }

isValidKePhone("0712345678"); // true
isValidKePhone("0202345678"); // false (landline)

formatPhone("0712345678"); // "+254712345678"
formatPhone("+254712345678", "national"); // "0712345678"

detectNetwork("0730123456"); // "Airtel"
detectNetwork("0747123456"); // "Faiba"
```

Accepts `+254...`, `254...`, `0...`, or a bare 9-digit number. Strips whitespace, hyphens, dots, and parens. Returns `null` on garbage rather than throwing.

A note on network detection: number portability means a "Safaricom-prefixed" number could now be on Airtel. The result is still right ~95% of the time, but treat it as a hint, not a guarantee.

### `kra-pin`

```ts
import { isValidKraPin, parseKraPin, formatKraPin } from "kenya-utils/kra-pin";

isValidKraPin("A123456789B"); // true (Individual)
isValidKraPin("P987654321Z"); // true (Non-Individual)
isValidKraPin("a 123-456-789 b"); // true — case + whitespace tolerant

parseKraPin("A123456789B");
// {
//   pin: "A123456789B",
//   type: "Individual",
//   prefix: "A",
//   sequence: "123456789",
//   checkChar: "B"
// }
```

`A` prefix is for individuals, `P` is for everything else (companies, partnerships, trusts, societies).

### `national-id`

Validates the numeric ID format (7 or 8 digits — older IDs are 7) and includes helpers for Maisha Card expiry checks.

```ts
import {
  isValidKeId,
  parseKeId,
  parseMaishaCard,
  isMaishaCardExpired,
} from "kenya-utils/national-id";

isValidKeId("12345678"); // true
parseKeId("1234567");    // { id: "1234567", digits: 7, isLegacy: true }

parseMaishaCard({ id: "12345678", expiry: "2030-01-01" });
// { id: "12345678", expiryDate: ..., isExpired: false, daysUntilExpiry: 1234 }

isMaishaCardExpired("2020-01-01"); // true
```

The Maisha Namba uses the same numeric format as legacy IDs, so `isValidKeId` works for both. The Maisha Card helpers are for the card-level concerns the new rollout introduced (mainly: expiry dates).

### `counties`

The 47 counties with their codes, capitals, slugs, regions, and constituencies.

```ts
import {
  counties,
  findCounty,
  countiesByRegion,
  findCountyBySubCounty,
} from "kenya-utils/counties";

counties.length; // 47

findCounty(47);            // by code
findCounty("Mombasa");     // by name
findCounty("tana-river");  // by slug

countiesByRegion("Coast");
// [Mombasa, Kwale, Kilifi, Tana River, Lamu, Taita Taveta]

findCountyBySubCounty("Westlands")?.name; // "Nairobi"
```

Each county looks like:

```ts
{
  code: 47,
  name: "Nairobi",
  capital: "Nairobi",
  slug: "nairobi",
  region: "Nairobi",
  subCounties: ["Westlands", "Dagoretti North", ...]
}
```

If you spot a sub-county that's missing or wrong, please open a PR — boundary data shifts and I'd rather have it correct.

### `currency`

```ts
import { formatKes, parseKes, toKesWords } from "kenya-utils/currency";

formatKes(1234567);                    // "Ksh 1,234,567.00"
formatKes(1234, { decimals: 0 });      // "Ksh 1,234"
formatKes(1234, { symbol: "KES" });    // "KES 1,234.00"

parseKes("Ksh 1,234,567.50");          // 1234567.5
parseKes("500 shillings");             // 500

toKesWords(1234.50);
// "one thousand two hundred thirty four shillings and fifty cents"
```

`toKesWords` is what you actually want for receipts and cheques.

### `mpesa`

Paybill/till validation and a best-effort SMS receipt parser.

```ts
import {
  isValidPaybill,
  isValidTillNumber,
  parseMpesaSms,
} from "kenya-utils/mpesa";

isValidPaybill(123456); // true

const r = parseMpesaSms(
  "QHJ7K8L9M0 Confirmed. Ksh1,000.00 sent to JOHN DOE 0712345678 on 9/5/26 at 10:30 AM. New M-PESA balance is Ksh5,000.00. Transaction cost, Ksh23.00.",
);
// {
//   transactionId: "QHJ7K8L9M0",
//   type: "sent",
//   amount: 1000,
//   party: "JOHN DOE",
//   partyPhone: "0712345678",
//   balance: 5000,
//   transactionCost: 23,
//   ...
// }
```

The parser handles the common formats — sent, received, paybill, buygoods, withdraw, airtime. Safaricom's SMS wording can shift, so it's regex-driven and forgiving. If a format breaks, file an issue with a redacted SMS sample.

## What's not here yet

- **Wards** for each sub-county. There are over 1,400 of them and I want to pull from a verified source rather than type from memory. Coming in v1.2.
- **VAT / withholding tax helpers** — useful but want to get the rates right. v1.3.
- **More M-PESA edge cases** — pochi la biashara, M-Shwari, KCB-MPESA.

## Contributing

PRs are welcome — see [CONTRIBUTING.md](./CONTRIBUTING.md) for setup and conventions. The most useful contributions right now: sub-county corrections, additional M-PESA SMS formats, and network prefix updates.

## License

MIT © Collins Mbathi
