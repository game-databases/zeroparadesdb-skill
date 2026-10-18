# zeroparadesdb.com public API

Read `https://zeroparadesdb.com/llms.txt` for the current routes. English is unprefixed. Prefix data and discovery routes with `/es-419`, `/de`, `/ru` or `/zh-cn` for another language. Preview routes carry the locale inside their path rather than as a prefix.

| Path | Answer |
| --- | --- |
| `/data/zp/search-index?search=<term>[&searchKind=<kind>][&searchPage=<n>]` | `{query, kind, page, pages, total, counts, rows}`. A row has `id: "<kind>:<recordId>"`, kind, localized name, `sub` and canonical `href`. Search pages hold at most 50 rows. An empty search answers 200 with empty rows; a past-last page answers 404. |
| `/data/zp/<dataset>.json` | An array or `{rows}` envelope with the dataset's complete response. Select a stable id instead of printing the collection. Raw fields may remain English. A localized `page` projection has url, name and description, or is null. |
| `/api/previews/<locale>/<kind>` | Preview cards keyed by decoded canonical page pathname. A card has name and facts, with icon and description where available. Only the kinds declared in `llms.txt` have previews. |
| `/llms.txt` | Read surfaces, dataset names, language availability and the planner address. |

A dataset's public projection does not prove which fields the original client holds. Keep unknown values separate from zero, and do not manufacture a localized page for a null projection.
