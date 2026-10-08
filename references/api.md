# zeroparadesdb.com public API

Every path answers in English; prefix it with `/es-419`, `/de`, `/ru` or `/zh-cn` for that language. `https://zeroparadesdb.com/llms.txt` is the full description.

| Path | Answer |
|---|---|
| `/data/zp/search-index?search=<term>[&searchKind=<kind>][&searchPage=<n>]` | `{query, kind, page, pages, total, counts, rows}`; each row `{id: "<kind>:<recordId>", kind, name, sub, href}`; 50 rows a page. No match: 200 with `total: 0`. A page outside 1..pages: 404 with `status: "notFound"`. |
| `/data/zp/<dataset>.json` | Every record of a dataset (skills, items, characters, tasks, thoughts, status-effects, achievements, personas, progression-units, districts, waypoints, locations, interior-locations, glossary, checks and others). Rows of kinds with pages carry `page: {url, name, description}` or `page: null`. An unknown dataset: 404 `{"error": "unknown kind <kind>"}`. |
| `/api/previews/<locale>/<kind>` | The site's link preview cards for one kind, keyed by page path: `{name, facts, icon?, description?}`. |
| `/llms.txt` | Read surfaces, datasets and their sizes, languages, and the planner address. |
