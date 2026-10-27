import MilestoneRecords from "@/components/dashboard/milestoneRecords/MilestoneRecords";
import { MILESTONES, SHARED_PLAYERS } from "@/pages/dashboard/coach/coachData";
import { ASSIGNED_DELIVERY } from "@/pages/dashboard/scout/scoutData";

const AssignedPlayers = () => <MilestoneRecords records={SHARED_PLAYERS} milestones={MILESTONES} initialDelivery={ASSIGNED_DELIVERY} />;

export default AssignedPlayers;
