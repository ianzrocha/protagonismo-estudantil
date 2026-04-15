import BottomNav from "../components/BottomNav";

export default function Profile({ onNavigate }) {
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
                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-32 w-32 border-4 border-primary shadow-lg" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuATSuXdbrpffy68_3nrFzgdazLe3B19q8nXBLtjr9BuizQvADonjrTOfC6CBkEchjHwSv-cDfDGFj-De9VdP0srQsSCus3mv4P-teHRuqB_gbijLsCQLs1vE8FYwMbD5VOHXm7N5q_tyyp3e3VmufzXp9UAckHMSLXwAuY8_eLfetLekubndLEjdvOA1Q7-G2K-DAgPCAtU_j51g4dT_ss6bKhb1kbhknfijHNK2vduqe3B0N-lXUGfDKe4V03h23qJUsRol_7VKA")' }}></div>
                <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-md border-2 border-background-dark flex items-center justify-center">
                  <span className="material-symbols-outlined !text-[18px]">edit</span>
                </button>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-2xl font-bold leading-tight tracking-tight text-center">Lucas Oliveira</p>
                <span className="mt-1 px-3 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider">Líder de Turma</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full max-w-md">
              <button className="flex items-center justify-center gap-2 rounded-xl h-12 px-4 bg-primary text-white text-sm font-bold shadow-sm active:scale-95 transition-transform">
                <span className="material-symbols-outlined !text-[20px]">edit</span>
                Editar Perfil
              </button>
              <button onClick={() => onNavigate('login')} className="flex items-center justify-center gap-2 rounded-xl h-12 px-4 bg-slate-200 dark:bg-primary/10 text-slate-900 dark:text-slate-100 text-sm font-bold active:scale-95 transition-transform">
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
                <p className="font-semibold">3º Ano A - Ensino Médio</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white dark:bg-primary/5 p-4 rounded-xl border border-slate-100 dark:border-primary/10">
              <div className="flex items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20 text-primary shrink-0 size-12">
                <span className="material-symbols-outlined">stars</span>
              </div>
              <div className="flex flex-col flex-1">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Cargo Estudantil</p>
                <p className="font-semibold">Protagonista Líder</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white dark:bg-primary/5 p-4 rounded-xl border border-slate-100 dark:border-primary/10">
              <div className="flex items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20 text-primary shrink-0 size-12">
                <span className="material-symbols-outlined">verified_user</span>
              </div>
              <div className="flex flex-col flex-1">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Status da Matrícula</p>
                <p className="font-semibold text-green-600 dark:text-green-500">Regular</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 mt-6">
          <div className="flex items-center justify-between px-2 pb-3">
            <h3 className="text-sm font-bold uppercase text-slate-500 dark:text-primary/60 tracking-widest">Configurações Admin</h3>
            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-bold">DEV ONLY</span>
          </div>
          <div className="bg-white dark:bg-primary/5 rounded-xl border border-primary/20 overflow-hidden">
            <button onClick={() => onNavigate('roles')} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-primary/10 transition-colors border-b border-slate-100 dark:border-primary/10">
              <div className="flex items-center gap-3 text-primary">
                <span className="material-symbols-outlined">admin_panel_settings</span>
                <span className="font-bold">Gerenciar Cargos</span>
              </div>
              <span className="material-symbols-outlined text-primary">chevron_right</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-primary/10 transition-colors">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">analytics</span>
                <span className="font-medium">Logs do Sistema</span>
              </div>
              <span className="material-symbols-outlined text-slate-400">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      <BottomNav activeTab="profile" onTabChange={onNavigate} />
    </div>
  );
}
