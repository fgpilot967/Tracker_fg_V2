// storage.js (public/modules)

import { insertFixedTaskItems, insertFixedDetailItems, updatePilotHeadlines, updatePilotParagraph, updatePilotParagraphRank , user } from './arrays.js'

import { numberOfPilots } from '../main.js';

import {
  pilotNames,
  pilotRank,
  notifyEmailPilots,
  adminTableArray,
  fixedDetailItems,
  fixedTaskItems,
  //pilotComments,
} from './arrays.js';



export async function saveTrackerData() {
  const data = {
    pilotNames,
    pilotRank,
    notifyEmailPilots,
    adminTableArray,
    fixedDetailItems,
    fixedTaskItems,
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


  // leert das vorhandene Array
  pilotNames.length = 0; 
  pilotNames.push(...(result.pilotNames || []));

  pilotRank.length = 0;
  pilotRank.push(...(result.pilotRank || []));

  notifyEmailPilots.length = 0;
  notifyEmailPilots.push(...(result.notifyEmailPilots || []));

  adminTableArray.length = 0;
  adminTableArray.push(...(result.adminTableArray || []));

  fixedDetailItems.length = 0;
  fixedDetailItems.push(...(result.fixedDetailItems || []));

  fixedTaskItems.length = 0;
  fixedTaskItems.push(...(result.fixedTaskItems || []));


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

  result.adminTableArray?.forEach((admin, i) => {
    const cell = document.getElementById(`adminTable${i}`);
    if (cell) cell.textContent = admin;
  });

  result.fixedDetailItems?.forEach((fixItem, i) => {
    const cell = document.getElementById(`fixedDetailItem${i}`);
    if (cell) cell.textContent = fixItem;
  });

  result.fixedTaskItems?.forEach((fixTask, i) => {
    const cell = document.getElementById(`fixedInitialTaskItem${i}`);
    if (cell) cell.textContent = fixTask;
  })


  updatePilotParagraph();
  updatePilotHeadlines();
  updatePilotParagraphRank();
  insertFixedDetailItems(numberOfPilots);
  insertFixedTaskItems(numberOfPilots);
};







