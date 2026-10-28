import { useSearchParams } from "react-router-dom";
import MilestoneRecords from "@/components/dashboard/milestoneRecords/MilestoneRecords";
import { MILESTONES_CONFIG, MILESTONE_RECORDS } from "@/pages/dashboard/admin/adminData";

const Milestones = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "milestone1";

  // Ordered so that requested tab is first if specified
  const milestones = initialTab === "milestone2"
    ? [...MILESTONES_CONFIG].reverse()
    : MILESTONES_CONFIG;

  return (
    <div className="mx-auto flex flex-col gap-6">
      <MilestoneRecords
        records={MILESTONE_RECORDS}
        milestones={milestones}
      />
    </div>
  );
};

export default Milestones;

