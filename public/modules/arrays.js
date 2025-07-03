

// modules/arrays.js

import { numberOfPilots } from '../main.js';


export const user = "fgpilot";          // Benutzer; später als Variable


export let pilotNames = [];   
export let pilotRank = [];  
export let notifyEmailPilots = [];  
export let adminTableArray = [];  
export let fixedDetailItems = [];
export let fixedTaskItems = [];         
export let pilotComments = [];  
export let dataInitialTaskItems = {}; // das ist ein Objekt
export let dateInitialTaskItems = {};
export let boxInitialTaskItems = {};
export let dataInfoItems = {};
export let detailInfoItems = {};
export let inputPilotTable = {};
export let dateLiPilotTable = {};
export let validityPilotTable = {};
export let expiryDatePilotTable = {};
export let remDaysPilotTable = {};
export let cb30PilotTable = {};
export let cb60PilotTable = {};
export let cb90PilotTable = {};
export let newSlotDate = {};




//-------------------Pilot Names (Array & DOM)---------------------------

export function updateArrayPilotNames(numberOfPilots) {
  //pilotNames = [];
  
  for (let i = 0; i < numberOfPilots; i++) {
    const cell = document.getElementById(`pilotName${i}`);

    // Event nur einmal hinzufügen
    if (!cell.dataset.listenerAdded) {
      cell.addEventListener("blur", () => {
        pilotNames[i] = cell.textContent.trim();
        for (let p = 1; p <= numberOfPilots; p++) {
         
        }
        console.log("pilotNames Array aktualisiert:", pilotNames);
        updatePilotHeadlines();
        updatePilotParagraph();
      });
      cell.dataset.listenerAdded = "true"; 
    }
  }  
}


//-------------------Pilot Rank (Array & DOM)---------------------------

export function updateArrayPilotRank(numberOfPilots) {
  //pilotRank = [];
  
  for (let i = 0; i < numberOfPilots; i++) {
    const cell = document.getElementById(`rankPilot${i}`);

    // Event nur einmal hinzufügen
    if (!cell.dataset.listenerAdded) {
      cell.addEventListener("blur", () => {
        pilotRank[i] = cell.textContent.trim();
        console.log("pilotRank Array aktualisiert:", pilotRank);
        updatePilotHeadlines();
        updatePilotParagraphRank();
      });
      cell.dataset.listenerAdded = "true";
    }
  }
}


//-------------------Pilot Email (Array & DOM)---------------------------

export function updateArrayNotifyEmail(numberOfPilots) {
  //notifyEmailPilots = [];
  for (let i = 0; i < numberOfPilots; i++) {
    const cell = document.getElementById(`notifyEmailPilot${i}`);
    if (!cell.dataset.listenerAdded) {
      cell.addEventListener("blur", () => {
        notifyEmailPilots[i] = cell.textContent.trim();
      });
      cell.dataset.listenerAdded = "true";
    }
  }
}


//------------------- Admin (Array & DOM)---------------------------

export function updateArrayAdminTable() {
  //adminTableArray = [];
  for (let i = 0; i < 3; i++) {
    const cell = document.getElementById(`adminTable${i}`);
    if (!cell.dataset.listenerAdded) {
      cell.addEventListener("blur", () => {
        adminTableArray[i] = cell.textContent.trim();
        console.log("adminTableArray aktualisiert", adminTableArray);
      });
      cell.dataset.listenerAdded = "true";
    }
  }
}


//-------------------Fix Detail Items (Array & DOM & Insert to Pilot)---------------------------

export function updateFixDetailTableArray(numberOfFixItems) {
  //fixedDetailItems = [];

  for (let i = 0; i < numberOfFixItems; i++) {
    const cell = document.getElementById(`fixedDetailItem${i}`);
    if (!cell.dataset.listenerAdded) {
      cell.addEventListener("blur", () => {
        fixedDetailItems[i] = cell.textContent.trim();
        //for (let p = 1; p <= numberOfPilots; p++) {
        insertFixedDetailItems(numberOfPilots);
        //}
        console.log("Fix Detail Array aktualisiert:", fixedDetailItems);
      });
      cell.dataset.listenerAdded = "true";
    }
  }
}

