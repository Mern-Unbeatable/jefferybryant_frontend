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
      <PlayerWelcomeBanner onOpenStatusModal={openModal} />
      <ProfileProgressSection onOpenStatusModal={openModal} />
      <ProfileOverviewSnapshot />
      <ProfileReadinessChecklist />
      <ProfileStatusModal open={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Overview;
