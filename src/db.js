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

const existingAdmin = db.prepare('SELECT * FROM users WHERE name = ?').get('ADMIN');
if (!existingAdmin) {
  const adminUser = db.prepare('INSERT INTO users (name, role, info, group_name, image, online, email, class, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
  adminUser.run('ADMIN', 'Desenvolvedor', 'Administrador do Sistema', 'Administração', 'https://lh3.googleusercontent.com/aida-public/AB6AXu1', 1, 'admin@school.com', 'ADM', 'a1s2d3f4');
}

// Clean up duplicate ADMIN users - keep only the one with the profile image
const allAdmins = db.prepare('SELECT * FROM users WHERE name = ?').all('ADMIN');
if (allAdmins.length > 1) {
  // Keep the one with the image, delete others
  const adminWithImage = allAdmins.find(u => u.image && u.image.includes('googleusercontent'));
  const adminsToDelete = allAdmins.filter(u => u.id !== adminWithImage.id);
  
  for (const admin of adminsToDelete) {
    db.prepare('DELETE FROM users WHERE id = ?').run(admin.id);
  }
}

export default db;
