import { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";

export default function RoleManagement({ onBack, onNavigate }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const openEdit = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden max-w-[430px] mx-auto bg-background-light dark:bg-background-dark border-x border-slate-200 dark:border-primary/20">
      <header className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10 border-b border-slate-200 dark:border-primary/20">
        <button onClick={onBack} className="text-primary flex size-10 shrink-0 items-center justify-center cursor-pointer">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">Gerenciamento de Cargos</h2>
      </header>

      <div className="px-4 py-4 bg-background-light dark:bg-background-dark">
        <label className="flex flex-col w-full">
          <div className="flex w-full items-stretch rounded-xl overflow-hidden h-12 bg-slate-100 dark:bg-primary/10 border border-slate-200 dark:border-primary/30">
            <div className="text-primary flex items-center justify-center pl-4">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input className="flex w-full border-none bg-transparent focus:ring-0 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-primary/50 text-base font-normal" placeholder="Buscar usuários por nome ou turma" />
          </div>
        </label>
      </div>

      <div className="flex gap-2 px-4 pb-2 overflow-x-auto no-scrollbar">
        {['Todos', 'Protagonistas', 'Líderes', 'Desenvolvedores'].map((filter, i) => (
          <span key={i} className={`${i === 0 ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-primary/10 text-slate-600 dark:text-primary/70'} px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer`}>
            {filter}
          </span>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3 pb-24 no-scrollbar">
        <h3 className="text-slate-900 dark:text-slate-100 text-sm font-bold uppercase tracking-wider opacity-60 pb-1">Lista de Usuários</h3>
        {users.map((user, i) => (
          <div key={i} className={`flex items-center gap-4 bg-white dark:bg-primary/5 p-3 rounded-xl border ${user.saved ? 'border-primary/40' : 'border-slate-100 dark:border-primary/10'} shadow-sm`}>
            <div className="relative">
              <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-12 w-12 border-2 border-primary/20" style={{ backgroundImage: `url("${user.image}")` }}></div>
              {user.online && <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white dark:border-background-dark"></div>}
            </div>
            <div className="flex flex-col flex-1">
              <p className="text-slate-900 dark:text-slate-100 text-base font-bold line-clamp-1">{user.name}</p>
              <p className="text-slate-500 dark:text-primary/60 text-xs font-medium">{user.info} • <span className="text-primary">{user.role}</span></p>
            </div>
            <button 
              onClick={() => openEdit(user)}
              className={`flex items-center justify-center rounded-lg h-9 px-3 bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors`}
            >
              {user.saved ? (
                <>
                  <span className="material-symbols-outlined text-sm mr-1">check</span>
                  <span>Salvo</span>
                </>
              ) : <span>Editar</span>}
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="absolute bottom-24 left-4 right-4 bg-white dark:bg-background-dark border-2 border-primary rounded-xl shadow-2xl z-20 p-4 transform translate-y-0 opacity-100 transition-all">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">Alterar Cargo de {selectedUser?.name}</h4>
            <span onClick={() => setShowModal(false)} className="material-symbols-outlined text-slate-400 cursor-pointer">close</span>
          </div>
          <div className="space-y-2">
            {['Protagonista', 'Líder', 'Desenvolvedor'].map((role) => (
              <button 
                key={role}
                className={`w-full text-left p-3 rounded-lg flex items-center justify-between transition-colors ${selectedUser?.role === role ? 'bg-primary/10 border border-primary text-primary font-bold' : 'hover:bg-slate-100 dark:hover:bg-primary/5 text-slate-700 dark:text-slate-200 font-medium'}`}
              >
                {role}
                <span className="material-symbols-outlined">{selectedUser?.role === role ? 'radio_button_checked' : 'radio_button_unchecked'}</span>
              </button>
            ))}
          </div>
          <button onClick={() => setShowModal(false)} className="w-full mt-4 bg-primary text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/20">Confirmar Alteração</button>
        </div>
      )}

      <BottomNav activeTab="profile" onTabChange={onNavigate} />
    </div>
  );
}
