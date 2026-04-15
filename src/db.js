import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database(path.join(__dirname, '../database.sqlite'));

// Inicializar tabelas
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    info TEXT,
    group_name TEXT,
    image TEXT,
    online INTEGER DEFAULT 0,
    password TEXT,
    email TEXT,
    class TEXT
  );

  CREATE TABLE IF NOT EXISTS announcements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author TEXT NOT NULL,
    role TEXT NOT NULL,
    date TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image TEXT,
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    type TEXT NOT NULL,
    comments_disabled INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender TEXT NOT NULL,
    text TEXT NOT NULL,
    time TEXT NOT NULL,
    is_me INTEGER DEFAULT 0,
    avatar TEXT
  );

  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    description TEXT,
    image TEXT,
    team TEXT,
    category TEXT,
    is_private INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS event_subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    event_id INTEGER NOT NULL,
    subscribed_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS announcements_posted (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author TEXT NOT NULL,
    role TEXT NOT NULL,
    date TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image TEXT,
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    type TEXT NOT NULL,
    comments_disabled INTEGER DEFAULT 0
  );
`);

// No longer inserting default announcements
// Old initial data tables are left empty to be populated by leaders
const announcementCount = db.prepare('SELECT count(*) as count FROM announcements_posted').get();
// No more default announcements

const oldAnnouncementCount = db.prepare('SELECT count(*) as count FROM announcements').get();
const userCount = db.prepare('SELECT count(*) as count FROM users').get();
if (userCount.count === 0) {
  const insertUser = db.prepare('INSERT INTO users (name, role, info, group_name, image, online, email, class, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
  insertUser.run('Ana Silva', 'Presidente', 'Turma: 3º A • 17 anos', 'Grêmio Estudantil', 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-3FNRROwsF6T8V2EANCbCU3JETZfpDko1XZ3Hnfj3WVGdIlTbI4fCxqbf7c5yXsikDtdsqzG6X55xePrZAF0NvsO0ebj4ex5bRfzQMoJEIwTO71lbXom0WKPKnPBKL534RCEOiKXzC44IYAzF_Wau1hXP_rWSq_ibJZeM4XCZVP310iUcLgXxxjF6cc2xqoCnlUhxB_S9BqUoV-xFCs87eY2_GBp1B5MxPcO3cjcP2huqN74IJOIbj80aE3wjaqjaoStWC4nmSw', 1, 'ana@school.com', '3A', 'senha123');
  insertUser.run('Carlos Oliveira', 'Líder', 'Turma: 2º B • 16 anos', 'Conselho de Classe', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpttHuPsFdoExjU9Dw3sX9qV_lNiGhiIZlPDV2Ot_0vCJ-iPkl5EJczL3htXXdNuSGS7VkjvVa_fjVlh8tj5xWkvuiXZSWJyXdfSNG9IHfR8WlZRnFuqCKu_wiokGt12LZHHn3VQ0-D_yE0xQk00YFB5VJL8UGnXUYtgRA7_LW6EMWCluGGlTmkVA8g2n7xatgd8pj58gqKH9lNC6p2WsNRJ6Ai49lgzDsa1rgLc3MOKQL6Ah6No7cUSGpM6JdSET7MMVnZp-Gzg', 0, 'carlos@school.com', '2B', 'senha123');
  insertUser.run('Maria Santos', 'Líder', 'Turma: 1º C • 15 anos', 'Representante de Turma', 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0nP5J5L5W5L5Z5L5L5L5L5L5L5L5L5L5L5L5', 1, 'maria@school.com', '1C', 'senha123');
  insertUser.run('João Santos', 'Protagonista', 'Turma: 2º A • 16 anos', 'Membro do Grêmio', 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1J1J1J1J1J1J1J1J1J1J1J1J1J1J1J1J1J1', 1, 'joao@school.com', '2A', 'senha123');
  insertUser.run('Lucas Oliveira', 'Protagonista', 'Turma: 1º A • 15 anos', 'Membro do Grêmio', 'https://lh3.googleusercontent.com/aida-public/AB6AXuATSuXdbrpffy68_3nrFzgdazLe3B19q8nXBLtjr9BuizQvADonjrTOfC6CBkEchjHwSv-cDfDGFj-De9VdP0srQsSCus3mv4P-teHRuqB_gbijLsCQLs1vE8FYwMbD5VOHXm7N5q_tyyp3e3VmufzXp9UAckHMSLXwAuY8_eLfetLekubndLEjdvOA1Q7-G2K-DAgPCAtU_j51g4dT_ss6bKhb1kbhknfijHNK2vduqe3B0N-lXUGfDKe4V03h23qJUsRol_7VKA', 1, 'lucas@school.com', '1A', 'senha123');
  insertUser.run('Mariana Almeida', 'Desenvolvedor', 'Turma: 3º B • 17 anos', 'Dev do Sistema', 'https://lh3.googleusercontent.com/aida-public/AB6AXu1', 0, 'mariana@school.com', '3B', 'senha123');
}

const messageCount = db.prepare('SELECT count(*) as count FROM messages').get();
if (messageCount.count === 0) {
  const insertMessage = db.prepare('INSERT INTO messages (sender, text, time, is_me, avatar) VALUES (?, ?, ?, ?, ?)');
  insertMessage.run('Ana Silva', 'Oi pessoal! Como estão?', '14:20', 0, 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-3FNRROwsF6T8V2EANCbCU3JETZfpDko1XZ3Hnfj3WVGdIlTbI4fCxqbf7c5yXsikDtdsqzG6X55xePrZAF0NvsO0ebj4ex5bRfzQMoJEIwTO71lbXom0WKPKnPBKL534RCEOiKXzC44IYAzF_Wau1hXP_rWSq_ibJZeM4XCZVP310iUcLgXxxjF6cc2xqoCnlUhxB_S9BqUoV-xFCs87eY2_GBp1B5MxPcO3cjcP2huqN74IJOIbj80aE3wjaqjaoStWC4nmSw');
  insertMessage.run('Carlos Oliveira', 'Tudo certo por aqui!', '14:21', 0, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpttHuPsFdoExjU9Dw3sX9qV_lNiGhiIZlPDV2Ot_0vCJ-iPkl5EJczL3htXXdNuSGS7VkjvVa_fjVlh8tj5xWkvuiXZSWJyXdfSNG9IHfR8WlZRnFuqCKu_wiokGt12LZHHn3VQ0-D_yE0xQk00YFB5VJL8UGnXUYtgRA7_LW6EMWCluGGlTmkVA8g2n7xatgd8pj58gqKH9lNC6p2WsNRJ6Ai49lgzDsa1rgLc3MOKQL6Ah6No7cUSGpM6JdSET7MMVnZp-Gzg');
  insertMessage.run('Lucas Oliveira', 'Boa! Alguém vem ao evento amanhã?', '14:22', 1, 'https://lh3.googleusercontent.com/aida-public/AB6AXuATSuXdbrpffy68_3nrFzgdazLe3B19q8nXBLtjr9BuizQvADonjrTOfC6CBkEchjHwSv-cDfDGFj-De9VdP0srQsSCus3mv4P-teHRuqB_gbijLsCQLs1vE8FYwMbD5VOHXm7N5q_tyyp3e3VmufzXp9UAckHMSLXwAuY8_eLfetLekubndLEjdvOA1Q7-G2K-DAgPCAtU_j51g4dT_ss6bKhb1kbhknfijHNK2vduqe3B0N-lXUGfDKe4V03h23qJUsRol_7VKA');
  insertMessage.run('Maria Santos', 'Claro! Já confirmei minha presença! 🎉', '14:23', 0, 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0nP5J5L5W5L5Z5L5L5L5L5L5L5L5L5L5L5');
}

const eventCount = db.prepare('SELECT count(*) as count FROM events').get();
if (eventCount.count === 0) {
  const insertEvent = db.prepare('INSERT INTO events (title, date, time, description, image, team, category, is_private) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
  insertEvent.run('Acolhimento Novatos', '15 de Fevereiro', '08:00', 'Boas-vindas aos novos alunos com dinâmicas de quebra-gelo, tour pela escola e integração com veteranos.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAknyIRqilXHClkWISpAYF51DsreWbQY-FrpNyYj25K6iEKXBiN49bisocjMvQ6FFjkMhvg1C3fgOP4end0L8i-vC6XQ-gjwCGatLPdReaAfxlulg6kiDYfmVv1JXASfyE3kF8jjTzOebH4n5FeCjeoq0WiGEmnQxSakSZ0ebKillz8AD9gJ-rOqNoSgCoH_vge_1dLNRCM_ipdV6-6nG3_ToEW_C2p3N02RS6osWM8jYe2lT9EqMi8qPYlvK247L71mTgpCuv9Pg', 'Equipe: Liderança 3º Ano', 'Social', 0);
  insertEvent.run('Jogos Internos 2026', '10 de Março', '08:00', 'Competições esportivas entre turmas. Precisamos de voluntários para arbitragem e organização de torcidas.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJLwvyEXeIj4uRk_P0Cyy_pyEs2QK1VBP1KmzS93VvpTBJV2gPpZxIydWRU-nSCIFJFEMpskN-wUpwFyZdQYaliHoWmrRSD9fy7a1t2audV3BpsDRUpErdnyDgufpqM61OfoEDxtX7hxSOndMc-vfna6CUEoeXhGzA6nDk3SO0oBn3TncrStQNT067igJaTea4YbtgF-5PpkEAcUzwdr--Tbcb4bO6RNGhZgTUyVTatZeRKKOyLAEyURuHBU5jzYCRfsJ3MTCo2g', 'Equipe: Grêmio Estudantil', 'Esporte', 0);
  insertEvent.run('Reunião de Líderes', '05 de Fevereiro', '14:00', 'Planejamento estratégico das atividades do primeiro semestre.', '', 'Líderes', 'Reunião', 1);
  insertEvent.run('Festa de Encerramento', '20 de Junho', '19:00', 'Confraternização de todos os membros do grêmio e protagonistas. Venha celebrar conosco!', 'https://lh3.googleusercontent.com/aida-public/AB6AXu1', 'Equipe: Grêmio Estudantil', 'Social', 0);
}

export default db;
