
console.log("main.js geladen");

//------------------🔧 Globale Konstanten ------------------//
export const numberOfPilots = 10;
const numberOfRowsPilots = 15;
const numberOfRowsDetail = 15;
const numberOfRowsTask = 15;
const numberOfFixItems = 8;
const numberOfFixTask = 8;


import { saveTrackerData, loadTrackerData } from './modules/storage.js';
import { createPilotTable, createPilotCompanyTable, createPilotDetailTable } from './modules/createTables.js';
import { openTab, updatePilotDropdownFromTable } from './modules/tab.js';
import { calculateRow } from './modules/calculations.js';
import { pilotNames, pilotRank, notifyEmailPilots, updateArrayPilotNames, updateArrayPilotRank, updateArrayNotifyEmail, updateArrayAdminTable, adminTableArray, updateFixDetailTableArray, updateFixTaskTableArray } from './modules/arrays.js';


//------------------🧠 Initialisierungs-Sicherung ------------------//
setTimeout(() => {
  updateArrayPilotNames(numberOfPilots);
  updateArrayPilotRank(numberOfPilots);
  updateArrayNotifyEmail(numberOfPilots);
  updateArrayAdminTable();
  updateFixDetailTableArray(numberOfFixItems);
  updateFixTaskTableArray(numberOfFixTask);

  //saveTrackerData();
  //loadTrackerData();
  //loadAllPilotTablesWithData();
  //loadAllPilotDetailsTablesWithData();
  //updateAllPilots(numberOfPilots, numberOfRowsPilots);
  //attachSaveTriggers();
  //updatePilotHeadlines();
  //updateDetailArrayFromIds(numberOfFixItems, numberOfPilots);
  //updateArrayPilotComments(numberOfPilots);
  
}, 500);




window.saveTrackerData = saveTrackerData;
window.loadTrackerData = loadTrackerData;
window.updatePilotDropdownFromTable = updatePilotDropdownFromTable;
window.openTab = openTab;
window.pilotNames = pilotNames;
window.pilotRank = pilotRank;
window.notifyEmailPilots = notifyEmailPilots;
window.adminTableArray = adminTableArray;


//------------------🧱 DOM Aufbau ------------------//
window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content geladen");

  // Tabellen erzeugen
  const container = document.getElementById('pilotTablesContainer');
  for (let pilot = 1; pilot <= numberOfPilots; pilot++) {
    const wrapper = document.createElement('div');
    wrapper.appendChild(createPilotTable(pilot, numberOfRowsPilots));
    container.appendChild(wrapper);
  };
  const detailContainer = document.getElementById('pilotDetailsContainer');
    for (let pilot = 1; pilot <= numberOfPilots; pilot++) {
      const wrapper = document.createElement('div');
      wrapper.id = `pilotWrapper${pilot}`;
      wrapper.className = "tabcontent";
      wrapper.style.display = "none"; // ACHTUNG solange tabcontent nicht funktioniert wird nichts angezeigt
  
      const subWrapper = document.createElement('div');
      subWrapper.style.display = "flex";
      subWrapper.style.alignItems = "flex-start";
      subWrapper.style.gap = "300px";
      subWrapper.appendChild(createPilotDetailTable(pilot, numberOfRowsDetail, numberOfFixItems));
      subWrapper.appendChild(createPilotCompanyTable(pilot, numberOfRowsTask, numberOfFixTask));
      wrapper.appendChild(subWrapper);
      detailContainer.appendChild(wrapper); 
    };
});

//------------------🔁 Live-Berechnungen aktivieren ------------------//
setTimeout(() => {
  for (let p = 1; p <= numberOfPilots; p++) {
  setupLiveCalculation(p, numberOfRowsPilots);
}}, 100);


function setupLiveCalculation(pilotNumber, numberOfRowsPilots) {
  for (let row = 1; row <= numberOfRowsPilots; row++) {
    const input = document.getElementById(`lastCheckLiLane${row}Pilot${pilotNumber}`);
    if (input) {
      input.addEventListener("change", () => calculateRow(pilotNumber, row));
    }

    const validityCell = document.getElementById(`validityLiLane${row}Pilot${pilotNumber}`);
    if (validityCell) {
      validityCell.addEventListener("blur", () => calculateRow(pilotNumber, row));
    }
  }
}


