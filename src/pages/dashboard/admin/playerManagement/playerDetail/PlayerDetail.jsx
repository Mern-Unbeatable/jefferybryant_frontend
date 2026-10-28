import { useState } from "react";
import { useParams } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import { ADMIN_PLAYERS } from "@/pages/dashboard/admin/adminData";
import PlayerDetailHeader from "@/pages/dashboard/admin/playerManagement/playerDetail/components/PlayerDetailHeader";
import DetailTabsBar from "@/pages/dashboard/admin/playerManagement/playerDetail/components/DetailTabsBar";
import AdminActionsSidebar from "@/pages/dashboard/admin/playerManagement/playerDetail/components/AdminActionsSidebar";
import RecordStatusCard from "@/pages/dashboard/admin/playerManagement/playerDetail/components/RecordStatusCard";
import AddInternalNoteModal from "@/pages/dashboard/admin/playerManagement/playerDetail/components/AddInternalNoteModal";
import ChangeStageModal from "@/pages/dashboard/admin/playerManagement/playerDetail/components/ChangeStageModal";

import OverviewTab from "@/pages/dashboard/admin/playerManagement/playerDetail/tabs/OverviewTab";
import PersonalPhysicalTab from "@/pages/dashboard/admin/playerManagement/playerDetail/tabs/PersonalPhysicalTab";
import FootballBackgroundTab from "@/pages/dashboard/admin/playerManagement/playerDetail/tabs/FootballBackgroundTab";
import PhotosVideosTab from "@/pages/dashboard/admin/playerManagement/playerDetail/tabs/PhotosVideosTab";
import ContactsRecruitingTab from "@/pages/dashboard/admin/playerManagement/playerDetail/tabs/ContactsRecruitingTab";
import CfitIntelligenceTab from "@/pages/dashboard/admin/playerManagement/playerDetail/tabs/CfitIntelligenceTab";
import ActivityHistoryTab from "@/pages/dashboard/admin/playerManagement/playerDetail/tabs/ActivityHistoryTab";

const PlayerDetail = () => {
  const { playerId } = useParams();

  // Find player by id or fallback to Malik Thompson (first player)
  const initialPlayer =
    ADMIN_PLAYERS.find(
      (p) =>
        String(p.id) === String(playerId) ||
        p.slug === playerId ||
        p.cfitId.toLowerCase() === String(playerId).toLowerCase()
    ) || ADMIN_PLAYERS[0];

  const [player, setPlayer] = useState(initialPlayer);
  const [activeTab, setActiveTab] = useState("overview");
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [stageModalOpen, setStageModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const showFeedback = (msg) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(""), 4000);
  };

  const handleUpdateVerification = (newStatus) => {
    setPlayer((prev) => ({
      ...prev,
      verification: newStatus,
      activityHistory: [
        {
          id: Date.now(),
          action: `Verification status set to ${newStatus}`,
          date: "Just now",
          by: "Admin",
        },
        ...(prev.activityHistory || []),
      ],
    }));
    showFeedback(`Verification status updated to "${newStatus}".`);
  };

  const handleUpdateIntelligence = (newStage) => {
    setPlayer((prev) => ({
      ...prev,
      intelligence: newStage,
      activityHistory: [
        {
          id: Date.now(),
          action: `Intelligence stage changed to ${newStage}`,
          date: "Just now",
          by: "Admin",
        },
        ...(prev.activityHistory || []),
      ],
    }));
    showFeedback(`Intelligence stage updated to "${newStage}".`);
  };

  const handleSaveNote = (noteText) => {
    const newNote = {
      id: Date.now(),
      author: "Admin",
      date: "Just now",
      text: noteText,
    };
    setPlayer((prev) => ({
      ...prev,
      internalNotes: [newNote, ...(prev.internalNotes || [])],
    }));
    showFeedback("Internal note saved successfully.");
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      {/* Player Header Banner */}
      <PlayerDetailHeader
        player={player}
        onChangeStageClick={() => setStageModalOpen(true)}
      />

      {/* Tabs Bar */}
      <DetailTabsBar activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Feedback Toast */}
      {feedback && (
        <div className="flex items-center gap-2.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-300">
          <FiCheckCircle className="text-base" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Main Two Column Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Content Area (Tabs) - 8 cols */}
        <div className="lg:col-span-8">
          {activeTab === "overview" && (
            <OverviewTab player={player} onEditClick={() => setActiveTab("personal")} />
          )}
          {activeTab === "personal" && <PersonalPhysicalTab player={player} />}
          {activeTab === "background" && <FootballBackgroundTab player={player} />}
          {activeTab === "media" && <PhotosVideosTab player={player} />}
          {activeTab === "recruiting" && <ContactsRecruitingTab player={player} />}
          {activeTab === "intelligence" && (
            <CfitIntelligenceTab
              player={player}
              onChangeStageClick={() => setStageModalOpen(true)}
              onAddNoteClick={() => setNoteModalOpen(true)}
            />
          )}
          {activeTab === "history" && <ActivityHistoryTab player={player} />}
        </div>

        {/* Right Sidebar Area - 4 cols */}
        <div className="flex flex-col gap-5 lg:col-span-4">
          <AdminActionsSidebar
            player={player}
            onAddNoteClick={() => setNoteModalOpen(true)}
            onUpdateVerification={handleUpdateVerification}
            onUpdateIntelligence={handleUpdateIntelligence}
          />

          <RecordStatusCard player={player} />
        </div>
      </div>

      {/* Modals */}
      <AddInternalNoteModal
        open={noteModalOpen}
        onClose={() => setNoteModalOpen(false)}
        onSaveNote={handleSaveNote}
      />

      <ChangeStageModal
        open={stageModalOpen}
        onClose={() => setStageModalOpen(false)}
        currentStage={player.intelligence}
        onUpdateStage={handleUpdateIntelligence}
      />
    </div>
  );
};

export default PlayerDetail;

