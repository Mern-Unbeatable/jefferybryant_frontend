import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FiCheckCircle, FiPlus, FiShare2 } from "react-icons/fi";
import Pagination from "@/components/dashboard/Pagination";
import SelectField from "@/components/dashboard/form/SelectField";
import { primaryButtonClass } from "@/components/dashboard/form/formStyles";
import { ADMIN_PLAYERS } from "@/pages/dashboard/admin/adminData";
import AdminStatusBadge from "@/pages/dashboard/admin/components/AdminStatusBadge";
import PlayerActionMenu from "@/pages/dashboard/admin/components/PlayerActionMenu";
import PlayerDetailModal from "@/pages/dashboard/admin/components/PlayerDetailModal";
import ShareProfileModal from "@/pages/dashboard/admin/components/ShareProfileModal";
import { getInitials } from "@/utils/getInitials";

const PAGE_SIZE = 6;

const VERIFICATION_FILTER_OPTIONS = [
  { value: "all", label: "All Verification" },
  { value: "Verified", label: "Verified" },
  { value: "Pending", label: "Pending" },
  { value: "Ready To Review", label: "Ready To Review" },
];

const INTELLIGENCE_FILTER_OPTIONS = [
  { value: "all", label: "All Intelligence" },
  { value: "Submitted", label: "Submitted" },
  { value: "Verification", label: "Verification" },
  { value: "Watch", label: "Watch" },
  { value: "Review", label: "Review" },
  { value: "Priority", label: "Priority" },
  { value: "Pass", label: "Pass" },
];

