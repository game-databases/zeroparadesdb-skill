#!/usr/bin/env node
// Command line over the zeroparadesdb.com public JSON API. Prints JSON.
//   node scripts/zp.mjs lookup <term> [--locale de]
//   node scripts/zp.mjs search <term> [--kind check] [--page 2] [--locale de]
//   node scripts/zp.mjs record <kind> <id> [--locale de]
//   node scripts/zp.mjs planner [--thought <id>[:reinforced|unconditioned|suppressed|dissonant]]... [--skill <id>] [--locale de]
// ZEROPARADES_BASE points it at another copy of the site.
import { createClient, gameLocale } from "./zeroparades.mjs";

const [command, ...rest] = process.argv.slice(2);
const flags = {}, words = [];
for (let i = 0; i < rest.length; i++) {
  if (rest[i].startsWith("--")) (flags[rest[i].slice(2)] ??= []).push(rest[++i]);
  else words.push(rest[i]);
}
const one = (name) => flags[name]?.[0];
const locale = gameLocale(one("locale") ?? "en");
const client = createClient(process.env.ZEROPARADES_BASE ? { base: process.env.ZEROPARADES_BASE } : {});

const run = {
  lookup: () => client.lookup(words.join(" "), { locale }),
  search: () => client.search(words.join(" "), { locale, kind: one("kind") ?? null, page: Number(one("page") ?? 1) }),
  record: () => client.record(words[0], words[1], { locale }),
  planner: () => client.plannerLink({
    locale, skill: one("skill") ?? null,
    thoughts: (flags.thought ?? []).map((entry) => { const [id, phase] = entry.split(":"); return { id, ...(phase ? { phase } : {}) }; }),
  }),
}[command];

if (!run) {
  console.error("usage: zp.mjs lookup|search|record|planner ... (see the header of this file)");
  process.exit(2);
}
console.log(JSON.stringify(await run(), null, 2));
