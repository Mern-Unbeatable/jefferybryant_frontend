import { FiBell, FiMessageSquare, FiUserPlus } from "react-icons/fi";
import { LuShieldCheck } from "react-icons/lu";
import NotificationsPage from "@/components/dashboard/NotificationsPage";
import { SCOUT_NOTIFICATIONS } from "@/pages/dashboard/scout/scoutData";

const typeIcons = {
  playerShared: FiUserPlus,
  requestResponded: FiMessageSquare,
  platform: FiBell,
  accessApproved: LuShieldCheck,
};

const Notifications = () => <NotificationsPage initialItems={SCOUT_NOTIFICATIONS} icons={typeIcons} base="scoutDashboard.notifications" />;

export default Notifications;
