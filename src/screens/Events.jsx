import { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";

export default function Events({ onBack, onNavigate }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [filter, setFilter] = useState('open');
  const [user, setUser] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
    image: '',
    team: '',
    category: '',
    is_private: false
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

  const loadSubscriptions = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}/subscriptions`);
      const data = await response.json();
      const enrolledEventIds = data.map(sub => sub.event_id);
      setSubscriptions(enrolledEventIds);
    } catch (err) {
      console.error('Erro ao carregar inscrições:', err);
      // Fallback para localStorage se o backend falhar
      const enrolledEventIds = JSON.parse(localStorage.getItem(`user_${userId}_subscriptions`) || '[]');
      setSubscriptions(enrolledEventIds);
    }
  };

  const toggleSubscription = async (eventId) => {
    if (!user) return;
    
    const userId = user.id;
    const enrolled = subscriptions.includes(eventId);
    
    try {
      const response = await fetch(`/api/events/${eventId}/${enrolled ? 'unsubscribe' : 'subscribe'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId })
      });
      
      if (response.ok) {
        if (enrolled) {
          setSubscriptions(subscriptions.filter(id => id !== eventId));
        } else {
          setSubscriptions([...subscriptions, eventId]);
        }
      } else {
        console.error('Erro ao alterar inscrição');
      }
    } catch (err) {
      console.error('Erro ao alterar inscrição:', err);
      // Fallback para localStorage se o backend falhar
      if (enrolled) {
        setSubscriptions(subscriptions.filter(id => id !== eventId));
        localStorage.setItem(`user_${userId}_subscriptions`, JSON.stringify(subscriptions.filter(id => id !== eventId)));
      } else {
        const newSubscriptions = [...subscriptions, eventId];
        setSubscriptions(newSubscriptions);
        localStorage.setItem(`user_${userId}_subscriptions`, JSON.stringify(newSubscriptions));
      }
    }
  };

  const handleCreateEvent = async () => {
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent)
      });
      
      if (response.ok) {
        // Reload events
        const eventsResponse = await fetch('/api/events');
        const eventsData = await eventsResponse.json();
        setEvents(eventsData.filter(e => !e.is_private));
        
        // Reset form and close modal
        setNewEvent({
          title: '',
          date: '',
          time: '',
          description: '',
          image: '',
          team: '',
          category: '',
          is_private: false
        });
        setShowCreateModal(false);
      } else {
        console.error('Erro ao criar evento');
      }
    } catch (err) {
      console.error('Erro ao criar evento:', err);
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
            <button onClick={() => setShowCreateModal(true)} className="flex items-center justify-center rounded-full size-10 bg-primary text-white hover:bg-primary/90 transition-all">
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

      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-background-dark rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6 p-6 pb-0">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Criar Novo Evento</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="px-6 pb-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Título do Evento</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  placeholder="Ex: Feira Cultural 2024"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Data</label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Horário</label>
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Descrição</label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 h-20 resize-none"
                  placeholder="Descreva o evento..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">URL da Imagem</label>
                <input
                  type="url"
                  value={newEvent.image}
                  onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Equipe Responsável</label>
                <input
                  type="text"
                  value={newEvent.team}
                  onChange={(e) => setNewEvent({ ...newEvent, team: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  placeholder="Ex: Conselho Estudantil"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Categoria</label>
                <select
                  value={newEvent.category}
                  onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="cultural">Cultural</option>
                  <option value="esportivo">Esportivo</option>
                  <option value="educacional">Educacional</option>
                  <option value="social">Social</option>
                  <option value="outros">Outros</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="is_private"
                  checked={newEvent.is_private}
                  onChange={(e) => setNewEvent({ ...newEvent, is_private: e.target.checked })}
                  className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
                />
                <label htmlFor="is_private" className="text-sm font-medium text-slate-700 dark:text-slate-300">Evento Privado</label>
              </div>
            </div>

            <div className="flex gap-3 mt-6 p-6 pt-0">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateEvent}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Criar Evento
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav activeTab="agenda" onTabChange={onNavigate} />
    </div>
  );
}
