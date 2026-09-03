# Biosignals & Systems Analysis Lab — website

Static multi-page website. No build step, no frameworks, no wrapper scripts — plain HTML, one CSS file, one JS file.

## Structure
```
.
├── index.html          Home (hero, about, research, lab news)
├── research.html       Current & past projects
├── people.html         Director, current members, alumni
├── publications.html   Selected publications
├── contact.html        Contact form + details
├── css/styles.css      All styling (design tokens in :root)
├── js/script.js        Mobile nav toggle
└── images/             Logo, team photo, and photo placeholders
```

## Editing content
All visible text lives in the HTML files inside div/semantic tags with classes wired to `css/styles.css`. Edit text directly in the HTML.

## Adding photos
Drop image files into `images/` named to match the `<img>` references, e.g.:
- `dk-hero1.jpg … dk-hero3.jpg` — home image strip
- `dk-dir.jpg` — director portrait
- `dk-m1.jpg … dk-m6.jpg` — member photos
- `pr-c1.jpg … pr-c4.jpg`, `pr-p1.jpg … pr-p4.jpg` — project figures
- `dk-contact.jpg` — contact photo

`owl-logo.png` and `lab-team.jpg` are already included. Any slot without a matching file shows a labelled placeholder.

## Running locally
Open `index.html` in a browser, or serve the folder:
```
python3 -m http.server
```

## GitHub Pages
Push to a repo and enable Pages (Settings → Pages → deploy from branch, root). The site is fully static and works as-is.
