import { useMemo, useState } from "react";
import { FiCheckCircle, FiEye, FiMail, FiPhone, FiShield, FiUserCheck } from "react-icons/fi";
import Pagination from "@/components/dashboard/Pagination";
import SelectField from "@/components/dashboard/form/SelectField";
import { ADMIN_SCOUTS_LIST } from "@/pages/dashboard/admin/adminData";
import AdminStatusBadge from "@/pages/dashboard/admin/components/AdminStatusBadge";

const PAGE_SIZE = 5;

const ScoutManagement = () => {
  const [scouts, setScouts] = useState(ADMIN_SCOUTS_LIST);
  const [accessFilter, setAccessFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [feedback, setFeedback] = useState("");

  const filtered = useMemo(() => {
    return scouts.filter((scout) => {
      if (accessFilter === "all") return true;
      return scout.status.toLowerCase().includes(accessFilter.toLowerCase());
    });
  }, [scouts, accessFilter]);

  const totalPages = Math.max(Math.ceil(filtered.length / PAGE_SIZE), 1);
  const currentPage = Math.min(page, totalPages);
  const pageRows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const toggleAccess = (id, name, currentLevel) => {
    const nextLevel = currentLevel === "Full Access" ? "Restricted Access" : "Full Access";
    setScouts((prev) =>
      prev.map((s) => (s.id === id ? { ...s, accessLevel: nextLevel, status: "Active" } : s))
    );
    setFeedback(`Access for ${name} updated to "${nextLevel}".`);
    setTimeout(() => setFeedback(""), 4000);
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
            Recruitment Network
          </p>
          <h1 className="mt-1 font-ethnocentric text-xl tracking-wider text-white sm:text-2xl">
            Scout Management
          </h1>
          <p className="mt-1 text-xs text-white/50">
            Monitor scout permissions, assigned milestones, and partner access levels.
          </p>
        </div>
      </div>

      {/* Stats Summary */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-[#12171b] p-4">
          <p className="text-[10px] uppercase tracking-wider text-white/40">Professional Scouts</p>
          <p className="mt-2 text-2xl font-bold text-white">{scouts.length}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-[#12171b] p-4">
          <p className="text-[10px] uppercase tracking-wider text-cyan-400">Full Access</p>
          <p className="mt-2 text-2xl font-bold text-cyan-300">
            {scouts.filter((s) => s.accessLevel === "Full Access").length}
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-[#12171b] p-4">
          <p className="text-[10px] uppercase tracking-wider text-amber-400">Restricted / Pending</p>
          <p className="mt-2 text-2xl font-bold text-amber-300">
            {scouts.filter((s) => s.accessLevel !== "Full Access").length}
          </p>
        </div>
      </section>

      {/* Feedback Toast */}
      {feedback && (
        <div className="flex items-center gap-2.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-300">
          <FiCheckCircle className="text-base" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Table Box */}
      <div className="rounded-lg border border-white/10 bg-[#12171b]">
        {/* Filters */}
        <div className="border-b border-white/10 p-4">
          <div className="max-w-xs">
            <SelectField
              id="scoutStatus"
              name="scoutStatus"
              value={accessFilter}
              onChange={(_, val) => {
                setAccessFilter(val);
                setPage(1);
              }}
              options={[
                { value: "all", label: "All Scout Statuses" },
                { value: "active", label: "Active Scouts" },
                { value: "pending", label: "Pending Verification" },
              ]}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-200 whitespace-nowrap text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-[9px] uppercase tracking-[0.15em] text-white/45">
                <th scope="col" className="px-4 py-3.5 font-normal">Scout</th>
                <th scope="col" className="px-4 py-3.5 font-normal">Partner / Org</th>
                <th scope="col" className="px-4 py-3.5 font-normal">Role</th>
                <th scope="col" className="px-4 py-3.5 font-normal">Access Level</th>
                <th scope="col" className="px-4 py-3.5 font-normal">Assigned Milestones</th>
                <th scope="col" className="px-4 py-3.5 font-normal">Status</th>
                <th scope="col" className="px-4 py-3.5 font-normal">Last Active</th>
                <th scope="col" className="px-4 py-3.5 text-right font-normal">Permissions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {pageRows.map((scout) => (
                <tr key={scout.id} className="transition hover:bg-white/2">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-cyan-400">
                        <FiEye />
                      </span>
                      <div>
                        <p className="font-semibold text-white">{scout.name}</p>
                        <p className="text-[10px] text-white/40">{scout.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-white/80">{scout.organization}</td>
                  <td className="px-4 py-3.5 text-white/60">{scout.role}</td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${
                        scout.accessLevel === "Full Access"
                          ? "border border-cyan-400/40 bg-cyan-400/10 text-cyan-300"
                          : "border border-amber-400/40 bg-amber-400/10 text-amber-300"
                      }`}
                    >
                      {scout.accessLevel}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-white/70">{scout.assignedMilestones}</td>
                  <td className="px-4 py-3.5">
                    <AdminStatusBadge status={scout.status} />
                  </td>
                  <td className="px-4 py-3.5 text-[11px] text-white/50">{scout.lastActive}</td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => toggleAccess(scout.id, scout.name, scout.accessLevel)}
                      className="rounded border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-white transition hover:border-white/30 hover:bg-white/10"
                    >
                      Toggle Access
                    </button>
                  </td>
                </tr>
              ))}
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
    </div>
  );
};

export default ScoutManagement;

