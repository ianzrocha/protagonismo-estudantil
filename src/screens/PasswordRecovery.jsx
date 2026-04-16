export default function PasswordRecovery({ onBack }) {
  return (
    <div className="relative flex min-h-screen w-full max-w-[430px] flex-col overflow-x-hidden bg-background-light dark:bg-background-dark mx-auto border-x border-primary/10 shadow-2xl">
      <header className="flex items-center p-4 justify-between bg-transparent">
        <button onClick={onBack} aria-label="Voltar" className="flex size-10 items-center justify-center rounded-full hover:bg-primary/10 transition-colors">
          <span className="material-symbols-outlined text-slate-900 dark:text-slate-100">arrow_back_ios_new</span>
        </button>
        <h2 className="text-lg font-semibold flex-1 text-center pr-10">Recuperação de Senha</h2>
      </header>

      <main className="flex-1 flex flex-col px-6 pt-8 w-full">
        <div className="mb-8 flex justify-start">
          <div className="p-4 rounded-2xl bg-primary/10 text-primary">
            <span className="material-symbols-outlined !text-4xl">lock_reset</span>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight mb-3">Esqueceu sua senha?</h1>
          <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
            Relaxe, acontece com todos! Insira seu nome de usuário abaixo para receber as instruções de redefinição.
          </p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1" htmlFor="user-identifier">
              E-mail ou Usuário
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                <span className="material-symbols-outlined !text-xl">alternate_email</span>
              </div>
              <input className="block w-full rounded-xl border-slate-200 dark:border-primary/20 bg-white dark:bg-primary/5 pl-11 pr-4 py-4 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" id="user-identifier" placeholder="exemplo@escola.com" type="text" />
            </div>
          </div>
          <div className="pt-2">
            <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98]" type="submit">
              <span>Enviar Instruções</span>
              <span className="material-symbols-outlined !text-xl">send</span>
            </button>
          </div>
        </form>

        <div className="mt-auto pb-10 pt-12 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <div className="h-px w-8 bg-slate-300 dark:bg-primary/20"></div>
            <span>Ainda precisa de ajuda?</span>
            <div className="h-px w-8 bg-slate-300 dark:bg-primary/20"></div>
          </div>
          <a className="flex items-center gap-2 text-primary font-semibold hover:underline decoration-2 underline-offset-4" href="#">
            <span className="material-symbols-outlined !text-lg">support_agent</span>
            Falar com suporte técnico
          </a>
        </div>
      </main>
      <div className="h-1.5 w-32 bg-slate-300 dark:bg-white/20 rounded-full mx-auto mb-2 shrink-0"></div>
    </div>
  );
}
