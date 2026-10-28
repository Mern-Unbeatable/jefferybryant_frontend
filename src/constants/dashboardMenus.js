import {
  FiBarChart2,
  FiBell,
  FiExternalLink,
  FiEye,
  FiGrid,
  FiLink,
  FiSearch,
  FiSettings,
  FiStar,
  FiUser,
  FiUsers,
  FiVideo,
} from "react-icons/fi";
import { LuBuilding2, LuLayoutGrid, LuShieldCheck } from "react-icons/lu";
import { PiSoccerBall } from "react-icons/pi";

const overview = { key: "overview", path: "", icon: LuLayoutGrid };
const notifications = { key: "notifications", path: "notifications", icon: FiBell };
const settings = { key: "settings", path: "settings", icon: FiSettings };
const sharedProfile = { key: "sharedProfile", path: "shared-profile", icon: FiExternalLink };

export const DASHBOARD_MENUS = {
  admin: [
    overview,
    { key: "playerManagement", path: "player-management", icon: FiUser },
    { key: "organization", path: "organization", icon: LuBuilding2 },
    { key: "scoutManagement", path: "scout-management", icon: FiEye },
    notifications,
    settings,
  ],
  player: [
    overview,
    { key: "myPlayerProfile", path: "my-profile", icon: FiUser },
    { key: "personalPhysical", path: "personal-physical", icon: FiGrid },
    { key: "footballBackground", path: "football-background", icon: PiSoccerBall },
    { key: "highlightVideo", path: "highlight-video", icon: FiVideo },
    { key: "contactRecruiting", path: "contact-recruiting", icon: FiUsers },
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
    { key: "players", path: "players", icon: FiUsers },
    { key: "watchlist", path: "watchlist", icon: FiStar },
    { key: "myReviews", path: "reviews", icon: FiEye },
    { key: "assignedPlayers", path: "assigned-players", icon: LuShieldCheck },
    notifications,
    settings,
  ],
};
