# danielnordmark.se

Personlig berättelsesajt om en stroke som missades av ambulans och polis den 25 juni 2024, och kampen som följt.

## Tech stack

- **Static site generator:** [Hugo](https://gohugo.io/) (Hugo module, Congo installerat via `go.mod`)
- **Tema:** [Congo](https://github.com/jpanther/congo)
- **Hosting:** Cloudflare Pages (automatisk deploy vid push till `main`)
- **Kontaktformulär:** [Formspree](https://formspree.io/)

## Utveckling

```bash
hugo server
```

Sajten körs då på `http://localhost:1313/`.

## Bygg

```bash
hugo --minify
```

Byggd sajt hamnar i `public/`.

## Struktur

```
content/
  _index.md                          Startsida
  min-berattelse/                    Kapitelöversikt + kapitel 1–6
  om-stroke/                         Faktasida om stroke
  dokumentation/                     Länkar till anonymiserade dokument
  kontakt/                           Kontaktsida med Formspree-formulär
config/_default/                     Hugo- och Congo-konfiguration
layouts/                             Egna overrides (startsida, kontaktformulär)
static/dokument/                     Plats för anonymiserade PDF:er
```

## Cloudflare Pages

- Build command: `hugo --minify`
- Build output directory: `public`
- Miljövariabel: `HUGO_VERSION` satt till aktuell stabil Hugo-version

## Anonymisering

Alla tredje parter i berättelsen är anonymiserade (t.ex. Polis T, Vittne A/B, min neurolog). Se `STRUKTUR.md` för fullständig lista. Ändra aldrig dessa beteckningar.
