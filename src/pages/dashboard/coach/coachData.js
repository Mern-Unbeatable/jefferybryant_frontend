import { FiCheck, FiClock, FiNavigation, FiUsers } from "react-icons/fi";

export const ORGANIZATION = {
  id: "CFT-JM-1048",
  name: "Kingston Athletic Academy",
  shortName: "Kingston Athletic",
  type: "academy",
  country: "Jamaica",
  city: "Kingston",
  status: "approved",
  website: "kingstonathletic.example",
  social: "@kingstonathletic",
  ageGroups: "U15, U16, U17, U18",
  playersCount: "Approximately 75",
  director: "David Morgan",
  role: "Academy Director",
  email: "david@kingstonathletic.example",
  phone: "+1 876 555 0148",
  additionalContacts: "S. Richards — Head Coach",
  inviteLink: "https://join.cfit.com/kingston-athletic",
};

export const ORGANIZATION_TYPES = ["academy", "club", "school", "federation"];

export const PLAYER_SUMMARY = { registered: 48, complete: 31, incomplete: 17, verified: 19 };

export const COACH_STATS = [
  { key: "totalRegistered", value: PLAYER_SUMMARY.registered, icon: FiUsers },
  { key: "profilesComplete", value: PLAYER_SUMMARY.complete, icon: FiCheck },
  { key: "profilesIncomplete", value: PLAYER_SUMMARY.incomplete, icon: FiClock },
  { key: "registrationActivity", value: 12, icon: FiNavigation },
];

export const REGISTRATION_PROGRESS = [
  { key: "invited", value: 72 },
  { key: "registered", value: PLAYER_SUMMARY.registered },
  { key: "profileComplete", value: PLAYER_SUMMARY.complete },
  { key: "verified", value: PLAYER_SUMMARY.verified },
];

export const RECENT_ACTIVITY = [
  { id: 1, name: "Malik Thompson", type: "verified", time: "today" },
  { id: 2, name: "Andre Lewis", type: "complete", time: "today" },
  { id: 3, name: "Kemar Brown", type: "submitted", time: "yesterday" },
  { id: 4, name: "Dante Williams", type: "registered", date: "2025-10-21" },
];

export const PLAYER_POSITIONS = ["goalkeeper", "defender", "midfielder", "forward"];
export const AGE_GROUPS = ["u15", "u16", "u17", "u18"];

export const COACH_PLAYERS = [
  { id: 1, name: "Malik Thompson", age: 17, position: "forward", country: "Jamaica", registered: "2025-10-22", profile: 100, status: "verified", missing: [] },
  { id: 2, name: "Andre Lewis", age: 16, position: "midfielder", country: "Jamaica", registered: "2025-10-20", profile: 100, status: "complete", missing: [] },
  { id: 3, name: "Kemar Brown", age: 17, position: "defender", country: "Jamaica", registered: "2025-10-18", profile: 72, status: "incomplete", missing: ["matchVideo", "guardianConsent"] },
  { id: 4, name: "Dante Williams", age: 15, position: "goalkeeper", country: "Jamaica", registered: "2025-10-16", profile: 45, status: "incomplete", missing: ["footballBackground", "matchVideo"] },
  { id: 5, name: "Jalani Grant", age: 16, position: "forward", country: "Jamaica", registered: "2025-10-14", profile: 10, status: "incomplete", missing: ["personalDetails", "footballBackground", "matchVideo"] },
  { id: 6, name: "Noah Campbell", age: 18, position: "midfielder", country: "Jamaica", registered: "2025-10-11", profile: 100, status: "complete", missing: [] },
  { id: 7, name: "Tyrese Morgan", age: 17, position: "defender", country: "Jamaica", registered: "2025-10-09", profile: 100, status: "verified", missing: [] },
  { id: 8, name: "Rohan Clarke", age: 15, position: "midfielder", country: "Jamaica", registered: "2025-10-07", profile: 60, status: "incomplete", missing: ["matchVideo"] },
  { id: 9, name: "Shane Henry", age: 18, position: "forward", country: "Trinidad and Tobago", registered: "2025-10-05", profile: 100, status: "complete", missing: [] },
  { id: 10, name: "Javon Reid", age: 16, position: "goalkeeper", country: "Jamaica", registered: "2025-10-03", profile: 100, status: "verified", missing: [] },
  { id: 11, name: "Omari Walker", age: 17, position: "defender", country: "Barbados", registered: "2025-09-30", profile: 85, status: "incomplete", missing: ["guardianConsent"] },
  { id: 12, name: "Kofi Bennett", age: 15, position: "forward", country: "Jamaica", registered: "2025-09-27", profile: 100, status: "complete", missing: [] },
  { id: 13, name: "Darnell Scott", age: 18, position: "midfielder", country: "Jamaica", registered: "2025-09-24", profile: 100, status: "verified", missing: [] },
  { id: 14, name: "Isaiah Francis", age: 16, position: "defender", country: "Jamaica", registered: "2025-09-20", profile: 35, status: "incomplete", missing: ["footballBackground", "matchVideo"] },
];

