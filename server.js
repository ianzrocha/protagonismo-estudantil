import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import db from "./src/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Endpoints
  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE (name = ? OR email = ?) AND password = ?').get(username, username, password);
    if (user) {
      res.json({ status: "ok", user: { id: user.id, name: user.name, role: user.role, email: user.email } });
    } else {
      res.status(401).json({ status: "error", message: "Usuário ou senha inválidos" });
    }
  });

  app.post("/api/register", (req, res) => {
    const { name, password, class: userClass, email } = req.body;
    const insert = db.prepare('INSERT INTO users (name, password, class, email, role, image, info, group_name, online) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
    try {
      insert.run(name, password, userClass, email, 'Protagonista', 'https://lh3.googleusercontent.com/aida-public/AB6AXu1', `Turma: ${userClass} • 15 anos`, 'Novo Membro', 0);
      res.json({ status: "ok" });
    } catch (err) {
      res.status(400).json({ status: "error", message: "Erro ao registrar usuário" });
    }
  });

  app.get("/api/users", (req, res) => {
    const users = db.prepare('SELECT * FROM users').all();
    res.json(users);
  });

  app.get("/api/announcements", (req, res) => {
    const announcements = db.prepare('SELECT * FROM announcements').all();
    res.json(announcements);
  });

  app.get("/api/events", (req, res) => {
    const events = db.prepare('SELECT * FROM events').all();
    res.json(events);
  });

  app.post("/api/events", (req, res) => {
    const { title, date, time, description, image, team, category, is_private } = req.body;
    const insert = db.prepare('INSERT INTO events (title, date, time, description, image, team, category, is_private) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
    insert.run(title, date, time, description, image, team, category, is_private || 0);
    res.json({ status: "ok" });
  });

  app.get("/api/messages", (req, res) => {
    const messages = db.prepare('SELECT * FROM messages').all();
    res.json(messages);
  });

  app.post("/api/messages", (req, res) => {
    const { sender, text, time, avatar } = req.body;
    const insert = db.prepare('INSERT INTO messages (sender, text, time, avatar) VALUES (?, ?, ?, ?)');
    insert.run(sender, text, time, avatar);
    res.json({ status: "ok" });
  });

  // Event subscriptions
  app.post("/api/events/:eventId/subscribe", (req, res) => {
    const { eventId } = req.params;
    const { userId } = req.body;
    const insert = db.prepare('INSERT INTO event_subscriptions (user_id, event_id) VALUES (?, ?)');
    try {
      insert.run(userId, eventId);
      res.json({ status: "ok" });
    } catch (err) {
      res.status(400).json({ status: "error", message: "Já inscrito" });
    }
  });

  app.post("/api/events/:eventId/unsubscribe", (req, res) => {
    const { eventId } = req.params;
    const { userId } = req.body;
    const remove = db.prepare('DELETE FROM event_subscriptions WHERE user_id = ? AND event_id = ?');
    remove.run(userId, eventId);
    res.json({ status: "ok" });
  });

  app.get("/api/events/:eventId/subscriptions", (req, res) => {
    const { eventId } = req.params;
    const subscriptions = db.prepare('SELECT * FROM event_subscriptions WHERE event_id = ?').all(eventId);
    res.json(subscriptions);
  });

  app.get("/api/users/:userId/subscriptions", (req, res) => {
    const { userId } = req.params;
    const subscriptions = db.prepare('SELECT event_id FROM event_subscriptions WHERE user_id = ?').all(userId);
    res.json(subscriptions);
  });

  // Announcements
  app.post("/api/announcements", (req, res) => {
    const { author, role, date, title, content, image, type } = req.body;
    const insert = db.prepare('INSERT INTO announcements_posted (author, role, date, title, content, image, type) VALUES (?, ?, ?, ?, ?, ?, ?)');
    try {
      insert.run(author, role, date, title, content, image || null, type);
      res.json({ status: "ok" });
    } catch (err) {
      res.status(400).json({ status: "error", message: "Erro ao postar aviso" });
    }
  });


  // Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

startServer();

