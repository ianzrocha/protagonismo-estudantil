import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import db from "./src/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Middleware para verificar autenticação
  const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ status: "error", message: "Token não fornecido" });
    }

    try {
      const decoded = Buffer.from(token, 'base64').toString().split(':');
      const userId = parseInt(decoded[0]);
      const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);

      if (!user) {
        return res.status(401).json({ status: "error", message: "Usuário não encontrado" });
      }

      req.user = user;
      next();
    } catch (err) {
      res.status(401).json({ status: "error", message: "Token inválido" });
    }
  };

  // Configurar multer para upload de imagens
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, 'uploads'));
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Apenas arquivos de imagem são permitidos'));
      }
    }
  });

  // Servir arquivos estáticos da pasta uploads
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  // API Endpoints
  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE (name = ? OR email = ?) AND password = ?').get(username, username, password);
    if (user) {
      // Create a simple session token
      const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64');
      res.json({
        status: "ok",
        user: { id: user.id, name: user.name, role: user.role, email: user.email },
        token: token
      });
    } else {
      res.status(401).json({ status: "error", message: "Usuário ou senha inválidos" });
    }
  });

  app.post("/api/register", (req, res) => {
    const { name, password, class: userClass, email } = req.body;

    // Check if user already exists (by name or email)
    const existingUser = db.prepare('SELECT * FROM users WHERE name = ? OR email = ?').get(name, email);
    if (existingUser) {
      return res.status(400).json({ status: "error", message: "Nome ou email já existe. Escolha outro." });
    }

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

  // Update user profile (for regular users)
  app.put("/api/users/:userId", (req, res) => {
    const { userId } = req.params;
    const { name, class: userClass, online, image } = req.body;

    try {
      const updateUser = db.prepare('UPDATE users SET name = ?, class = ?, online = ?, image = ? WHERE id = ?');
      updateUser.run(name, userClass, online ? 1 : 0, image, userId);
      res.json({ status: "ok" });
    } catch (err) {
      res.status(400).json({ status: "error", message: "Erro ao atualizar usuário" });
    }
  });

  // Admin/Developer update user (full control) - accessible by Líder and Desenvolvedor
  app.put("/api/admin/users/:userId", authenticateUser, (req, res) => {
    const { userId } = req.params;
    const { name, role, info, group_name, image, online, email, class: userClass, password } = req.body;
    const currentUser = req.user;

    // Get target user
    const targetUser = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
    if (!targetUser) {
      return res.status(404).json({ status: "error", message: "Usuário não encontrado" });
    }

    // Permission checks
    if (currentUser.role === 'Desenvolvedor') {
      // Desenvolvedores podem alterar qualquer usuário para qualquer cargo
      if (!['Protagonista', 'Líder', 'Desenvolvedor'].includes(role)) {
        return res.status(400).json({ status: "error", message: "Cargo inválido" });
      }
    } else if (currentUser.role === 'Líder') {
      // Líderes só podem alterar Protagonistas e não podem alterar cargos de outros Líderes/Desenvolvedores
      if (targetUser.role !== 'Protagonista') {
        return res.status(403).json({ status: "error", message: "Você não tem permissão para alterar este usuário" });
      }
      // Líderes só podem promover para Protagonista (não podem alterar cargos)
      if (role !== 'Protagonista') {
        return res.status(403).json({ status: "error", message: "Você só pode gerenciar Protagonistas" });
      }
    } else {
      return res.status(403).json({ status: "error", message: "Acesso negado" });
    }

    try {
      const updateUser = db.prepare('UPDATE users SET name = ?, role = ?, info = ?, group_name = ?, image = ?, online = ?, email = ?, class = ?, password = ? WHERE id = ?');
      updateUser.run(name, role, info, group_name, image, online ? 1 : 0, email, userClass, password, userId);
      res.json({ status: "ok" });
    } catch (err) {
      res.status(400).json({ status: "error", message: "Erro ao atualizar usuário" });
    }
  });

  // Delete user (admin/developer only)
  app.delete("/api/admin/users/:userId", authenticateUser, (req, res) => {
    const { userId } = req.params;
    const currentUser = req.user;
    const targetUser = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);

    if (!targetUser) {
      return res.status(404).json({ status: "error", message: "Usuário não encontrado" });
    }

    // Permission checks
    if (currentUser.role === 'Desenvolvedor') {
      // Desenvolvedores podem deletar qualquer usuário
    } else if (currentUser.role === 'Líder') {
      // Líderes só podem deletar Protagonistas
      if (targetUser.role !== 'Protagonista') {
        return res.status(403).json({ status: "error", message: "Você só pode deletar Protagonistas" });
      }
    } else {
      return res.status(403).json({ status: "error", message: "Acesso negado" });
    }

    try {
      const deleteUser = db.prepare('DELETE FROM users WHERE id = ?');
      deleteUser.run(userId);
      res.json({ status: "ok" });
    } catch (err) {
      res.status(400).json({ status: "error", message: "Erro ao deletar usuário" });
    }
  });

  // Upload profile image
  app.post("/api/upload-profile-image", upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ status: "error", message: "Nenhuma imagem foi enviada" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ status: "ok", imageUrl });
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

