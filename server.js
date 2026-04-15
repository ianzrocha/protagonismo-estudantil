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
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Servidor de Protagonismo Estudantil ativo" });
  });

  app.get("/api/users", (req, res) => {
    const users = db.prepare('SELECT * FROM users').all();
    res.json(users);
  });

  app.get("/api/announcements", (req, res) => {
    const announcements = db.prepare('SELECT * FROM announcements').all();
    res.json(announcements);
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

