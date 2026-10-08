---
name: zero-parades
description: "Answer questions about ZERO PARADES: For Dead Spies (skills, thoughts, items, characters, tasks, status effects, achievements, personas, districts, waypoints, interiors, glossary terms, skill checks and dialogue) from zeroparadesdb.com, in English, Latin American Spanish, German, Russian or Simplified Chinese, with the page link of every record used. Use for any Zero Parades game question, a build planner link, or where a line of dialogue or a check appears."
---

# Zero Parades

zeroparadesdb.com holds the game's own records in five languages. Answer from it, not from memory, and give the page link of each record you use.

## Commands

Run from this skill's directory; each prints JSON. Add `--locale es-419|de|ru|zh-cn` to answer in that language (names, descriptions and links change with it).

| Need | Command | Answer |
|---|---|---|
| What a named thing is | `node scripts/zp.mjs lookup "Cold Read"` | `entries[]`: kind, id, name, page `url` and the site's preview `card` (facts and description) |
| Where text appears, including checks and dialogue | `node scripts/zp.mjs search "volition" [--kind check] [--page 2]` | `results[]` with `url` (a dialogue link ends in `#<card>`), `difficulty` for checks, `counts` per kind |
| Every game field of one record | `node scripts/zp.mjs record thought absolutemag` | `fields` (the game's own values), `page` and `card` |
| A planner build to open | `node scripts/zp.mjs planner --thought absolutemag:suppressed --skill affect` | `url` of the build planner with those thoughts and that focus skill |

Kinds for `record`: skill, item, character, task, thought, status-effect, achievement, persona, progression-unit, district, waypoint, location, interior-location, lore. Search kinds also include check, dialogue, game-over, guide, news and tool.

## Rules

- `found: false` is an answer: say the site has no such record (give `searchUrl` when present) and do not fill the gap from memory.
- `page: null` means the record has no page in that language; name it without a link.
- Quote names and descriptions as the site gives them; they are the game's own text.
- A check's `difficulty` is the game's value for that check; report it with the check's link.
- Thought phases for `planner`: reinforced (default), unconditioned, suppressed, dissonant.

`references/api.md` lists the endpoints these commands read.
