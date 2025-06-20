// ===============================
// 🌐 Simple Express Server (with JSON file storage)
// ===============================

import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "user-data");

// 📁 Sicherstellen, dass der Ordner existiert
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// 💾 DATEN SPEICHERN
app.post("/save", (req, res) => {
  const { user, data } = req.body;
  if (!user || !data) {
    return res.status(400).send("Fehlende Angaben (user/data)");
  }

  const filePath = path.join(dataDir, `${user}.json`);
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error("Fehler beim Speichern:", err);
      return res.status(500).send("Fehler beim Speichern");
    }
    console.log(`✅ Daten gespeichert für Benutzer ${user}`);
    res.send(`Daten für ${user} gespeichert`);
  });
});

// 📦 DATEN LADEN
app.get("/load/:user", (req, res) => {
  const user = req.params.user;
  const filePath = path.join(dataDir, `${user}.json`);

  try {
    if (!fs.existsSync(filePath)) {
      return res.status(404).send("Benutzer nicht gefunden");
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    if (!fileContent.trim()) {
      return res.status(404).send("Datei ist leer");
    }

    const data = JSON.parse(fileContent);
    res.json({ data });
  } catch (error) {
    console.error("Fehler beim Laden:", error.message);
    res.status(500).send("Fehler beim Laden der Daten");
  }
});

// 🚀 SERVER STARTEN
app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf http://0.0.0.0:${PORT}`);
});
