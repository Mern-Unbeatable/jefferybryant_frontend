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
    <Modal open={open} onClose={onClose} labelledBy="invite-scout-title" className="max-w-md">
      <div className="rounded-lg border border-white/10 bg-[#161b1f] p-6 text-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 id="invite-scout-title" className="font-ethnocentric text-sm uppercase tracking-wider text-white">
            Invite Professional Scout
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-white/50 hover:bg-white/10 hover:text-white"
          >
            <FiX className="text-lg" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4 text-xs">
          <div>
            <label className="mb-1 block text-[10px] uppercase tracking-wider text-white/50">
              Scout Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. David Alcantara"
              className="w-full rounded border border-white/15 bg-white/5 p-2.5 text-white placeholder-white/30 focus:border-btn-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-[10px] uppercase tracking-wider text-white/50">
              Scout Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. scout@club.com"
              className="w-full rounded border border-white/15 bg-white/5 p-2.5 text-white placeholder-white/30 focus:border-btn-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-[10px] uppercase tracking-wider text-white/50">
              Club / Organization
            </label>
            <input
              type="text"
              required
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              placeholder="e.g. Inter Miami CF"
              className="w-full rounded border border-white/15 bg-white/5 p-2.5 text-white placeholder-white/30 focus:border-btn-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-[10px] uppercase tracking-wider text-white/50">
              Position / Title
            </label>
            <input
              type="text"
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="e.g. Head of International Scouting"
              className="w-full rounded border border-white/15 bg-white/5 p-2.5 text-white placeholder-white/30 focus:border-btn-primary focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button type="button" onClick={onClose} className={secondaryButtonClass}>
              Cancel
            </button>
            <button type="submit" className={primaryButtonClass}>
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

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
            Controlled Professional Access
          </p>
          <h1 className="mt-1 font-ethnocentric text-xl tracking-wider text-white sm:text-2xl">
            Scout Management
          </h1>
          <p className="mt-1 text-xs text-white/50">
            Manage professional scout accounts, organization assignments, approved player access, and scout activity.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setInviteModalOpen(true)}
          className={`${primaryButtonClass} flex items-center gap-2 self-start text-xs sm:self-auto`}
        >
          <FiPlus />
          <span>Invite Scout</span>
        </button>
      </div>

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

      {/* Main Table Container */}
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

      {/* Invite Scout Modal */}
      <InviteScoutModal
        open={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        onInviteSuccess={handleInviteSuccess}
      />
    </div>
  );
};

export default ScoutManagement;
