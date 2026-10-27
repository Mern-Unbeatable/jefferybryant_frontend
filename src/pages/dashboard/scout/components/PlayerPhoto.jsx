import { getInitials } from "@/utils/getInitials";

const PlayerPhoto = ({ player, className = "", textClass = "text-2xl" }) =>
  player.photo ? (
    <img src={player.photo} alt="" className={`object-cover object-top ${className}`} />
  ) : (
    <span
      className={`flex items-center justify-center bg-linear-to-br from-accent/25 via-white/5 to-btn-primary/15 font-ethnocentric text-white/80 ${textClass} ${className}`}
    >
      {getInitials(player.name)}
    </span>
  );

export default PlayerPhoto;
