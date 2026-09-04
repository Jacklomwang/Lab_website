# Biosignals & Systems Analysis Lab — website

Static multi-page website. No build step, no frameworks — plain HTML, one CSS file, one JS file, plus a few JSON data files for list-based content.

## Structure
```
.
├── index.html              Home (hero, about, what we do, current research, lab news)
├── research.html           Current & past projects
├── research/
│   ├── long-covid.html     Long COVID project subpage
│   ├── dfc.html            Dynamic Functional Connectivity subpage
│   └── _template.html      Copy this to scaffold a new research subpage (unlinked, excluded from Jekyll builds)
├── people.html              Director, current members, alumni
├── publications.html       Selected publications
├── news.html                Full lab news list
├── contact.html             Contact form + details
├── data/
│   ├── news.json            Lab news items (rendered on index.html and news.html)
│   ├── publications.json    Publication entries (rendered on publications.html)
│   └── people.json          Member and alumni lists (rendered on people.html)
├── css/styles.css           All styling (design tokens in :root)
├── js/script.js             Mobile nav toggle + JSON-driven list rendering
└── images/                  Logo, team photo, and photo placeholders
```

## Editing content
Most page text lives directly in the HTML inside elements with classes wired to `css/styles.css` — edit it in place.

The **news, publications, and people (members/alumni) lists** are the exception: they're rendered at page load by `js/script.js` from the JSON files in `data/`. To add/edit/remove an entry, edit the corresponding JSON array — no HTML editing needed. A `data-limit="N"` attribute on a list's container (see `index.html`'s `#news-list`) caps how many items render there; omit it to show everything (as `news.html` does).

## Adding a research subpage
1. Copy `research/_template.html` to `research/your-page-name.html` and fill in the bracketed placeholders.
2. Add a link to it in the "Research" nav dropdown — this markup is duplicated across every page's header (there's no shared template), so add the link to each `.html` file at the repo root plus the two other files inside `research/`.

## Adding photos
Drop image files into `images/` named to match the `<img>` references, e.g.:
- `dk-hero1.jpg … dk-hero3.jpg` — home image strip
- `dk-dir.jpg` — director portrait
- `dk-m1.jpg … dk-m6.jpg` — member photos
- `pr-c1.jpg … pr-c4.jpg`, `pr-p1.jpg … pr-p4.jpg` — project figures
- `dk-contact.jpg` — contact photo

`owl-logo.png` and `lab-team.jpg` are already included. Any slot without a matching file shows a labelled placeholder.

## Running locally
The JSON-driven lists use `fetch()`, which requires the site to be served over `http://` — double-clicking `index.html` (`file://`) will leave those lists empty. Serve the folder instead:
```
python3 -m http.server
```
or use an editor's live-reload server (e.g. VS Code's Live Server extension), which also auto-refreshes on save.

## GitHub Pages
Push to a repo and enable Pages (Settings → Pages → deploy from branch, root). The site is fully static, runs `fetch()` fine over Pages' `https://`, and Pages' default Jekyll processing is what keeps `research/_template.html` out of the published site.
