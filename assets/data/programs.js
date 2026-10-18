/* ==========================================================================
   PROGRAMS
   Program descriptions are based on information previously published by the
   club. Fields set to null are NOT verified and show as “Contact us for
   current details” until filled in.

   Fields:
     id          URL anchor (programs.html#id)
     name        Display name
     summary     One-sentence card description
     overview    Longer description for the Programs page
     image       Key from images.js, or null for a branded panel
     link        Where the card's "Learn more" goes
     ages, level, focus, schedule, location, registration, contact
   ========================================================================== */
window.ERISTARS = window.ERISTARS || {};

ERISTARS.programs = [
  {
    id: "youth-soccer",
    name: "Youth Soccer",
    summary: "Year-round, age-appropriate training and organized play focused on skill development and a love of the game.",
    overview:
      "EriStars gives children and youth across the DC metro area a year-round opportunity to enjoy soccer. Sessions emphasize fundamentals, teamwork and sportsmanship in a supportive, family-centered environment.",
    image: "teamHero",
    imagePosition: "30% 40%",
    link: "programs.html#youth-soccer",
    ages: null,
    level: "Open to players of all experience levels",
    focus: ["Technical fundamentals", "Teamwork and sportsmanship", "Enjoyment of the game"],
    schedule: null,
    location: null,
    registration: "register.html"
  },
  {
    id: "player-development",
    name: "Player Development",
    summary: "Structured training and match play that help players grow technically, tactically and as teammates.",
    overview:
      "For players ready to take the next step, EriStars teams train and compete together in organized league play. The focus is long-term development — technique, decision-making and match performance — guided by the club’s commitment to sportsmanship over winning at all costs.",
    image: "teamHero",
    imagePosition: "88% 50%",
    link: "programs.html#player-development",
    ages: null,
    level: null,
    focus: ["Technical and tactical growth", "Organized league matches", "Team culture and leadership"],
    schedule: null,
    location: null,
    registration: "register.html"
  },
  {
    id: "education",
    name: "Education & Mentorship",
    summary: "Academic encouragement, a Path to College, and scholarship and internship opportunities for our players.",
    overview:
      "EriStars promotes academics alongside athletics. Through its Path to College focus and by sharing scholarship and internship opportunities, the club helps young people plan for what comes after high school.",
    image: "graduates",
    imagePosition: "50% 30%",
    link: "community.html#academics",
    ages: null,
    level: null,
    focus: ["Academic encouragement", "Path to College", "Scholarships & internships"],
    schedule: null,
    location: null,
    registration: null
  },
  {
    id: "community",
    name: "Community & Service",
    summary: "Volunteer opportunities — including Student Service Learning (SSL) hours — and events that bring families together.",
    overview:
      "The club encourages volunteering and community involvement. High school players can take part in Student Service Learning (SSL) opportunities, subject to their school system’s requirements.",
    image: null,
    link: "community.html#service",
    ages: null,
    level: null,
    focus: ["Student Service Learning (SSL)", "Volunteering", "Community events"],
    schedule: null,
    location: null,
    registration: null
  }
];
