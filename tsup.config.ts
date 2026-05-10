import { defineConfig } from "tsup";

export default defineConfig({
    entry: {
        index: "src/index.ts",
        phone: "src/phone/index.ts",
        "kra-pin": "src/kra-pin/index.ts",
        "national-id": "src/national-id/index.ts",
        counties: "src/counties/index.ts",
        currency: "src/currency/index.ts",
        mpesa: "src/mpesa/index.ts",
    },
    format: ["esm", "cjs"],
    dts: true,
    sourcemap: true,
    clean: true,
    treeshake: true,
    splitting: false,
    target: "es2022"
})