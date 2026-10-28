import { FiBell, FiUserCheck, FiUserPlus } from "react-icons/fi";
import { LuBuilding2 } from "react-icons/lu";
import NotificationsPage from "@/components/dashboard/NotificationsPage";
import { ADMIN_NOTIFICATIONS_LIST } from "@/pages/dashboard/admin/adminData";

const typeIcons = {
  registration: FiUserPlus,
  profileComplete: FiUserCheck,
  platform: FiBell,
  approved: LuBuilding2,
};

const Notifications = () => (
  <NotificationsPage
    initialItems={ADMIN_NOTIFICATIONS_LIST}
    icons={typeIcons}
    base="coachDashboard.notifications"
  />
);

export default Notifications;