export function insertFixedDetailItems(numberOfPilots) {
  for (let i = 0; i < fixedDetailItems.length; i++) {
    for (let p = 1; p <= numberOfPilots; p++) {
      const cellId = `itemDetailLane${i + 1}Pilot${p}`;
      const cell = document.getElementById(cellId);
      if (cell) {
        cell.textContent = fixedDetailItems[i];
      }
    }
  }
}

//-------------------Fix Task Items (Array & DOM & Insert to Pilot)---------------------------

export function updateFixTaskTableArray(numberOfFixTask) {
  //fixedTaskItems = [];

  for (let i = 0; i < numberOfFixTask; i++) {
    const cell = document.getElementById(`fixedInitialTaskItem${i}`);
    if (!cell.dataset.listenerAdded) {
      cell.addEventListener("blur", () => {
        fixedTaskItems[i] = cell.textContent.trim(); 
        insertFixedTaskItems(numberOfPilots);
        console.log("Fix Task Array aktualisiert:", fixedTaskItems);
      });
      cell.dataset.listenerAdded = "true";
    }
  }
}

export function insertFixedTaskItems(numberOfPilots) {
  for (let i = 0; i < fixedTaskItems.length; i++) {
    for (let p = 1; p <= numberOfPilots; p++) {
      const cellId = `itemCompanyLane${i + 1}Pilot${p}`;
      const cell = document.getElementById(cellId);
      if (cell) {
        cell.textContent = fixedTaskItems[i];
      }
    }
  }
}


//------------------- Task Items (freie Felder; Pilots Details) (Array & DOM )---------------------------

export function updateArrayTaskItems(numberOfTasks, numberOfPilots) {
  
  for (let p = 1; p <= numberOfPilots; p++) {
    if (!dataInitialTaskItems[`pilot${p}`]) {
      dataInitialTaskItems[`pilot${p}`] = [];
    }
  
    for (let i = 8; i < numberOfTasks; i++) {
      const cell = document.getElementById(`itemCompanyLane${i}Pilot${p}`);
      
      if (!cell.dataset.listenerAdded) {
        cell.addEventListener("blur", () => {
          dataInitialTaskItems[`pilot${p}`][i] = cell.textContent.trim();
          console.log(`Pilot ${p} - Task Object ab Reihe 9:`, dataInitialTaskItems[`pilot${p}`]);
        });
        cell.dataset.listenerAdded = "true";
      }
    }
  }
}


//------------------- Task Date (Pilots Details) (Array & DOM )---------------------------

export function updateArrayTaskDate(numberOfTasks, numberOfPilots) {
  
  for (let p = 1; p <= numberOfPilots; p++) {
    if (!dateInitialTaskItems[`pilot${p}`]) {
      dateInitialTaskItems[`pilot${p}`] = [];
    }
  
    for (let i = 1; i < numberOfTasks; i++) {
      const cell = document.getElementById(`dateCompanyLane${i}Pilot${p}`);
      
      if (!cell.dataset.listenerAdded) {
        cell.addEventListener("blur", () => {
          dateInitialTaskItems[`pilot${p}`][i] = cell.value.trim();
          console.log(`Pilot ${p} - Task Date Objekt:`, dateInitialTaskItems[`pilot${p}`]);
        });
        cell.dataset.listenerAdded = "true";
      }
    }
  }
}


//------------------- Task Checkbox (Pilots Details) (Array & DOM )---------------------------

