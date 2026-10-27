import { useTranslation } from "react-i18next";
import { FiExternalLink, FiVideo } from "react-icons/fi";
import Field from "@/components/dashboard/form/Field";
import FormCard from "@/components/dashboard/form/FormCard";
import { inputClass } from "@/components/dashboard/form/formStyles";
import ProfilePageHeader from "@/pages/dashboard/player/components/ProfilePageHeader";
import { useDemoForm } from "@/hooks/useDemoForm";
import { videoInfo } from "@/pages/dashboard/player/playerData";

const base = "playerForms.video";

const getEmbedUrl = (url) => {
  const youtube = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/);
  if (youtube) return `https://www.youtube.com/embed/${youtube[1]}`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return null;
};

const VideoPreview = ({ url }) => {
  const { t } = useTranslation();
  const trimmed = url.trim();
  const embedUrl = getEmbedUrl(trimmed);

  if (embedUrl) {
    return (
      <div className="overflow-hidden rounded-md border border-white/10 bg-black/30">
        <iframe
          src={embedUrl}
          title={t(`${base}.iframeTitle`)}
          className="aspect-video w-full"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded-md border border-white/10 bg-black/20 p-4 sm:flex-row sm:items-center">
      <span className="flex h-16 w-24 shrink-0 items-center justify-center rounded-sm bg-white/5 text-xl text-white/40">
        <FiVideo />
      </span>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-[0.2em] text-accent">{t(`${base}.previewEyebrow`)}</p>
        <p className="mt-1 font-ethnocentric text-xs uppercase">
          {t(`${base}.${trimmed ? "linkTitle" : "emptyTitle"}`)}
        </p>
        <p className="mt-1 text-[10px] text-white/45">{t(`${base}.${trimmed ? "linkText" : "emptyText"}`)}</p>
        {/^https?:\/\//i.test(trimmed) && (
          <a
            href={trimmed}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-btn-primary hover:underline"
          >
            {t(`${base}.openLink`)} <FiExternalLink />
          </a>
        )}
      </div>
    </div>
  );
};

const HighlightVideo = () => {
  const { t } = useTranslation();
  const form = useDemoForm(videoInfo);
  const { values, handleChange } = form;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5">
      <ProfilePageHeader
        eyebrow={t(`${base}.eyebrow`)}
        title={t(`${base}.title`)}
        subtitle={t(`${base}.subtitle`)}
      />

      <section className="flex flex-col gap-4 rounded-lg border border-btn-primary/30 bg-btn-primary/5 p-5 sm:flex-row sm:items-center">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-btn-primary/15 text-lg text-btn-primary">
          <FiVideo />
        </span>
        <div className="flex-1">
          <h2 className="font-ethnocentric text-[11px] uppercase">{t(`${base}.reqTitle`)}</h2>
          <p className="mt-1 text-[11px] text-white/55">{t(`${base}.reqText`)}</p>
        </div>
        <span className="self-start rounded-sm border border-white/15 bg-black/30 px-2.5 py-1 text-[10px] text-white/70 sm:self-center">
          {t(`${base}.maxBadge`)}
        </span>
      </section>

      <section>
        <FormCard title={t(`${base}.cardTitle`)} subtitle={t(`${base}.cardSubtitle`)} form={form}>
          <Field id="highlightUrl" label={t(`${base}.highlightUrl`)} required hint={t(`${base}.highlightHint`)}>
            <input
              id="highlightUrl"
              name="highlightUrl"
              type="url"
              required
              value={values.highlightUrl}
              onChange={handleChange}
              placeholder="https://youtube.com/watch?v=..."
              className={inputClass}
            />
          </Field>
          <Field id="fullMatchUrl" label={t(`${base}.fullMatchUrl`)} hint={t(`${base}.fullMatchHint`)}>
            <input
              id="fullMatchUrl"
              name="fullMatchUrl"
              type="url"
              value={values.fullMatchUrl}
              onChange={handleChange}
              placeholder="https://..."
              className={inputClass}
            />
          </Field>
          <VideoPreview url={values.highlightUrl} />
        </FormCard>
      </section>
    </div>
  );
};

export default HighlightVideo;
