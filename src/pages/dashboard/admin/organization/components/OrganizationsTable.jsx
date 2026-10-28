import { Link, useNavigate } from "react-router-dom";
import { LuBuilding2 } from "react-icons/lu";
import AdminStatusBadge from "@/pages/dashboard/admin/components/AdminStatusBadge";
import OrganizationActionMenu from "./OrganizationActionMenu";

/**
 * OrganizationsTable - Renders the organizations list table with status badges and actions
 *
 * @param {Array} organizations - Array of organization records to display
 * @param {Function} onSeeDetails - Optional callback when "See Details" is clicked
 * @param {Function} onUpdateStatus - Callback when a status is updated
 */
const OrganizationsTable = ({
  organizations = [],
  onSeeDetails,
  onUpdateStatus,
}) => {
  const navigate = useNavigate();

  const handleSeeDetails = (org) => {
    if (onSeeDetails) {
      onSeeDetails(org);
    } else {
      navigate(`/dashboard/admin/organization/${org.id}`);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-220 whitespace-nowrap text-left text-xs">
        <thead>
          <tr className="border-b border-white/10 text-[9px] uppercase tracking-[0.15em] text-white/45">
            <th scope="col" className="px-4 py-3.5 font-normal">
              Organization
            </th>
            <th scope="col" className="px-4 py-3.5 font-normal">
              Type
            </th>
            <th scope="col" className="px-4 py-3.5 font-normal">
              Country / Island
            </th>
            <th scope="col" className="px-4 py-3.5 font-normal">
              Director / Coach
            </th>
            <th scope="col" className="px-4 py-3.5 font-normal">
              Associated Players
            </th>
            <th scope="col" className="px-4 py-3.5 font-normal">
              Approval Status
            </th>
            <th scope="col" className="px-4 py-3.5 font-normal">
              Registered
            </th>
            <th scope="col" className="relative px-4 py-3.5 text-right">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {organizations.map((org) => (
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
              <td className="px-4 py-3.5 text-white/70">
                {org.playersCount}
              </td>

              {/* Approval Status */}
              <td className="px-4 py-3.5">
                <AdminStatusBadge status={org.status} />
              </td>

              {/* Registered */}
              <td className="px-4 py-3.5 text-[11px] text-white/50">
                {org.registered}
              </td>

              {/* Actions */}
              <td className="px-4 py-3.5 text-right">
                <OrganizationActionMenu
                  org={org}
                  onSeeDetails={handleSeeDetails}
                  onUpdateStatus={onUpdateStatus}
                />
              </td>
            </tr>
          ))}

          {organizations.length === 0 && (
            <tr>
              <td
                colSpan={8}
                className="px-4 py-12 text-center text-xs text-white/40"
              >
                No organizations match the selected criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrganizationsTable;

