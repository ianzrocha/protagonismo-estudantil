import { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";

export default function Announcements({ onBack, onNavigate }) {
  const [announcements, setAnnouncements] = useState([]);
  const [filter, setFilter] = useState('Oficiais');
  const [user, setUser] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    // Get current user
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      fetch('/api/users')
        .then(res => res.json())
        .then(data => {
          const currentUser = data.find(u => u.name === userData.username);
          setUser(currentUser);
        })
        .catch(err => console.error(err));
    }

    // Get announcements
    fetch('/api/announcements')
      .then(res => res.json())
      .then(data => setAnnouncements(data.filter(a => a.type === filter || filter === 'Todos')))
      .catch(err => console.error(err));
  }, [filter]);

  const handlePostAnnouncement = async (e) => {
    e.preventDefault();
    if (!user || user.role !== 'Líder') {
      alert('Apenas líderes podem lançar avisos');
      return;
    }

    if (!formData.title || !formData.content) {
      alert('Preencha todos os campos');
      return;
    }

    try {
      const response = await fetch('/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: user.name,
          role: user.role,
          date: new Date().toLocaleDateString('pt-BR'),
          title: formData.title,
          content: formData.content,
          type: 'Oficial'
        })
      });

      if (response.ok) {
        setFormData({ title: '', content: '' });
        setShowCreateForm(false);
        // Reload announcements
        fetch('/api/announcements')
          .then(res => res.json())
          .then(data => setAnnouncements(data))
          .catch(err => console.error(err));
      }
    } catch (err) {
      alert('Erro ao postar aviso');
      console.error(err);
    }
  };

  const filteredAnnouncements = announcements.filter(a => a.type === filter || filter === 'Todos');

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
          <div className="flex gap-8 overflow-x-auto no-scrollbar">
            {['Oficiais', 'Gerais', 'Turma'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`flex flex-col items-center justify-center border-b-2 pb-3 pt-2 whitespace-nowrap transition-colors ${
                  filter === type
                    ? 'border-primary text-primary'
                    : 'border-transparent text-slate-500 dark:text-slate-400'
                }`}
              >
                <p className="text-sm font-medium">{type}</p>
              </button>
            ))}
          </div>
        </div>
      </header>

      {user?.role === 'Líder' && (
        <div className="px-4 py-4 flex gap-2">
          <button 
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="flex items-center gap-2 flex-1 bg-primary text-white px-4 py-3 rounded-lg font-bold text-sm transition-all active:scale-95"
          >
            <span className="material-symbols-outlined">add</span>
            Novo Aviso
          </button>
        </div>
      )}

      {showCreateForm && user?.role === 'Líder' && (
        <form onSubmit={handlePostAnnouncement} className="px-4 pb-4 space-y-3 border-b border-primary/10">
          <input
            type="text"
            placeholder="Título do aviso"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-white dark:bg-primary/5 border border-primary/20 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
          />
          <textarea
            placeholder="Conteúdo do aviso"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={3}
            className="w-full bg-white dark:bg-primary/5 border border-primary/20 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none resize-none text-sm text-slate-900 dark:text-slate-100"
          />
          <div className="flex gap-2">
            <button type="submit" className="flex-1 bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm">
              Postar
            </button>
            <button type="button" onClick={() => setShowCreateForm(false)} className="flex-1 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-2 rounded-lg font-bold text-sm">
              Cancelar
            </button>
          </div>
        </form>
      )}

      <main className="flex-1 overflow-y-auto max-w-md mx-auto w-full pb-32 no-scrollbar">
        {filteredAnnouncements.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <span className="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-700 mb-3">notifications_none</span>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Nenhum aviso ainda</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">A liderança em breve lançará avisos aqui</p>
          </div>
        ) : (
          filteredAnnouncements.map((post, i) => (
            <article key={i} className="p-4 border-b border-primary/5">
              <div className="flex items-center gap-3 mb-3">
                <div className={`size-10 rounded-full flex items-center justify-center font-bold ${post.role === 'Líder' ? 'bg-primary/20 text-primary' : 'bg-blue-500/20 text-blue-500'}`}>
                  {post.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{post.author}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary text-white`}>
                      {post.role}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Postado em {post.date}</span>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-bold leading-snug text-slate-900 dark:text-slate-100">{post.title}</h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{post.content}</p>
              </div>
            </article>
          ))
        )}
      </main>

      <button className="fixed bottom-24 right-6 size-14 bg-primary text-white rounded-full shadow-lg shadow-primary/30 flex items-center justify-center z-40 active:scale-95 transition-transform">
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>

      <BottomNav activeTab="home" onTabChange={onNavigate} />
    </div>
  );
}
