import { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";

export default function Home({ onNavigate }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      fetch('/api/users')
        .then(res => res.json())
        .then(data => {
          const currentUser = data.find(u => u.name === userData.username) || data[0];
          setUser(currentUser);
        })
        .catch(err => console.error(err));
    }
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background-light dark:bg-background-dark max-w-[430px] mx-auto border-x border-primary/10 shadow-2xl">
      <header className="flex items-center justify-between px-4 py-4 sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md z-10 border-b border-slate-200/50 dark:border-white/5">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden border border-primary/30">
            <img alt="Avatar do usuário" className="w-full h-full object-cover" src={user?.image || "https://lh3.googleusercontent.com/aida-public/AB6AXu1"} />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Olá, {user?.name || 'Usuário'}</p>
            <h1 className="text-lg font-bold leading-tight tracking-tight">Página Inicial</h1>
          </div>
        </div>
        <button className="flex size-10 items-center justify-center rounded-full bg-slate-200 dark:bg-primary/20 text-slate-900 dark:text-slate-100">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      <main className="flex-1 pb-32">
        {user?.role === 'Líder' && (
          <section className="mt-6 px-4">
            <h2 className="text-lg font-bold tracking-tight mb-3">Ações Rápidas</h2>
            <div className="flex flex-col gap-3">
              <button onClick={() => onNavigate('agenda')} className="flex items-center justify-between w-full p-4 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-transform">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-2 rounded-xl">
                    <span className="material-symbols-outlined">add_circle</span>
                  </div>
                  <div className="text-left">
                    <span className="block font-bold text-base">Novo Evento</span>
                    <span className="text-[10px] opacity-80 font-medium uppercase tracking-wider">Criar</span>
                  </div>
                </div>
                <span className="material-symbols-outlined opacity-60">chevron_right</span>
              </button>
            </div>
          </section>
        )}

        <section className="mt-8">
          <div className="flex items-center justify-between px-4 mb-3">
            <h2 className="text-lg font-bold tracking-tight">Mural de Avisos</h2>
            <button onClick={() => onNavigate('announcements')} className="text-primary text-sm font-semibold">Ver todos</button>
          </div>
          <div className="flex overflow-x-auto gap-4 px-4 no-scrollbar min-h-[180px]">
            <div className="flex-shrink-0 w-72 bg-white dark:bg-primary/10 border border-slate-200 dark:border-primary/20 rounded-xl overflow-hidden p-4 flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-700 mb-2">notifications_none</span>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Nenhum aviso lançado ainda</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">A liderança lançará avisos aqui</p>
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
