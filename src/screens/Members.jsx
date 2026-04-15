import { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";

export default function Members({ onBack, onNavigate }) {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setMembers(data));
  }, []);

  return (

    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-24 bg-background-light dark:bg-background-dark max-w-[430px] mx-auto border-x border-primary/10 shadow-2xl">
      <header className="sticky top-0 z-30 bg-background-light/80 dark:bg-background-dark/80 ios-blur border-b border-slate-200 dark:border-primary/20">
        <div className="flex items-center p-4 justify-between">
          <button onClick={onBack} className="text-slate-900 dark:text-slate-100 flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-primary/20 transition-colors">
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </button>
          <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 text-center">Membros</h2>
          <div className="flex w-10 items-center justify-end">
            <button className="flex size-10 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined">search</span>
            </button>
          </div>
        </div>
        <div className="px-4">
          <div className="flex border-b border-slate-200 dark:border-primary/20 gap-8">
            <a className="flex flex-col items-center justify-center border-b-2 border-primary text-primary pb-3 pt-2" href="#">
              <p className="text-sm font-bold tracking-tight">Ativos</p>
            </a>
            <a className="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-500 dark:text-slate-400 pb-3 pt-2" href="#">
              <p className="text-sm font-medium tracking-tight">Inativos</p>
            </a>
          </div>
        </div>
      </header>

      <div className="px-4 py-3 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold">
        <span>42 Membros Encontrados</span>
        <div className="flex items-center gap-1 text-primary cursor-pointer">
          <span className="material-symbols-outlined text-sm">filter_list</span>
          <span>Filtrar</span>
        </div>
      </div>

      <main className="flex flex-col gap-4 p-4">
        {members.map((member, i) => (
          <div key={i} className="flex items-center gap-4 rounded-xl bg-white dark:bg-primary/10 p-4 border border-slate-200 dark:border-primary/20 shadow-sm transition-transform active:scale-95 cursor-pointer">
            <div className="h-16 w-16 bg-center bg-no-repeat bg-cover rounded-full border-2 border-primary/30" style={{ backgroundImage: `url("${member.image}")` }}></div>
            <div className="flex flex-col flex-1 gap-0.5">
              <div className="flex justify-between items-start">
                <p className="text-slate-900 dark:text-white text-base font-bold leading-tight">{member.name}</p>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${member.role === 'Presidente' ? 'bg-primary/10 text-primary' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>{member.role}</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">{member.info}</p>
              <p className="text-primary text-xs font-semibold mt-1">{member.group}</p>
            </div>
            <span className="material-symbols-outlined text-slate-300 dark:text-slate-600">chevron_right</span>
          </div>
        ))}
      </main>

      <button className="fixed bottom-24 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/40 active:scale-90 transition-transform z-40">
        <span className="material-symbols-outlined text-3xl">person_add</span>
      </button>

      <BottomNav activeTab="home" onTabChange={onNavigate} />
    </div>
  );
}
