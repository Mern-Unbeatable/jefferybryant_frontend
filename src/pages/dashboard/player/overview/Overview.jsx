import { useCallback, useState } from "react";
import ProfileStatusModal from "@/pages/dashboard/player/components/ProfileStatusModal";
import PlayerWelcomeBanner from "./components/PlayerWelcomeBanner";
import ProfileProgressSection from "./components/ProfileProgressSection";
import ProfileOverviewSnapshot from "./components/ProfileOverviewSnapshot";
import ProfileReadinessChecklist from "./components/ProfileReadinessChecklist";

const Overview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <div className="mx-auto flex flex-col gap-5">
      {/* Welcome Banner */}
      <PlayerWelcomeBanner onOpenStatusModal={openModal} />

      {/* Completion & Status Section */}
      <ProfileProgressSection onOpenStatusModal={openModal} />

      {/* Profile Overview Snapshot */}
      <ProfileOverviewSnapshot />

      {/* Next Steps / Profile Readiness Checklist */}
      <ProfileReadinessChecklist />

      {/* Profile Status Explanation Modal */}
      <ProfileStatusModal open={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Overview;
