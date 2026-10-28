import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import { ADMIN_ORGANIZATIONS } from "@/pages/dashboard/admin/adminData";
import AdminStatusBadge from "@/pages/dashboard/admin/components/AdminStatusBadge";

const OrganizationDetail = () => {
  const { orgId } = useParams();

  const initialOrg =
    ADMIN_ORGANIZATIONS.find(
      (o) => o.id === orgId || o.id.toLowerCase().includes(String(orgId).toLowerCase())
    ) || ADMIN_ORGANIZATIONS[1]; // Defaults to Northern United (Image 4)

  const [org, setOrg] = useState(initialOrg);
  const [feedback, setFeedback] = useState("");

  const showFeedback = (msg) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(""), 4000);
  };

  const handleApprove = () => {
    setOrg((prev) => ({ ...prev, status: "Approved" }));
    showFeedback(`Organization "${org.name}" has been approved! Dashboard access enabled.`);
  };

  const handleRequestInfo = () => {
    showFeedback(`Information request sent to ${org.email}.`);
  };

  const handleReject = () => {
    setOrg((prev) => ({ ...prev, status: "Rejected" }));
    showFeedback(`Application for "${org.name}" has been rejected.`);
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      {/* Back button */}
      <div>
        <Link
          to="/dashboard/admin/organization"
          className="inline-flex items-center gap-1.5 text-xs text-white/50 transition hover:text-white"
        >
          <FiArrowLeft className="text-sm" />
          <span>Back to organizations</span>
        </Link>
      </div>

      {/* Title Header */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
          Organization Record
        </p>
        <h1 className="mt-1 font-ethnocentric text-xl uppercase tracking-wider text-white sm:text-2xl">
          {org.name}
        </h1>
        <p className="mt-1 text-xs text-white/50">
          {org.type} · {org.country}
        </p>
      </div>

      {/* Feedback Toast */}
      {feedback && (
        <div className="flex items-center gap-2.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-300">
          <FiCheckCircle className="text-base" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Main Grid: Info + Application Status */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Organization Information (8 cols) */}
        <div className="rounded-lg border border-white/10 bg-[#12171b] p-6 lg:col-span-8">
          <div className="border-b border-white/10 pb-4">
            <h2 className="font-ethnocentric text-xs tracking-wider text-white">
              Organization Information
            </h2>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Field 1 */}
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Organization Name</p>
              <p className="mt-1 font-semibold uppercase text-white">{org.name}</p>
            </div>

            {/* Field 2 */}
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Organization Type</p>
              <p className="mt-1 font-semibold uppercase text-white">{org.type}</p>
            </div>

            {/* Field 3 */}
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Country</p>
              <p className="mt-1 font-semibold uppercase text-white">{org.country}</p>
            </div>

            {/* Field 4 */}
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">City</p>
              <p className="mt-1 font-semibold uppercase text-white">{org.city}</p>
            </div>

            {/* Field 5 */}
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Director/Coach Full Name</p>
              <p className="mt-1 font-semibold uppercase text-white">{org.director}</p>
            </div>

            {/* Field 6 */}
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Position/Role</p>
              <p className="mt-1 font-semibold uppercase text-white">{org.role || "ACADEMY DIRECTOR"}</p>
            </div>

            {/* Field 7 */}
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Email address</p>
              <p className="mt-1 font-semibold uppercase text-white">{org.email}</p>
            </div>

            {/* Field 8 */}
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Phone Number</p>
              <p className="mt-1 font-semibold uppercase text-white">{org.phone}</p>
            </div>

            {/* Field 9 */}
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">
                Approximate Number of Players Ages 15-18 *
              </p>
              <p className="mt-1 font-semibold uppercase text-white">{org.approxPlayers || "12-20"}</p>
            </div>

            {/* Field 10 */}
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Website links</p>
              <p className="mt-1 font-semibold uppercase text-white">{org.website || "—"}</p>
            </div>

            {/* Field 11 */}
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Social Media links</p>
              <p className="mt-1 font-semibold uppercase text-white">{org.social || "—"}</p>
            </div>

            {/* Field 12 */}
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Aged group served</p>
              <p className="mt-1 font-semibold uppercase text-white">{org.ageGroup || "U13 - U19"}</p>
            </div>

            {/* Field 13 */}
            <div className="sm:col-span-2">
              <p className="text-[10px] uppercase tracking-wider text-white/40">Additional contact information</p>
              <p className="mt-1 font-semibold uppercase text-white">{org.additionalContact || "—"}</p>
            </div>
          </div>
        </div>

        {/* Right: Application Status Box (4 cols) */}
        <div className="rounded-lg border border-white/10 bg-[#12171b] p-5 lg:col-span-4">
          <div className="border-b border-white/10 pb-4">
            <h2 className="font-ethnocentric text-xs tracking-wider text-white">
              Application Status
            </h2>
          </div>

          <div className="mt-5 space-y-4">
            <div>
              <AdminStatusBadge status={org.status} />
              <p className="mt-2 text-[11px] leading-relaxed text-white/50">
                Dashboard access remains disabled until CFit Admin approves.
              </p>
            </div>

            <div className="space-y-2.5 pt-3">
              <button
                type="button"
                onClick={handleApprove}
                className="w-full rounded bg-btn-primary py-2.5 text-center text-xs font-bold uppercase tracking-wider text-primary shadow transition hover:bg-btn-primary/90"
              >
                Approve organization
              </button>

              <button
                type="button"
                onClick={handleRequestInfo}
                className="w-full rounded border border-white/15 bg-white/5 py-2.5 text-center text-xs font-medium text-white transition hover:border-white/30 hover:bg-white/10"
              >
                Request information
              </button>

              <button
                type="button"
                onClick={handleReject}
                className="w-full rounded border border-red-500/30 bg-red-500/5 py-2.5 text-center text-xs font-medium text-red-400 transition hover:bg-red-500/10"
              >
                Reject application
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDetail;

