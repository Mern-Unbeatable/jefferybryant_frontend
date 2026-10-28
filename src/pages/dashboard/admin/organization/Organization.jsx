import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiCheck, FiCheckCircle, FiClock, FiFilter, FiMapPin, FiUsers } from "react-icons/fi";
import { LuBuilding2 } from "react-icons/lu";
import Pagination from "@/components/dashboard/Pagination";
import SelectField from "@/components/dashboard/form/SelectField";
import { ADMIN_ORGANIZATIONS } from "@/pages/dashboard/admin/adminData";
import AdminStatusBadge from "@/pages/dashboard/admin/components/AdminStatusBadge";

const PAGE_SIZE = 5;

const Organization = () => {
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get("filter");

  const [organizations, setOrganizations] = useState(ADMIN_ORGANIZATIONS);
  const [statusFilter, setStatusFilter] = useState(filterParam === "pending" ? "Pending" : "all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [feedback, setFeedback] = useState("");

  const types = useMemo(() => {
    const list = [...new Set(organizations.map((org) => org.type))];
    return [{ value: "all", label: "All Organization Types" }, ...list.map((t) => ({ value: t, label: t }))];
  }, [organizations]);

  const filtered = useMemo(() => {
    return organizations.filter((org) => {
      const matchStatus = statusFilter === "all" || org.status.toLowerCase() === statusFilter.toLowerCase();
      const matchType = typeFilter === "all" || org.type === typeFilter;
      return matchStatus && matchType;
    });
  }, [organizations, statusFilter, typeFilter]);

  const totalPages = Math.max(Math.ceil(filtered.length / PAGE_SIZE), 1);
  const currentPage = Math.min(page, totalPages);
  const pageRows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleApprove = (id, name) => {
    setOrganizations((prev) =>
      prev.map((org) => (org.id === id ? { ...org, status: "Approved" } : org))
    );
    setFeedback(`Organization "${name}" has been approved successfully.`);
    setTimeout(() => setFeedback(""), 4000);
  };

  const pendingCount = organizations.filter((o) => o.status === "Pending").length;
  const approvedCount = organizations.filter((o) => o.status === "Approved").length;

  return (
    <div className="mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
            Academy & Club Directory
          </p>
          <h1 className="mt-1 font-ethnocentric text-xl tracking-wider text-white sm:text-2xl">
            Organization Management
          </h1>
          <p className="mt-1 text-xs text-white/50">
            Review registered clubs, academies, and handle registration approvals.
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-[#12171b] p-4">
          <p className="text-[10px] uppercase tracking-wider text-white/40">Total Registered</p>
          <p className="mt-2 text-2xl font-bold text-white">{organizations.length}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-[#12171b] p-4">
          <p className="text-[10px] uppercase tracking-wider text-amber-400">Pending Approvals</p>
          <p className="mt-2 text-2xl font-bold text-amber-300">{pendingCount}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-[#12171b] p-4">
          <p className="text-[10px] uppercase tracking-wider text-emerald-400">Approved Academies</p>
          <p className="mt-2 text-2xl font-bold text-emerald-300">{approvedCount}</p>
        </div>
      </section>

      {/* Feedback Alert */}
      {feedback && (
        <div className="flex items-center gap-2.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-300">
          <FiCheckCircle className="text-base" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Main Table Box */}
      <div className="rounded-lg border border-white/10 bg-[#12171b]">
        {/* Filter bar */}
        <div className="grid grid-cols-1 gap-3 border-b border-white/10 p-4 sm:grid-cols-2">
          <SelectField
            id="statusFilter"
            name="statusFilter"
            value={statusFilter}
            onChange={(_, val) => {
              setStatusFilter(val);
              setPage(1);
            }}
            options={[
              { value: "all", label: "All Statuses" },
              { value: "Approved", label: "Approved" },
              { value: "Pending", label: "Pending Approval" },
            ]}
          />
          <SelectField
            id="typeFilter"
            name="typeFilter"
            value={typeFilter}
            onChange={(_, val) => {
              setTypeFilter(val);
              setPage(1);
            }}
            options={types}
          />
        </div>

        {/* Organizations Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-200 whitespace-nowrap text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-[9px] uppercase tracking-[0.15em] text-white/45">
                <th scope="col" className="px-4 py-3.5 font-normal">Organization</th>
                <th scope="col" className="px-4 py-3.5 font-normal">Location</th>
                <th scope="col" className="px-4 py-3.5 font-normal">Type</th>
                <th scope="col" className="px-4 py-3.5 font-normal">Players</th>
                <th scope="col" className="px-4 py-3.5 font-normal">Contact Person</th>
                <th scope="col" className="px-4 py-3.5 font-normal">Status</th>
                <th scope="col" className="px-4 py-3.5 font-normal">Submitted</th>
                <th scope="col" className="px-4 py-3.5 text-right font-normal">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {pageRows.map((org) => (
                <tr key={org.id} className="transition hover:bg-white/2">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/5 text-cyan-400">
                        <LuBuilding2 className="text-base" />
                      </span>
                      <span className="font-semibold text-white">{org.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-white/70">
                    {org.city}, {org.country}
                  </td>
                  <td className="px-4 py-3.5 text-white/60">{org.type}</td>
                  <td className="px-4 py-3.5 text-white/70">{org.playersCount} Players</td>
                  <td className="px-4 py-3.5">
                    <p className="text-white">{org.contactName}</p>
                    <p className="text-[10px] text-white/40">{org.email}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <AdminStatusBadge status={org.status} />
                  </td>
                  <td className="px-4 py-3.5 text-white/50">{org.submitted}</td>
                  <td className="px-4 py-3.5 text-right">
                    {org.status === "Pending" ? (
                      <button
                        type="button"
                        onClick={() => handleApprove(org.id, org.name)}
                        className="inline-flex items-center gap-1 rounded bg-btn-primary px-2.5 py-1 text-[11px] font-semibold text-primary transition hover:bg-btn-primary/90"
                      >
                        <FiCheck /> Approve
                      </button>
                    ) : (
                      <span className="text-[11px] text-white/30">Active</span>
                    )}
                  </td>
                </tr>
              ))}

              {pageRows.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-xs text-white/40">
                    No organizations match the selected criteria.
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
    </div>
  );
};

export default Organization;

