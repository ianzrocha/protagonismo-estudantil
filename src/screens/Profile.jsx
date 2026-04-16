import { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";

export default function Profile({ onNavigate }) {
  const [user, setUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    class: '',
    online: false,
    image: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    // Get logged-in user from localStorage or fetch from API
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

  const handleLogout = () => {
    localStorage.removeItem('user');
    onNavigate('login');
  };

  const handleEditProfile = () => {
    setEditForm({
      name: user.name,
      class: user.class || '',
      online: user.online === 1,
      image: user.image || ''
    });
    setSelectedFile(null);
    setImagePreview(user.image || '');
    setShowEditModal(true);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) return editForm.image;

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('/api/upload-profile-image', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        return data.imageUrl;
      } else {
        alert('Erro ao fazer upload da imagem');
        return editForm.image;
      }
    } catch (err) {
      alert('Erro ao fazer upload da imagem');
      console.error(err);
      return editForm.image;
    }
  };

  const handleSaveProfile = async () => {
    try {
      // Upload image first if a new file was selected
      let imageUrl = editForm.image;
      if (selectedFile) {
        imageUrl = await handleImageUpload();
      }

      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editForm, image: imageUrl })
      });

      if (response.ok) {
        // Update local user state
        setUser({ ...user, ...editForm, image: imageUrl });
        setShowEditModal(false);
        // Refresh page to show updated data (F5 usar)
        window.location.reload();
      } else {
        alert('Erro ao salvar alterações');
      }
    } catch (err) {
      alert('Erro ao salvar alterações');
      console.error(err);
    }
  };

  if (!user) {
    return (
      <div className="relative flex h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark max-w-[430px] mx-auto border-x border-primary/10 shadow-2xl items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-500 dark:text-slate-400">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="relative flex h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark max-w-[430px] mx-auto border-x border-primary/10 shadow-2xl items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-500 dark:text-slate-400">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark max-w-[430px] mx-auto border-x border-primary/10 shadow-2xl">
      <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between border-b border-primary/10">
        <div className="w-12"></div>
        <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center">Perfil</h2>
        <div className="flex w-12 items-center justify-end">
          <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-transparent text-primary hover:bg-primary/10 transition-colors">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-32 no-scrollbar">
        <div className="flex p-6">
          <div className="flex w-full flex-col gap-6 items-center">
            <div className="flex gap-4 flex-col items-center">
              <div className="relative">
                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-32 w-32 border-4 border-primary shadow-lg" style={{ backgroundImage: `url("${user.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXu1'}")` }}></div>
                <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-md border-2 border-background-dark flex items-center justify-center">
                  <span className="material-symbols-outlined !text-[18px]">edit</span>
                </button>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-2xl font-bold leading-tight tracking-tight text-center text-slate-900 dark:text-slate-100">{user.name}</p>
                <span className="mt-1 px-3 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider">{user.role}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full max-w-md">
              <button onClick={handleEditProfile} className="flex items-center justify-center gap-2 rounded-xl h-12 px-4 bg-primary text-white text-sm font-bold shadow-sm active:scale-95 transition-transform">
                <span className="material-symbols-outlined !text-[20px]">edit</span>
                Editar Perfil
              </button>
              <button onClick={handleLogout} className="flex items-center justify-center gap-2 rounded-xl h-12 px-4 bg-slate-200 dark:bg-primary/10 text-slate-900 dark:text-slate-100 text-sm font-bold active:scale-95 transition-transform">
                <span className="material-symbols-outlined !text-[20px]">logout</span>
                Sair
              </button>
            </div>
          </div>
        </div>

        <div className="px-4 py-2">
          <h3 className="text-sm font-bold uppercase text-slate-500 dark:text-primary/60 tracking-widest px-2 pb-3">Informações Escolares</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-4 bg-white dark:bg-primary/5 p-4 rounded-xl border border-slate-100 dark:border-primary/10">
              <div className="flex items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20 text-primary shrink-0 size-12">
                <span className="material-symbols-outlined">school</span>
              </div>
              <div className="flex flex-col flex-1">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Série e Turma</p>
                <p className="font-semibold text-slate-900 dark:text-slate-100">{user.class || 'Não definido'}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white dark:bg-primary/5 p-4 rounded-xl border border-slate-100 dark:border-primary/10">
              <div className="flex items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20 text-primary shrink-0 size-12">
                <span className="material-symbols-outlined">stars</span>
              </div>
              <div className="flex flex-col flex-1">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Cargo Estudantil</p>
                <p className="font-semibold text-slate-900 dark:text-slate-100">{user.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white dark:bg-primary/5 p-4 rounded-xl border border-slate-100 dark:border-primary/10">
              <div className="flex items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20 text-primary shrink-0 size-12">
                <span className="material-symbols-outlined">verified_user</span>
              </div>
              <div className="flex flex-col flex-1">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Status da Matrícula</p>
                <p className="font-semibold text-green-600 dark:text-green-500">{user.online ? 'Online' : 'Offline'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 mt-6">
          <div className="flex items-center justify-between px-2 pb-3">
            <h3 className="text-sm font-bold uppercase text-slate-500 dark:text-primary/60 tracking-widest">Informações de Contato</h3>
          </div>
          <div className="bg-white dark:bg-primary/5 rounded-xl border border-primary/20 overflow-hidden space-y-2">
            {user.email && (
              <div className="flex items-center gap-3 p-4 border-b border-slate-100 dark:border-primary/10">
                <span className="material-symbols-outlined text-primary">mail</span>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Email</p>
                  <p className="font-medium text-slate-900 dark:text-slate-100">{user.email}</p>
                </div>
              </div>
            )}
            {user.group_name && (
              <div className="flex items-center gap-3 p-4">
                <span className="material-symbols-outlined text-primary">groups</span>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Grupo</p>
                  <p className="font-medium text-slate-900 dark:text-slate-100">{user.group_name}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {(user.role === 'Desenvolvedor' || user.role === 'Líder') && (
          <div className="px-4 mt-6">
            <div className="flex items-center justify-between px-2 pb-3">
              <h3 className="text-sm font-bold uppercase text-slate-500 dark:text-primary/60 tracking-widest">Configurações Admin</h3>
              <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-bold">{user.role === 'Desenvolvedor' ? 'DEV' : 'LÍDER'}</span>
            </div>
            <div className="bg-white dark:bg-primary/5 rounded-xl border border-primary/20 overflow-hidden">
              <button onClick={() => onNavigate('roles')} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-primary/10 transition-colors border-b border-slate-100 dark:border-primary/10">
                <div className="flex items-center gap-3 text-primary">
                  <span className="material-symbols-outlined">admin_panel_settings</span>
                  <span className="font-bold">Gerenciar Cargos</span>
                </div>
                <span className="material-symbols-outlined text-primary">chevron_right</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-background-dark rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Editar Perfil</h3>
              <button onClick={() => setShowEditModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-4">
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
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Série e Turma</label>
                <input
                  type="text"
                  value={editForm.class}
                  onChange={(e) => setEditForm({ ...editForm, class: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Foto de Perfil</label>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-16 w-16 border-2 border-primary/20" style={{ backgroundImage: `url("${imagePreview || 'https://lh3.googleusercontent.com/aida-public/AB6AXu1'}")` }}></div>
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
                    />
                    <p className="text-xs text-slate-400 mt-1">Selecione uma imagem (máx. 5MB)</p>
                  </div>
                </div>
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

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveProfile}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav onNavigate={onNavigate} />
    </div>
  );
}
