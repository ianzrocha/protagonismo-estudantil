import { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";

export default function Announcements({ onBack, onNavigate }) {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch('/api/announcements')
      .then(res => res.json())
      .then(data => setAnnouncements(data));
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark max-w-[430px] mx-auto border-x border-primary/10 shadow-2xl">
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <div className="flex items-center p-4 justify-between max-w-md mx-auto w-full">
          <button onClick={onBack} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-primary/10 cursor-pointer">
            <span className="material-symbols-outlined text-slate-900 dark:text-slate-100">menu</span>
          </button>
          <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center">Feed de Avisos</h1>
          <div className="flex w-10 items-center justify-end">
            <button className="flex size-10 items-center justify-center rounded-full hover:bg-primary/10 transition-colors">
              <span className="material-symbols-outlined text-slate-900 dark:text-slate-100">notifications</span>
            </button>
          </div>
        </div>
        <div className="max-w-md mx-auto w-full px-4">
          <div className="flex gap-8">
            <a className="flex flex-col items-center justify-center border-b-2 border-primary text-primary pb-3 pt-2" href="#">
              <p className="text-sm font-bold">Oficiais</p>
            </a>
            <a className="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-500 dark:text-slate-400 pb-3 pt-2" href="#">
              <p className="text-sm font-medium">Gerais</p>
            </a>
            <a className="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-500 dark:text-slate-400 pb-3 pt-2" href="#">
              <p className="text-sm font-medium">Turma</p>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto max-w-md mx-auto w-full pb-32 no-scrollbar">
        {announcements.map((post, i) => (
          <article key={i} className="p-4 border-b border-primary/5">
            <div className="flex items-center gap-3 mb-3">
              <div className={`size-10 rounded-full flex items-center justify-center font-bold ${post.author === 'João Silva' ? 'bg-primary/20 text-primary' : post.author === 'Mariana Almeida' ? 'bg-blue-500/20 text-blue-500' : 'bg-green-500/20 text-green-500'}`}>
                {post.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">{post.author}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${post.role === 'Líder' ? 'bg-primary text-white' : post.role === 'Protagonista' ? 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300' : 'bg-green-600 text-white'}`}>
                    {post.role}
                  </span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Postado {post.date.includes('há') || post.date === 'ontem' ? post.date : `em ${post.date}`}</span>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-bold leading-snug">{post.title}</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{post.content}</p>
              {post.image && (
                <div className="w-full aspect-video bg-primary/10 rounded-xl overflow-hidden mb-4 relative">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${post.image}')` }}></div>
                </div>
              )}
              <div className="flex items-center justify-between pt-2">
                <div className="flex gap-4">
                  <button className={`flex items-center gap-1.5 transition-colors ${post.likes > 30 ? 'text-primary' : 'text-slate-500 dark:text-slate-400 hover:text-primary'}`}>
                    <span className={`material-symbols-outlined text-xl ${post.likes > 30 ? 'fill-1' : ''}`}>favorite</span>
                    <span className="text-xs font-bold">{post.likes}</span>
                  </button>
                  {post.commentsDisabled ? (
                    <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-600 cursor-not-allowed">
                      <span className="material-symbols-outlined text-xl">comments_disabled</span>
                      <span className="text-xs font-medium italic">Comentários desativados</span>
                    </div>
                  ) : (
                    <button className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-xl">chat_bubble</span>
                      <span className="text-xs font-bold">{post.comments}</span>
                    </button>
                  )}
                </div>
                <button className="bg-primary/10 hover:bg-primary text-primary hover:text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all">
                  Ver Comentários
                </button>
              </div>
            </div>
          </article>
        ))}
      </main>

      <button className="fixed bottom-24 right-6 size-14 bg-primary text-white rounded-full shadow-lg shadow-primary/30 flex items-center justify-center z-40 active:scale-95 transition-transform">
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>

      <BottomNav activeTab="home" onTabChange={onNavigate} />
    </div>
  );
}
