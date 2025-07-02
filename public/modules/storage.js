// storage.js (public/modules)

import { insertFixedTaskItems, insertFixedDetailItems, updatePilotHeadlines, updatePilotParagraph, updatePilotParagraphRank , user, updateArrayPilotComments, dataInitialTaskItems, updateArrayTaskItems, dateInitialTaskItems, boxInitialTaskItems, dataInfoItems, detailInfoItems, inputPilotTable, dateLiPilotTable, validityPilotTable, expiryDatePilotTable, updateArrayExpiryPilotTable, remDaysPilotTable, updateArrayRemDaysPilotTable } from './arrays.js'

import { numberOfPilots, numberOfTasks, numberOfRowsPilots } from '../main.js';

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
  updateArrayExpiryPilotTable(numberOfRowsPilots, numberOfPilots);
  updateArrayRemDaysPilotTable(numberOfRowsPilots, numberOfPilots);

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
    boxInitialTaskItems,
    dataInfoItems,
    detailInfoItems,
    inputPilotTable,
    dateLiPilotTable,
    validityPilotTable,
    expiryDatePilotTable,
    remDaysPilotTable,

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


  // DAS OBJEKT DATA/ITEM (ab Item 9) dataInitialTaskItem LADEN ---- Leere das Objekt zuerst!

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


// DAS OBJEKT BOX boxInitialTaskItem LADEN ---- Leere das Objekt zuerst!

  Object.keys(boxInitialTaskItems).forEach(key => delete boxInitialTaskItems[key]);

  // Übernimm die geladenen Daten (falls es ein Objekt ist)
  if (result.boxInitialTaskItems && typeof result.boxInitialTaskItems === "object" && !Array.isArray(result.boxInitialTaskItems)) {
    Object.assign(boxInitialTaskItems, result.boxInitialTaskItems);
    console.log("✅ boxInitialTaskItems korrekt geladen:", boxInitialTaskItems);
  } else {
    console.warn("⚠️ Unerwartetes Format für boxInitialTaskItems:", result.boxInitialTaskItems);
  }

  // Daten (also die Arrays in dem Objekt) aus dem Objekt in die Zellen schreiben
  for (let pilotId in boxInitialTaskItems) {
    const taskArray = boxInitialTaskItems[pilotId];

    // Extrahiere die Pilotnummer (z. B. aus "pilot1" → 1)
    const pilotNum = pilotId.replace("pilot", "");
    taskArray.forEach((value, rowIndex) => {             // rowIndex wurde beim speichern erstellt/übernommem
      const cell = document.getElementById(`itemCompanyPassedLane${rowIndex}Pilot${pilotNum}`); // pilotNum siehe const pilotNum
      if (cell) {
        cell.checked = value;
      }
    });
  }


// DAS OBJEKT INFO/ITEM (ab Item 9) dataInfoItems LADEN ---- Leere das Objekt zuerst!

  Object.keys(dataInfoItems).forEach(key => delete dataInfoItems[key]);

  // Übernimm die geladenen Daten (falls es ein Objekt ist)
  if (result.dataInfoItems && typeof result.dataInfoItems === "object" && !Array.isArray(result.dataInfoItems)) {
    Object.assign(dataInfoItems, result.dataInfoItems);
    console.log("✅ dataInfoItems korrekt geladen:", dataInfoItems);
  } else {
    console.warn("⚠️ Unerwartetes Format für dataInfoItems:", result.dataInfoItems);
  }

  // Daten (also die Arrays in dem Objekt) aus dem Objekt in die Zellen schreiben
  for (let pilotId in dataInfoItems) {
    const taskArray = dataInfoItems[pilotId];

    // Extrahiere die Pilotnummer (z. B. aus "pilot1" → 1)
    const pilotNum = pilotId.replace("pilot", "");
    taskArray.forEach((value, rowIndex) => {             // rowIndex wurde beim speichern erstellt/übernommem
      const cell = document.getElementById(`itemDetailLane${rowIndex}Pilot${pilotNum}`); // pilotNum siehe const pilotNum
      if (cell) {
        cell.textContent = value;
      }
    });
  }


