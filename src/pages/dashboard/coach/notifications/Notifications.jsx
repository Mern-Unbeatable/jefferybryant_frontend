import { FiBell, FiUserCheck, FiUserPlus } from "react-icons/fi";
import { LuBuilding2 } from "react-icons/lu";
import NotificationsPage from "@/components/dashboard/NotificationsPage";
import { NOTIFICATIONS } from "@/pages/dashboard/coach/coachData";

const typeIcons = {
  registration: FiUserPlus,
  profileComplete: FiUserCheck,
  platform: FiBell,
  approved: LuBuilding2,
};

const Notifications = () => <NotificationsPage initialItems={NOTIFICATIONS} icons={typeIcons} base="coachDashboard.notifications" />;

export default Notifications;