export const RECOMMENDATIONS = [
  { id: 1, name: "Malik Thompson", date: "2025-10-14", status: "received" },
  { id: 2, name: "Andre Lewis", date: "2025-09-28", status: "received" },
];

export const RECOMMENDATION_MAX_LENGTH = 1000;

export const MILESTONES = [
  { key: "milestone1", target: 25 },
  { key: "milestone2", target: 50 },
];

const sharedPlayer = (id, name, countryCode, country, position, reviewReady, presented, milestone) => ({
  id,
  name,
  cfitId: `CF-2026-${String(id).padStart(3, "0")}`,
  countryCode,
  country,
  position,
  reviewReady,
  presented,
  milestone,
});

export const SHARED_PLAYERS = [
  sharedPlayer(1, "Marcus Williams", "US", "United States", "centreBack", "2025-01-08", "2025-01-14", "milestone1"),
  sharedPlayer(2, "Daniel Brown", "GB", "England", "centralMidfielder", "2025-01-06", "2025-01-12", "milestone1"),
  sharedPlayer(3, "Mateo Silva", "BR", "Brazil", "rightWinger", "2024-12-22", "2025-01-10", "milestone1"),
  sharedPlayer(4, "Kwame Mensah", "GH", "Ghana", "defensiveMidfielder", "2024-12-15", "2025-01-08", "milestone1"),
  sharedPlayer(5, "Luca Romano", "IT", "Italy", "leftBack", "2024-12-12", "2025-01-04", "milestone1"),
  sharedPlayer(6, "Malik Thompson", "JM", "Jamaica", "forward", "2024-12-10", "2024-12-28", "milestone1"),
  sharedPlayer(7, "Noah Campbell", "JM", "Jamaica", "centralMidfielder", "2024-12-06", "2024-12-20", "milestone1"),
  sharedPlayer(8, "Shane Henry", "TT", "Trinidad and Tobago", "forward", "2024-12-02", "2024-12-16", "milestone1"),
  sharedPlayer(9, "Javon Reid", "JM", "Jamaica", "goalkeeper", "2024-11-28", "2024-12-12", "milestone1"),
  sharedPlayer(10, "Omari Walker", "BB", "Barbados", "centreBack", "2024-11-24", "2024-12-08", "milestone1"),
  sharedPlayer(11, "Darnell Scott", "JM", "Jamaica", "attackingMidfielder", "2024-11-20", "2024-12-04", "milestone1"),
  sharedPlayer(12, "Tyrese Morgan", "JM", "Jamaica", "rightBack", "2025-02-02", "2025-02-14", "milestone2"),
  sharedPlayer(13, "Kofi Bennett", "JM", "Jamaica", "leftWinger", "2025-01-28", "2025-02-10", "milestone2"),
  sharedPlayer(14, "Andre Lewis", "JM", "Jamaica", "centralMidfielder", "2025-01-24", "2025-02-06", "milestone2"),
];

export const NOTIFICATIONS = [
  { id: 1, type: "registration", name: "Dante Williams", time: "minutesAgo", amount: 15, unread: true },
  { id: 2, type: "profileComplete", name: "Andre Lewis", time: "hoursAgo", amount: 2, unread: true },
  { id: 3, type: "platform", time: "yesterday", unread: true },
  { id: 4, type: "approved", name: ORGANIZATION.name, date: "2025-10-02", unread: false },
];
