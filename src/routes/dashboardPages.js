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

const ROLE_PAGES = {
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
  scout: [{ path: "players/:playerId", Page: PlayerDetail }],
};

export const getDashboardPage = (role, key) => ROLE_PAGES[role]?.[key] ?? SHARED_PAGES[key];
