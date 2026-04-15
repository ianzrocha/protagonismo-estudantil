import { useState } from "react";

export default function Register({ onBack, onLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    class: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.password || !formData.class || !formData.email) {
      alert('Preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert('Cadastro realizado com sucesso!');
        onLogin();
      } else {
        alert('Erro ao cadastrar');
      }
    } catch (err) {
      alert('Erro ao conectar');
    } finally {
      setLoading(false);
    }
  };

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

      <form className="flex flex-col gap-5 px-6 py-4 w-full" onSubmit={handleRegister}>
        <label className="flex flex-col w-full">
          <span className="text-slate-900 dark:text-slate-100 text-sm font-semibold leading-normal pb-2 ml-1">Nome de Usuário</span>
          <input 
            className="w-full rounded-xl border border-slate-300 dark:border-primary/30 bg-white dark:bg-primary/10 text-slate-900 dark:text-slate-100 focus:border-primary focus:ring-1 focus:ring-primary h-14 px-4 text-base font-normal placeholder:text-slate-400 dark:placeholder:text-slate-500" 
            placeholder="Seu nome completo ou apelido" 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>

        <label className="flex flex-col w-full">
          <span className="text-slate-900 dark:text-slate-100 text-sm font-semibold leading-normal pb-2 ml-1">Email</span>
          <input 
            className="w-full rounded-xl border border-slate-300 dark:border-primary/30 bg-white dark:bg-primary/10 text-slate-900 dark:text-slate-100 focus:border-primary focus:ring-1 focus:ring-primary h-14 px-4 text-base font-normal placeholder:text-slate-400 dark:placeholder:text-slate-500" 
            placeholder="seu@email.com" 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <label className="flex flex-col w-full">
          <span className="text-slate-900 dark:text-slate-100 text-sm font-semibold leading-normal pb-2 ml-1">Senha</span>
          <div className="relative flex items-center">
            <input 
              className="w-full rounded-xl border border-slate-300 dark:border-primary/30 bg-white dark:bg-primary/10 text-slate-900 dark:text-slate-100 focus:border-primary focus:ring-1 focus:ring-primary h-14 pl-4 pr-12 text-base font-normal placeholder:text-slate-400 dark:placeholder:text-slate-500" 
              placeholder="Crie uma senha segura" 
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button className="absolute right-4 text-slate-500 dark:text-slate-400 flex items-center justify-center" type="button">
              <span className="material-symbols-outlined">visibility</span>
            </button>
          </div>
        </label>

        <div className="flex gap-4 w-full">
          <label className="flex flex-col flex-1">
            <span className="text-slate-900 dark:text-slate-100 text-sm font-semibold leading-normal pb-2 ml-1">Série</span>
            <select 
              className="w-full rounded-xl border border-slate-300 dark:border-primary/30 bg-white dark:bg-primary/10 text-slate-900 dark:text-slate-100 focus:border-primary focus:ring-1 focus:ring-primary h-14 px-4 text-base font-normal"
              name="class"
              value={formData.class}
              onChange={handleChange}
            >
              <option disabled value="">Escolher</option>
              <option value="1A">1º Ano</option>
              <option value="2A">2º Ano</option>
              <option value="3A">3º Ano</option>
            </select>
          </label>
        </div>

        <div className="pt-6">
          <button 
            className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
            disabled={loading}
            type="submit"
          >
            {loading ? 'Cadastrando...' : 'Cadastrar Agora'}
          </button>
        </div>
      </form>

      <div className="flex flex-col items-center justify-center gap-2 mt-auto pb-10 px-6">
        <p className="text-slate-600 dark:text-slate-400 text-sm">Já tem uma conta?</p>
        <button onClick={onLogin} className="w-full border-2 border-primary/20 dark:border-primary/40 text-primary dark:text-slate-100 font-bold py-3 rounded-xl hover:bg-primary/5 transition-colors">
          Fazer Login
        </button>
      </div>

      <div className="mt-auto opacity-20 pointer-events-none">
        <div className="h-32 w-full bg-gradient-to-t from-primary to-transparent"></div>
      </div>
    </div>
  );
}
