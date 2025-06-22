// storage.js (public/modules)

import {user} from './arrays.js'

import {
  pilotNames,
  pilotRank,
  notifyEmailPilots,
  fixedDetailItems,
  fixedTaskItems,
  adminTableArray,
  pilotComments
} from './arrays.js';


export async function saveTrackerData() {
  const data = {
    pilotNames,
    pilotRank,
    notifyEmailPilots,
    fixedDetailItems,
    fixedTaskItems,
    adminTableArray,
    pilotComments
    // Hier kannst du später weitere Arrays ergänzen
  };

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

  // Beispielhafte Anzeige
  const names = document.getElementById("pilotNames");
  const rank = document.getElementById("pilotRank");
  const email = document.getElementById("pilotEmail");
  const detail = document.getElementById("pilotDetail");
  const task = document.getElementById("pilotTask");
  const admin = document.getElementById("pilotAdmin");
  const comment = document.getElementById("pilotComment");
  names.textContent = result.pilotNames.join(", ");
  rank.textContent = result.pilotRank.join(", ");
  email.textContent = result.notifyEmailPilots.join(", ");
  // email.textContent = (result.notifyEmailPilots || []).join(", ");    // Verhindert Fehler, selbst wenn undefined !! 
  detail.textContent = result.fixedDetailItems.join(", ");
  task.textContent = result.fixedTaskItems.join(", ");
  admin.textContent = result.adminTableArray.join(", ");
  comment.textContent = result.pilotComments.join(", ");

}


