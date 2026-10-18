/* ==========================================================================
   IMAGE LIBRARY
   Every photo used on the site is registered here once. To replace or add a
   photo: export it in a few widths (e.g. 600 / 960 / 1600 px, WebP), drop the
   files into assets/images/, and add or edit an entry below.

   Only use photos the club is authorized to publish (players are minors).
   ========================================================================== */
window.ERISTARS = window.ERISTARS || {};

ERISTARS.images = {
  /* Boys 2013 team, Fall 2022 — cropped to remove the printed caption. */
  teamHero: {
    src: "assets/images/team-hero-1280.webp",
    srcset: "assets/images/team-hero-768.webp 768w, assets/images/team-hero-1280.webp 1280w, assets/images/team-hero-2048.webp 2048w",
    width: 2048, height: 753,
    alt: "EriStars youth players in green-and-white striped kits line up on the field wearing medals, with two coaches."
  },

  /* Same photo, uncropped, including its printed "B2013 – Fall 2022 SAC Champions" caption. */
  teamB2013: {
    src: "assets/images/team-b2013-960.webp",
    srcset: "assets/images/team-b2013-600.webp 600w, assets/images/team-b2013-960.webp 960w, assets/images/team-b2013-1600.webp 1600w",
    full: "assets/images/team-b2013-1600.webp",
    width: 1600, height: 879,
    alt: "The EriStars Boys 2013 team and coaches celebrating with medals in front of a goal under the caption “B2013 – Fall 2022 SAC Champions.”",
    caption: "Boys 2013 — Fall 2022 SAC Champions"
  },

  graduates: {
    src: "assets/images/graduates-960.webp",
    srcset: "assets/images/graduates-600.webp 600w, assets/images/graduates-960.webp 960w, assets/images/graduates-1500.webp 1500w",
    full: "assets/images/graduates-1500.webp",
    width: 1500, height: 1001,
    alt: "A group of EriStars graduates in caps and gowns, many wearing stoles in the colors of the Eritrean flag, pose on a staircase.",
    caption: "Celebrating our graduates",
    credit: "Photo: Alex Fotography"
  }
};

/* Photos shown in the “Life at EriStars” gallery, in order. */
ERISTARS.gallery = ["teamB2013", "graduates"];
