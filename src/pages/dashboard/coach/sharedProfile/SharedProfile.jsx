import MilestoneRecords from "@/components/dashboard/milestoneRecords/MilestoneRecords";
import { MILESTONES, SHARED_PLAYERS } from "@/pages/dashboard/coach/coachData";

const SharedProfile = () => <MilestoneRecords records={SHARED_PLAYERS} milestones={MILESTONES} />;

export default SharedProfile;
