import { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";

export default function RoleManagement({ onBack, onNavigate }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    class: '',
    role: '',
    info: '',
    group_name: '',
    online: false,
    image: ''
  });

  useEffect(() => {
    // Get logged-in user
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      fetch('/api/users')
        .then(res => res.json())
        .then(data => {
          const loggedUser = data.find(u => u.name === userData.username) || data[0];
          setCurrentUser(loggedUser);
        })
        .catch(err => console.error(err));
    }

    // Get all users
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  // Check if current user can edit the target user
  const canEditUser = (targetUser) => {
    if (!currentUser) return false;

    // Desenvolvedores podem editar todos
    if (currentUser.role === 'Desenvolvedor') return true;

    // Líderes podem editar Protagonistas, mas não outros Líderes ou Desenvolvedores
    if (currentUser.role === 'Líder') {
      return targetUser.role === 'Protagonista';
    }

    return false;
  };

  // Get available roles for the current user to assign
  const getAvailableRoles = () => {
    if (!currentUser) return [];

    if (currentUser.role === 'Desenvolvedor') {
      return ['Protagonista', 'Líder', 'Desenvolvedor'];
    }

    if (currentUser.role === 'Líder') {
      return ['Protagonista', 'Líder']; // Líderes podem promover Protagonistas para Líder
    }

    return [];
  };

  const openFullEdit = (user) => {
    if (!canEditUser(user)) {
      alert('Você não tem permissão para editar este usuário.');
      return;
    }

    setSelectedUser(user);
    setEditForm({
      name: user.name,
      email: user.email || '',
      class: user.class || '',
      role: user.role,
      info: user.info || '',
      group_name: user.group_name || '',
      online: user.online === 1,
      image: user.image || ''
    });
    setShowEditModal(true);
  };

  const handleFullEditSave = async () => {
    if (!selectedUser) return;

    // Get auth token
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      alert('Sessão expirada. Faça login novamente.');
      return;
    }
    const userData = JSON.parse(storedUser);
    const token = userData.token;

    try {
      const response = await fetch(`/api/admin/users/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });

      if (response.ok) {
        // Update local state
        setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ...editForm, online: editForm.online ? 1 : 0 } : u));
        setShowEditModal(false);
        alert('Usuário atualizado com sucesso!');
      } else {
        const error = await response.json();
        alert(error.message || 'Erro ao atualizar usuário');
      }
    } catch (err) {
      alert('Erro ao atualizar usuário');
      console.error(err);
    }
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
        <h3 className="text-slate-900 dark:text-slate-100 text-sm font-bold uppercase tracking-wider opacity-60 pb-1">
          Lista de Usuários {currentUser?.role === 'Desenvolvedor' ? '(Todos)' : '(Protagonistas)'}
        </h3>
        {users.filter(user => canEditUser(user)).map((user, i) => (
          <div key={i} className={`flex items-center gap-4 bg-white dark:bg-primary/5 p-3 rounded-xl border ${user.saved ? 'border-primary/40' : 'border-slate-100 dark:border-primary/10'} shadow-sm`}>
            <div className="relative">
              <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-12 w-12 border-2 border-primary/20" style={{ backgroundImage: `url("${user.image}")` }}></div>
              {user.online && <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white dark:border-background-dark"></div>}
            </div>
            <div className="flex flex-col flex-1">
              <p className="text-slate-900 dark:text-slate-100 text-base font-bold line-clamp-1">{user.name}</p>
              <p className="text-slate-500 dark:text-primary/60 text-xs font-medium">{user.info} • <span className="text-primary">{user.role}</span></p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => openFullEdit(user)}
                className="flex items-center justify-center rounded-lg h-9 px-3 bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors"
              >
                <span className="material-symbols-outlined text-sm mr-1">edit</span>
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Full Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-background-dark rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6 p-6 pb-0">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Editar Usuário</h3>
              <button onClick={() => setShowEditModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="px-6 pb-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Nome</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Série e Turma</label>
                <input
                  type="text"
                  value={editForm.class}
                  onChange={(e) => setEditForm({ ...editForm, class: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Cargo</label>
                <select
                  value={editForm.role}
                  onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  {getAvailableRoles().map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Informações</label>
                <input
                  type="text"
                  value={editForm.info}
                  onChange={(e) => setEditForm({ ...editForm, info: e.target.value })}
                  placeholder="Ex: Turma: 3A • 16 anos"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Grupo</label>
                <input
                  type="text"
                  value={editForm.group_name}
                  onChange={(e) => setEditForm({ ...editForm, group_name: e.target.value })}
                  placeholder="Ex: Conselho Estudantil"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">URL da Imagem</label>
                <input
                  type="url"
                  value={editForm.image}
                  onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="online"
                  checked={editForm.online}
                  onChange={(e) => setEditForm({ ...editForm, online: e.target.checked })}
                  className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
                />
                <label htmlFor="online" className="text-sm font-medium text-slate-700 dark:text-slate-300">Online</label>
              </div>
            </div>

            <div className="flex gap-3 mt-6 p-6 pt-0">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleFullEditSave}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav activeTab="profile" onTabChange={onNavigate} />
    </div>
  );
}
