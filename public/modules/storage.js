// storage.js (public/modules)

import { insertFixedTaskItems, insertFixedDetailItems, updatePilotHeadlines, updatePilotParagraph, updatePilotParagraphRank , updateArrayPilotComments, dataInitialTaskItems, updateArrayTaskItems, dateInitialTaskItems, boxInitialTaskItems, dataInfoItems, detailInfoItems, inputPilotTable, dateLiPilotTable, validityPilotTable, expiryDatePilotTable, updateArrayExpiryPilotTable, remDaysPilotTable, updateArrayRemDaysPilotTable, cb30PilotTable, cb60PilotTable, cb90PilotTable, newSlotDate } from './arrays.js'

import { numberOfPilots, numberOfTasks, numberOfRowsPilots } from '../main.js';

import { updateAllPilots } from './calculations.js';

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

  const user = window.user;
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
    cb30PilotTable,
    cb60PilotTable,
    cb90PilotTable,
    newSlotDate,

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


  // DAS OBJEKT cb30 Pilot Table cb30PilotTable LADEN ---- Leere das Objekt zuerst!

  Object.keys(cb30PilotTable).forEach(key => delete cb30PilotTable[key]);

  // Übernimm die geladenen Daten (falls es ein Objekt ist)
  if (result.cb30PilotTable && typeof result.cb30PilotTable === "object" && !Array.isArray(result.cb30PilotTable)) {
    Object.assign(cb30PilotTable, result.cb30PilotTable);
    console.log("✅ cb30PilotTable korrekt geladen:", cb30PilotTable);
  } else {
    console.warn("⚠️ Unerwartetes Format für cb30PilotTable:", result.cb30PilotTable);
  }

  // Daten (also die Arrays in dem Objekt) aus dem Objekt in die Zellen schreiben
  for (let pilotId in cb30PilotTable) {
    const taskArray = cb30PilotTable[pilotId];

    // Extrahiere die Pilotnummer (z. B. aus "pilot1" → 1)
    const pilotNum = pilotId.replace("pilot", "");
    taskArray.forEach((value, rowIndex) => {             // rowIndex wurde beim speichern erstellt/übernommem
      const cell = document.getElementById(`emailSent30LiLane${rowIndex}Pilot${pilotNum}`); // pilotNum siehe const pilotNum
      if (cell) {
        cell.checked = value;
      }
    });
  }


// DAS OBJEKT cb60 Pilot Table cb60PilotTable LADEN ---- Leere das Objekt zuerst!

  Object.keys(cb60PilotTable).forEach(key => delete cb60PilotTable[key]);

  // Übernimm die geladenen Daten (falls es ein Objekt ist)
  if (result.cb60PilotTable && typeof result.cb60PilotTable === "object" && !Array.isArray(result.cb60PilotTable)) {
    Object.assign(cb60PilotTable, result.cb60PilotTable);
    console.log("✅ cb60PilotTable korrekt geladen:", cb60PilotTable);
  } else {
    console.warn("⚠️ Unerwartetes Format für cb60PilotTable:", result.cb60PilotTable);
  }

  // Daten (also die Arrays in dem Objekt) aus dem Objekt in die Zellen schreiben
  for (let pilotId in cb60PilotTable) {
    const taskArray = cb60PilotTable[pilotId];

    // Extrahiere die Pilotnummer (z. B. aus "pilot1" → 1)
    const pilotNum = pilotId.replace("pilot", "");
    taskArray.forEach((value, rowIndex) => {             // rowIndex wurde beim speichern erstellt/übernommem
      const cell = document.getElementById(`emailSent60LiLane${rowIndex}Pilot${pilotNum}`); // pilotNum siehe const pilotNum
      if (cell) {
        cell.checked = value;
      }
    });
  }


// DAS OBJEKT cb90 Pilot Table cb90PilotTable LADEN ---- Leere das Objekt zuerst!

  Object.keys(cb90PilotTable).forEach(key => delete cb90PilotTable[key]);

  // Übernimm die geladenen Daten (falls es ein Objekt ist)
  if (result.cb90PilotTable && typeof result.cb90PilotTable === "object" && !Array.isArray(result.cb90PilotTable)) {
    Object.assign(cb90PilotTable, result.cb90PilotTable);
    console.log("✅ cb90PilotTable korrekt geladen:", cb90PilotTable);
  } else {
    console.warn("⚠️ Unerwartetes Format für cb90PilotTable:", result.cb90PilotTable);
  }

  // Daten (also die Arrays in dem Objekt) aus dem Objekt in die Zellen schreiben
  for (let pilotId in cb90PilotTable) {
    const taskArray = cb90PilotTable[pilotId];

    // Extrahiere die Pilotnummer (z. B. aus "pilot1" → 1)
    const pilotNum = pilotId.replace("pilot", "");
    taskArray.forEach((value, rowIndex) => {             // rowIndex wurde beim speichern erstellt/übernommem
      const cell = document.getElementById(`emailSent90LiLane${rowIndex}Pilot${pilotNum}`); // pilotNum siehe const pilotNum
      if (cell) {
        cell.checked = value;
      }
    });
  }


// DAS OBJEKT New Slot DATE newSlotDate LADEN ---- Leere das Objekt zuerst!

  Object.keys(newSlotDate).forEach(key => delete newSlotDate[key]);

  // Übernimm die geladenen Daten (falls es ein Objekt ist)
  if (result.newSlotDate && typeof result.newSlotDate === "object" && !Array.isArray(result.newSlotDate)) {
    Object.assign(newSlotDate, result.newSlotDate);
    console.log("✅ newSlotDate korrekt geladen:", newSlotDate);
  } else {
    console.warn("⚠️ Unerwartetes Format für newSlotDate:", result.newSlotDate);
  }

  // Daten (also die Arrays in dem Objekt) aus dem Objekt in die Zellen schreiben
  for (let pilotId in newSlotDate) {
    const taskArray = newSlotDate[pilotId];

    // Extrahiere die Pilotnummer (z. B. aus "pilot1" → 1)
    const pilotNum = pilotId.replace("pilot", "");
    taskArray.forEach((value, rowIndex) => {             // rowIndex wurde beim speichern erstellt/übernommem
      const cell = document.getElementById(`newEventLiLane${rowIndex}Pilot${pilotNum}`); // pilotNum siehe const pilotNum
      if (cell) {
        cell.value = value;
      }
    });
  }



  updateAllPilots(numberOfPilots, numberOfRowsPilots);
  updatePilotParagraph();
  updatePilotHeadlines();
  updatePilotParagraphRank();
  insertFixedDetailItems(numberOfPilots);
  insertFixedTaskItems(numberOfPilots);
  //updateArrayPilotComments(numberOfPilots);
  //updateArrayTaskItems(numberOfTasks, numberOfPilots);
};







