/* ==========================================================================
   NEWS · PARTNERS · LOCATIONS · PEOPLE · REGISTRATION
   Each list is intentionally EMPTY until real, approved content exists.
   The site shows a polished "coming soon" state for empty lists, and the
   homepage hides its News section automatically while there are no articles.
   ========================================================================== */
window.ERISTARS = window.ERISTARS || {};

/* ---------------- NEWS ----------------
   Each article gets its own page at article.html?slug=<slug>.
   Newest first is applied automatically by date.
   {
     slug: "fall-registration-open",
     title: "Fall Registration Is Open",
     date: "2026-08-01",                       // YYYY-MM-DD
     category: "Club Announcements",          // see ERISTARS.newsCategories
     image: "teamHero",                        // key from images.js (optional)
     excerpt: "One or two sentences for cards.",
     body: [                                   // paragraphs; strings or {heading:"..."} or {image:"key", caption:"..."}
       "First paragraph.",
       { heading: "Key dates" },
       "Second paragraph."
     ]
   }
*/
ERISTARS.newsCategories = [
  "Club Announcements",
  "Matches & Tournaments",
  "Community Events",
  "Player Development",
  "Education & Opportunities"
];
ERISTARS.news = [];

/* ---------------- PARTNERS & SPONSORS ----------------
   Only confirmed, current sponsors. Put logo files in assets/images/partners/.
   { name: "Business Name", logo: "assets/images/partners/name.png", url: "https://..." }
*/
ERISTARS.partners = [];

/* ---------------- FIELD LOCATIONS ----------------
   {
     name: "Official Field Name",
     address: "Street, City, State ZIP",
     use: "Training & home matches",
     mapQuery: "Official Field Name, Street, City, State",   // used for the embedded map
     notes: "Parking / entrance instructions"
   }
*/
ERISTARS.locations = [];

/* ---------------- LEADERSHIP & COACHES ----------------
   Use real names, official titles and approved bios/photos only.
   { name: "Full Name", role: "President", bio: "Short approved bio.", photo: "assets/images/people/name.webp" }
*/
ERISTARS.leadership = [];
ERISTARS.coaches = [];

/* ---------------- REGISTRATION ----------------
   status: "open" | "closed" | "soon"   (only use a status the club has confirmed)
   {
     program: "Fall 2026 Recreational Soccer",
     ages: "Ages 5–14",
     season: "September – November 2026",
     fee: "$000",                 // or null if not published
     deadline: "2026-08-15",      // or null
     status: "open",
     url: "https://go.teamsnap.com/..."   // official provider link
   }
*/
ERISTARS.registration = [];
