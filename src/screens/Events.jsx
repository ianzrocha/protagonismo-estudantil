import { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";

export default function Events({ onBack, onNavigate }) {
  const [events, setEvents] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [filter, setFilter] = useState('open');
  const [user, setUser] = useState(null);

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
          loadSubscriptions(currentUser?.id);
        })
        .catch(err => console.error(err));
    }

    // Get all events
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data.filter(e => !e.is_private)))
      .catch(err => console.error(err));
  }, []);

  const loadSubscriptions = (userId) => {
    const enrolledEventIds = JSON.parse(localStorage.getItem(`user_${userId}_subscriptions`) || '[]');
    setSubscriptions(enrolledEventIds);
  };

  const toggleSubscription = (eventId) => {
    if (!user) return;
    
    const userId = user.id;
    const enrolled = subscriptions.includes(eventId);
    
    if (enrolled) {
      setSubscriptions(subscriptions.filter(id => id !== eventId));
      localStorage.setItem(`user_${userId}_subscriptions`, JSON.stringify(subscriptions.filter(id => id !== eventId)));
    } else {
      const newSubscriptions = [...subscriptions, eventId];
      setSubscriptions(newSubscriptions);
      localStorage.setItem(`user_${userId}_subscriptions`, JSON.stringify(newSubscriptions));
    }
  };

  const filteredEvents = filter === 'open'
    ? events.filter(e => !subscriptions.includes(e.id))
    : events.filter(e => subscriptions.includes(e.id));

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
            <button onClick={() => setFilter('open')} className={`flex flex-col items-center justify-center border-b-2 pb-3 pt-2 ${filter === 'open' ? 'border-primary text-primary' : 'border-transparent text-slate-500 dark:text-slate-400'}`}>
              <span className="text-sm font-bold">Explorar</span>
            </button>
            <button onClick={() => setFilter('registered')} className={`flex flex-col items-center justify-center border-b-2 pb-3 pt-2 ${filter === 'registered' ? 'border-primary text-primary' : 'border-transparent text-slate-500 dark:text-slate-400'}`}>
              <span className="text-sm font-medium">Minhas Inscrições</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 no-scrollbar">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-slate-900 dark:text-white text-xl font-bold">
              {filter === 'open' ? 'Eventos Disponíveis' : 'Meus Eventos'}
            </h2>
            <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">{filteredEvents.length}</span>
          </div>
          <div className="space-y-6">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-12">
                <span className="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-700 block mb-2">event_note</span>
                <p className="text-slate-500 dark:text-slate-400 font-medium">
                  {filter === 'open' ? 'Nenhum evento disponível' : 'Você não se inscreveu em nenhum evento'}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  {filter === 'open' ? 'Novos eventos em breve!' : 'Explore eventos e se inscreva'}
                </p>
              </div>
            ) : (
              filteredEvents.map((event) => (
                <div key={event.id} className="group flex flex-col rounded-xl overflow-hidden bg-white dark:bg-primary/5 border border-primary/10 shadow-sm">
                  {event.image && (
                    <div className="h-48 w-full bg-cover bg-center" style={{ backgroundImage: `url('${event.image}')` }}></div>
                  )}
                  <div className="p-4 flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-slate-900 dark:text-white text-lg font-bold">{event.title}</h3>
                        <div className="flex items-center gap-1 text-primary text-xs font-semibold mt-1">
                          <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                          {event.date} • {event.time}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {event.team && (
                        <div className="flex items-center gap-2">
                          <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[16px] text-primary">groups</span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">{event.team}</p>
                        </div>
                      )}
                      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{event.description}</p>
                    </div>
                    <button 
                      onClick={() => toggleSubscription(event.id)}
                      className={`w-full py-3 rounded-lg font-bold text-sm shadow-lg transition-all active:scale-[0.98] ${
                        subscriptions.includes(event.id)
                          ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                          : 'bg-primary text-white shadow-primary/20'
                      }`}
                    >
                      {subscriptions.includes(event.id) ? '✓ Inscrito' : 'Inscrever-se para ajudar'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      <BottomNav activeTab="agenda" onTabChange={onNavigate} />
    </div>
  );
}