export function updateArrayTaskBoxes(numberOfTasks, numberOfPilots) {
  
  for (let p = 1; p <= numberOfPilots; p++) {
    if (!boxInitialTaskItems[`pilot${p}`]) {
      boxInitialTaskItems[`pilot${p}`] = [];
    }
  
    for (let i = 1; i < numberOfTasks; i++) {
      const cell = document.getElementById(`itemCompanyPassedLane${i}Pilot${p}`);
      
      if (!cell.dataset.listenerAdded) {
        cell.addEventListener("change", () => {
          
            boxInitialTaskItems[`pilot${p}`][i] = cell.checked;
      
          console.log(`Pilot ${p} - Task Boxes Objekt:`, boxInitialTaskItems[`pilot${p}`]);
        });
        cell.dataset.listenerAdded = "true";
      }
    }
  }
}


//------------------- Info Items ab Position 9 (freie Felder; Pilots Details) (Array & DOM )---------------------------

export function updateArrayInfoItems(numberOfTasks, numberOfPilots) {
  
  for (let p = 1; p <= numberOfPilots; p++) {
    if (!dataInfoItems[`pilot${p}`]) {
      dataInfoItems[`pilot${p}`] = [];
    }
  
    for (let i = 8; i < numberOfTasks; i++) {
      const cell = document.getElementById(`itemDetailLane${i}Pilot${p}`);
      
      if (!cell.dataset.listenerAdded) {
        cell.addEventListener("blur", () => {
          dataInfoItems[`pilot${p}`][i] = cell.textContent.trim();
          console.log(`Pilot ${p} - Info-Item Object ab Reihe 9:`, dataInfoItems[`pilot${p}`]);
        });
        cell.dataset.listenerAdded = "true";
      }
    }
  }
}



//------------------- Detail Items ; ganze Spalte (freie Felder; Pilots Details) (Array & DOM )---------------------------

export function updateArrayDetailItems(numberOfTasks, numberOfPilots) {
  
  for (let p = 1; p <= numberOfPilots; p++) {
    if (!detailInfoItems[`pilot${p}`]) {
      detailInfoItems[`pilot${p}`] = [];
    }
  
    for (let i = 1; i < numberOfTasks; i++) {
      const cell = document.getElementById(`inputDetailLane${i}Pilot${p}`);
      
      if (!cell.dataset.listenerAdded) {
        cell.addEventListener("blur", () => {
          detailInfoItems[`pilot${p}`][i] = cell.textContent.trim();
          console.log(`Pilot ${p} - Detail Object aktualisiert:`, detailInfoItems[`pilot${p}`]);
        });
        cell.dataset.listenerAdded = "true";
      }
    }
  }
}


//-------------Pilot Table License Items ; ganze Spalte  (Array & DOM )---------------------------

export function updateArrayInputPilotTable(numberOfRowsPilots, numberOfPilots) {
  
  for (let p = 1; p <= numberOfPilots; p++) {
    if (!inputPilotTable[`pilot${p}`]) {
      inputPilotTable[`pilot${p}`] = [];
    }
  
    for (let i = 1; i <= numberOfRowsPilots; i++) {
      const cell = document.getElementById(`inputLiLane${i}Pilot${p}`);
      
      if (!cell.dataset.listenerAdded) {
        cell.addEventListener("blur", () => {
          inputPilotTable[`pilot${p}`][i] = cell.textContent.trim();
          console.log(`Pilot ${p} - License Object aktualisiert:`, inputPilotTable[`pilot${p}`]);
        });
        cell.dataset.listenerAdded = "true";
      }
    }
  }
}


//------------------- License Date (Pilots Tables) (Array & DOM )---------------------------

export function updateArrayLicenseDate(numberOfRowsPilots, numberOfPilots) {
  
  for (let p = 1; p <= numberOfPilots; p++) {
    if (!dateLiPilotTable[`pilot${p}`]) {
      dateLiPilotTable[`pilot${p}`] = [];
    }
  
    for (let i = 1; i <= numberOfRowsPilots; i++) {
      const cell = document.getElementById(`lastCheckLiLane${i}Pilot${p}`);
      
      if (!cell.dataset.listenerAdded) {
        cell.addEventListener("blur", () => {
          dateLiPilotTable[`pilot${p}`][i] = cell.value.trim();
          console.log(`Pilot ${p} - Last Check Date Objekt:`, dateLiPilotTable[`pilot${p}`]);
        });
        cell.dataset.listenerAdded = "true";
      }
    }
  }
  console.log("dateLiPilotTable durchlaufen");
}


