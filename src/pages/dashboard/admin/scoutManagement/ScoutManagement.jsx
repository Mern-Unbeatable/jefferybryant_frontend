import { useMemo, useState } from "react";
import {
  FiBell,
  FiCheckCircle,
  FiChevronRight,
  FiEye,
  FiPlus,
  FiSearch,
  FiShield,
  FiTarget,
  FiUsers,
  FiX,
} from "react-icons/fi";
import Pagination from "@/components/dashboard/Pagination";
import SelectField from "@/components/dashboard/form/SelectField";
import Modal from "@/components/dashboard/Modal";
import { primaryButtonClass, secondaryButtonClass } from "@/components/dashboard/form/formStyles";
import { ADMIN_SCOUTS_LIST, SCOUT_METRICS } from "@/pages/dashboard/admin/adminData";
import AdminStatusBadge from "@/pages/dashboard/admin/components/AdminStatusBadge";
import AdminHeader from "@/pages/dashboard/admin/components/AdminHeader";
import ScoutDetailsModal from "@/pages/dashboard/admin/scoutManagement/components/ScoutDetailsModal";
import ScoutPlayerAccessTab from "@/pages/dashboard/admin/scoutManagement/components/ScoutPlayerAccessTab";
import ScoutFeedbackTab from "@/pages/dashboard/admin/scoutManagement/components/ScoutFeedbackTab";
import ScoutActivityTab from "@/pages/dashboard/admin/scoutManagement/components/ScoutActivityTab";
import SharePlayerProfilesModal from "@/pages/dashboard/admin/scoutManagement/components/SharePlayerProfilesModal";
import AddScoutVisibleNoteModal from "@/pages/dashboard/admin/scoutManagement/components/AddScoutVisibleNoteModal";
import ProfileSharingHistoryModal from "@/pages/dashboard/admin/scoutManagement/components/ProfileSharingHistoryModal";
import CreateProfileDeliveryModal from "@/pages/dashboard/admin/scoutManagement/components/CreateProfileDeliveryModal";
import { getInitials } from "@/utils/getInitials";

const PAGE_SIZE = 5;

const TABS = [
  { id: "directory", label: "Scout Directory" },
  { id: "access", label: "Player Access" },
  { id: "feedback", label: "Scout Feedback" },
  { id: "activity", label: "Activity & Review History" },
];

