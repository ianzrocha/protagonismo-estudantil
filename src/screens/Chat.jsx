import { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";

export default function Chat({ onBack, onNavigate }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    fetch('/api/messages')
      .then(res => res.json())
      .then(data => setMessages(data));
  }, []);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage = {
      sender: "Lucas Oliveira",
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuATSuXdbrpffy68_3nrFzgdazLe3B19q8nXBLtjr9BuizQvADonjrTOfC6CBkEchjHwSv-cDfDGFj-De9VdP0srQsSCus3mv4P-teHRuqB_gbijLsCQLs1vE8FYwMbD5VOHXm7N5q_tyyp3e3VmufzXp9UAckHMSLXwAuY8_eLfetLekubndLEjdvOA1Q7-G2K-DAgPCAtU_j51g4dT_ss6bKhb1kbhknfijHNK2vduqe3B0N-lXUGfDKe4V03h23qJUsRol_7VKA",
      is_me: 1
    };

    await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMessage)
    });

    setMessages([...messages, newMessage]);
    setInputText("");
  };

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden max-w-[430px] mx-auto shadow-2xl border-x border-slate-200 dark:border-primary/10 bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-50 bg-primary px-4 pt-12 pb-4 flex items-center justify-between text-white">
        <button onClick={onBack} className="flex items-center justify-center p-2 rounded-full hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-lg font-bold leading-tight">Chat da Comunidade</h1>
          <span className="text-[10px] uppercase tracking-widest opacity-80">Grêmio Estudantil</span>
        </div>
        <button className="flex items-center justify-center p-2 rounded-full hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-2xl">info</span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6 flex flex-col no-scrollbar">
        <div className="flex justify-center">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-primary/40 uppercase tracking-tighter bg-slate-100 dark:bg-primary/5 px-3 py-1 rounded-full">Hoje, 14:20</span>
        </div>

        {messages.map((msg, i) => (
          <div key={i} className={`flex items-end gap-3 max-w-[85%] ${msg.isMe ? 'self-end flex-row-reverse' : ''}`}>
            <div className="size-8 rounded-full bg-primary/20 flex-shrink-0 bg-cover bg-center border border-primary/10" style={{ backgroundImage: `url('${msg.avatar}')` }}></div>
            <div className={`flex flex-col gap-1 ${msg.isMe ? 'items-end' : ''}`}>
              <span className="text-[11px] font-medium text-slate-500 dark:text-primary/60 ml-1">{msg.sender}</span>
              <div className={`${msg.isMe ? 'bg-primary text-white rounded-br-none' : 'bg-slate-200 dark:bg-primary/20 text-slate-900 dark:text-slate-100 rounded-bl-none'} px-4 py-2.5 rounded-2xl shadow-sm`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
            </div>
          </div>
        ))}
      </main>

      <footer className="bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-primary/20">
        <div className="p-4 flex items-center gap-2">
          <div className="flex-1 relative">
            <input 
              className="w-full bg-slate-100 dark:bg-primary/10 border-none rounded-full px-5 py-3 text-sm focus:ring-2 focus:ring-primary/50 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-primary/40" 
              placeholder="Escreva sua mensagem..." 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-primary/60 hover:text-primary">
              <span className="material-symbols-outlined">sentiment_satisfied</span>
            </button>
          </div>
          <button 
            onClick={handleSendMessage}
            className="size-11 flex items-center justify-center bg-primary text-white rounded-full shadow-lg shadow-primary/20 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
        <BottomNav activeTab="home" onTabChange={onNavigate} />
      </footer>
    </div>
  );
}