//-------------Pilot Table Validity ; ganze Spalte  (Array & DOM )---------------------------

export function updateArrayValidityPilotTable(numberOfRowsPilots, numberOfPilots) {
  
  for (let p = 1; p <= numberOfPilots; p++) {
    if (!validityPilotTable[`pilot${p}`]) {
      validityPilotTable[`pilot${p}`] = [];
    }
  
    for (let i = 1; i <= numberOfRowsPilots; i++) {
      const cell = document.getElementById(`validityLiLane${i}Pilot${p}`);
      
      if (!cell.dataset.listenerAdded) {
        cell.addEventListener("blur", () => {
          validityPilotTable[`pilot${p}`][i] = cell.textContent.trim();
          console.log(`Pilot ${p} - Validity Object aktualisiert:`, validityPilotTable[`pilot${p}`]);
        });
        cell.dataset.listenerAdded = "true";
      }
    }
  }
}


//-------------Pilot Table New Expiry ; ganze Spalte  (Array & DOM )---------------------------

export function updateArrayExpiryPilotTable(numberOfRowsPilots, numberOfPilots) {
  
  for (let p = 1; p <= numberOfPilots; p++) {
    if (!expiryDatePilotTable[`pilot${p}`]) {
      expiryDatePilotTable[`pilot${p}`] = [];
    }
  
    for (let i = 1; i <= numberOfRowsPilots; i++) {
      const cell = document.getElementById(`newExpiryDateLiLane${i}Pilot${p}`);
      
      const value = cell?.textContent.trim() || "";
          expiryDatePilotTable[`pilot${p}`][i] = value;
          
    };
  } 
  console.log(`Expiry-Date Object aktualisiert:`);
}


//-------------Pilot Table REM DAYS ; ganze Spalte  (Array & DOM )---------------------------

export function updateArrayRemDaysPilotTable(numberOfRowsPilots, numberOfPilots) {
  
  for (let p = 1; p <= numberOfPilots; p++) {
    if (!remDaysPilotTable[`pilot${p}`]) {
      remDaysPilotTable[`pilot${p}`] = [];
    }
  
    for (let i = 1; i <= numberOfRowsPilots; i++) {
      const cell = document.getElementById(`remDaysLiLane${i}Pilot${p}`);
      
      const value = cell?.textContent.trim() || "";
          remDaysPilotTable[`pilot${p}`][i] = value;
          
    };
  } 
  console.log(`REM DAYS Object aktualisiert:`);
}


//------------------- 30 Checkbox (Pilots Details) (Array & DOM )---------------------------

export function updateArrayCb30Box(numberOfRowsPilots, numberOfPilots) {
  
  for (let p = 1; p <= numberOfPilots; p++) {
    if (!cb30PilotTable[`pilot${p}`]) {
      cb30PilotTable[`pilot${p}`] = [];
    }
  
    for (let i = 1; i < numberOfRowsPilots; i++) {
      const cell = document.getElementById(`emailSent30LiLane${i}Pilot${p}`);
      
      if (!cell.dataset.listenerAdded) {
        cell.addEventListener("change", () => {
          
            cb30PilotTable[`pilot${p}`][i] = cell.checked;
      
          console.log(`Pilot ${p} - cb30 Boxes Objekt:`, cb30PilotTable[`pilot${p}`]);
        });
        cell.dataset.listenerAdded = "true";
      }
    }
  }
}


//------------------- 60 Checkbox (Pilots Details) (Array & DOM )---------------------------