const InviteScoutModal = ({ open, onClose, onInviteSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    role: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onInviteSuccess(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} labelledBy="invite-scout-title" className="max-w-lg">
      <div className="rounded-lg border border-white/10 bg-[#161b1f] p-6 text-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-btn-primary/20 text-btn-primary">
              <FiPlus className="text-base font-bold" />
            </span>
            <div>
              <h3 id="invite-scout-title" className="font-ethnocentric text-xs uppercase tracking-wider text-white sm:text-sm">
                Invite Professional Scout
              </h3>
              <p className="mt-0.5 text-[10px] text-white/50">
                Admin-only invitation. No public registration is available.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-white/50 hover:bg-white/10 hover:text-white"
          >
            <FiX className="text-lg" />
          </button>
        </div>

        {/* 2x2 Form Grid */}
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-5 text-xs">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Full Name */}
            <div>
              <label className="mb-1.5 block text-[10px] uppercase tracking-wider text-white/60">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Full Name"
                className="w-full rounded border border-white/15 bg-[#12171b] p-2.5 text-xs text-white placeholder-white/30 focus:border-btn-primary focus:outline-none"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="mb-1.5 block text-[10px] uppercase tracking-wider text-white/60">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email Address"
                className="w-full rounded border border-white/15 bg-[#12171b] p-2.5 text-xs text-white placeholder-white/30 focus:border-btn-primary focus:outline-none"
              />
            </div>

            {/* Organization / Team */}
            <div>
              <label className="mb-1.5 block text-[10px] uppercase tracking-wider text-white/60">
                Organization / Team *
              </label>
              <div className="relative">
                <select
                  required
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full appearance-none rounded border border-white/15 bg-[#12171b] p-2.5 pr-8 text-xs text-white focus:border-btn-primary focus:outline-none"
                >
                  <option value="" disabled className="bg-[#161b1f] text-white/50">
                    Organization/Team name
                  </option>
                  <option value="Toronto FC" className="bg-[#161b1f] text-white">Toronto FC</option>
                  <option value="Inter Miami CF" className="bg-[#161b1f] text-white">Inter Miami CF</option>
                  <option value="Nashville SC" className="bg-[#161b1f] text-white">Nashville SC</option>
                  <option value="Harbour View FC" className="bg-[#161b1f] text-white">Harbour View FC</option>
                  <option value="CFit Regional" className="bg-[#161b1f] text-white">CFit Regional</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-white/50">
                  <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Position / Title */}
            <div>
              <label className="mb-1.5 block text-[10px] uppercase tracking-wider text-white/60">
                Position / Title *
              </label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="Position"
                className="w-full rounded border border-white/15 bg-[#12171b] p-2.5 text-xs text-white placeholder-white/30 focus:border-btn-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-2 flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white transition hover:border-white/30 hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-btn-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary shadow transition hover:bg-btn-primary/90"
            >
              Send Invitation
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

const ScoutManagement = () => {
  const [scouts, setScouts] = useState(ADMIN_SCOUTS_LIST);
  const [activeTab, setActiveTab] = useState("directory");

  // Filters
  const [orgFilter, setOrgFilter] = useState("all");
  const [accountFilter, setAccountFilter] = useState("all");
  const [invitationFilter, setInvitationFilter] = useState("all");
  const [searchName, setSearchName] = useState("");

  const [page, setPage] = useState(1);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [detailsScout, setDetailsScout] = useState(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [sharingHistoryRecord, setSharingHistoryRecord] = useState(null);
  const [createDeliveryModalOpen, setCreateDeliveryModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const organizations = useMemo(() => {
    const list = [...new Set(scouts.map((s) => s.organization))];
    return [{ value: "all", label: "All organizations" }, ...list.map((o) => ({ value: o, label: o }))];
  }, [scouts]);

  const filtered = useMemo(() => {
    return scouts.filter((s) => {
      const matchOrg = orgFilter === "all" || s.organization === orgFilter;
      const matchAccount =
        accountFilter === "all" || s.accountStatus.toLowerCase() === accountFilter.toLowerCase();
      const matchInvite =
        invitationFilter === "all" || s.invitation.toLowerCase() === invitationFilter.toLowerCase();
      const matchName =
        !searchName ||
        s.name.toLowerCase().includes(searchName.toLowerCase()) ||
        s.email.toLowerCase().includes(searchName.toLowerCase());

      return matchOrg && matchAccount && matchInvite && matchName;
    });
  }, [scouts, orgFilter, accountFilter, invitationFilter, searchName]);

  const totalPages = Math.max(Math.ceil(filtered.length / PAGE_SIZE), 1);
  const currentPage = Math.min(page, totalPages);
  const pageRows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleClearFilters = () => {
    setOrgFilter("all");
    setAccountFilter("all");
    setInvitationFilter("all");
    setSearchName("");
    setPage(1);
  };

  const handleInviteSuccess = (data) => {
    const newScout = {
      id: `sc-${Date.now()}`,
      scoutId: `SC-${Math.floor(100 + Math.random() * 900)}`,
      name: data.name,
      organization: data.organization,
      role: data.role,
      email: data.email,
      invitation: "Pending",
      accountStatus: "Invitation Pending",
      sharedPlayers: 0,
      lastActive: "Never",
    };
    setScouts((prev) => [newScout, ...prev]);
    setFeedback(`Invitation sent to ${data.email}.`);
    setTimeout(() => setFeedback(""), 4000);
  };

  const handleUpdateStatus = (id, newStatus) => {
    setScouts((prev) =>
      prev.map((s) => (s.id === id ? { ...s, accountStatus: newStatus } : s))
    );
    if (detailsScout && detailsScout.id === id) {
      setDetailsScout((prev) => ({ ...prev, accountStatus: newStatus }));
    }
    setFeedback(`Scout account status updated to "${newStatus}".`);
    setTimeout(() => setFeedback(""), 4000);
  };

  const handleConfirmShare = (count) => {
    setFeedback(`Successfully shared ${count} profile(s) with James Mitchell.`);
    setTimeout(() => setFeedback(""), 4000);
  };

  const handleSaveScoutNote = (text, isVisible) => {
    setFeedback(
      isVisible ? "Scout-visible note saved and approved." : "Private admin note saved."
    );
    setTimeout(() => setFeedback(""), 4000);
  };

  return (
    <div className="mx-auto flex flex-col gap-6">
      {/* Top Header */}
      <AdminHeader
        eyebrow="Controlled Professional Access"
        title="Scout Management"
        subtitle="Manage professional scout accounts, organization assignments, approved player access, and scout activity."
        action={
          <button
            type="button"
            onClick={() => setInviteModalOpen(true)}
            className={`${primaryButtonClass} flex items-center gap-2 text-xs`}
          >
            <FiPlus />
            <span>Invite Scout</span>
          </button>
        }
      />

      {/* Admin Controlled Prototype Notice Banner */}
      <div className="flex items-start gap-3 rounded-lg border border-amber-400/20 bg-amber-400/5 p-4 text-xs text-amber-300">
        <FiShield className="mt-0.5 shrink-0 text-base" />
        <div>
          <p className="font-semibold uppercase tracking-wider">
            Admin-controlled prototype workspace
          </p>
          <p className="mt-0.5 text-[11px] text-amber-300/70">
            Pictorial demonstration data. Scouts cannot self-register and never receive automatic access to the player database.
          </p>
        </div>
      </div>

      {/* 6 Metric Cards Row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {SCOUT_METRICS.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.id}
              className="flex flex-col justify-between rounded-lg border border-white/10 bg-[#12171b] p-3.5 transition hover:border-white/20"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-7 w-7 items-center justify-center rounded border border-white/10 bg-white/5 text-cyan-400">
                  <Icon className="text-xs" />
                </span>
                <FiChevronRight className="text-[10px] text-white/30" />
              </div>
              <div className="mt-3">
                <p className="text-xl font-bold text-white">{metric.value}</p>
                <p className="mt-0.5 text-[10px] text-white/45">{metric.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feedback Toast */}
      {feedback && (
        <div className="flex items-center gap-2.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-300">
          <FiCheckCircle className="text-base" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex gap-6 overflow-x-auto border-b border-white/10 [scrollbar-width:none]">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap border-b-2 pb-3 text-xs transition ${
                isActive
                  ? "border-btn-primary font-semibold text-white"
                  : "border-transparent text-white/50 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: Scout Directory */}
      {activeTab === "directory" && (
        <div className="rounded-lg border border-white/10 bg-[#12171b]">
          {/* Filters Bar */}
          <div className="grid grid-cols-1 items-center gap-3 border-b border-white/10 p-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.5fr_auto]">
            <SelectField
              id="orgFilter"
              name="orgFilter"
              value={orgFilter}
              onChange={(_, val) => {
                setOrgFilter(val);
                setPage(1);
              }}
              options={organizations}
            />
            <SelectField
              id="accountFilter"
              name="accountFilter"
              value={accountFilter}
              onChange={(_, val) => {
                setAccountFilter(val);
                setPage(1);
              }}
              options={[
                { value: "all", label: "All account statuses" },
                { value: "Active", label: "Active" },
                { value: "Suspended", label: "Suspended" },
                { value: "Invitation Pending", label: "Invitation Pending" },
              ]}
            />
            <SelectField
              id="invitationFilter"
              name="invitationFilter"
              value={invitationFilter}
              onChange={(_, val) => {
                setInvitationFilter(val);
                setPage(1);
              }}
              options={[
                { value: "all", label: "All invitation statuses" },
                { value: "Accepted", label: "Accepted" },
                { value: "Pending", label: "Pending" },
              ]}
            />
            <div className="relative">
              <input
                type="text"
                value={searchName}
                onChange={(e) => {
                  setSearchName(e.target.value);
                  setPage(1);
                }}
                placeholder="Scout name"
                className="w-full rounded border border-white/15 bg-white/5 py-2 pl-3 pr-8 text-xs text-white placeholder-white/35 focus:border-btn-primary focus:outline-none"
              />
              <FiSearch className="absolute right-3 top-2.5 text-white/40" />
            </div>
            <button
              type="button"
              onClick={handleClearFilters}
              className="rounded border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/60 transition hover:border-white/30 hover:text-white"
            >
              Clear filters
            </button>
          </div>

          {/* Scouts Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-220 whitespace-nowrap text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-[9px] uppercase tracking-[0.15em] text-white/45">
                  <th scope="col" className="px-4 py-3.5 font-normal">Scout</th>
                  <th scope="col" className="px-4 py-3.5 font-normal">Organization / Team</th>
                  <th scope="col" className="px-4 py-3.5 font-normal">Position / Title</th>
                  <th scope="col" className="px-4 py-3.5 font-normal">Email</th>
                  <th scope="col" className="px-4 py-3.5 font-normal">Invitation</th>
                  <th scope="col" className="px-4 py-3.5 font-normal">Account</th>
                  <th scope="col" className="px-4 py-3.5 font-normal">Shared Players</th>
                  <th scope="col" className="px-4 py-3.5 font-normal">Last Active</th>
                  <th scope="col" className="px-4 py-3.5 text-right font-normal">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {pageRows.map((scout) => (
                  <tr key={scout.id} className="transition hover:bg-white/2">
                    {/* Scout avatar + name */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[10px] font-semibold text-white/80">
                          {getInitials(scout.name)}
                        </span>
                        <div>
                          <p className="font-semibold text-white">{scout.name}</p>
                          <p className="text-[10px] text-white/40">{scout.scoutId}</p>
                        </div>
                      </div>
                    </td>

                    {/* Org */}
                    <td className="px-4 py-3.5 text-white/80">{scout.organization}</td>

                    {/* Title */}
                    <td className="px-4 py-3.5 text-white/60">{scout.role}</td>

                    {/* Email */}
                    <td className="px-4 py-3.5 text-white/70">{scout.email}</td>

                    {/* Invitation */}
                    <td className="px-4 py-3.5">
                      <AdminStatusBadge status={scout.invitation} />
                    </td>

                    {/* Account Status */}
                    <td className="px-4 py-3.5">
                      <AdminStatusBadge status={scout.accountStatus} />
                    </td>

                    {/* Shared Players */}
                    <td className="px-4 py-3.5 text-white/70">{scout.sharedPlayers}</td>

                    {/* Last Active */}
                    <td className="px-4 py-3.5 text-[11px] text-white/50">{scout.lastActive}</td>

                    {/* Action Link */}
                    <td className="px-4 py-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => setDetailsScout(scout)}
                        className="text-[11px] font-medium text-btn-primary hover:underline"
                      >
                        View profile
                      </button>
                    </td>
                  </tr>
                ))}

                {pageRows.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-4 py-12 text-center text-xs text-white/40">
                      No scouts match the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            page={currentPage}
            totalPages={totalPages}
            totalItems={filtered.length}
            onChange={setPage}
          />
        </div>
      )}

      {/* TAB 2: Player Access */}
      {activeTab === "access" && (
        <ScoutPlayerAccessTab
          onOpenShareModal={() => setShareModalOpen(true)}
          onOpenAddNoteModal={() => setNoteModalOpen(true)}
        />
      )}

      {/* TAB 3: Scout Feedback */}
      {activeTab === "feedback" && <ScoutFeedbackTab />}

      {/* TAB 4: Activity & Review History */}
      {activeTab === "activity" && (
        <ScoutActivityTab
          onViewHistory={(record) => setSharingHistoryRecord(record)}
          onOpenCreateDelivery={() => setCreateDeliveryModalOpen(true)}
        />
      )}

      {/* Modals */}
      <InviteScoutModal
        open={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        onInviteSuccess={handleInviteSuccess}
      />

      <ScoutDetailsModal
        scout={detailsScout}
        open={Boolean(detailsScout)}
        onClose={() => setDetailsScout(null)}
        onUpdateStatus={handleUpdateStatus}
        onManageAccess={() => {
          setDetailsScout(null);
          setActiveTab("access");
        }}
      />

      <SharePlayerProfilesModal
        open={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        scoutName="James Mitchell"
        onConfirmShare={handleConfirmShare}
      />

      <AddScoutVisibleNoteModal
        open={noteModalOpen}
        onClose={() => setNoteModalOpen(false)}
        onSave={handleSaveScoutNote}
      />

      <ProfileSharingHistoryModal
        record={sharingHistoryRecord}
        open={Boolean(sharingHistoryRecord)}
        onClose={() => setSharingHistoryRecord(null)}
      />

      <CreateProfileDeliveryModal
        open={createDeliveryModalOpen}
        onClose={() => setCreateDeliveryModalOpen(false)}
        onConfirm={(batch) => {
          setFeedback(`Profile delivery "${batch.deliveryName}" created successfully.`);
          setCreateDeliveryModalOpen(false);
          setTimeout(() => setFeedback(""), 4000);
        }}
      />
    </div>
  );
};

export default ScoutManagement;
