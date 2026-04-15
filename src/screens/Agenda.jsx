import BottomNav from "../components/BottomNav";

export default function Agenda({ onNavigate }) {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const events = [7, 10]; // Days with events

  return (
    <div className="relative flex min-h-screen w-full flex-col max-w-[430px] mx-auto bg-background-light dark:bg-background-dark shadow-2xl overflow-hidden border-x border-primary/10">
      <header className="sticky top-0 z-20 flex items-center justify-between px-4 py-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <span className="material-symbols-outlined text-primary">calendar_today</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Agenda Escolar</h1>
        </div>
        <button className="size-10 flex items-center justify-center rounded-full bg-slate-200 dark:bg-primary/20 transition-colors">
          <span className="material-symbols-outlined text-slate-700 dark:text-slate-100">person</span>
        </button>
      </header>

      <main className="flex-1 pb-24 overflow-y-auto no-scrollbar">
        <div className="p-4">
          <div className="bg-white dark:bg-primary/5 rounded-xl border border-primary/10 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <button className="p-2 hover:bg-primary/10 rounded-full transition-colors">
                <span className="material-symbols-outlined text-primary">chevron_left</span>
              </button>
              <h2 className="text-lg font-semibold">Maio 2024</h2>
              <button className="p-2 hover:bg-primary/10 rounded-full transition-colors">
                <span className="material-symbols-outlined text-primary">chevron_right</span>
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
                <div key={d} className="text-center text-xs font-bold text-slate-400 uppercase">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              <div className="h-10"></div><div className="h-10"></div><div className="h-10"></div>
              {days.map(day => (
                <button 
                  key={day} 
                  className={`h-10 flex items-center justify-center rounded-lg text-sm font-medium relative transition-colors ${day === 5 ? 'bg-primary text-white font-bold shadow-lg shadow-primary/30' : 'hover:bg-primary/20'}`}
                >
                  {day}
                  {events.includes(day) && <span className="absolute bottom-1.5 size-1 bg-primary rounded-full"></span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="px-4 mt-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Novo Evento</h3>
            <span className="text-sm text-primary font-semibold">5 de Maio</span>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1 ml-1">Título do Evento</label>
              <input className="w-full bg-white dark:bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400" placeholder="Ex: Reunião do Protagonismo" type="text" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1 ml-1">Mensagem (Máx 400 caracteres)</label>
              <textarea className="w-full bg-white dark:bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400 resize-none" maxLength={400} placeholder="Descreva os detalhes do evento..." rows={4}></textarea>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1 ml-1">Foto ou Anexo</label>
              <div className="relative group cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-primary/20 bg-primary/5 aspect-video flex flex-col items-center justify-center gap-2 hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined text-4xl text-primary/60">add_a_photo</span>
                <p className="text-xs font-medium text-primary/60 uppercase tracking-wider">Clique para adicionar foto</p>
              </div>
            </div>
            <div className="bg-primary/10 rounded-xl p-4 border border-primary/20 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">verified_user</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Protagonismo Líder</span>
                    <span className="text-[10px] uppercase text-primary font-bold tracking-tighter">Acesso Exclusivo</span>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input className="sr-only peer" type="checkbox" value="" />
                  <div className="w-11 h-6 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  <span className="ml-3 text-sm font-semibold">Tornar Público</span>
                </label>
              </div>
            </div>
            <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] mb-8">
              Salvar na Agenda
            </button>
          </div>
        </div>
      </main>

      <BottomNav activeTab="agenda" onTabChange={onNavigate} />
    </div>
  );
}