export function updateArrayCb60Box(numberOfRowsPilots, numberOfPilots) {
  
  for (let p = 1; p <= numberOfPilots; p++) {
    if (!cb60PilotTable[`pilot${p}`]) {
      cb60PilotTable[`pilot${p}`] = [];
    }
  
    for (let i = 1; i < numberOfRowsPilots; i++) {
      const cell = document.getElementById(`emailSent60LiLane${i}Pilot${p}`);
      
      if (!cell.dataset.listenerAdded) {
        cell.addEventListener("change", () => {
          
            cb60PilotTable[`pilot${p}`][i] = cell.checked;
      
          console.log(`Pilot ${p} - cb60 Boxes Objekt:`, cb60PilotTable[`pilot${p}`]);
        });
        cell.dataset.listenerAdded = "true";
      }
    }
  }
}


//------------------- 90 Checkbox (Pilots Details) (Array & DOM )---------------------------

export function updateArrayCb90Box(numberOfRowsPilots, numberOfPilots) {
  
  for (let p = 1; p <= numberOfPilots; p++) {
    if (!cb90PilotTable[`pilot${p}`]) {
      cb90PilotTable[`pilot${p}`] = [];
    }
  
    for (let i = 1; i < numberOfRowsPilots; i++) {
      const cell = document.getElementById(`emailSent90LiLane${i}Pilot${p}`);
      
      if (!cell.dataset.listenerAdded) {
        cell.addEventListener("change", () => {
          
            cb90PilotTable[`pilot${p}`][i] = cell.checked;
      
          console.log(`Pilot ${p} - cb90 Boxes Objekt:`, cb90PilotTable[`pilot${p}`]);
        });
        cell.dataset.listenerAdded = "true";
      }
    }
  }
}


//------------------- New scheduled slot Date (Pilots Tables) (Array & DOM )---------------------------

export function updateArrayNewSlotDate(numberOfRowsPilots, numberOfPilots) {
  
  for (let p = 1; p <= numberOfPilots; p++) {
    if (!newSlotDate[`pilot${p}`]) {
      newSlotDate[`pilot${p}`] = [];
    }
  
    for (let i = 1; i <= numberOfRowsPilots; i++) {
      const cell = document.getElementById(`newEventLiLane${i}Pilot${p}`);
      
      if (!cell.dataset.listenerAdded) {
        cell.addEventListener("blur", () => {
          newSlotDate[`pilot${p}`][i] = cell.value.trim();
          console.log(`Pilot ${p} - New slot Date Objekt:`, newSlotDate[`pilot${p}`]);
        });
        cell.dataset.listenerAdded = "true";
      }
    }
  }
  console.log("newSlotDate durchlaufen");
}




//-------------------Pilot Comments (Array & DOM )---------------------------

export function updateArrayPilotComments(numberOfPilots) {

  for (let i = 0; i < numberOfPilots; i++) {
    const cell = document.getElementById(`commentPilot${i}`);
    if (!cell.dataset.listenerAdded) {
      cell.addEventListener("blur", () => {
        pilotComments[i] = cell.value.trim();
        console.log("Pilot Comments Array aktualisiert", pilotComments);
      });
      cell.dataset.listenerAdded = "true";
    }
  }  
}


//============================== updates der Header ====================================

// update Rank auf der Pilot Details Seite

export function updatePilotParagraphRank() {
  console.log("Rank aktualisiert");
  for (let i = 0; i < pilotRank.length; i++) {
    const pRank = document.getElementById(`pilot${i + 1}Rank`);
    if (pRank) pRank.textContent = pilotRank[i];
  }
}

// update den Namen auf der Pilot Details Seite

export function updatePilotParagraph() {
  console.log("Paragraph aktualisiert");
  for (let i = 0; i < pilotNames.length; i++) {
    const p = document.getElementById(`pilot${i + 1}Name`);
    if (p) p.textContent = pilotNames[i];
  }
}

// Update der Piloten-Tabellen Headline-Anzeige

export function updatePilotHeadlines() {
  
  for (let i = 0; i < pilotNames.length; i++) {
    const headline = document.getElementById(`headPilot${i + 1}`);
    if (headline) {
      const spacer = "\u2003"; // EM SPACE
      headline.textContent = pilotNames[i] + spacer + "|" + spacer + pilotRank[i];
    }
  }
  console.log("Headlines aktualisiert");
}


