import { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";

export default function Agenda({ onNavigate }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [events, setEvents] = useState([]);
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
        })
        .catch(err => console.error(err));
    }

    // Get all events
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error(err));
  }, []);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthName = currentMonth.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  // Get events for selected date
  const selectedDateEvents = events.filter(e => {
    const eventDate = new Date(e.date).getDate();
    return eventDate === selectedDate;
  });

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
              <button onClick={prevMonth} className="p-2 hover:bg-primary/10 rounded-full transition-colors">
                <span className="material-symbols-outlined text-primary">chevron_left</span>
              </button>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 capitalize">{monthName}</h2>
              <button onClick={nextMonth} className="p-2 hover:bg-primary/10 rounded-full transition-colors">
                <span className="material-symbols-outlined text-primary">chevron_right</span>
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
                <div key={d} className="text-center text-xs font-bold text-slate-400 uppercase">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array(firstDay).fill(null).map((_, i) => (
                <div key={`empty-${i}`} className="h-10"></div>
              ))}
              {days.map(day => (
                <button 
                  key={day} 
                  onClick={() => setSelectedDate(day)}
                  className={`h-10 flex items-center justify-center rounded-lg text-sm font-medium relative transition-colors ${day === selectedDate ? 'bg-primary text-white font-bold shadow-lg shadow-primary/30' : 'hover:bg-primary/20 text-slate-900 dark:text-slate-100'}`}
                >
                  {day}
                  {events.some(e => new Date(e.date).getDate() === day) && <span className="absolute bottom-1.5 size-1 bg-primary rounded-full"></span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="px-4 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Eventos do Dia</h3>
            <span className="text-sm text-primary font-semibold">{selectedDate} de {monthName.split(' ')[0]}</span>
          </div>
          <div className="space-y-3">
            {selectedDateEvents.length === 0 ? (
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-700 block mb-2">event_note</span>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Nenhum evento neste dia</p>
              </div>
            ) : (
              selectedDateEvents.map((event, i) => (
                <div key={i} className="bg-white dark:bg-primary/5 border border-primary/10 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100">{event.title}</h4>
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold uppercase ${event.is_private ? 'bg-blue-500/20 text-blue-600' : 'bg-primary/20 text-primary'}`}>
                      {event.is_private ? 'Privado' : 'Público'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-primary text-xs font-semibold mb-2">
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    {event.time}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{event.description}</p>
                  {event.team && (
                    <div className="mt-3 pt-3 border-t border-primary/10 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="material-symbols-outlined text-[16px]">groups</span>
                      {event.team}
                    </div>
                  )}
                  <button 
                    onClick={() => onNavigate('events')}
                    className="mt-3 w-full py-2 bg-primary/10 text-primary rounded-lg text-sm font-semibold hover:bg-primary/20 transition-colors"
                  >
                    Ver Detalhes e Inscrever-se
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Floating Action Button for Leaders */}
      {user?.role === 'Líder' && (
        <button 
          onClick={() => onNavigate('events')}
          className="fixed bottom-24 right-4 size-14 bg-primary text-white rounded-full shadow-lg shadow-primary/30 flex items-center justify-center hover:bg-primary/90 transition-colors z-10"
        >
          <span className="material-symbols-outlined">add</span>
        </button>
      )}

      <BottomNav activeTab="agenda" onTabChange={onNavigate} />
    </div>
  );
}
