import CoachWelcomeBanner from "./components/CoachWelcomeBanner";
import CoachStatsGrid from "./components/CoachStatsGrid";
import RegistrationProgressCard from "./components/RegistrationProgressCard";
import RecentActivityCard from "./components/RecentActivityCard";
import CoachQuickActions from "./components/CoachQuickActions";

const Overview = () => {
  return (
    <div className="mx-auto flex flex-col gap-5">
      <CoachWelcomeBanner />
      <CoachStatsGrid />
      <div className="grid gap-5 xl:grid-cols-3">
        <RegistrationProgressCard />
        <RecentActivityCard />
      </div>
      <CoachQuickActions />
    </div>
  );
};

export default Overview;
