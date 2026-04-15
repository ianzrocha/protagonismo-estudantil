import BottomNav from "../components/BottomNav";

export default function Events({ onBack, onNavigate }) {
  const events = [
    {
      title: 'Acolhimento Novatos',
      date: '15 de Fevereiro • 08:00',
      team: 'Equipe: Liderança 3º Ano',
      description: 'Boas-vindas aos novos alunos com dinâmicas de quebra-gelo, tour pela escola e integração com veteranos.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAknyIRqilXHClkWISpAYF51DsreWbQY-FrpNyYj25K6iEKXBiN49bisocjMvQ6FFjkMhvg1C3fgOP4end0L8i-vC6XQ-gjwCGatLPdReaAfxlulg6kiDYfmVv1JXASfyE3kF8jjTzOebH4n5FeCjeoq0WiGEmnQxSakSZ0ebKillz8AD9gJ-rOqNoSgCoH_vge_1dLNRCM_ipdV6-6nG3_ToEW_C2p3N02RS6osWM8jYe2lT9EqMi8qPYlvK247L71mTgpCuv9Pg',
      tag: 'Destaque'
    },
    {
      title: 'Jogos Internos 2024',
      date: '10 de Março • Todo o dia',
      team: 'Equipe: Grêmio Estudantil',
      description: 'Competições esportivas entre turmas. Precisamos de voluntários para arbitragem e organização de torcidas.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJLwvyEXeIj4uRk_P0Cyy_pyEs2QK1VBP1KmzS93VvpTBJV2gPpZxIydWRU-nSCIFJFEMpskN-wUpwFyZdQYaliHoWmrRSD9fy7a1t2audV3BpsDRUpErdnyDgufpqM61OfoEDxtX7hxSOndMc-vfna6CUEoeXhGzA6nDk3SO0oBn3TncrStQNT067igJaTea4YbtgF-5PpkEAcUzwdr--Tbcb4bO6RNGhZgTUyVTatZeRKKOyLAEyURuHBU5jzYCRfsJ3MTCo2g',
      icon: 'sports_basketball'
    },
    {
      title: 'Reunião de Líderes',
      date: '05 de Fevereiro • 14:00',
      description: 'Planejamento estratégico das atividades do primeiro semestre.',
      tag: 'Privado',
      isPrivate: true
    }
  ];

  return (
    <div className="relative flex min-h-screen w-full flex-col max-w-[430px] mx-auto shadow-2xl overflow-hidden pb-20 bg-background-light dark:bg-background-dark border-x border-primary/10">
      <header className="sticky top-0 z-20 bg-background-light/80 dark:bg-background-dark/80 ios-blur border-b border-primary/10">
        <div className="flex items-center p-4 justify-between">
          <button onClick={onBack} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-primary/10 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-slate-900 dark:text-white">arrow_back_ios_new</span>
          </button>
          <h1 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">Eventos e Acolhimento</h1>
          <div className="flex size-10 items-center justify-end">
            <button className="flex items-center justify-center rounded-full size-10 bg-primary text-white hover:bg-primary/90 transition-all">
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </div>
        <div className="px-4 pb-0">
          <div className="flex gap-6">
            <a className="flex flex-col items-center justify-center border-b-2 border-primary text-primary pb-3 pt-2" href="#">
              <span className="text-sm font-bold">Explorar</span>
            </a>
            <a className="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-500 dark:text-slate-400 pb-3 pt-2" href="#">
              <span className="text-sm font-medium">Minhas Inscrições</span>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 no-scrollbar">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-slate-900 dark:text-white text-xl font-bold">Próximos Eventos</h2>
            <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">3 Ativos</span>
          </div>
          <div className="space-y-6">
            {events.map((event, i) => (
              <div key={i} className={`group flex flex-col rounded-xl overflow-hidden bg-white dark:bg-primary/5 border border-primary/10 shadow-sm ${event.isPrivate ? 'opacity-80' : ''}`}>
                {event.image && (
                  <div className="h-48 w-full bg-cover bg-center" style={{ backgroundImage: `url('${event.image}')` }}></div>
                )}
                <div className="p-4 flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-slate-900 dark:text-white text-lg font-bold">{event.title}</h3>
                      <div className="flex items-center gap-1 text-primary text-xs font-semibold mt-1">
                        <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                        {event.date}
                      </div>
                    </div>
                    {event.tag && (
                      <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${event.tag === 'Destaque' ? 'bg-primary/20 text-primary' : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>{event.tag}</span>
                    )}
                  </div>
                  <div className="space-y-2">
                    {event.team && (
                      <div className="flex items-center gap-2">
                        <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="material-symbols-outlined text-[16px] text-primary">{event.icon || 'groups'}</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">{event.team}</p>
                      </div>
                    )}
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{event.description}</p>
                    {event.isPrivate && (
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <span className="material-symbols-outlined text-[18px]">verified_user</span>
                        <span className="text-xs">Apenas para Representantes</span>
                      </div>
                    )}
                  </div>
                  {!event.isPrivate && (
                    <button className="w-full bg-primary text-white py-3 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 active:scale-[0.98] transition-all">
                      Inscrever-se para ajudar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <BottomNav activeTab="agenda" onTabChange={onNavigate} />
    </div>
  );
}
