import { Link } from "react-router-dom";
import { FiChevronRight, FiTarget } from "react-icons/fi";
import {
  ADMIN_PROFILE,
  ADMIN_STATS,
  MILESTONES_SUMMARY,
  PIPELINE_DATA,
  QUICK_ACTIONS,
  RECENT_ACTIVITY,
} from "@/pages/dashboard/admin/adminData";
import MilestoneProgressCard from "@/pages/dashboard/admin/components/MilestoneProgressCard";
import PipelineProgress from "@/pages/dashboard/admin/components/PipelineProgress";
import StatCard from "@/pages/dashboard/admin/components/StatCard";

const Overview = () => {
  return (
    <div className="mx-auto flex flex-col gap-6">
      {/* Welcome Banner */}
      <section className="flex flex-col gap-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
          {ADMIN_PROFILE.dateString}
        </p>
        <h1 className="mt-1 font-ethnocentric text-xl tracking-wider text-white sm:text-2xl">
          Welcome Back, Admin
        </h1>
        <p className="mt-1 text-xs text-white/60">
          Manage Caribbean football talent, organization recruitment, and platform intelligence from one place.
        </p>
      </section>

      {/* Top 8 Stats Grid */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {ADMIN_STATS.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </section>

      {/* Performance Milestone Tracker */}
      <section className="rounded-lg border border-white/10 bg-[#12171b] p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-400">
              Nashville SC Partnership
            </p>
            <h2 className="mt-1 font-ethnocentric text-base tracking-wider text-white sm:text-lg">
              Performance Milestone Tracker
            </h2>
            <p className="mt-1 text-xs text-white/50">
              Track the delivery of Review-Ready player profiles to Nashville SC across two performance milestones.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start rounded-md border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 text-xs text-amber-300">
            <FiTarget className="text-sm" />
            <span className="text-[10px] font-semibold uppercase tracking-wider">Target: 75 Unique Players</span>
          </div>
        </div>

        {/* 3 Milestone Progress Cards */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <MilestoneProgressCard milestone={MILESTONES_SUMMARY.milestone1} />
          <MilestoneProgressCard milestone={MILESTONES_SUMMARY.milestone2} />
          <MilestoneProgressCard milestone={MILESTONES_SUMMARY.overall} />
        </div>
      </section>

      {/* Two Column Section: Pipeline & Quick Actions */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Player Intelligence Pipeline (7 cols) */}
        <div className="lg:col-span-7">
          <PipelineProgress data={PIPELINE_DATA} />
        </div>

        {/* Right: Quick Actions (5 cols) */}
        <div className="flex flex-col justify-between rounded-lg border border-white/10 bg-[#12171b] p-5 lg:col-span-5">
          <div>
            <div className="border-b border-white/10 pb-3">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-white">
                Quick Actions
              </h2>
              <p className="mt-0.5 text-[10px] text-white/40">
                Frequently used admin workflows
              </p>
            </div>

            <div className="mt-3 flex flex-col gap-2">
              {QUICK_ACTIONS.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.id}
                    to={action.path}
                    className="group flex items-center justify-between rounded-md border border-white/5 bg-white/2 p-3 transition hover:border-white/20 hover:bg-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-md border border-cyan-400/20 bg-cyan-400/10 text-cyan-400">
                        <Icon className="text-sm" />
                      </span>
                      <div>
                        <p className="text-xs font-medium text-white transition group-hover:text-accent">
                          {action.title}
                        </p>
                        <p className="text-[10px] text-white/40">{action.subtitle}</p>
                      </div>
                    </div>
                    <FiChevronRight className="text-white/30 transition group-hover:translate-x-0.5 group-hover:text-white" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section: Recent Operational Activity */}
      <section className="rounded-lg border border-white/10 bg-[#12171b] p-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white">
              Recent Operational Activity
            </h2>
            <p className="mt-0.5 text-[10px] text-white/40">
              Latest actions across the CFit platform
            </p>
          </div>
          <Link
            to="/dashboard/admin/notifications"
            className="flex items-center gap-1 text-[10px] text-accent hover:underline"
          >
            View activity log <FiChevronRight />
          </Link>
        </div>

        <div className="mt-4 flex flex-col divide-y divide-white/5">
          {RECENT_ACTIVITY.map((item) => {
            const Icon = item.icon;
            const badgeClasses =
              item.tone === "yellow"
                ? "bg-amber-400/10 text-amber-300 border-amber-400/20"
                : item.tone === "purple"
                ? "bg-purple-400/10 text-purple-300 border-purple-400/20"
                : "bg-cyan-400/10 text-cyan-300 border-cyan-400/20";

            return (
              <div
                key={item.id}
                className="flex items-center gap-3 py-3 text-xs transition first:pt-0 last:pb-0 hover:bg-white/2"
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs ${badgeClasses}`}
                >
                  <Icon className="text-[10px]" />
                </span>
                <span
                  className={`rounded-sm border px-1.5 py-0.5 text-[9px] uppercase tracking-wider ${badgeClasses}`}
                >
                  {item.tag}
                </span>
                <p className="min-w-0 flex-1 truncate text-white/80">{item.title}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Overview;

