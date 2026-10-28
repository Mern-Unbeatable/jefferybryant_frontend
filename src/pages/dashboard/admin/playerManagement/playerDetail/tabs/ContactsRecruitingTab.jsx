import { FiShield } from "react-icons/fi";

const ContactsRecruitingTab = ({ player }) => {
  const cr = player.contactsRecruiting || {};

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-lg border border-white/10 bg-[#12171b] p-5 sm:p-6">
        <div className="border-b border-white/10 pb-4">
          <h2 className="font-ethnocentric text-xs tracking-wider text-white">
            Contacts & Recruiting
          </h2>
        </div>

        {/* Admin Access Only Banner */}
        <div className="mt-4 flex items-center gap-3 rounded-md border border-cyan-400/30 bg-cyan-400/5 p-3 text-cyan-300">
          <FiShield className="shrink-0 text-base" />
          <div className="text-[11px]">
            <p className="font-semibold uppercase tracking-wider">Authorized Admin access only</p>
            <p className="text-[10px] text-cyan-300/70">
              This information is never visible to players, coaches, academies, or scouts.
            </p>
          </div>
        </div>

        {/* Section 1: Academy & Recruiting */}
        <div className="mt-6 border-t border-white/5 pt-5">
          <h3 className="font-ethnocentric text-[11px] tracking-wider text-white">
            Academy & Recruiting
          </h3>

          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/40">Current club affiliation</p>
                <p className="mt-1 font-semibold uppercase text-white">
                  {cr.clubAffiliation || player.club}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/40">Coach contact email</p>
                <p className="mt-1 font-semibold uppercase text-white">{cr.coachEmail}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/40">Academy director / coach</p>
                <p className="mt-1 font-semibold uppercase text-white">{cr.academyDirector}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/40">Recruiting status</p>
                <p className="mt-1 font-semibold uppercase text-white">{cr.recruitingStatus}</p>
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">
                Club director / coach contact information
              </p>
              <pre className="mt-1 whitespace-pre-line font-sans text-xs font-semibold uppercase text-white">
                {cr.directorContact}
              </pre>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">
                References or coach recommendations
              </p>
              <p className="mt-1.5 text-xs uppercase leading-relaxed text-white/80">
                {cr.recommendations}
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Parent / Guardian */}
        <div className="mt-8 border-t border-white/10 pt-5">
          <h3 className="font-ethnocentric text-[11px] tracking-wider text-white">
            Parent / Guardian
          </h3>

          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/40">Guardian name</p>
                <p className="mt-1 font-semibold uppercase text-white">{cr.guardianName}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/40">Email</p>
                <p className="mt-1 font-semibold uppercase text-white">{cr.guardianAltEmail}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/40">
                  Player or appropriate guardian email
                </p>
                <p className="mt-1 font-semibold uppercase text-white">{cr.guardianEmail}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/40">Guardian consent</p>
                <p className="mt-1 font-semibold uppercase text-white">{cr.guardianConsent}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsRecruitingTab;

