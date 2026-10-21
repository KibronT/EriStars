# Content & Integration Checklist

What the site currently publishes, where each fact came from, and what the club still needs to confirm or supply.

## ✅ Published facts (and their sources)

| Fact | Source |
| --- | --- |
| Founded in 2011 by Eritrean-American parents | Project brief |
| Legal name: Eritrean-American Youth Sports Association of Maryland, Inc. | Project brief; GuideStar |
| EIN 81-0712069 | Club's existing TeamSnap site; GuideStar |
| Based in Laurel, MD; serves the DC metro / DMV | GuideStar profile |
| Independent community organization ("non-political, non-religious" wording removed from the site, Oct 2026) | Project brief |
| Year-round soccer; values teamwork and sportsmanship over winning; promotes academics and volunteering | Existing site's mission text |
| SSL opportunity, Path to College, scholarships & internships | Existing site's program sections |
| Facebook, X (Twitter) and YouTube links | Existing site |
| "Boys 2013: Fall 2022 SAC Champions" | Caption printed on the club's own team photo |
| "Success Through Sportsmanship" | Club logo |

## ⚠️ Please confirm

- [ ] **"SAC"**: what does it stand for (league name)? Is the title accurate as worded?
- [ ] **Graduation photo**: confirm it shows EriStars members and that the club may publish it (credit: Alex Fotography).
- [ ] **Team photo**: confirm guardian consent to publish photos of these minors.
- [ ] **Nonprofit status wording**: the site says "nonprofit organization." Confirm whether to say "501(c)(3)."
- [ ] **Program details**: ages, levels, schedules, locations and fees are blank (shown as "Contact us for current details").
- [ ] **"Player Development" program**: confirm it reflects how teams currently compete (organized league play).
- [ ] **Volunteer screening line** on Get Involved ("may need to complete screening"): confirm or remove.

## 📝 Content to supply

Each item goes in a file under `assets/data/`.

- [ ] Official **email address** and optional **phone** → `site.js`
- [ ] **Registration**: provider link (e.g. TeamSnap), seasons, ages, fees, deadlines, status → `content.js`
- [ ] **Current teams**: names, age groups, coaches, and schedules (optional) → `teams.js`
- [ ] **Board of directors**: names, titles, and approved bios/photos → `content.js`
- [ ] **Coaches**: names, roles, and approved bios/photos → `content.js`
- [ ] **Field locations**: official names, addresses, parking notes → `content.js`
- [ ] **Sponsors/partners**: confirmed list and logo files. The old site's sponsor logos (AK Motors, Ken's, Pearl Smiles Dental, Speedy, Hanna, Crystal Parking, Maryland 529, DoorDash) were **not** carried over because they couldn't be verified as current → `content.js`
- [ ] **News articles**: the old site's posts were template placeholders and were not migrated → `content.js`
- [ ] **More photos**: training, matches, coaches, community events and SSL activities. The site currently relies on two photos, so some sections reuse them.
- [ ] Instagram link, if the club has one → `site.js`

## 🔌 Integrations still to connect

- [ ] **Contact form delivery**: set `contactFormEndpoint` in `site.js` (see README)
- [ ] **Registration provider**: link to the official TeamSnap (or other) registration
- [ ] **Live schedules/standings**: currently shared privately with families. Add them to team pages manually, or embed them from the provider later.
- [ ] **Domain**: update `sitemap.xml`, `robots.txt` and `siteUrl` once known
- [ ] **CMS (optional, future)**: the data files map one-to-one onto a headless CMS (e.g. Decap CMS on GitHub) if non-technical editors need a web interface

## 🚫 Deliberately not carried over from the old site

- The placeholder Boulder, Colorado addresses and contact details
- Lorem ipsum "testimonials" and news posts
- Links to the `allstar.teamsnapsites.com` template site
- The AmazonSmile link (AmazonSmile shut down in 2023)
