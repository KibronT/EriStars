/* ==========================================================================
   TEAMS
   One entry per team. Every team gets its own page automatically at
   team.html?team=<id> — no extra HTML needed.

   status: "current" (shown under Current Season) or "past" (Club Highlights)

   PRIVACY: players are minors. Only add a roster once the club AND guardians
   have approved it. Never publish birth dates or personal contact details.

   Example of a full current-season entry (copy, uncomment and edit):
   {
     id: "g2014",
     name: "Girls 2014",
     ageGroup: "U12",
     season: "Fall 2026",
     status: "current",
     competition: "League name (only if confirmed)",
     image: null,                    // key from images.js, or null
     description: "Short team overview.",
     coaches: [{ name: "Coach Name", role: "Head Coach" }],
     roster: [],                     // e.g. [{ name: "First L.", number: 7 }] — approval required
     schedule: [{ date: "2026-09-06", time: "10:00 AM", opponent: "Opponent", location: "Field name", type: "Match" }],
     results: [{ date: "2026-09-06", opponent: "Opponent", score: "2–1", outcome: "W" }],
     honours: [],
     gallery: []                     // keys from images.js
   }
   ========================================================================== */
window.ERISTARS = window.ERISTARS || {};

ERISTARS.teams = [
  {
    id: "b2013",
    name: "Boys 2013",
    ageGroup: "Birth year 2013",
    season: "Fall 2022",
    status: "past",
    competition: null,
    image: "teamB2013",
    description:
      "The Boys 2013 group closed the Fall 2022 season as SAC champions — a proud moment for the players, coaches and families who supported them.",
    coaches: [],
    roster: [],
    schedule: [],
    results: [],
    honours: ["Fall 2022 SAC Champions"],
    gallery: ["teamB2013"]
  }
];

/* Shown on the Teams page when there are no "current" teams yet. */
ERISTARS.teamsNote =
  "Team pages for the current season are being finalized. Families looking for a team placement can contact the club directly.";
