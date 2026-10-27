import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowLeft, FiCheck, FiChevronDown, FiFileText, FiPlay, FiStar, FiVideo } from "react-icons/fi";
import { LuShieldCheck } from "react-icons/lu";
import { cardClass } from "@/pages/dashboard/player/components/cardStyles";
import CardHeading from "@/pages/dashboard/player/components/CardHeading";
import PlayerPhoto from "@/pages/dashboard/scout/components/PlayerPhoto";
import ScoutActionModal from "@/pages/dashboard/scout/components/ScoutActionModal";
import ScoutActionsPanel from "@/pages/dashboard/scout/components/ScoutActionsPanel";
import { getScoutPlayer } from "@/pages/dashboard/scout/scoutData";
import { addReview, toggleWatchlist, useScoutStore } from "@/pages/dashboard/scout/scoutStore";
import { formatDate } from "@/utils/formatDate";

const base = "scoutDashboard.detail";
const TABS = ["overview", "background", "media", "notes"];
const MENU_ACTIONS = ["requestInformation", "furtherEvaluation", "passOnPlayer"];

const InfoList = ({ items }) => (
  <dl className="grid gap-x-6 sm:grid-cols-2">
    {items.map(([label, value]) => (
      <div key={label} className="flex flex-col gap-1 border-b border-white/5 py-3">
        <dt className="text-[9px] uppercase tracking-wider text-white/40">{label}</dt>
        <dd className="text-xs">{value}</dd>
      </div>
    ))}
  </dl>
);

