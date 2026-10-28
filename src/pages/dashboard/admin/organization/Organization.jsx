import { useMemo, useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import Pagination from "@/components/dashboard/Pagination";
import SelectField from "@/components/dashboard/form/SelectField";
import { ADMIN_ORGANIZATIONS } from "@/pages/dashboard/admin/adminData";
import AdminHeader from "@/pages/dashboard/admin/components/AdminHeader";
import OrganizationsTable from "./components/OrganizationsTable";

const PAGE_SIZE = 5;

const Organization = () => {
  const [organizations, setOrganizations] = useState(ADMIN_ORGANIZATIONS);

  const [countryFilter, setCountryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [feedback, setFeedback] = useState("");

  const countries = useMemo(() => {
    const list = [...new Set(organizations.map((org) => org.country))];
    return [
      { value: "all", label: "All countries" },
      ...list.map((c) => ({ value: c, label: c })),
    ];
  }, [organizations]);

  const types = useMemo(() => {
    const list = [...new Set(organizations.map((org) => org.type))];
    return [
      { value: "all", label: "All organization types" },
      ...list.map((t) => ({ value: t, label: t })),
    ];
  }, [organizations]);

  const filtered = useMemo(() => {
    return organizations.filter((org) => {
      const matchCountry =
        countryFilter === "all" || org.country === countryFilter;
      const matchType = typeFilter === "all" || org.type === typeFilter;
      const matchStatus =
        statusFilter === "all" ||
        org.status.toLowerCase() === statusFilter.toLowerCase();
      return matchCountry && matchType && matchStatus;
    });
  }, [organizations, countryFilter, typeFilter, statusFilter]);

  const totalPages = Math.max(Math.ceil(filtered.length / PAGE_SIZE), 1);
  const currentPage = Math.min(page, totalPages);
  const pageRows = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handleUpdateStatus = (id, newStatus) => {
    setOrganizations((prev) =>
      prev.map((org) => (org.id === id ? { ...org, status: newStatus } : org)),
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
    <div className="mx-auto flex flex-col gap-6">
      {/* Header */}
      <AdminHeader
        eyebrow="Recruitment Network"
        title="Organizations"
        subtitle="Review applications and manage approved recruitment partners."
      />

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
        <OrganizationsTable
          organizations={pageRows}
          onUpdateStatus={handleUpdateStatus}
        />
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
