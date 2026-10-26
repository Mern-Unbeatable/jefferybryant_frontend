import {
  FiActivity,
  FiBarChart2,
  FiBell,
  FiBookmark,
  FiExternalLink,
  FiFileText,
  FiLink,
  FiMessageSquare,
  FiSearch,
  FiSettings,
  FiStar,
  FiUser,
  FiUsers,
  FiVideo,
} from "react-icons/fi";
import { LuBuilding2, LuLayoutGrid, LuShieldCheck } from "react-icons/lu";

const overview = { key: "overview", path: "", icon: LuLayoutGrid };
const notifications = { key: "notifications", path: "notifications", icon: FiBell };
const settings = { key: "settings", path: "settings", icon: FiSettings };
const sharedProfile = { key: "sharedProfile", path: "shared-profile", icon: FiExternalLink };

export const DASHBOARD_MENUS = {
  admin: [
    overview,
    { key: "users", path: "users", icon: FiUsers },
    { key: "approvals", path: "approvals", icon: LuShieldCheck },
    { key: "players", path: "players", icon: FiUser },
    { key: "scouts", path: "scouts", icon: FiSearch },
    { key: "reports", path: "reports", icon: FiBarChart2 },
    notifications,
    settings,
  ],
  player: [
    overview,
    { key: "myProfile", path: "my-profile", icon: FiUser },
    { key: "highlights", path: "highlights", icon: FiVideo },
    { key: "stats", path: "stats", icon: FiActivity },
    sharedProfile,
    notifications,
    settings,
  ],
  coach: [
    overview,
    { key: "myPlayers", path: "my-players", icon: FiUser },
    { key: "invitePlayers", path: "invite-players", icon: FiLink },
    { key: "recommendPlayer", path: "recommend-player", icon: FiStar },
    { key: "myOrganization", path: "my-organization", icon: LuBuilding2 },
    sharedProfile,
    notifications,
    settings,
  ],
  scout: [
    overview,
    { key: "discover", path: "discover", icon: FiSearch },
    { key: "shortlist", path: "shortlist", icon: FiBookmark },
    { key: "scoutingReports", path: "reports", icon: FiFileText },
    { key: "messages", path: "messages", icon: FiMessageSquare },
    notifications,
    settings,
  ],
};
