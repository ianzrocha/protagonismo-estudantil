export default function Register({ onBack, onLogin }) {
  return (
    <div className="relative flex h-screen w-full max-w-[430px] flex-col overflow-x-hidden bg-background-light dark:bg-background-dark mx-auto border-x border-primary/10 shadow-2xl">
      <header className="flex items-center p-4 pb-2 justify-between">
        <button onClick={onBack} className="text-slate-900 dark:text-slate-100 flex size-12 shrink-0 items-center justify-center hover:bg-primary/10 rounded-full transition-colors">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-12">Criar Conta</h2>
      </header>

      <div className="px-6 pt-8 pb-4">
        <h1 className="text-slate-900 dark:text-slate-100 text-3xl font-bold leading-tight text-center">Junte-se ao Protagonismo</h1>
        <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal mt-2 text-center">Cadastre-se para gerenciar sua vida escolar e liderança</p>
      </div>

      <div className="flex flex-col gap-5 px-6 py-4 w-full">
        <label className="flex flex-col w-full">
          <span className="text-slate-900 dark:text-slate-100 text-sm font-semibold leading-normal pb-2 ml-1">Nome de Usuário</span>
          <input className="w-full rounded-xl border-slate-300 dark:border-primary/30 bg-white dark:bg-primary/10 text-slate-900 dark:text-slate-100 focus:border-primary focus:ring-1 focus:ring-primary h-14 px-4 text-base font-normal placeholder:text-slate-400 dark:placeholder:text-slate-500" placeholder="Seu nome completo ou apelido" type="text" />
        </label>

        <label className="flex flex-col w-full">
          <span className="text-slate-900 dark:text-slate-100 text-sm font-semibold leading-normal pb-2 ml-1">Senha</span>
          <div className="relative flex items-center">
            <input className="w-full rounded-xl border-slate-300 dark:border-primary/30 bg-white dark:bg-primary/10 text-slate-900 dark:text-slate-100 focus:border-primary focus:ring-1 focus:ring-primary h-14 pl-4 pr-12 text-base font-normal placeholder:text-slate-400 dark:placeholder:text-slate-500" placeholder="Crie uma senha segura" type="password" />
            <button className="absolute right-4 text-slate-500 dark:text-slate-400 flex items-center justify-center">
              <span className="material-symbols-outlined">visibility</span>
            </button>
          </div>
        </label>

        <div className="flex gap-4 w-full">
          <label className="flex flex-col flex-1">
            <span className="text-slate-900 dark:text-slate-100 text-sm font-semibold leading-normal pb-2 ml-1">Série</span>
            <select className="w-full rounded-xl border-slate-300 dark:border-primary/30 bg-white dark:bg-primary/10 text-slate-900 dark:text-slate-100 focus:border-primary focus:ring-1 focus:ring-primary h-14 px-4 text-base font-normal">
              <option disabled selected value="">Escolher</option>
              <option value="1">1º Ano</option>
              <option value="2">2º Ano</option>
              <option value="3">3º Ano</option>
            </select>
          </label>
          <label className="flex flex-col flex-1">
            <span className="text-slate-900 dark:text-slate-100 text-sm font-semibold leading-normal pb-2 ml-1">Turma</span>
            <input className="w-full rounded-xl border-slate-300 dark:border-primary/30 bg-white dark:bg-primary/10 text-slate-900 dark:text-slate-100 focus:border-primary focus:ring-1 focus:ring-primary h-14 px-4 text-base font-normal placeholder:text-slate-400 dark:placeholder:text-slate-500" placeholder="Ex: A, B..." type="text" />
          </label>
        </div>

        <div className="pt-6">
          <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">
            Cadastrar Agora
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Já tem uma conta? 
            <button onClick={onLogin} className="text-primary font-bold hover:underline ml-1">Fazer Login</button>
          </p>
        </div>
      </div>

      <div className="mt-auto opacity-20 pointer-events-none">
        <div className="h-32 w-full bg-gradient-to-t from-primary to-transparent"></div>
      </div>
    </div>
  );
}
