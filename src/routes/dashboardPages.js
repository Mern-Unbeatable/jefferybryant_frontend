import PlayerOverview from "@/pages/dashboard/player/overview/Overview";
import MyPlayerProfile from "@/pages/dashboard/player/myPlayerProfile/MyPlayerProfile";
import PersonalPhysical from "@/pages/dashboard/player/personalPhysical/PersonalPhysical";
import FootballBackground from "@/pages/dashboard/player/footballBackground/FootballBackground";
import HighlightVideo from "@/pages/dashboard/player/highlightVideo/HighlightVideo";
import ContactRecruiting from "@/pages/dashboard/player/contactRecruiting/ContactRecruiting";
import AccountSettings from "@/pages/dashboard/settings/AccountSettings";

const ROLE_PAGES = {
  player: {
    overview: PlayerOverview,
    myPlayerProfile: MyPlayerProfile,
    personalPhysical: PersonalPhysical,
    footballBackground: FootballBackground,
    highlightVideo: HighlightVideo,
    contactRecruiting: ContactRecruiting,
  },
};

const SHARED_PAGES = { settings: AccountSettings };

export const getDashboardPage = (role, key) => ROLE_PAGES[role]?.[key] ?? SHARED_PAGES[key];
