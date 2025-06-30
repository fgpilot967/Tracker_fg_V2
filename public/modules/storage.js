// storage.js (public/modules)

import { updatePilotParagraph, user } from './arrays.js'

import {
  pilotNames,
  pilotRank,
  notifyEmailPilots,
  adminTableArray,

  //fixedDetailItems,
  //fixedTaskItems,
  //pilotComments,
} from './arrays.js';


export async function saveTrackerData() {
  const data = {
    pilotNames,
    pilotRank,
    notifyEmailPilots,
    adminTableArray,

    //fixedDetailItems,
    //fixedTaskItems,
    //pilotComments

    // Hier kannst du später weitere Arrays ergänzen
  };
console.log("zu sendende Daten", data);

  const response = await fetch("https://tracker.fgienau.de/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: `${user}`, data })
  });

  const result = await response.text();
  console.log("✅ Gespeichert:", result);
}

export async function loadTrackerData() {
  const response = await fetch(`https://tracker.fgienau.de/load/${user}`);
  if (!response.ok) throw new Error("Laden fehlgeschlagen");

  const result = await response.json();
  console.log("📦 Geladen:", result);

  pilotNames.length = 0; // leert das vorhandene Array
  pilotNames.push(...(result.pilotNames || []));

  // Zurück in Zellen schreiben
  result.pilotNames?.forEach((name, i) => {
    const cell = document.getElementById(`pilotName${i}`);
    if (cell) cell.textContent = name;
  });

  result.pilotRank?.forEach((rank, i) => {
    const cell = document.getElementById(`rankPilot${i}`);
    if (cell) cell.textContent = rank;
  });

  result.notifyEmailPilots?.forEach((email, i) => {
    const cell = document.getElementById(`notifyEmailPilot${i}`);
    if (cell) cell.textContent = email;
  });
  updatePilotParagraph();
}





