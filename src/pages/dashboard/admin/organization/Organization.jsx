import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiCheckCircle, FiMoreHorizontal } from "react-icons/fi";
import { LuBuilding2 } from "react-icons/lu";
import Pagination from "@/components/dashboard/Pagination";
import SelectField from "@/components/dashboard/form/SelectField";
import { ADMIN_ORGANIZATIONS } from "@/pages/dashboard/admin/adminData";
import AdminStatusBadge from "@/pages/dashboard/admin/components/AdminStatusBadge";

const PAGE_SIZE = 5;

const OrganizationActionMenu = ({ org, onSeeDetails, onUpdateStatus }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-7 w-7 items-center justify-center rounded border border-white/10 bg-white/5 text-white/60 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
      >
        <FiMoreHorizontal />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-1.5 w-40 rounded-md border border-white/15 bg-[#161b1f] p-1.5 shadow-2xl backdrop-blur-md">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onSeeDetails(org);
            }}
            className="w-full rounded bg-btn-primary px-3 py-1.5 text-left text-xs font-semibold text-primary transition hover:bg-btn-primary/90"
          >
            See Details
          </button>

          <div className="mt-2 border-t border-white/10 pt-2">
            <p className="px-2 pb-1 text-[9px] font-semibold uppercase tracking-wider text-white/40">
              Status
            </p>
            {["Approved", "Under Review", "Pending"].map((status) => {
              const isSelected = org.status.toLowerCase() === status.toLowerCase();
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onUpdateStatus(org.id, status);
                  }}
                  className={`flex w-full items-center justify-between rounded px-2 py-1 text-left text-xs transition ${
                    isSelected
                      ? "bg-white/10 font-medium text-accent"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{status}</span>
                  {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const Organization = () => {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState(ADMIN_ORGANIZATIONS);

  const [countryFilter, setCountryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [feedback, setFeedback] = useState("");

  const countries = useMemo(() => {
    const list = [...new Set(organizations.map((org) => org.country))];
    return [{ value: "all", label: "All countries" }, ...list.map((c) => ({ value: c, label: c }))];
  }, [organizations]);

  const types = useMemo(() => {
    const list = [...new Set(organizations.map((org) => org.type))];
    return [{ value: "all", label: "All organization types" }, ...list.map((t) => ({ value: t, label: t }))];
  }, [organizations]);

  const filtered = useMemo(() => {
    return organizations.filter((org) => {
      const matchCountry = countryFilter === "all" || org.country === countryFilter;
      const matchType = typeFilter === "all" || org.type === typeFilter;
      const matchStatus =
        statusFilter === "all" || org.status.toLowerCase() === statusFilter.toLowerCase();
      return matchCountry && matchType && matchStatus;
    });
  }, [organizations, countryFilter, typeFilter, statusFilter]);

  const totalPages = Math.max(Math.ceil(filtered.length / PAGE_SIZE), 1);
  const currentPage = Math.min(page, totalPages);
  const pageRows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleUpdateStatus = (id, newStatus) => {
    setOrganizations((prev) =>
      prev.map((org) => (org.id === id ? { ...org, status: newStatus } : org))
    );
    setFeedback(`Organization status updated to "${newStatus}".`);
    setTimeout(() => setFeedback(""), 4000);
  };

  const handleClear = () => {
    setCountryFilter("all");
    setTypeFilter("all");
    setStatusFilter("all");
    setPage(1);
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      {/* Header */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
          Recruitment Network
        </p>
        <h1 className="mt-1 font-ethnocentric text-xl tracking-wider text-white sm:text-2xl">
          Organizations
        </h1>
        <p className="mt-1 text-xs text-white/50">
          Review applications and manage approved recruitment partners.
        </p>
      </div>

      {/* Feedback Toast */}
      {feedback && (
        <div className="flex items-center gap-2.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-300">
          <FiCheckCircle className="text-base" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Table Container */}
      <div className="rounded-lg border border-white/10 bg-[#12171b]">
        {/* Filter Bar */}
        <div className="grid grid-cols-1 items-center gap-3 border-b border-white/10 p-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
          <SelectField
            id="orgCountry"
            name="orgCountry"
            value={countryFilter}
            onChange={(_, val) => {
              setCountryFilter(val);
              setPage(1);
            }}
            options={countries}
          />
          <SelectField
            id="orgType"
            name="orgType"
            value={typeFilter}
            onChange={(_, val) => {
              setTypeFilter(val);
              setPage(1);
            }}
            options={types}
          />
          <SelectField
            id="orgStatus"
            name="orgStatus"
            value={statusFilter}
            onChange={(_, val) => {
              setStatusFilter(val);
              setPage(1);
            }}
            options={[
              { value: "all", label: "All approval statuses" },
              { value: "Approved", label: "Approved" },
              { value: "Under Review", label: "Under Review" },
              { value: "Pending", label: "Pending" },
            ]}
          />
          <button
            type="button"
            onClick={handleClear}
            className="rounded border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-white/60 transition hover:border-white/30 hover:text-white"
          >
            Clear
          </button>
        </div>

        {/* Organizations Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-220 whitespace-nowrap text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-[9px] uppercase tracking-[0.15em] text-white/45">
                <th scope="col" className="px-4 py-3.5 font-normal">Organization</th>
                <th scope="col" className="px-4 py-3.5 font-normal">Type</th>
                <th scope="col" className="px-4 py-3.5 font-normal">Country / Island</th>
                <th scope="col" className="px-4 py-3.5 font-normal">Director / Coach</th>
                <th scope="col" className="px-4 py-3.5 font-normal">Associated Players</th>
                <th scope="col" className="px-4 py-3.5 font-normal">Approval Status</th>
                <th scope="col" className="px-4 py-3.5 font-normal">Registered</th>
                <th scope="col" className="relative px-4 py-3.5 text-right">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {pageRows.map((org) => (
                <tr key={org.id} className="transition hover:bg-white/2">
                  {/* Org Name */}
                  <td className="px-4 py-3.5">
                    <Link
                      to={`/dashboard/admin/organization/${org.id}`}
                      className="group/org flex items-center gap-3"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 text-amber-300 transition group-hover/org:border-amber-400">
                        <LuBuilding2 className="text-sm" />
                      </span>
                      <span className="font-semibold text-white transition group-hover/org:text-accent">
                        {org.name}
                      </span>
                    </Link>
                  </td>

                  {/* Type */}
                  <td className="px-4 py-3.5 text-white/70">{org.type}</td>

                  {/* Country / Island */}
                  <td className="px-4 py-3.5 text-white/70">{org.country}</td>

                  {/* Director / Coach */}
                  <td className="px-4 py-3.5 text-white/80">{org.director}</td>

                  {/* Associated Players */}
                  <td className="px-4 py-3.5 text-white/70">{org.playersCount}</td>

                  {/* Approval Status */}
                  <td className="px-4 py-3.5">
                    <AdminStatusBadge status={org.status} />
                  </td>

                  {/* Registered */}
                  <td className="px-4 py-3.5 text-[11px] text-white/50">{org.registered}</td>

                  {/* Actions */}
                  <td className="px-4 py-3.5 text-right">
                    <OrganizationActionMenu
                      org={org}
                      onSeeDetails={(item) => navigate(`/dashboard/admin/organization/${item.id}`)}
                      onUpdateStatus={handleUpdateStatus}
                    />
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
