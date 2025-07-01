
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "user-data");

// 📁 Sicherstellen, dass data-Ordner existiert
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//
// 💾 DATEN SPEICHERN
//
app.post("/save", (req, res) => {
  const { user, data } = req.body;
  if (!user || !data) {
    return res.status(400).send("Fehlende Angaben (user/data)");
  }

  const userDir = path.join(dataDir, user);
  if (!fs.existsSync(userDir)) {
    fs.mkdirSync(userDir, { recursive: true });
  }

  try {
    fs.writeFileSync(path.join(userDir, "pilotNames.json"), JSON.stringify(data.pilotNames));
    fs.writeFileSync(path.join(userDir, "pilotRank.json"), JSON.stringify(data.pilotRank));
    fs.writeFileSync(path.join(userDir, "notifyEmailPilots.json"), JSON.stringify(data.notifyEmailPilots));
    fs.writeFileSync(path.join(userDir, "adminTableArray.json"), JSON.stringify(data.adminTableArray));
    fs.writeFileSync(path.join(userDir, "fixedDetailItems.json"), JSON.stringify(data.fixedDetailItems));
    fs.writeFileSync(path.join(userDir, "fixedTaskItems.json"), JSON.stringify(data.fixedTaskItems));
    fs.writeFileSync(path.join(userDir, "pilotComments.json"), JSON.stringify(data.pilotComments));
    fs.writeFileSync(path.join(userDir, "dataInitialTaskItems.json"), JSON.stringify(data.dataInitialTaskItems));

    // 📝 Hier kannst du beliebig weitere Felder speichern
    console.log(`✅ Daten für ${user} gespeichert.`);
    res.send(`Daten für ${user} erfolgreich gespeichert`);
  } catch (err) {
    console.error("Fehler beim Speichern:", err.message);
    res.status(500).send("Fehler beim Speichern der Daten");
  }
});

//
// 📦 DATEN LADEN
//
function loadJsonSafely(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch {
    return [];
  }
}

app.get("/load/:user", (req, res) => {
  const user = req.params.user;
  const userDir = path.join(dataDir, user);

  if (!fs.existsSync(userDir)) {
    return res.status(404).send("Benutzer nicht gefunden");
  }

  const result = {
    pilotNames: loadJsonSafely(path.join(userDir, "pilotNames.json")),
    pilotRank: loadJsonSafely(path.join(userDir, "pilotRank.json")),
    notifyEmailPilots: loadJsonSafely(path.join(userDir, "notifyEmailPilots.json")),
    adminTableArray: loadJsonSafely(path.join(userDir, "adminTableArray.json")),
    fixedDetailItems: loadJsonSafely(path.join(userDir, "fixedDetailItems.json")),
    fixedTaskItems: loadJsonSafely(path.join(userDir, "fixedTaskItems.json")),
    pilotComments: loadJsonSafely(path.join(userDir, "pilotComments.json")),
    dataInitialTaskItems: loadJsonSafely(path.join(userDir, "dataInitialTaskItems.json")),

    // 📝 Hier auch weitere Felder lesen, falls nötig
  };

  res.json(result);
});

//
// 🚀 SERVER STARTEN
//
app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf https://217.154.84.3:${PORT}`);
});

