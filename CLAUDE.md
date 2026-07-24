# CLAUDE.md

Guidance for AI assistants (Claude Code) working in this repository.

## Project

`danielnordmark.se` is a personal, factual storytelling site about a stroke that was
missed by ambulance and police staff on 25 June 2024, and the fight for accountability
that followed. All content is in Swedish. It is **not** a blog — it's a chronological,
first-person account plus supporting informational pages.

## Tech stack

- **Static site generator:** [Hugo](https://gohugo.io/), installed as a Hugo Module
  (see `go.mod` / `go.sum`)
- **Theme:** [Congo](https://github.com/jpanther/congo) v2.14.0, imported via Hugo
  Modules (`config/_default/hugo.toml` → `[module.imports]`)
- **Hosting:** Cloudflare Pages, auto-deploys on push to `main`
- **Contact form:** Formspree (endpoint in `config/_default/params.toml`)

## Commands

```bash
hugo server        # local dev server at http://localhost:1313/
hugo --minify       # production build, output to public/
```

`go.mod` and `go.sum` must stay committed — Cloudflare Pages needs them to resolve the
Congo module during build. `public/`, `resources/`, and `.hugo_build.lock` are
gitignored and never committed.

## Directory structure

```
content/
  _index.md                          Home page
  min-berattelse/                    Story: index + 6 chapters (dagen-det-hande,
                                      en-vecka-utan-vard, diagnosen, sjukhustiden,
                                      livet-efterat, kampen-for-upprattelse)
  om-stroke/_index.md                Informational page about stroke / the AKUT test
  dokumentation/_index.md            Links to anonymized source documents
  kontakt/_index.md                  Contact page (Formspree form)
  404.md
config/_default/                     Split Congo/Hugo config:
  hugo.toml                          baseURL, module imports, outputs
  languages.sv.toml                  Swedish locale, author, description
  menus.sv.toml                      Main nav (weight-ordered)
  params.toml                        Congo theme params, color scheme, Formspree endpoint
layouts/                             Overrides on top of the Congo theme
  min-berattelse/list.html           Custom chapter listing layout
  _partials/home/custom.html         Custom homepage content
  _partials/logo.html, extend-head.html
  _shortcodes/                       tidslinje, tidpunkt, lasningstid, bild,
                                      kontaktformular, akut, citat (see below)
assets/
  img/                                Site images (bilder/, logo.svg, social-card.jpg)
  css/custom.css, css/schemes/danielnordmark.css   Custom Congo color scheme
static/
  dokument/                          Placeholder for anonymized PDFs (uploaded manually)
  favicon*, apple-touch-icon.png
berattelsen/                         Original Swedish .txt drafts of each chapter
                                      (pre-Hugo source material, not built by Hugo —
                                      kept as reference/backup)
archetypes/default.md
wrangler.toml                        Cloudflare Pages config (assets dir = ./public)
```

## Content conventions

- **Front matter:** `title`, `description`, `date`, `weight`. `weight` controls chapter
  order and drives Congo's `showPagination` (prev/next nav) within `min-berattelse/`.
- **Custom shortcodes** (`layouts/_shortcodes/`), use them instead of ad-hoc HTML:
  - `{{< tidslinje >}}...{{< /tidslinje >}}` — wraps a list of timeline entries
  - `{{< tidpunkt tid="14:18" >}}...{{< /tidpunkt >}}` — a single timeline entry with a
    timestamp, used inside `tidslinje`
  - `{{< citat >}}...{{< /citat >}}` — styled pull-quote
  - `{{< akut >}}` — the AKUT stroke-symptom test graphic (Ansikte/Kropp/Uttal/Tid)
  - `{{< bild >}}`, `{{< lasningstid >}}`, `{{< kontaktformular >}}` — image, reading
    time, and contact form shortcodes
- **Anonymization — never change these designations in content:**
  - Polis T (police) → **Polis T**
  - Vittne A (witness at the accident) → **Vittne A**
  - Vittne B (witness on the road) → **Vittne B**
  - min neurolog (neurologist) → **min neurolog**
  - Ambulance staff → **ambulansteamet** / **Ambulanspersonal M**
  - Former girlfriend → **en bekant**
  - Daniel's mother → **min mamma** (real relation "mamma" is fine to use)

  Full list and rationale in `STRUKTUR.md`.
- **Tone:** personal, chronological, fact-based, first-person. Restrained — no
  profanity, no direct accusations; let the reader draw conclusions from the facts.
  Written for stroke survivors and relatives, journalists, and police/ambulance/medical
  professionals and decision-makers.
- **Language:** everything in Swedish; the site's `lang` is `sv`.

## Deployment

- Cloudflare Pages builds automatically on push to `main`.
- Build command: `hugo --minify`; build output directory: `public`.
- `HUGO_VERSION` is set explicitly as a Cloudflare Pages environment variable — bump it
  deliberately when upgrading Hugo, don't rely on a moving default.

## Other docs in this repo

- `README.md` — quick dev/build reference (kept in sync with this file at a high level).
- `STRUKTUR.md` — full page hierarchy, the complete anonymization table, and tone
  guidelines in more detail.
- `CLAUDE_CODE_PROMPT.md` — the original one-shot prompt used to scaffold the site from
  WordPress `.txt` exports. It's historical/superseded (e.g. it references a
  `claude-code/` source folder that no longer exists) — useful for background on *why*
  things are structured this way, not as a current task list.
