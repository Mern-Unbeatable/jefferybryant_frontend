import AccountDetailsSettings from "@/pages/dashboard/settings/AccountDetailsSettings";
import { ORGANIZATION } from "@/pages/dashboard/coach/coachData";

const accountInitial = { accountName: ORGANIZATION.director, email: ORGANIZATION.email, phone: ORGANIZATION.phone };

const CoachSettings = () => <AccountDetailsSettings initialAccount={accountInitial} />;

export default CoachSettings;
