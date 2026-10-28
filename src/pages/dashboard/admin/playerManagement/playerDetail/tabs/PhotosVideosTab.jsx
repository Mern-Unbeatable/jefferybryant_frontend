import { FiEye } from "react-icons/fi";

const PhotosVideosTab = ({ player }) => {
  const media = player.media || [];

  return (
    <div className="rounded-lg border border-white/10 bg-[#12171b] p-5 sm:p-6">
      <div className="border-b border-white/10 pb-4">
        <h2 className="font-ethnocentric text-xs tracking-wider text-white">
          Photos & Videos
        </h2>
        <p className="mt-1 text-[11px] text-white/50">
          Player-submitted media. Highlight videos must not exceed five minutes.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {media.map((item) => (
          <div key={item.id} className="group flex flex-col">
            {/* Video Thumbnail Box */}
            <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-cyan-400/20 bg-gradient-to-br from-[#0c1f24] to-[#12171b] shadow-inner transition group-hover:border-cyan-400/50">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-300 transition group-hover:scale-110 group-hover:bg-cyan-400/20">
                <FiEye className="text-xl" />
              </span>

              {/* Duration badge */}
              <span className="absolute bottom-2.5 right-2.5 rounded bg-black/80 px-1.5 py-0.5 text-[9px] font-mono text-white/80">
                {item.duration}
              </span>
            </div>

            {/* Video Meta */}
            <div className="mt-3">
              <h3 className="font-semibold text-white transition group-hover:text-accent">
                {item.title}
              </h3>
              <p className="mt-0.5 text-[10px] text-white/40">{item.submitted}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotosVideosTab;

