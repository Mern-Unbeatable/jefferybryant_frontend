import { useAuth } from "@/hooks/useAuth";
import AccountDetailsSettings from "@/pages/dashboard/settings/AccountDetailsSettings";
import { SCOUT_PROFILE } from "@/pages/dashboard/scout/scoutData";

const ScoutSettings = () => {
  const { user } = useAuth();
  return (
    <AccountDetailsSettings
      initialAccount={{ accountName: user?.name ?? "", email: user?.email ?? "", phone: SCOUT_PROFILE.phone }}
    />
  );
};

export default ScoutSettings;