const MoreActions = ({ onSelect }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const close = (event) => {
      if (event.type === "keydown" ? event.key === "Escape" : !ref.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-2 rounded-sm border border-white/15 px-4 py-2.5 text-xs transition hover:border-white/30"
      >
        {t(`${base}.moreActions`)} <FiChevronDown className={`transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul role="menu" className="absolute right-0 z-20 mt-2 w-52 overflow-hidden rounded-sm bg-white py-1 text-xs text-primary shadow-xl">
          {MENU_ACTIONS.map((action) => (
            <li key={action} role="none">
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setOpen(false);
                  onSelect(action);
                }}
                className={`w-full px-4 py-2.5 text-left transition hover:bg-black/5 ${action === "passOnPlayer" ? "text-red-600" : ""}`}
              >
                {t(`scoutDashboard.actions.${action}.label`)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const PlayerDetail = () => {
  const { t, i18n } = useTranslation();
  const { playerId } = useParams();
  const player = getScoutPlayer(playerId);
  const { watchlist } = useScoutStore();
  const [tab, setTab] = useState("overview");
  const [action, setAction] = useState(null);
  const [feedback, setFeedback] = useState("");
  const closeAction = useCallback(() => setAction(null), []);

  if (!player) {
    return (
      <div className={`${cardClass} mx-auto max-w-xl text-center`}>
        <p className="text-sm">{t(`${base}.notFound`)}</p>
        <Link to="/dashboard/scout/players" className="mt-4 inline-flex items-center gap-2 text-xs text-btn-primary hover:underline">
          <FiArrowLeft /> {t(`${base}.back`)}
        </Link>
      </div>
    );
  }

  const isWatched = watchlist.includes(player.id);
  const positions = player.positions.map((key) => t(`playerForms.positions.${key}`)).join(" · ");
  const date = (value) => formatDate(value, i18n.language, { month: "short", day: "numeric", year: "numeric" });

  const handleToggleWatch = () => {
    toggleWatchlist(player.id);
    setFeedback(t(`${base}.feedback.${isWatched ? "unwatched" : "watched"}`));
  };

  const handleAction = (key) => {
    if (key === "continueMonitoring") handleToggleWatch();
    else setAction(key);
  };

  const handleSubmit = ({ action: submitted, message }) => {
    addReview({ playerId: player.id, action: submitted, message, status: submitted === "passOnPlayer" ? "recorded" : "underReview" });
    setFeedback(t(`${base}.feedback.${submitted}`));
    setAction(null);
  };

  const stats = [
    ["age", player.age],
    ["height", player.height],
    ["weight", player.weight],
    ["foot", t(`playerForms.feet.${player.foot}`)],
  ];

  const overviewItems = [
    [t(`${base}.fields.nationality`), player.nationality],
    [t(`${base}.fields.residence`), player.residence],
    [t(`${base}.fields.positions`), positions],
    [t(`${base}.fields.club`), player.club],
    [t(`${base}.fields.league`), player.league],
    [t(`${base}.fields.shared`), date(player.shared)],
  ];

  const { background } = player;
  const backgroundItems = [
    [t(`${base}.fields.currentClub`), background.currentClub],
    [t(`${base}.fields.league`), background.league],
    [t(`${base}.fields.history`), background.history],
    [t(`${base}.fields.nationalTeam`), background.nationalTeam],
    [t(`${base}.fields.statistics`), background.statistics],
    [t(`${base}.fields.achievements`), background.achievements],
  ];

  return (
    <div className="mx-auto flex flex-col gap-5">
      <Link to="/dashboard/scout/players" className="flex items-center gap-2 self-start text-[11px] text-white/60 transition hover:text-white">
        <FiArrowLeft /> {t(`${base}.back`)}
      </Link>

      <section className={`${cardClass} flex flex-col gap-5 md:flex-row`}>
        <PlayerPhoto player={player} className="h-44 w-full shrink-0 rounded-md md:w-40" />
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap gap-1.5 text-[9px]">
                <span className="flex items-center gap-1 rounded-sm border border-accent/40 px-1.5 py-0.5 text-accent">
                  <LuShieldCheck /> {t("scoutDashboard.card.verified")}
                </span>
                {player.priority && (
                  <span className="flex items-center gap-1 rounded-sm bg-btn-primary px-1.5 py-0.5 text-primary">
                    <FiStar className="fill-current" /> {t("scoutDashboard.card.priority")}
                  </span>
                )}
                {player.video && (
                  <span className="flex items-center gap-1 rounded-sm border border-white/15 px-1.5 py-0.5 text-white/70">
                    <FiVideo /> {t("scoutDashboard.card.video")}
                  </span>
                )}
              </div>
              <h1 className="mt-3 font-ethnocentric text-xl uppercase sm:text-2xl">{player.name}</h1>
              <p className="mt-1 text-[11px] text-white/55">
                {positions} · {player.country}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleToggleWatch}
                aria-pressed={isWatched}
                className={`flex items-center gap-2 rounded-sm px-4 py-2.5 text-xs transition ${
                  isWatched ? "bg-btn-primary text-primary hover:bg-btn-primary/90" : "border border-btn-primary/50 text-btn-primary hover:bg-btn-primary/10"
                }`}
              >
                {isWatched ? <FiCheck /> : <FiStar />}
                {t(`scoutDashboard.actions.${isWatched ? "monitoring" : "continueMonitoring"}.label`)}
              </button>
              <MoreActions onSelect={setAction} />
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map(([key, value]) => (
              <div key={key} className="flex flex-col-reverse rounded-sm border border-white/10 bg-black/20 p-3">
                <dt className="text-[9px] uppercase tracking-wider text-white/40">{t(`${base}.stats.${key}`)}</dt>
                <dd className="font-ethnocentric text-sm">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="grid items-start gap-5 xl:grid-cols-3">
        <section className={`${cardClass} min-w-0 xl:col-span-2`}>
          <div role="tablist" className="-mx-1 flex gap-1 overflow-x-auto border-b border-white/10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {TABS.map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                id={`tab-${key}`}
                aria-selected={tab === key}
                aria-controls={`panel-${key}`}
                onClick={() => setTab(key)}
                className={`shrink-0 border-b-2 px-3 pb-3 text-[11px] transition ${
                  tab === key ? "border-btn-primary text-white" : "border-transparent text-white/45 hover:text-white"
                }`}
              >
                {t(`${base}.tabs.${key}`)}
              </button>
            ))}
          </div>

          <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="pt-5">
            {tab === "overview" && (
              <>
                <CardHeading eyebrow={t(`${base}.tabs.overview`)} title={t(`${base}.overviewTitle`)} />
                <div className="mt-3">
                  <InfoList items={overviewItems} />
                </div>
              </>
            )}

            {tab === "background" && (
              <>
                <CardHeading eyebrow={t(`${base}.tabs.background`)} title={t(`${base}.backgroundTitle`)} />
                <div className="mt-3">
                  <InfoList items={backgroundItems} />
                </div>
                <h3 className="mt-6 text-[10px] uppercase tracking-[0.2em] text-accent">{t(`${base}.timeline`)}</h3>
                <ol className="mt-4 flex flex-col gap-5 border-l border-white/10 pl-5">
                  {background.timeline.map((item) => (
                    <li key={item.years} className="relative">
                      <span className="absolute -left-[25px] top-1 h-2 w-2 rounded-full bg-btn-primary" />
                      <p className="text-[10px] text-btn-primary">{item.years}</p>
                      <p className="mt-1 text-xs">{item.club}</p>
                      <p className="mt-0.5 text-[10px] text-white/50">{item.squad}</p>
                      <p className="text-[10px] text-white/35">{item.competition}</p>
                    </li>
                  ))}
                </ol>
              </>
            )}

            {tab === "media" && (
              <>
                <CardHeading eyebrow={t(`${base}.tabs.media`)} title={t(`${base}.mediaTitle`)} />
                {player.media.length ? (
                  <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                    {player.media.map((item) => (
                      <li key={item.title} className="overflow-hidden rounded-md border border-white/10">
                        <div className="relative flex h-36 items-center justify-center bg-linear-to-br from-accent/15 via-black/40 to-btn-primary/10">
                          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-btn-primary text-primary">
                            <FiPlay className="ml-0.5 fill-current" />
                          </span>
                          <span className="absolute bottom-2 right-2 rounded-sm bg-black/70 px-1.5 py-0.5 text-[9px]">{item.duration}</span>
                        </div>
                        <div className="p-3">
                          <p className="text-xs">{item.title}</p>
                          <p className="mt-1 text-[10px] text-white/45">{t(`${base}.submitted`, { date: date(item.submitted) })}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-6 rounded-md border border-dashed border-white/10 p-8 text-center text-[11px] text-white/45">{t(`${base}.noMedia`)}</p>
                )}
              </>
            )}

            {tab === "notes" && (
              <>
                <CardHeading eyebrow={t(`${base}.tabs.notes`)} title={t(`${base}.notesTitle`)} />
                <p className="mt-2 text-[10px] text-white/45">{t(`${base}.notesText`)}</p>
                <ul className="mt-5 flex flex-col gap-3">
                  {player.notes.map((note) => (
                    <li key={note} className="flex gap-3 rounded-md border border-white/10 bg-black/20 p-4 text-xs text-white/80">
                      <FiFileText className="mt-0.5 shrink-0 text-accent" /> {note}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </section>

        <ScoutActionsPanel isWatched={isWatched} feedback={feedback} onAction={handleAction} />
      </div>

      <ScoutActionModal action={action} player={player} onClose={closeAction} onSubmit={handleSubmit} />
    </div>
  );
};

export default PlayerDetail;