// DAS OBJEKT Detail/ITEM (ganze Spalte) detailInfoItems LADEN ---- Leere das Objekt zuerst!

  Object.keys(detailInfoItems).forEach(key => delete detailInfoItems[key]);

  // Übernimm die geladenen Daten (falls es ein Objekt ist)
  if (result.detailInfoItems && typeof result.detailInfoItems === "object" && !Array.isArray(result.detailInfoItems)) {
    Object.assign(detailInfoItems, result.detailInfoItems);
    console.log("✅ detailInfoItems korrekt geladen:", detailInfoItems);
  } else {
    console.warn("⚠️ Unerwartetes Format für detailInfoItems:", result.detailInfoItems);
  }

  // Daten (also die Arrays in dem Objekt) aus dem Objekt in die Zellen schreiben
  for (let pilotId in detailInfoItems) {
    const taskArray = detailInfoItems[pilotId];

    // Extrahiere die Pilotnummer (z. B. aus "pilot1" → 1)
    const pilotNum = pilotId.replace("pilot", "");
    taskArray.forEach((value, rowIndex) => {             // rowIndex wurde beim speichern erstellt/übernommem
      const cell = document.getElementById(`inputDetailLane${rowIndex}Pilot${pilotNum}`); // pilotNum siehe const pilotNum
      if (cell) {
        cell.textContent = value;
      }
    });
  }


// DAS OBJEKT Input License (ganze Spalte) inputPilotTable LADEN ---- Leere das Objekt zuerst!

  Object.keys(inputPilotTable).forEach(key => delete inputPilotTable[key]);

  // Übernimm die geladenen Daten (falls es ein Objekt ist)
  if (result.inputPilotTable && typeof result.inputPilotTable === "object" && !Array.isArray(result.inputPilotTable)) {
    Object.assign(inputPilotTable, result.inputPilotTable);
    console.log("✅ inputPilotTable korrekt geladen:", inputPilotTable);
  } else {
    console.warn("⚠️ Unerwartetes Format für inputPilotTable:", result.inputPilotTable);
  }

  // Daten (also die Arrays in dem Objekt) aus dem Objekt in die Zellen schreiben
  for (let pilotId in inputPilotTable) {
    const taskArray = inputPilotTable[pilotId];

    // Extrahiere die Pilotnummer (z. B. aus "pilot1" → 1)
    const pilotNum = pilotId.replace("pilot", "");
    taskArray.forEach((value, rowIndex) => {             // rowIndex wurde beim speichern erstellt/übernommem
      const cell = document.getElementById(`inputLiLane${rowIndex}Pilot${pilotNum}`); // pilotNum siehe const pilotNum
      if (cell) {
        cell.textContent = value;
      }
    });
  }

// DAS OBJEKT License DATE dateLiPilotList LADEN ---- Leere das Objekt zuerst!

  Object.keys(dateLiPilotTable).forEach(key => delete dateLiPilotTable[key]);

  // Übernimm die geladenen Daten (falls es ein Objekt ist)
  if (result.dateLiPilotTable && typeof result.dateLiPilotTable === "object" && !Array.isArray(result.dateLiPilotTable)) {
    Object.assign(dateLiPilotTable, result.dateLiPilotTable);
    console.log("✅ dateLiPilotTable korrekt geladen:", dateLiPilotTable);
  } else {
    console.warn("⚠️ Unerwartetes Format für dateLiPilotTable:", result.dateLiPilotTable);
  }

  // Daten (also die Arrays in dem Objekt) aus dem Objekt in die Zellen schreiben
  for (let pilotId in dateLiPilotTable) {
    const taskArray = dateLiPilotTable[pilotId];

    // Extrahiere die Pilotnummer (z. B. aus "pilot1" → 1)
    const pilotNum = pilotId.replace("pilot", "");
    taskArray.forEach((value, rowIndex) => {             // rowIndex wurde beim speichern erstellt/übernommem
      const cell = document.getElementById(`lastCheckLiLane${rowIndex}Pilot${pilotNum}`); // pilotNum siehe const pilotNum
      if (cell) {
        cell.value = value;
      }
    });
  }


