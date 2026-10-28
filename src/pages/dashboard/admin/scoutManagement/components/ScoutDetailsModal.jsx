import { useState } from "react";
import { FiX } from "react-icons/fi";
import Modal from "@/components/dashboard/Modal";
import AdminStatusBadge from "@/pages/dashboard/admin/components/AdminStatusBadge";

const ScoutDetailsModal = ({ scout, open, onClose, onUpdateStatus, onManageAccess }) => {
  if (!scout) return null;

  return (
    <Modal open={open} onClose={onClose} labelledBy="scout-details-title" className="max-w-4xl">
      <div className="rounded-lg border border-white/10 bg-[#161b1f] p-6 text-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
              Scout Profile
            </p>
            <h2 id="scout-details-title" className="mt-1 font-ethnocentric text-xl uppercase tracking-wider text-white">
              {scout.name}
            </h2>
            <p className="mt-0.5 text-xs text-white/50">
              {scout.role} · {scout.organization}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-white/50 hover:bg-white/10 hover:text-white"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-6">
          {/* Scout Information */}
          <div className="rounded-lg border border-white/10 bg-[#12171b] p-5">
            <h3 className="font-ethnocentric text-xs tracking-wider text-white">
              Scout Information
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/40">Full name</p>
                <p className="mt-1 text-xs font-semibold text-white">{scout.name}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/40">Email address</p>
                <p className="mt-1 text-xs font-semibold text-white">{scout.email}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/40">Organization / Team</p>
                <p className="mt-1 text-xs font-semibold text-white">{scout.organization}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/40">Position / Title</p>
                <p className="mt-1 text-xs font-semibold text-white">{scout.role}</p>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="rounded-lg border border-white/10 bg-[#12171b] p-5">
            <h3 className="font-ethnocentric text-xs tracking-wider text-white">
              Account Information
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/40">Invitation</p>
                <div className="mt-1.5">
                  <AdminStatusBadge status={scout.invitation || "Accepted"} />
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/40">Account</p>
                <div className="mt-1.5">
                  <AdminStatusBadge status={scout.accountStatus || "Active"} />
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/40">Platform access</p>
                <div className="mt-1.5">
                  <span className="rounded-sm border border-white/20 bg-white/5 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white/50">
                    {scout.accountStatus === "Active" ? "Enabled" : "Disabled"}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/40">Invitation date</p>
                <p className="mt-1 text-xs text-white/80">18 Apr 2025</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/40">Accepted date</p>
                <p className="mt-1 text-xs text-white/80">19 Apr 2025</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/40">Last active</p>
                <p className="mt-1 text-xs text-white/80">{scout.lastActive}</p>
              </div>
            </div>
          </div>

          {/* Player Access Summary */}
          <div className="rounded-lg border border-white/10 bg-[#12171b] p-5">
            <h3 className="font-ethnocentric text-xs tracking-wider text-white">
              Player Access Summary
            </h3>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded border border-white/5 bg-white/2 p-3">
                <p className="text-xl font-bold text-white">{scout.sharedPlayers || 0}</p>
                <p className="mt-1 text-[10px] text-white/40">Total shared records</p>
              </div>
              <div className="rounded border border-white/5 bg-white/2 p-3">
                <p className="text-xl font-bold text-white">{scout.sharedPlayers || 0}</p>
                <p className="mt-1 text-[10px] text-white/40">Currently accessible</p>
              </div>
              <div className="rounded border border-white/5 bg-white/2 p-3">
                <p className="text-xl font-bold text-white">0</p>
                <p className="mt-1 text-[10px] text-white/40">Recent actions</p>
              </div>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="rounded border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-white transition hover:bg-white/10"
              >
                Edit Scout Information
              </button>
              <button
                type="button"
                onClick={() => onUpdateStatus(scout.id, scout.accountStatus === "Active" ? "Suspended" : "Active")}
                className="rounded bg-btn-primary px-3 py-2 text-xs font-bold uppercase tracking-wider text-primary shadow transition hover:bg-btn-primary/90"
              >
                {scout.accountStatus === "Active" ? "Suspend Account" : "Activate Account"}
              </button>
              <button
                type="button"
                className="rounded border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-300 transition hover:bg-red-500/20"
              >
                Remove Scout Access
              </button>
              <button
                type="button"
                onClick={onManageAccess}
                className="rounded border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-white transition hover:bg-white/10"
              >
                Manage Player Access
              </button>
            </div>

            <button
              type="button"
              className="text-xs font-medium text-cyan-400 hover:underline"
            >
              View Activity History
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ScoutDetailsModal;

