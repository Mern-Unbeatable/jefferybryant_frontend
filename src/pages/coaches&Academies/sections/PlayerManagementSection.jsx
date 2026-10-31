import { useTranslation } from "react-i18next";
import { FiCheck } from "react-icons/fi";

const statusStyles = {
  invited: { dot: "bg-white/40", badge: "bg-white/25 text-white", bar: "bg-white/30" },
  registered: { dot: "bg-[#1a9fc4]", badge: "bg-[#1a9fc4] text-white", bar: "bg-[#1a9fc4]" },
  complete: { dot: "bg-btn-primary", badge: "bg-btn-primary text-primary", bar: "bg-btn-primary" },
  verified: { dot: "bg-accent", badge: "bg-accent text-primary", bar: "bg-accent" },
};

const statuses = ["invited", "registered", "complete", "verified"];

const stats = [
  { key: "invited", value: "24" },
  { key: "registered", value: "18" },
  { key: "complete", value: "12" },
  { key: "verified", value: "07" },
];

const players = [
  { name: "Daniel Williams", age: 18, position: "midfielder", status: "complete", invited: "12 Aug 2025" },
  { name: "Marcus Joseph", age: 17, position: "forward", status: "registered", invited: "14 Aug 2025" },
  { name: "Joshua Thomas", age: 16, position: "defender", status: "invited", invited: "18 Aug 2025" },
  { name: "Andre Clarke", age: 19, position: "goalkeeper", status: "verified", invited: "09 Aug 2025" },
];

const PlayerManagementSection = () => {
  const { t } = useTranslation();

  return (
    <section className="pt-20 lg:pt-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-accent sm:text-sm">
              <span className="h-px w-8 bg-accent" />
              {t("coaches.management.eyebrow")}
            </p>
            <h2 className="mt-6 font-ethnocentric text-2xl uppercase leading-tight sm:text-4xl">
              <span className="block">{t("coaches.management.titleLine1")}</span>
              <span className="block">{t("coaches.management.titleLine2")}</span>
              <span className="block">
                {t("coaches.management.titleLine3")}{" "}
                <span className="text-accent">
                  {t("coaches.management.titleHighlight")}
                </span>
              </span>
            </h2>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {statuses.map((status) => (
                <li
                  key={status}
                  className="flex items-center gap-2 text-sm uppercase tracking-wide text-white/60"
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${statusStyles[status].dot}`} />
                  {t(`coaches.management.statuses.${status}`)}
                </li>
              ))}
            </ul>
          </div>
          <p className="max-w-md text-base leading-relaxed text-white/80 lg:pb-14">
            {t("coaches.management.description")}
          </p>
        </div>

        <div className="mt-10 border border-white/10 bg-white/2">
          <div className="flex items-center gap-4 border-b border-white/10 bg-primary px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-btn-primary" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
            </div>
            <span className="text-xs uppercase tracking-[0.15em] text-white/40">
              {t("coaches.management.windowTitle")}
            </span>
          </div>

          <div className="p-4 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-white/50">
                  {t("coaches.management.overview")}
                </p>
                <p className="mt-3 text-lg uppercase tracking-wide">Kingston Future FC</p>
              </div>
              <span className="inline-flex items-center gap-2 self-start border border-accent/40 px-4 py-2 text-xs uppercase tracking-wide text-accent">
                <FiCheck /> {t("coaches.management.approved")}
              </span>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {stats.map(({ key, value }) => (
                <div key={key} className="relative border border-white/10 bg-white/2 p-4">
                  <dt className="text-xs uppercase tracking-[0.15em] text-white/50">
                    {t(`coaches.management.stats.${key}`)}
                  </dt>
                  <dd className="mt-4 text-2xl">{value}</dd>
                  <span className={`absolute inset-x-0 bottom-0 h-0.5 ${statusStyles[key].bar}`} />
                </div>
              ))}
            </dl>

            <div className="mt-3 overflow-x-auto border border-white/10">
              <table className="w-full min-w-[640px] text-left text-xs">
                <thead className="text-xs uppercase tracking-[0.15em] text-white/40">
                  <tr className="border-b border-white/10">
                    <th className="px-3 py-3 font-normal">{t("coaches.management.columns.player")}</th>
                    <th className="px-3 py-3 font-normal">{t("coaches.management.columns.age")}</th>
                    <th className="px-3 py-3 font-normal">{t("coaches.management.columns.position")}</th>
                    <th className="px-3 py-3 font-normal">{t("coaches.management.columns.status")}</th>
                    <th className="px-3 py-3 font-normal">{t("coaches.management.columns.invited")}</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((player) => (
                    <tr key={player.name} className="border-b border-white/10 last:border-b-0">
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-3">
                          <span className="flex h-7 w-7 items-center justify-center border border-accent/40 text-[10px] text-accent">
                            {player.name[0]}
                          </span>
                          {player.name}
                        </div>
                      </td>
                      <td className="px-3 py-3 text-white/80">{player.age}</td>
                      <td className="px-3 py-3 text-white/80">
                        {t(`coaches.management.positions.${player.position}`)}
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={`inline-block px-2 py-1 text-[8px] uppercase tracking-wide ${statusStyles[player.status].badge}`}
                        >
                          {t(`coaches.management.statuses.${player.status}`)}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-white/80">{player.invited}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayerManagementSection;