// DAS OBJEKT Validity (ganze Spalte) validityPilotTable LADEN ---- Leere das Objekt zuerst!

  Object.keys(validityPilotTable).forEach(key => delete validityPilotTable[key]);

  // Übernimm die geladenen Daten (falls es ein Objekt ist)
  if (result.validityPilotTable && typeof result.validityPilotTable === "object" && !Array.isArray(result.validityPilotTable)) {
    Object.assign(validityPilotTable, result.validityPilotTable);
    console.log("✅ validityPilotTable korrekt geladen:", validityPilotTable);
  } else {
    console.warn("⚠️ Unerwartetes Format für validityPilotTable:", result.validityPilotTable);
  }

  // Daten (also die Arrays in dem Objekt) aus dem Objekt in die Zellen schreiben
  for (let pilotId in validityPilotTable) {
    const taskArray = validityPilotTable[pilotId];

    // Extrahiere die Pilotnummer (z. B. aus "pilot1" → 1)
    const pilotNum = pilotId.replace("pilot", "");
    taskArray.forEach((value, rowIndex) => {             // rowIndex wurde beim speichern erstellt/übernommem
      const cell = document.getElementById(`validityLiLane${rowIndex}Pilot${pilotNum}`); // pilotNum siehe const pilotNum
      if (cell) {
        cell.textContent = value;
      }
    });
  }


// DAS OBJEKT Expiry Date (ganze Spalte) expiryDatePilotTable LADEN ---- Leere das Objekt zuerst!

  Object.keys(expiryDatePilotTable).forEach(key => delete expiryDatePilotTable[key]);

  // Übernimm die geladenen Daten (falls es ein Objekt ist)
  if (result.expiryDatePilotTable && typeof result.expiryDatePilotTable === "object" && !Array.isArray(result.expiryDatePilotTable)) {
    Object.assign(expiryDatePilotTable, result.expiryDatePilotTable);
    console.log("✅ expiryDatePilotTable korrekt geladen:", expiryDatePilotTable);
  } else {
    console.warn("⚠️ Unerwartetes Format für expiryDatePilotTable:", result.expiryDatePilotTable);
  }

  // Daten (also die Arrays in dem Objekt) aus dem Objekt in die Zellen schreiben
  for (let pilotId in expiryDatePilotTable) {
    const taskArray = expiryDatePilotTable[pilotId];

    // Extrahiere die Pilotnummer (z. B. aus "pilot1" → 1)
    const pilotNum = pilotId.replace("pilot", "");
    taskArray.forEach((value, rowIndex) => {             // rowIndex wurde beim speichern erstellt/übernommem
      const cell = document.getElementById(`newExpiryDateLiLane${rowIndex}Pilot${pilotNum}`); // pilotNum siehe const pilotNum
      if (cell) {
        cell.textContent = value;
      }
    });
  }


// DAS OBJEKT REM DAYS (ganze Spalte) remDaysPilotTable LADEN ---- Leere das Objekt zuerst!

  Object.keys(remDaysPilotTable).forEach(key => delete remDaysPilotTable[key]);

  // Übernimm die geladenen Daten (falls es ein Objekt ist)
  if (result.remDaysPilotTable && typeof result.remDaysPilotTable === "object" && !Array.isArray(result.remDaysPilotTable)) {
    Object.assign(remDaysPilotTable, result.remDaysPilotTable);
    console.log("✅ remDaysPilotTable korrekt geladen:", remDaysPilotTable);
  } else {
    console.warn("⚠️ Unerwartetes Format für remDaysPilotTable:", result.remDaysPilotTable);
  }

  // Daten (also die Arrays in dem Objekt) aus dem Objekt in die Zellen schreiben
  for (let pilotId in remDaysPilotTable) {
    const taskArray = remDaysPilotTable[pilotId];

    // Extrahiere die Pilotnummer (z. B. aus "pilot1" → 1)
    const pilotNum = pilotId.replace("pilot", "");
    taskArray.forEach((value, rowIndex) => {             // rowIndex wurde beim speichern erstellt/übernommem
      const cell = document.getElementById(`remDaysLiLane${rowIndex}Pilot${pilotNum}`); // pilotNum siehe const pilotNum
      if (cell) {
        cell.textContent = value;
      }
    });
  }



  updatePilotParagraph();
  updatePilotHeadlines();
  updatePilotParagraphRank();
  insertFixedDetailItems(numberOfPilots);
  insertFixedTaskItems(numberOfPilots);
  //updateArrayPilotComments(numberOfPilots);
  //updateArrayTaskItems(numberOfTasks, numberOfPilots);
};







