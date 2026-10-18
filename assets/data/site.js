/* ==========================================================================
   SITE CONFIGURATION
   Organization details, contact channels, integrations and navigation.

   Values left as "" are NOT yet verified. Anything empty is hidden on the
   site (or replaced with a "contact us" message) until you fill it in.
   See CONTENT-TODO.md for the full checklist.
   ========================================================================== */
window.ERISTARS = window.ERISTARS || {};

ERISTARS.site = {
  name: "EriStars Sports Club",
  shortName: "EriStars",
  legalName: "Eritrean-American Youth Sports Association of Maryland, Inc.",
  founded: 2011,
  ein: "81-0712069",
  tagline: "Developing Players. Building Community.",
  motto: "Success Through Sportsmanship",
  description:
    "EriStars Sports Club is a community youth soccer organization founded in 2011 by Eritrean-American parents, serving young athletes and families across Washington, D.C., Maryland and Virginia.",
  serviceArea: "Washington, D.C. · Maryland · Virginia (DMV)",
  baseCity: "Laurel, Maryland",

  /* ---- Contact (verify before filling in) ---- */
  email: "",            // e.g. "info@eristars.org"  — TODO: confirm official address
  phone: "",            // e.g. "(301) 555-0100"     — TODO: confirm, or leave blank
  mailingAddress: "",   // Optional public mailing address

  /* ---- Social (taken from the club's existing website) ---- */
  social: {
    facebook: "https://www.facebook.com/eri.stars.58",
    x: "https://twitter.com/EristarC",
    youtube: "https://www.youtube.com/channel/UCK8b0le_HKcMzNmzIKthJNQ",
    instagram: ""
  },

  /* ---- Integrations ---- */
  // Official registration provider (e.g. a TeamSnap registration link).
  registrationUrl: "",
  // Where the contact form sends messages. Works with Formspree, Basin,
  // Getform etc. (any service that accepts a JSON POST). Leave "" until set up.
  contactFormEndpoint: "",
  // Production URL once hosted (used for canonical links & sharing).
  siteUrl: ""
};

/* Main navigation. `href` values are page files; children may use #anchors. */
ERISTARS.nav = [
  { label: "Home", href: "index.html", page: "home" },
  {
    label: "About", href: "about.html", page: "about",
    children: [
      { label: "Our Story", href: "about.html#story" },
      { label: "Mission & Values", href: "about.html#mission" },
      { label: "Leadership", href: "about.html#leadership" },
      { label: "Coaches", href: "about.html#coaches" },
      { label: "Field Locations", href: "locations.html", page: "locations" }
    ]
  },
  {
    label: "Programs", href: "programs.html", page: "programs",
    children: [
      { label: "All Programs", href: "programs.html" },
      { label: "Youth Soccer", href: "programs.html#youth-soccer" },
      { label: "Player Development", href: "programs.html#player-development" },
      { label: "Education & Mentorship", href: "community.html", page: "community" },
      { label: "Community & Service", href: "community.html#service" }
    ]
  },
  {
    label: "Teams", href: "teams.html", page: "teams",
    children: [
      { label: "Teams Overview", href: "teams.html" },
      { label: "Schedules & Results", href: "teams.html#schedules" }
    ]
  },
  { label: "News", href: "news.html", page: "news" },
  {
    label: "Get Involved", href: "get-involved.html", page: "get-involved",
    children: [
      { label: "Registration", href: "register.html", page: "register" },
      { label: "Volunteer", href: "get-involved.html#volunteer" },
      { label: "Sponsorship", href: "get-involved.html#sponsorship" },
      { label: "Community Partnerships", href: "get-involved.html#partnerships" }
    ]
  },
  { label: "Contact", href: "contact.html", page: "contact" }
];
