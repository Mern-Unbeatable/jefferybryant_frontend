import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowUpRight, FiCheck, FiUser, FiVideo } from "react-icons/fi";

const checks = ["identity", "history", "video"];
const fields = ["country", "position", "age", "heightWeight", "foot", "club"];
const blocks = [
  { key: "history", icon: FiCheck },
  { key: "stats", icon: FiCheck },
  { key: "coach", icon: FiCheck },
  { key: "video", icon: FiVideo },
];

const base = "player.profilePreview";

const ProfilePreviewSection = () => {
  const { t } = useTranslation();
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <section className="pt-20 lg:pt-28">
      <div className="container mx-auto grid items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="max-w-xl">
          <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-accent sm:text-xs">
            <span className="h-px w-8 bg-accent" />
            {t(`${base}.eyebrow`)}
          </p>

          <h2 className="mt-6 font-ethnocentric text-2xl uppercase leading-tight sm:text-4xl">
            <span className="block">{t(`${base}.titleLine1`)}</span>
            <span className="block">{t(`${base}.titleLine2`)}</span>
            {t(`${base}.titleLine3`)}{" "}
            <span className="text-accent">{t(`${base}.titleHighlight`)}</span>
          </h2>

          <p className="mt-6 text-sm leading-relaxed text-white/80">
            {t(`${base}.description`)}
          </p>

          <ul className="mt-6 flex flex-col gap-3">
            {checks.map((key) => (
              <li
                key={key}
                className="flex items-center gap-3 text-xs text-white/80"
              >
                <FiCheck className="text-btn-primary" />
                {t(`${base}.checks.${key}`)}
              </li>
            ))}
          </ul>

          <Link
            to="/join/player"
            className="mt-8 inline-flex items-center gap-2 rounded-sm bg-btn-primary px-6 py-3 text-sm uppercase text-primary transition hover:bg-btn-primary/90"
          >
            {t(`${base}.cta`)} <FiArrowUpRight />
          </Link>
        </div>

        <div className="grid overflow-hidden border border-white/10 bg-white/2 sm:grid-cols-[2fr_3fr]">
          <div className="relative min-h-72 bg-white/5">
            {!imageFailed && (
              <img
                src="/player/samplePlayer.png"
                alt={t(`${base}.card.imageAlt`)}
                loading="lazy"
                onError={() => setImageFailed(true)}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <span className="absolute bottom-4 left-4 flex items-center gap-2 bg-primary/80 px-2 py-1 text-[10px] uppercase tracking-wider text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {t(`${base}.card.submitted`)}
            </span>
          </div>

          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/50">
                  {t(`${base}.card.label`)}
                </p>
                <h3 className="mt-2 text-xl uppercase">Micah Joseph</h3>
                <p className="mt-1 text-xs text-accent">
                  {t(`${base}.card.role`)}
                </p>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-btn-primary/40 text-btn-primary">
                <FiUser />
              </span>
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-white/10 py-5">
              {fields.map((key) => (
                <div key={key}>
                  <dt className="text-[10px] uppercase tracking-wider text-white/50">
                    {t(`${base}.card.fields.${key}`)}
                  </dt>
                  <dd className="mt-1 text-xs">
                    {t(`${base}.card.values.${key}`)}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {blocks.map(({ key, icon }) => {
                const Icon = icon;
                return (
                  <div
                    key={key}
                    className="flex items-start justify-between gap-2 border border-white/10 p-3"
                  >
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-white/50">
                        {t(`${base}.card.blocks.${key}`)}
                      </p>
                      <p className="mt-1 text-xs">
                        {t(`${base}.card.blocks.${key}Value`)}
                      </p>
                    </div>
                    <Icon className="mt-1 shrink-0 text-accent" />
                  </div>
                );
              })}
            </div>

            <p className="mt-4 text-[10px] leading-relaxed text-white/40">
              {t(`${base}.card.note`)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePreviewSection;
