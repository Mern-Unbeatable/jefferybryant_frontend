const TABS = [
  { id: "overview", label: "Overview" },
  { id: "personal", label: "Personal & Physical" },
  { id: "background", label: "Football Background" },
  { id: "media", label: "Photos & Videos" },
  { id: "recruiting", label: "Contacts & Recruiting" },
  { id: "intelligence", label: "CFit Intelligence" },
  { id: "history", label: "Activity History" },
];

const DetailTabsBar = ({ activeTab, onSelectTab }) => {
  return (
    <div className="flex gap-6 overflow-x-auto border-b border-white/10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectTab(tab.id)}
            className={`whitespace-nowrap border-b-2 pb-3 text-xs transition duration-150 ${
              isActive
                ? "border-btn-primary font-semibold text-white"
                : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default DetailTabsBar;