const PlayerManagement = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialIntelligence = searchParams.get("intelligence") || "all";
  const initialFilter = searchParams.get("filter") || "";

  // Dynamic players list state
  const [players, setPlayers] = useState(ADMIN_PLAYERS);

  // Filters state
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedPosition, setSelectedPosition] = useState("all");
  const [selectedVerification, setSelectedVerification] = useState(
    initialFilter === "verified"
      ? "Verified"
      : initialFilter === "pending"
      ? "Pending"
      : initialFilter === "verification"
      ? "Ready To Review"
      : "all"
  );
  const [selectedIntelligence, setSelectedIntelligence] = useState(
    initialFilter === "priority" ? "Priority" : initialIntelligence
  );

  const [page, setPage] = useState(1);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [feedback, setFeedback] = useState("");

  // Extract unique countries and positions for filters
  const countries = useMemo(() => {
    const list = [...new Set(players.map((p) => p.country))].sort();
    return [{ value: "all", label: "All Countries" }, ...list.map((c) => ({ value: c, label: c }))];
  }, [players]);

  const positions = useMemo(() => {
    const list = [...new Set(players.map((p) => p.mainPosition))].sort();
    return [{ value: "all", label: "All Positions" }, ...list.map((pos) => ({ value: pos, label: pos }))];
  }, [players]);

  // Filtering
  const filteredPlayers = useMemo(() => {
    return players.filter((player) => {
      const matchCountry = selectedCountry === "all" || player.country === selectedCountry;
      const matchPosition = selectedPosition === "all" || player.mainPosition === selectedPosition;
      const matchVerification =
        selectedVerification === "all" ||
        player.verification.toLowerCase() === selectedVerification.toLowerCase();
      const matchIntelligence =
        selectedIntelligence === "all" ||
        player.intelligence.toLowerCase() === selectedIntelligence.toLowerCase();

      return matchCountry && matchPosition && matchVerification && matchIntelligence;
    });
  }, [players, selectedCountry, selectedPosition, selectedVerification, selectedIntelligence]);

  // Pagination calculation
  const totalPages = Math.max(Math.ceil(filteredPlayers.length / PAGE_SIZE), 1);
  const currentPage = Math.min(page, totalPages);
  const currentRows = filteredPlayers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // Status updates
  const handleUpdateVerification = (player, newStatus) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === player.id ? { ...p, verification: newStatus } : p))
    );
    showFeedback(`${player.name}'s verification updated to "${newStatus}".`);
  };

  const handleUpdateIntelligence = (player, newStage) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === player.id ? { ...p, intelligence: newStage } : p))
    );
    showFeedback(`${player.name} moved to intelligence stage "${newStage}".`);
  };

  const handleSeeDetails = (player) => {
    navigate(`/dashboard/admin/player-management/${player.id}`);
  };

  const handleShareSuccess = ({ scout, player }) => {
    showFeedback(`Successfully shared ${player} with scout ${scout}.`);
  };

  const showFeedback = (msg) => {
    setFeedback(msg);
    setTimeout(() => {
      setFeedback("");
    }, 4000);
  };

  return (
    <div className="mx-auto flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
            Talent Operations
          </p>
          <h1 className="mt-1 font-ethnocentric text-xl tracking-wider text-white sm:text-2xl">
            Player Management
          </h1>
          <p className="mt-1 text-xs text-white/50">
            Search, review and manage all registered player profiles.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShareModalOpen(true)}
          className={`${primaryButtonClass} flex items-center gap-2 self-start text-xs sm:self-auto`}
        >
          <FiShare2 />
          <span>Share Profile</span>
        </button>
      </div>

      {/* Notification Toast */}
      {feedback && (
        <div className="flex items-center gap-2.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-300">
          <FiCheckCircle className="text-base" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Main Table Container */}
      <div className="rounded-lg border border-white/10 bg-[#12171b]">
        {/* Filters Bar */}
        <div className="grid grid-cols-1 gap-3 border-b border-white/10 p-4 sm:grid-cols-2 lg:grid-cols-4">
          <SelectField
            id="countryFilter"
            name="countryFilter"
            value={selectedCountry}
            onChange={(_, val) => {
              setSelectedCountry(val);
              setPage(1);
            }}
            options={countries}
          />
          <SelectField
            id="positionFilter"
            name="positionFilter"
            value={selectedPosition}
            onChange={(_, val) => {
              setSelectedPosition(val);
              setPage(1);
            }}
            options={positions}
          />
          <SelectField
            id="verificationFilter"
            name="verificationFilter"
            value={selectedVerification}
            onChange={(_, val) => {
              setSelectedVerification(val);
              setPage(1);
            }}
            options={VERIFICATION_FILTER_OPTIONS}
          />
          <SelectField
            id="intelligenceFilter"
            name="intelligenceFilter"
            value={selectedIntelligence}
            onChange={(_, val) => {
              setSelectedIntelligence(val);
              setPage(1);
            }}
            options={INTELLIGENCE_FILTER_OPTIONS}
          />
        </div>

        {/* Players Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-220 whitespace-nowrap text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-[9px] uppercase tracking-[0.15em] text-white/45">
                <th scope="col" className="px-4 py-3.5 font-normal">Player</th>
                <th scope="col" className="px-4 py-3.5 font-normal">Location</th>
                <th scope="col" className="px-4 py-3.5 font-normal">Position</th>
                <th scope="col" className="px-4 py-3.5 font-normal">Club / Academy</th>
                <th scope="col" className="px-4 py-3.5 font-normal">Profile</th>
                <th scope="col" className="px-4 py-3.5 font-normal">Verification</th>
                <th scope="col" className="px-4 py-3.5 font-normal">Intelligence</th>
                <th scope="col" className="px-4 py-3.5 font-normal">Submitted</th>
                <th scope="col" className="relative px-4 py-3.5 text-right">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {currentRows.map((player) => (
                <tr key={player.id} className="transition hover:bg-white/2">
                  {/* Player Info */}
                  <td className="px-4 py-3">
                    <Link
                      to={`/dashboard/admin/player-management/${player.id}`}
                      className="group/player flex items-center gap-3"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[10px] font-semibold text-white/80 transition group-hover/player:border-accent group-hover/player:text-accent">
                        {getInitials(player.name)}
                      </span>
                      <div>
                        <p className="font-medium text-white transition group-hover/player:text-accent">
                          {player.name}
                        </p>
                        <p className="text-[10px] text-white/40">
                          {player.cfitId} · Age {player.age}
                        </p>
                      </div>
                    </Link>
                  </td>

                  {/* Location */}
                  <td className="px-4 py-3">
                    <p className="text-white/80">{player.country}</p>
                    <p className="text-[10px] text-white/40">{player.city}</p>
                  </td>

                  {/* Position */}
                  <td className="px-4 py-3">
                    <p className="text-white/80">{player.mainPosition}</p>
                    <p className="text-[10px] text-white/40">{player.subPosition}</p>
                  </td>

                  {/* Club */}
                  <td className="px-4 py-3 text-white/70">
                    {player.club}
                  </td>

                  {/* Profile Progress */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-cyan-400"
                          style={{ width: `${player.profileCompletion}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-semibold text-white/70">
                        {player.profileCompletion}%
                      </span>
                    </div>
                  </td>

                  {/* Verification Status */}
                  <td className="px-4 py-3">
                    <AdminStatusBadge status={player.verification} />
                  </td>

                  {/* Intelligence Stage */}
                  <td className="px-4 py-3">
                    <AdminStatusBadge status={player.intelligence} />
                  </td>

                  {/* Submitted Date */}
                  <td className="px-4 py-3 text-[11px] text-white/50">
                    {player.submitted}
                  </td>

                  {/* Actions Menu */}
                  <td className="px-4 py-3 text-right">
                    <PlayerActionMenu
                      player={player}
                      onSeeDetails={handleSeeDetails}
                      onUpdateVerification={handleUpdateVerification}
                      onUpdateIntelligence={handleUpdateIntelligence}
                    />
                  </td>
                </tr>
              ))}

              {currentRows.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-xs text-white/40">
                    No players found matching the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          totalItems={filteredPlayers.length}
          onChange={setPage}
        />
      </div>

      {/* Share Profile Modal */}
      <ShareProfileModal
        open={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        players={players}
        onShareSuccess={handleShareSuccess}
      />

      {/* Player Detail Modal */}
      <PlayerDetailModal
        player={selectedPlayer}
        open={detailModalOpen}
        onClose={() => {
          setDetailModalOpen(false);
          setSelectedPlayer(null);
        }}
      />
    </div>
  );
};

export default PlayerManagement;

