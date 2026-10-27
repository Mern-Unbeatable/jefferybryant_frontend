import { FiGrid, FiUsers, FiVideo } from "react-icons/fi";
import { PiSoccerBall } from "react-icons/pi";

export const PLAYER_ID = "CFT-2026-JM-0042";

export const PROFILE_STATUSES = ["registered", "incomplete", "complete", "verified", "reviewReady"];
export const CURRENT_STATUS = "incomplete";

export const welcomeMeta = {
  positionCode: "LW",
  position: "LW · Left Winger",
  location: "Jamaica (Kingston)",
  club: "Harbour View FC Academy",
};

export const sampleProfile = {
  initials: "JC",
  name: "Jordan Campbell",
  position: "Central Midfielder",
  club: "Kingston United Academy",
  location: "Kingston, Jamaica",
};

export const profileFields = [
  { key: "fullName", value: "Jordan Campbell" },
  { key: "dateOfBirth", value: "18 Apr 2007 · 19 years" },
  { key: "nationality", value: "Jamaican" },
  { key: "residence", value: "Kingston, Jamaica" },
  { key: "primaryPosition", value: "Central Midfielder" },
  { key: "secondaryPosition", value: "Attacking Midfielder" },
  { key: "heightWeight", value: "178 cm · 72 kg" },
  { key: "preferredFoot", value: "Right" },
  { key: "club", value: "Kingston United Academy" },
];

export const profileSections = [
  { key: "personalPhysical", path: "personal-physical", icon: FiGrid, complete: true },
  { key: "footballBackground", path: "football-background", icon: PiSoccerBall, complete: true },
  { key: "highlightVideo", path: "highlight-video", icon: FiVideo, complete: false, required: true },
  { key: "contactRecruiting", path: "contact-recruiting", icon: FiUsers, complete: true },
];

export const completedSections = profileSections.filter((section) => section.complete).length;

export const POSITION_KEYS = [
  "goalkeeper",
  "rightBack",
  "centreBack",
  "leftBack",
  "defensiveMidfielder",
  "centralMidfielder",
  "attackingMidfielder",
  "rightWinger",
  "leftWinger",
  "forward",
];

export const FOOT_KEYS = ["left", "right", "both"];

export const RECRUITING_STATUS_KEYS = ["open", "registered", "notSeeking"];

export const personalInfo = {
  fullName: "Jordan Campbell",
  dateOfBirth: "2007-04-18",
  nationality: "Jamaican",
  additionalNationality: "",
  country: "Jamaica",
  city: "Kingston",
  height: "178",
  weight: "72",
  preferredFoot: "right",
  primaryPosition: "centralMidfielder",
  secondaryPosition: "attackingMidfielder",
};

export const footballInfo = {
  currentClub: "Kingston United Academy",
  currentLeague: "Jamaica U-19 Development League",
  playingHistory: "Kingston United Academy — U17 and U19 squads, 2022–present",
  nationalTeam: "",
  statistics: "2024 season: 18 appearances, 5 goals, 7 assists",
  achievements: "Academy Players' Player of the Year, 2024",
  previousClubs: [{ id: 1, club: "Harbour View Youth", years: "2020–2022" }],
};

export const videoInfo = {
  highlightUrl: "",
  fullMatchUrl: "",
};

export const contactInfo = {
  recruitingStatus: "open",
  coachName: "Marcus Reid",
  coachEmail: "coach@example.com",
  directorContact: "",
  references: "",
  playerEmail: "jordan@example.com",
  guardianName: "Sample Guardian",
  guardianEmail: "guardian@example.com",
  guardianConsent: false,
};
