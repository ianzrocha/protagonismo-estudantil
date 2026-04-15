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
    password TEXT
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
`);

// Inserir dados iniciais se estiver vazio
const userCount = db.prepare('SELECT count(*) as count FROM users').get();
if (userCount.count === 0) {
  const insertUser = db.prepare('INSERT INTO users (name, role, info, group_name, image, online) VALUES (?, ?, ?, ?, ?, ?)');
  insertUser.run('Ana Silva', 'Presidente', 'Turma: 3º A • 17 anos', 'Grêmio Estudantil', 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-3FNRROwsF6T8V2EANCbCU3JETZfpDko1XZ3Hnfj3WVGdIlTbI4fCxqbf7c5yXsikDtdsqzG6X55xePrZAF0NvsO0ebj4ex5bRfzQMoJEIwTO71lbXom0WKPKnPBKL534RCEOiKXzC44IYAzF_Wau1hXP_rWSq_ibJZeM4XCZVP310iUcLgXxxjF6cc2xqoCnlUhxB_S9BqUoV-xFCs87eY2_GBp1B5MxPcO3cjcP2huqN74IJOIbj80aE3wjaqjaoStWC4nmSw', 1);
  insertUser.run('Carlos Oliveira', 'Líder', 'Turma: 2º B • 16 anos', 'Conselho de Classe', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpttHuPsFdoExjU9Dw3sX9qV_lNiGhiIZlPDV2Ot_0vCJ-iPkl5EJczL3htXXdNuSGS7VkjvVa_fjVlh8tj5xWkvuiXZSWJyXdfSNG9IHfR8WlZRnFuqCKu_wiokGt12LZHHn3VQ0-D_yE0xQk00YFB5VJL8UGnXUYtgRA7_LW6EMWCluGGlTmkVA8g2n7xatgd8pj58gqKH9lNC6p2WsNRJ6Ai49lgzDsa1rgLc3MOKQL6Ah6No7cUSGpM6JdSET7MMVnZp-Gzg', 0);
}

const announcementCount = db.prepare('SELECT count(*) as count FROM announcements').get();
if (announcementCount.count === 0) {
  const insertAnnouncement = db.prepare('INSERT INTO announcements (author, role, date, title, content, image, likes, comments, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
  insertAnnouncement.run('João Silva', 'Líder', '25 de Outubro', 'Reunião de Líderes: Planejamento 2024', 'Olá pessoal, amanhã teremos nossa reunião mensal para discutir as pautas de protagonismo estudantil.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCM2kZueZdT7_gmEYyne3TMuZvVJ8Ev_eSU9xfvabLxkcCt3Mcp_Q10G2YgmyStSA5NOOpGJNooeYcSQ3kZ8S5azHUas64IuSOOKEeXbHoJnZt1QByOTXnbzhY6DZ9AFuzyq0j2BIxPnpG3tQiA0A6gL56yQbhOIOpzBqSJSUtrk6l3yrm_MivgS1__47a55EAcCUxSkivwV2d1-eaSQPUeSOmcfYRz2TlAcs1ZD9VOxeBChSKwK9DH2f51mvVt1kkrEw4yWYTgqg', 24, 8, 'Oficial');
}

export default db;
