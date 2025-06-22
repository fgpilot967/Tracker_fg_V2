
console.log("main.js geladen");

//------------------🔧 Globale Konstanten ------------------//
const numberOfPilots = 10;
const numberOfRowsPilots = 15;
const numberOfRowsDetail = 15;
const numberOfRowsTask = 15;
const numberOfFixItems = 8;
const numberOfFixTask = 8;


import { saveTrackerData, loadTrackerData } from './modules/storage.js';
import { createPilotTable, createPilotCompanyTable, createPilotDetailTable } from './modules/createTables.js';
import { openTab, updatePilotDropdownFromTable } from './modules/tab.js';
import { calculateRow } from './modules/calculations.js';
import { pilotNames, pilotRank } from './modules/arrays.js';

window.saveTrackerData = saveTrackerData;
window.loadTrackerData = loadTrackerData;
window.updatePilotDropdownFromTable = updatePilotDropdownFromTable;
window.openTab = openTab;

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

//-----------------Update der Piloten-Tabellen Headline-Anzeige-----------------------------

function updatePilotHeadlines() {
  console.log("Headlines aktualisiert");
  for (let i = 0; i < pilotNames.length; i++) {
    const headline = document.getElementById(`headPilot${i + 1}`);
    if (headline) {
      const spacer = "\u2003"; // EM SPACE
      headline.textContent = pilotNames[i] + spacer + "|" + spacer + pilotRank[i];
    }
  }
}

