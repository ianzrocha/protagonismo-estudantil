import { useState } from "react";

export default function Login({ onLogin, onRegister, onForgotPassword }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex h-full min-h-screen w-full max-w-[430px] flex-col bg-background-light dark:bg-background-dark overflow-x-hidden border-x border-primary/10 shadow-2xl mx-auto">
      <div className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-primary/20 min-h-[240px] relative" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCxzpeJ7AZYj0rr20BQjslfyzY_u12_hviX9Id0DKuM8QA-K5sw-pQwiSf7rVI1prVvMwm0s8hG6jG2_QPEIDFWwtgx-5A8cvu-UwrNGKgBD4GfjCzYnvmPiQOilyeevQp0LkjqDqp_--L-JRPtaT237ASBrUBbhZS0dS1i4yj5ZwOPzlf6qXbD_FvPb0-2LlGjonKQJihScjcOhDaMCJ6VVFBqsGqkuOExPYNzFFvrh8O8E2dtw9bDUKOZRtXDUYSO_aiTNJb1cw")' }}>
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 to-transparent"></div>
        <div className="relative z-10 flex flex-col items-center pb-6">
          <div className="bg-primary p-3 rounded-full mb-4 shadow-lg">
            <span className="material-symbols-outlined text-white text-4xl">lightbulb</span>
          </div>
        </div>
      </div>

      <div className="px-6 flex flex-col items-center">
        <h1 className="text-slate-900 dark:text-slate-100 tracking-tight text-[32px] font-bold leading-tight text-center pb-2 pt-6">Bem-vindo</h1>
        <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal pb-6 text-center">
          Gestão do protagonismo estudantil na palma da sua mão.
        </p>
      </div>

      <div className="flex flex-col gap-4 px-6 py-3 w-full">
        <label className="flex flex-col w-full">
          <p className="text-slate-800 dark:text-slate-200 text-sm font-semibold leading-normal pb-2 px-1">Usuário</p>
          <input className="flex w-full rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-primary/30 bg-white dark:bg-primary/10 h-14 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-[15px] text-base font-normal" placeholder="Seu usuário" type="text" />
        </label>
        <label className="flex flex-col w-full">
          <p className="text-slate-800 dark:text-slate-200 text-sm font-semibold leading-normal pb-2 px-1">Senha</p>
          <div className="flex w-full items-stretch rounded-xl border border-slate-300 dark:border-primary/30 bg-white dark:bg-primary/10 overflow-hidden focus-within:ring-2 focus-within:ring-primary/50">
            <input className="flex w-full border-0 bg-transparent h-14 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 p-[15px] text-base font-normal focus:ring-0" placeholder="Digite sua senha" type={showPassword ? "text" : "password"} />
            <button className="text-slate-400 dark:text-primary/60 flex items-center justify-center px-4" type="button" onClick={() => setShowPassword(!showPassword)}>
              <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
            </button>
          </div>
        </label>
      </div>

      <div className="flex justify-end px-6 py-1">
        <button onClick={onForgotPassword} className="text-primary dark:text-primary text-sm font-semibold hover:underline">Esqueci minha senha</button>
      </div>

      <div className="px-6 pt-8 pb-4">
        <button onClick={onLogin} className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98]">
          Entrar
        </button>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 mt-auto pb-10 px-6">
        <p className="text-slate-600 dark:text-slate-400 text-sm">Não tem uma conta?</p>
        <button onClick={onRegister} className="w-full border-2 border-primary/20 dark:border-primary/40 text-primary dark:text-slate-100 font-bold py-3 rounded-xl hover:bg-primary/5 transition-colors">
          Registrar agora
        </button>
      </div>
    </div>
  );
}
