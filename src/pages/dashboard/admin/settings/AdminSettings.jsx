import AccountDetailsSettings from "@/pages/dashboard/settings/AccountDetailsSettings";
import { ADMIN_PROFILE } from "@/pages/dashboard/admin/adminData";

const accountInitial = {
  accountName: ADMIN_PROFILE.name,
  email: ADMIN_PROFILE.email,
  phone: "+1 615 555 0100",
};

const AdminSettings = () => <AccountDetailsSettings initialAccount={accountInitial} />;

export default AdminSettings;

