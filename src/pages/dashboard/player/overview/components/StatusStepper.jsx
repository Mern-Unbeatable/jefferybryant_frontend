import { useTranslation } from "react-i18next";
import {
  CURRENT_STATUS,
  PROFILE_STATUSES,
} from "@/pages/dashboard/player/playerData";

const base = "playerDashboard";

const StatusStepper = ({
  currentStatus = CURRENT_STATUS,
  statuses = PROFILE_STATUSES,
}) => {
  const { t } = useTranslation();
  const currentIndex = statuses.indexOf(currentStatus);

  return (
    <ol className="relative mt-6 flex justify-between">
      <span className="absolute left-2 right-2 top-1.5 h-px bg-white/15" />
      <span
        className="absolute left-2 top-1.5 h-px bg-accent"
        style={{
          width: `calc(${(currentIndex / (statuses.length - 1)) * 100}% - 1rem)`,
        }}
      />
      {statuses.map((status, index) => {
        const isDone = index < currentIndex;
        const isCurrent = index === currentIndex;
        return (
          <li
            key={status}
            className="relative flex w-12 flex-col items-center gap-2 text-center"
          >
            <span
              className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border ${
                isDone
                  ? "border-accent bg-accent"
                  : isCurrent
                    ? "border-btn-primary bg-primary ring-4 ring-btn-primary/20"
                    : "border-white/20 bg-primary"
              }`}
            />
            <span
              className={`text-[9px] leading-tight ${
                isCurrent
                  ? "text-btn-primary"
                  : isDone
                    ? "text-accent"
                    : "text-white/40"
              }`}
            >
              {t(`${base}.statuses.${status}`)}
            </span>
          </li>
        );
      })}
    </ol>
  );
};

export default StatusStepper;

