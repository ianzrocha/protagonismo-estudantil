import BottomNav from "../components/BottomNav";

export default function Missions({ onNavigate }) {
  const missions = [
    {
      category: 'Comunidade',
      title: 'Líder de Torcida',
      description: 'Organize um grito de guerra original para o próximo jogo interescolar. Grave um vídeo da galera treinando!',
      xp: 500,
      timeLeft: 'Faltam 2 dias',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUSvkp_EGNFmcfLBR8hq3gPakWW4bh1-O87TIsnPHj8Y2W__zs5DLIJwl3NLxb_5ELLr5Lz85Q0T7O8ksFB5DplZbnByQWgIrq5JuW4I63f2SHAnZOF2OPu-oxi9g7FjC015qMC5_7WEM3aH3EDXWxyVKPtTCa_b7G3vAkk8WAWpm7JvItNVaPzMVOaLPt2QtVBX-WFHVIKR78MPXF7aKU0pIL9oWaXVdunBeRect-Y66QRa8KRYvt-N6Er8ZJJ-DRPg5IkWUNJg'
    },
    {
      category: 'Organização',
      title: 'Biblioteca Viva',
      description: 'Ajude a catalogar 20 novos livros na biblioteca da escola. Tire uma foto com o bibliotecário responsável.',
      xp: 300,
      timeLeft: 'Faltam 5 dias',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCw-d3KSIOqhp-35Z-idguzIqhKBvSDRav6MoFyLyzTDGiqqq_Nl7VPtWZFgbRS_mrQrQwUlCWkCE-dBWSyJe4N73rFJFm9snziNkp3429RUSBMVWOLUWSRr42_pLNrvGtM4TEgEdu4TR3-DXZlzx4avvV-hLHlZ2RuqZ4nEVLZxaC1J3AR2cwWnUxVKXldoSsOBZ9PSpl2iubt-e1mqqLIuKVrxFozUJ2s_Go-Kz4M_jH-vOR5vtjUmSpAKy_JHCbqqF14r9rKRQ'
    }
  ];

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark max-w-[430px] mx-auto border-x border-primary/10 shadow-2xl">
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <div className="flex items-center p-4 justify-between max-w-md mx-auto w-full">
          <div className="flex size-10 shrink-0 items-center justify-center text-slate-900 dark:text-slate-100">
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </div>
          <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center">Missões e Desafios</h1>
          <div className="flex w-10 items-center justify-end">
            <button className="flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">search</span>
            </button>
          </div>
        </div>
        <div className="max-w-md mx-auto w-full px-4">
          <div className="flex border-b border-primary/10 gap-8">
            <a className="flex flex-col items-center justify-center border-b-2 border-primary text-primary pb-3 pt-2" href="#">
              <p className="text-sm font-bold">Abertas</p>
            </a>
            <a className="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-500 dark:text-slate-400 pb-3 pt-2" href="#">
              <p className="text-sm font-bold">Concluídas</p>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar max-w-md mx-auto w-full pb-24">
        <div className="p-4 mt-2">
          <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-4 flex items-center justify-between border border-primary/20">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-white p-2 rounded-lg">
                <span className="material-symbols-outlined">military_tech</span>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Seu Rank</p>
                <p className="text-lg font-bold">Líder Ouro</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Pontos</p>
              <p className="text-lg font-bold text-primary">2.450 XP</p>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold px-4 pt-4 pb-2">Próximas Missões</h2>
        {missions.map((mission, i) => (
          <div key={i} className="px-4 py-3">
            <div className="flex flex-col bg-white dark:bg-primary/5 border border-primary/10 rounded-xl overflow-hidden shadow-sm">
              <div className="relative h-48 w-full bg-cover bg-center" style={{ backgroundImage: `url("${mission.image}")` }}>
                <div className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  {mission.xp} XP
                </div>
              </div>
              <div className="p-4">
                <p className="text-primary text-xs font-bold uppercase tracking-widest mb-1">{mission.category}</p>
                <h3 className="text-lg font-bold mb-2">{mission.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">{mission.description}</p>
                <div className="flex items-center justify-between pt-2 border-t border-primary/5">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    <span className="text-xs">{mission.timeLeft}</span>
                  </div>
                  <button className="bg-primary hover:bg-[#800202] text-white px-5 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
                    <span className="material-symbols-outlined text-base">cloud_upload</span>
                    Enviar Missão
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <h2 className="text-lg font-bold px-4 pt-6 pb-2 text-slate-500">Concluídas Recentemente</h2>
        <div className="px-4 pb-4">
          <div className="flex items-center gap-4 bg-slate-100 dark:bg-slate-800/50 p-3 rounded-lg opacity-75 grayscale-[0.5]">
            <div className="size-16 rounded-lg bg-cover bg-center shrink-0" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDGVMiHpo3n2ZL9_K13eziDoQPicNpFQfRMKUWf1cRH36wk7nP6PYBKIWIrv33HoCx-HQQLo8ECSXq2-CqI-d6txiTXeK05V2Yj165D8utdO06RULUWpFzrjH0R1zywEzRC2Kq7SWcq170Fh6tF2fR_Jk1SvgI74w2xx5PppXJzXbzbmM8PXk4pecchiEgqDyFdhbAh021lY49AuSv0e-zyLAZa580snWxzTaWMx47VpM5XmO3tM1M05K1Zw-e2kT9szEb_STxJ4A")' }}></div>
            <div className="flex-1">
              <h4 className="font-bold text-sm">Monitoria de Matemática</h4>
              <p className="text-xs text-slate-500">Concluído em 12/10</p>
            </div>
            <div className="text-green-600 dark:text-green-400">
              <span className="material-symbols-outlined">check_circle</span>
            </div>
          </div>
        </div>
      </main>

      <BottomNav activeTab="missions" onTabChange={onNavigate} />
    </div>
  );
}
