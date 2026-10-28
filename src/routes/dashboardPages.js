import PlayerOverview from "@/pages/dashboard/player/overview/Overview";
import MyPlayerProfile from "@/pages/dashboard/player/myPlayerProfile/MyPlayerProfile";
import PersonalPhysical from "@/pages/dashboard/player/personalPhysical/PersonalPhysical";
import FootballBackground from "@/pages/dashboard/player/footballBackground/FootballBackground";
import HighlightVideo from "@/pages/dashboard/player/highlightVideo/HighlightVideo";
import ContactRecruiting from "@/pages/dashboard/player/contactRecruiting/ContactRecruiting";
import AccountSettings from "@/pages/dashboard/settings/AccountSettings";
import CoachOverview from "@/pages/dashboard/coach/overview/Overview";
import MyPlayers from "@/pages/dashboard/coach/myPlayers/MyPlayers";
import InvitePlayers from "@/pages/dashboard/coach/invitePlayers/InvitePlayers";
import RecommendPlayer from "@/pages/dashboard/coach/recommendPlayer/RecommendPlayer";
import MyOrganization from "@/pages/dashboard/coach/myOrganization/MyOrganization";
import SharedProfile from "@/pages/dashboard/coach/sharedProfile/SharedProfile";
import CoachNotifications from "@/pages/dashboard/coach/notifications/Notifications";
import CoachSettings from "@/pages/dashboard/coach/settings/CoachSettings";
import ScoutOverview from "@/pages/dashboard/scout/overview/Overview";
import ScoutPlayers from "@/pages/dashboard/scout/players/Players";
import PlayerDetail from "@/pages/dashboard/scout/playerDetail/PlayerDetail";
import Watchlist from "@/pages/dashboard/scout/watchlist/Watchlist";
import Reviews from "@/pages/dashboard/scout/reviews/Reviews";
import AssignedPlayers from "@/pages/dashboard/scout/assignedPlayers/AssignedPlayers";
import ScoutNotifications from "@/pages/dashboard/scout/notifications/Notifications";
import ScoutSettings from "@/pages/dashboard/scout/settings/ScoutSettings";
import AdminOverview from "@/pages/dashboard/admin/overview/Overview";
import AdminPlayerManagement from "@/pages/dashboard/admin/playerManagement/PlayerManagement";
import AdminOrganization from "@/pages/dashboard/admin/organization/Organization";
import AdminScoutManagement from "@/pages/dashboard/admin/scoutManagement/ScoutManagement";
import AdminNotifications from "@/pages/dashboard/admin/notifications/Notifications";
import AdminSettings from "@/pages/dashboard/admin/settings/AdminSettings";
import AdminMilestones from "@/pages/dashboard/admin/milestones/Milestones";

const ROLE_PAGES = {
  admin: {
    overview: AdminOverview,
    playerManagement: AdminPlayerManagement,
    organization: AdminOrganization,
    scoutManagement: AdminScoutManagement,
    notifications: AdminNotifications,
    settings: AdminSettings,
  },
  player: {
    overview: PlayerOverview,
    myPlayerProfile: MyPlayerProfile,
    personalPhysical: PersonalPhysical,
    footballBackground: FootballBackground,
    highlightVideo: HighlightVideo,
    contactRecruiting: ContactRecruiting,
  },
  coach: {
    overview: CoachOverview,
    myPlayers: MyPlayers,
    invitePlayers: InvitePlayers,
    recommendPlayer: RecommendPlayer,
    myOrganization: MyOrganization,
    sharedProfile: SharedProfile,
    notifications: CoachNotifications,
    settings: CoachSettings,
  },
  scout: {
    overview: ScoutOverview,
    players: ScoutPlayers,
    watchlist: Watchlist,
    myReviews: Reviews,
    assignedPlayers: AssignedPlayers,
    notifications: ScoutNotifications,
    settings: ScoutSettings,
  },
};

const SHARED_PAGES = { settings: AccountSettings };

export const EXTRA_ROUTES = {
  admin: [
    { path: "milestones", Page: AdminMilestones },
    { path: "players", Page: AdminPlayerManagement },
    { path: "scouts", Page: AdminScoutManagement },
  ],
  scout: [{ path: "players/:playerId", Page: PlayerDetail }],
};

export const getDashboardPage = (role, key) => ROLE_PAGES[role]?.[key] ?? SHARED_PAGES[key];
