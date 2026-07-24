# Instruktioner till Claude Code — danielnordmark.se

## Projekt

En personlig berättelsesajt om hur Daniel Nordmark drabbades av en stroke den 25 juni 2024 som missades av ambulans och polis, hur han tillbringade en vecka utan vård, och kampen som följt.

Sajten är en statisk webbplats byggd med **Hugo**, hostad på **Cloudflare Pages**, med GitHub som versionskontroll och CI/CD.

Arbetsflöde: Claude Cowork (i desktop-appen) planerar innehåll och skriver text → Claude Code bygger och committar → Cloudflare Pages deployas automatiskt vid push till main.

---

## Tech stack

- **Static site generator:** Hugo (senaste stabila versionen)
- **Hosting:** Cloudflare Pages (automatisk deploy vid push till main)
- **Versionskontroll:** GitHub
- **Tema:** Congo (https://github.com/jpanther/congo)
- **Kontaktformulär:** Formspree (eller Cloudflare Workers om mer kontroll behövs)
- **Domän:** danielnordmark.se

---

## Projektstruktur

Bygg ett komplett Hugo-projekt med följande sidhierarki:

```
/                          → Startsida (statisk, ej blogg)
/min-berattelse/           → Översikt över kapitelstrukturen
/min-berattelse/dagen-det-hande/
/min-berattelse/en-vecka-utan-vard/
/min-berattelse/diagnosen/
/min-berattelse/sjukhustiden/
/min-berattelse/livet-efterat/
/min-berattelse/kampen-for-upprattelseelse/
/om-stroke/
/dokumentation/
/kontakt/
```

Hugo content-filer ska ligga under `content/` med korrekt front matter (title, date, weight för sortering, description).

---

## Innehållsfiler

Allt innehåll finns redan skrivet som .txt-filer i mappen `claude-code/` (se filerna i detta repo). Konvertera dem till Hugo-kompatibla Markdown-filer (.md) med korrekt YAML front matter. Ta bort WordPress-specifik notation (===== KAPITEL =====, WordPress-slug: etc.) och ersätt platshållare ([KNAPP:], [Länk till dokument]) med lämpliga Hugo shortcodes eller Markdown.

Filer att konvertera:
- `startsida.txt` → `content/_index.md`
- `berattelsen/min-berattelse-oversikt.txt` → `content/min-berattelse/_index.md`
- `berattelsen/kap1-dagen-det-hande.txt` → `content/min-berattelse/dagen-det-hande.md`
- `berattelsen/kap2-en-vecka-utan-vard.txt` → `content/min-berattelse/en-vecka-utan-vard.md`
- `berattelsen/kap3-diagnosen.txt` → `content/min-berattelse/diagnosen.md`
- `berattelsen/kap4-sjukhustiden.txt` → `content/min-berattelse/sjukhustiden.md`
- `berattelsen/kap5-livet-efterat.txt` → `content/min-berattelse/livet-efterat.md`
- `berattelsen/kap6-kampen-for-upprattelseelse.txt` → `content/min-berattelse/kampen-for-upprattelseelse.md`
- `om-stroke/om-stroke.txt` → `content/om-stroke/_index.md`
- `dokumentation/dokumentation.txt` → `content/dokumentation/_index.md`
- `kontakt/kontakt.txt` → `content/kontakt/_index.md`

---

## Konfiguration — Congo

Congo föredrar konfigurationsstrukturen `config/_default/` med separata filer. Skapa följande:

### config/_default/hugo.toml
```toml
baseURL = "https://danielnordmark.se/"
languageCode = "sv-SE"
defaultContentLanguage = "sv"
title = "Daniel Nordmark"
theme = "congo"
```

### config/_default/languages.sv.toml
```toml
languageName = "Svenska"
weight = 1
title = "Daniel Nordmark"

[params]
  author.name = "Daniel Nordmark"
  description = "En personlig berättelse om en stroke som missades — och kampen som följt."
```

### config/_default/params.toml
```toml
colorScheme = "congo"        # alternativ: avocado, cherry, fire, ocean, sapphire, slate
defaultAppearance = "light"  # "light" eller "dark"
autoSwitchAppearance = true  # följer systemets ljust/mörkt-inställning

showAuthor = false
showDate = false
showReadingTime = true
showTableOfContents = true   # innehållsförteckning på långa sidor

[homepage]
  layout = "custom"          # använd custom layout för startsidan (se nedan)
  showRecent = false

[article]
  showDate = false
  showAuthor = false
  showReadingTime = true
  showTableOfContents = true
  showPagination = true      # nästa/föregående-navigation
```

### config/_default/menus.sv.toml
```toml
[[main]]
  name = "Hem"
  pageRef = "/"
  weight = 10

[[main]]
  name = "Min berättelse"
  pageRef = "min-berattelse"
  weight = 20

[[main]]
  name = "Om stroke"
  pageRef = "om-stroke"
  weight = 30

[[main]]
  name = "Dokumentation"
  pageRef = "dokumentation"
  weight = 40

[[main]]
  name = "Kontakt"
  pageRef = "kontakt"
  weight = 50
```

### Installation av Congo
Installera som Hugo-modul (rekommenderas):
```bash
hugo mod init github.com/[användarnamn]/danielnordmark
hugo mod get github.com/jpanther/congo/v2
```
Alternativt som git submodule:
```bash
git submodule add -b stable https://github.com/jpanther/congo.git themes/congo
```

### Startsida — custom layout
Congo stödjer `layouts/index.html` för en helt anpassad startsida. Skapa en custom layout som visar startsidans innehåll (från `content/_index.md`) utan blogg-element. Se Congos dokumentation: https://jpanther.github.io/congo/docs/homepage-layout/

### Kapitelnavigering
Congo har inbyggd `showPagination = true` som ger föregående/nästa-navigering baserat på `weight` i front matter. Aktivera på section-nivå i `content/min-berattelse/_index.md`:
```yaml
---
title: "Min berättelse"
cascade:
  showPagination: true
  showDate: false
  showAuthor: false
---
```

---

## Ton och innehåll — viktigt att förstå

Sajten är en personlig, faktabaserad berättelse. Det är **inte** en blogg. Det är inte ett debattinlägg. Det är en kronologisk berättelse om vad som hände Daniel, skriven för strokeöverlevare, anhöriga, journalister, och yrkesverksamma inom polis och sjukvård.

### Anonymisering
Alla tredje parter är anonymiserade i texten:
- Polis T (polis) → Polis T
- Ambulanspersonalen → ambulansteamet / Ambulanspersonal M
- min neurolog (neurolog) → min neurolog
- Vittnen → Vittne A, Vittne B
- Fd flickvännen → en bekant

Ändra aldrig dessa beteckningar i koden.

---

## Kapitelnavigering

Congo hanterar nästa/föregående via `showPagination: true` och `weight` i front matter. Se konfigurationen ovan under "Kapitelnavigering".

Ordning via `weight` i front matter:
- dagen-det-hande: weight: 1
- en-vecka-utan-vard: weight: 2
- diagnosen: weight: 3
- sjukhustiden: weight: 4
- livet-efterat: weight: 5
- kampen-for-upprattelseelse: weight: 6

---

## Kontaktformulär

Integrera Formspree på kontaktsidan. Fält: Namn, E-post, Meddelande. Formspree endpoint läggs i hugo.toml params och refereras i ett Hugo-template eller shortcode.

---

## Cloudflare Pages

Cloudflare Pages bygginställningar (konfigureras i Cloudflare-dashboarden eller via `wrangler.toml`):
- Build command: `hugo --minify`
- Build output directory: `public`
- Miljövariabel: `HUGO_VERSION = "0.147.0"` (eller senaste stabila — specificera alltid explicit)

Om Congo installeras som Hugo-modul, lägg till i `.gitignore`:
```
public/
resources/
.hugo_build.lock
```
Och se till att `go.mod` och `go.sum` committas till repot — Cloudflare Pages behöver dem för att bygga.

---

## Dokumentmapp

Under `static/dokument/` skapas en tom placeholder-mapp. Anonymiserade PDF-dokument laddas upp dit manuellt och länkas från dokumentationssidan.

---

## SEO och meta

- `<title>` och `<meta description>` ska vara meningsfulla på varje sida
- Open Graph-taggar ska finnas (för delning på sociala medier)
- Sitemap genereras automatiskt av Hugo
- robots.txt: tillåt allt

---

## Övrigt

- Inga kommentarsfunktioner
- Inget blogg-flöde / RSS behövs (kan stängas av)
- Inga analytics i första version (kan läggas till senare)
- Allt innehåll är på svenska — se till att Hugo-konfigurationen sätter `lang="sv"` i HTML
