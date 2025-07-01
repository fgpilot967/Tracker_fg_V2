// storage.js (public/modules)

import { insertFixedTaskItems, insertFixedDetailItems, updatePilotHeadlines, updatePilotParagraph, updatePilotParagraphRank , user, updateArrayPilotComments, dataInitialTaskItems, updateArrayTaskItems, dateInitialTaskItems } from './arrays.js'

import { numberOfPilots, numberOfTasks } from '../main.js';

import {
  pilotNames,
  pilotRank,
  notifyEmailPilots,
  adminTableArray,
  fixedDetailItems,
  fixedTaskItems,
  pilotComments,
} from './arrays.js';



export async function saveTrackerData() {
  const data = {
    pilotNames,
    pilotRank,
    notifyEmailPilots,
    adminTableArray,
    fixedDetailItems,
    fixedTaskItems,
    pilotComments,
    dataInitialTaskItems,
    dateInitialTaskItems,

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

  pilotComments.length = 0;
  pilotComments.push(...(result.pilotComments || []));


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
  });

  result.pilotComments?.forEach((pComment, i) => {
    const cell = document.getElementById(`commentPilot${i}`);
    if (cell) cell.textContent = pComment;
  });


  // DAS OBJEKT ITEM dataInitialTaskItem LADEN ---- Leere das Objekt zuerst!

  Object.keys(dataInitialTaskItems).forEach(key => delete dataInitialTaskItems[key]);

  // Übernimm die geladenen Daten (falls es ein Objekt ist)
  if (result.dataInitialTaskItems && typeof result.dataInitialTaskItems === "object" && !Array.isArray(result.dataInitialTaskItems)) {
    Object.assign(dataInitialTaskItems, result.dataInitialTaskItems);
    console.log("✅ dataInitialTaskItems korrekt geladen:", dataInitialTaskItems);
  } else {
    console.warn("⚠️ Unerwartetes Format für dataInitialTaskItems:", result.dataInitialTaskItems);
  }

  // Daten (also die Arrays in dem Objekt) aus dem Objekt in die Zellen schreiben
  for (let pilotId in dataInitialTaskItems) {
    const taskArray = dataInitialTaskItems[pilotId];

    // Extrahiere die Pilotnummer (z. B. aus "pilot1" → 1)
    const pilotNum = pilotId.replace("pilot", "");
    taskArray.forEach((value, rowIndex) => {             // rowIndex wurde beim speichern erstellt/übernommem
      const cell = document.getElementById(`itemCompanyLane${rowIndex}Pilot${pilotNum}`); // pilotNum siehe const pilotNum
      if (cell) {
        cell.textContent = value;
      }
    });
  }


// DAS OBJEKT DATE dateInitialTaskItem LADEN ---- Leere das Objekt zuerst!

  Object.keys(dateInitialTaskItems).forEach(key => delete dateInitialTaskItems[key]);

  // Übernimm die geladenen Daten (falls es ein Objekt ist)
  if (result.dateInitialTaskItems && typeof result.dateInitialTaskItems === "object" && !Array.isArray(result.dateInitialTaskItems)) {
    Object.assign(dateInitialTaskItems, result.dateInitialTaskItems);
    console.log("✅ dateInitialTaskItems korrekt geladen:", dateInitialTaskItems);
  } else {
    console.warn("⚠️ Unerwartetes Format für dateInitialTaskItems:", result.dateInitialTaskItems);
  }

  // Daten (also die Arrays in dem Objekt) aus dem Objekt in die Zellen schreiben
  for (let pilotId in dateInitialTaskItems) {
    const taskArray = dateInitialTaskItems[pilotId];

    // Extrahiere die Pilotnummer (z. B. aus "pilot1" → 1)
    const pilotNum = pilotId.replace("pilot", "");
    taskArray.forEach((value, rowIndex) => {             // rowIndex wurde beim speichern erstellt/übernommem
      const cell = document.getElementById(`dateCompanyLane${rowIndex}Pilot${pilotNum}`); // pilotNum siehe const pilotNum
      if (cell) {
        cell.value = value;
      }
    });
  }








  updatePilotParagraph();
  updatePilotHeadlines();
  updatePilotParagraphRank();
  insertFixedDetailItems(numberOfPilots);
  insertFixedTaskItems(numberOfPilots);
  updateArrayPilotComments(numberOfPilots);
  updateArrayTaskItems(numberOfTasks, numberOfPilots);
};







