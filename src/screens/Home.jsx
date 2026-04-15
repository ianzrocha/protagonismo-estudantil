import BottomNav from "../components/BottomNav";

export default function Home({ onNavigate }) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background-light dark:bg-background-dark max-w-[430px] mx-auto border-x border-primary/10 shadow-2xl">
      <header className="flex items-center justify-between px-4 py-4 sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md z-10 border-b border-slate-200/50 dark:border-white/5">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden border border-primary/30">
            <img alt="Avatar do usuário" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWNd-7B8Zskr6xfUjCbEULcu7frQfArn5DwOjfdeO45FCBGdoBZYFZ4seygLX5d17xauoNajpoJqsZxiYMHpu-NUfFpUnSgKDopCnb9Pmb9sWfvN4oHBuzPh3kOYhCLD5cwA8zv---G5JVQYk5aW7ABeOYJ4e5QkDdpKKUrX81Bznlamsk9CIxAnqbO1W_cZgela7QRq0--D1mFn-dPwHHD--Gp6KqGDpIb1OOEWfXPx-2Y_zRyHkXi9VkxdevH6ciJJoAvYTorQ" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Olá, João Silva</p>
            <h1 className="text-lg font-bold leading-tight tracking-tight">Página Inicial</h1>
          </div>
        </div>
        <button className="flex size-10 items-center justify-center rounded-full bg-slate-200 dark:bg-primary/20 text-slate-900 dark:text-slate-100">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      <main className="flex-1 pb-32">
        <section className="mt-6 px-4">
          <h2 className="text-lg font-bold tracking-tight mb-3">Ações Rápidas</h2>
          <div className="flex flex-col gap-3">
            <button onClick={() => onNavigate('events')} className="flex items-center justify-between w-full p-4 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-transform">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-2 rounded-xl">
                  <span className="material-symbols-outlined">add_circle</span>
                </div>
                <div className="text-left">
                  <span className="block font-bold text-base">Novo Evento</span>
                  <span className="text-[10px] opacity-80 font-medium uppercase tracking-wider">Líderes</span>
                </div>
              </div>
              <span className="material-symbols-outlined opacity-60">chevron_right</span>
            </button>
          </div>
        </section>

        <section className="mt-8">
          <div className="flex items-center justify-between px-4 mb-3">
            <h2 className="text-lg font-bold tracking-tight">Mural de Avisos</h2>
            <button onClick={() => onNavigate('announcements')} className="text-primary text-sm font-semibold">Ver todos</button>
          </div>
          <div className="flex overflow-x-auto gap-4 px-4 no-scrollbar">
            <div className="flex-shrink-0 w-72 bg-white dark:bg-primary/10 border border-slate-200 dark:border-primary/20 rounded-xl overflow-hidden p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-bold">LM</div>
                <div>
                  <p className="text-xs font-bold leading-none">Líder Maria</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">12 Out, 09:00</p>
                </div>
              </div>
              <h3 className="font-bold text-base mb-1">Reunião de Grêmio</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">Definição das pautas para a semana do protagonismo e eventos esportivos.</p>
              <div className="mt-3 w-full h-24 rounded-lg bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBN621ZIfKIKEd581Ei8IEVla2jEcwkAwPyFGk174ByeVy0eKEYnXkJcl0iH41VM_DRvI1J075nkMrMWxPNestzgdnzowvabO6zdXEJ7Cc9qSpAu_L1roJ5EuU0n_vuovuHYMwud5HE4eUn2EqHMJYA6yWiBl9IdHNoEuf0FpWdNXa36LKIwTqLn4oWt6q5_KtYDx2ihr34yV8TmIxszNHUii8R56VYHBJQJGC4bx_2g864UgnWqQ86n7I3WbVqpbOGXo8hN1DM_w')" }}></div>
            </div>
            <div className="flex-shrink-0 w-72 bg-white dark:bg-primary/10 border border-slate-200 dark:border-primary/20 rounded-xl overflow-hidden p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-bold">JP</div>
                <div>
                  <p className="text-xs font-bold leading-none">Líder Pedro</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">10 Out, 14:30</p>
                </div>
              </div>
              <h3 className="font-bold text-base mb-1">Relatórios de Missão</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">Lembrete para o envio dos relatórios parciais das missões comunitárias.</p>
              <div className="mt-3 w-full h-24 rounded-lg bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA3Cajn21eKqkR081wdi2SQfbeD6yAs-3X53Kq-9PgvMI5Y-on8ZKuV7q8EsUw2wH66mOz-z5rFLXZtvADgj1g1xTvuozW9NwkFwrNhV3adYa-rn5NOx6dp5FfjJVW_KKbihtRXcbLctKTTSlVZewNJRcyo_cHF2iYbykb81NQJArCaHSwtz101zdtx5r2dq10DPg6r2jgVnybhJixRAaKvJ4CiNmoZeNTYCPuSwMJdsGH2W_413gqMX_JVBO9K_m4ok3bZXtdWfg')" }}></div>
            </div>
          </div>
        </section>

        <section className="mt-8 px-4">
          <h2 className="text-lg font-bold tracking-tight mb-4">Acesso Direto</h2>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => onNavigate('announcements')} className="flex flex-col items-center justify-center p-6 bg-white dark:bg-primary/10 border border-slate-200 dark:border-primary/20 rounded-xl group transition-all">
              <div className="size-14 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-3 group-active:scale-95">
                <span className="material-symbols-outlined text-3xl">campaign</span>
              </div>
              <span className="font-bold text-sm">Avisos</span>
            </button>
            <button onClick={() => onNavigate('members')} className="flex flex-col items-center justify-center p-6 bg-white dark:bg-primary/10 border border-slate-200 dark:border-primary/20 rounded-xl group transition-all">
              <div className="size-14 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-3 group-active:scale-95">
                <span className="material-symbols-outlined text-3xl">groups</span>
              </div>
              <span className="font-bold text-sm">Membros</span>
            </button>
            <button onClick={() => onNavigate('chat')} className="col-span-2 flex items-center justify-between p-6 bg-white dark:bg-primary/10 border border-slate-200 dark:border-primary/20 rounded-xl group transition-all">
              <div className="flex items-center gap-4">
                <div className="size-14 rounded-full bg-primary/20 flex items-center justify-center text-primary group-active:scale-95">
                  <span className="material-symbols-outlined text-3xl">forum</span>
                </div>
                <div className="text-left">
                  <span className="font-bold text-base block">Chat do Grupo</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">3 mensagens não lidas</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-400">chevron_right</span>
            </button>
          </div>
        </section>
      </main>

      <BottomNav activeTab="home" onTabChange={onNavigate} />
    </div>
  );
}
