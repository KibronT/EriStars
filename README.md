# EriStars Sports Club Website

The official website for EriStars Sports Club, a community youth soccer organization serving the DMV since 2011.

It's a fast, static website made of plain HTML, CSS and JavaScript. There is **no build step and nothing to install.** It runs on GitHub Pages as-is, and you can also open it straight from your computer.

---

## Preview the site

**Quickest:** double-click `index.html` to open it in your browser.

**Recommended:** run a local server, which behaves exactly like the live site:

```bash
cd "/Users/kibron/EriStar Website"
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

---

## Project structure

```
index.html            Homepage
about.html            Story, mission & values, approach, leadership, coaches
programs.html         All programs (rendered from assets/data/programs.js)
community.html        Education, SSL, college prep, culture, service
teams.html            Teams overview, highlights, schedules info
team.html             Reusable team page → team.html?team=<id>
news.html             News listing (with category filters once there are 6+ articles)
article.html          Reusable article page → article.html?slug=<slug>
get-involved.html     Volunteer, sponsorship, partnerships
register.html         Registration steps + current opportunities
locations.html        Field locations with maps
contact.html          Contact form + club details
404.html              "Page not found" page (served automatically by GitHub Pages)

assets/
  css/tokens.css      Design tokens: colors (from the logo), fonts, spacing
  css/main.css        All component and layout styles
  js/main.js          Shared header/footer, menus, content rendering, gallery, form
  data/               ← CLUB CONTENT LIVES HERE
    site.js           Contact details, social links, integrations, navigation
    images.js         Photo library + gallery order
    programs.js       Programs
    teams.js          Teams (each one gets its own page automatically)
    content.js        News, partners, locations, leadership, coaches, registration
  images/             Optimized images (WebP in several sizes) + logos + favicons

robots.txt, sitemap.xml, .nojekyll
```

The header, footer and navigation appear on every page from a single source (`assets/js/main.js` + `assets/data/site.js`), so a menu change only needs to be made once.

---

## Updating content (no coding required)

Every frequently changing item is a simple list in `assets/data/`. Each file has commented examples at the top. Copy an example, fill it in, save, and refresh the page.

| To… | Edit |
| --- | --- |
| Add the club email or phone | `assets/data/site.js` → `email`, `phone` |
| Turn on the registration link | `assets/data/content.js` → `ERISTARS.registration` (and optionally `site.js` → `registrationUrl`) |
| Publish a news article | `assets/data/content.js` → `ERISTARS.news` |
| Add a team (gets its own page) | `assets/data/teams.js` |
| Add board members / coaches | `assets/data/content.js` → `leadership`, `coaches` |
| Add a field location (with map) | `assets/data/content.js` → `locations` |
| Add sponsor logos | `assets/data/content.js` → `partners` |
| Add photos to the gallery | `assets/data/images.js` |

Empty lists show a polished "coming soon" state instead of fake content. The homepage News section stays hidden until the first article is added.

### Adding a new photo

1. Export it at about 600, 960 and 1600 px wide, as WebP if possible (JPG also works).
2. Put the files in `assets/images/`.
3. Add an entry in `assets/data/images.js` with `src`, `srcset`, `width`, `height` and descriptive `alt` text.
4. Use its key anywhere an image is accepted (programs, teams, news, gallery).

Only publish photos of players that the club and guardians have approved.

---

## Connecting the contact form

The form validates input but **does not send anything until a delivery service is connected.** Until then it tells visitors this honestly and points them to Facebook (or email, once added).

1. Create a free form endpoint, for example with [Formspree](https://formspree.io), and have messages delivered to the club's email.
2. Paste the endpoint URL into `assets/data/site.js` → `contactFormEndpoint`.
3. Send a test message from the live site.

---

## Publishing on GitHub Pages

```bash
cd "/Users/kibron/EriStar Website"
git init
git add .
git commit -m "EriStars website"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Then on GitHub, open **Settings → Pages**, set **Source** to *Deploy from a branch*, and choose the `main` branch with the `/ (root)` folder. The site will appear at `https://<your-username>.github.io/<repo-name>/`.

All links are relative, so the site works at that address and on a custom domain.

**After launch:**

- Replace `YOUR-DOMAIN` in `sitemap.xml`, then uncomment the `Sitemap:` line in `robots.txt`.
- Set `siteUrl` in `assets/data/site.js`.
- Optionally make the `og:image` tags absolute (`https://your-domain/assets/images/team-hero-1200.jpg`) so link previews show the photo.

The original full-size photos in the project root (`*.jpg`) aren't used by the site. You can move them out of the folder before publishing to keep the repository small.

---

## Technical notes

- **Why not React/Vite?** Node.js isn't installed on this machine, and a static site is the simplest thing to host on GitHub Pages and maintain. The data-driven structure (content in `assets/data/`, reusable renderers in `main.js`) maps directly to React components if the club moves to React or a CMS later.
- **Accessibility:** semantic landmarks, skip link, keyboard-operable dropdowns (Enter/Space, arrow keys, Esc), a focus-trapped mobile menu, visible focus styles, labelled form fields with inline errors, AA-contrast colors, and `prefers-reduced-motion` support.
- **Performance:** responsive WebP images, lazy loading below the fold, a high-priority hero image, `font-display: swap`, no frameworks.
- **SEO:** unique titles and descriptions per page, Open Graph tags, SportsOrganization structured data on the homepage, semantic headings, sitemap and robots files.
