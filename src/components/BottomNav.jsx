export default function BottomNav({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'home', label: 'Início', icon: 'home' },
    { id: 'agenda', label: 'Agenda', icon: 'calendar_today' },
    { id: 'missions', label: 'Missões', icon: 'trophy' },
    { id: 'profile', label: 'Perfil', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background-light/95 dark:bg-background-dark/95 border-t border-slate-200 dark:border-primary/20 pb-safe shadow-2xl ios-blur max-w-[430px] mx-auto">
      <div className="flex h-16 items-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-1 flex-col items-center justify-center gap-1 transition-colors ${activeTab === tab.id ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}
          >
            <span className={`material-symbols-outlined ${activeTab === tab.id ? 'fill-1' : ''}`}>{tab.icon}</span>
            <p className="text-[10px] font-medium leading-normal tracking-wide">{tab.label}</p>
          </button>
        ))}
      </div>
    </nav>
  );
}
