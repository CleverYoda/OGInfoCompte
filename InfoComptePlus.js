
function initializeInfoComptePlus() {
    //console.log("currentPage: "+currentPage);
    let cAdditionalData = {
         Status : ""         // Opened, Finished, Closed,
         ,info : "e"
        ,Target : ""         // ToFindGreen, ToFindOrange ,ToFindRed ,Finding, Found, Waiting, Expired, None
        ,TargetTiming : ""   // None, 00:00 mm:ss  //document.querySelector("div.left_content p.auction_info span span").innerHTML,
        ,Item : ""           // None, Label of the item //document.querySelector("div.left_content div.image_140px img").alt,
        ,ItemImage : ""      // Empty image, Url for the item image  (75x75) //document.querySelector("div.left_content div.image_140px img").alt,
        ,BidingCost : ""     // None, NNN.NNN.NNN  //document.querySelector("div.left_content div.currentSum").innerHTML,
        ,NumberOfBids : ""   // None, NNN  //document.querySelector("div.left_content div.numberOfBids").innerHTML,
        ,LastBider : ""      // None, XXXXXXXXXX  //document.querySelector("div.left_content a.currentPlayer").innerHTML.trim(),
        ,BidingTime : ""     // 00:00:00.000
        ,LastRefresh : ""    // 00.00.0000 00:00:00.000  //getCurrentTimeFormatted("2")
    };

    let AdditionalContentTemplate="";
        AdditionalContentTemplate+="<div class=\"hclock1\" style=\"color:white;text-decoration: none;width: 150px;text-align: left;"
        AdditionalContentTemplate+="background: #13181D;background: #171d23;border: 1px solid #3F3D13;background: -moz-linear-gradient(top, #171d23 0%, #101419 100%);"
        AdditionalContentTemplate+="background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #171d23), color-stop(100%, #101419));   "
        AdditionalContentTemplate+="background: -webkit-linear-gradient(top, #171d23 0%, #101419 100%);    background: -o-linear-gradient(top, #171d23 0%,#101419 100%);    "
        AdditionalContentTemplate+="background: -ms-linear-gradient(top, #171d23 0%,#101419 100%);    background: linear-gradient(top, #171d23 0%,#101419 100%);    "
        AdditionalContentTemplate+="filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#171d23', endColorstr='#101419',GradientType=0 );"
        AdditionalContentTemplate+="margin-top:3px;-webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;padding: 5px;padding-left:10px;display:block\">";
        AdditionalContentTemplate+="<span class=\"cDate\" style=\"color:green;margin-left:95px;font-size:x-small;border:0px red solid;\">00.00.00</span><br>"
        AdditionalContentTemplate+="<span class=\"cPingClock\" style=\"color:yellow;margin-left:68px;border:0px red solid;\">00:00:00.000</span><br>";
        AdditionalContentTemplate+="<div style=\"display: flex;gap: 5px; align-items: flex-start;\"><span class=\"cStatusImage\"><img style=\"display:block;max-height:100px;\" src=\"/cdn/img/item-images/641f4b83c91f51f7bb3b884d883e70776953fcef.png\" width='32' height='32'></span>"
        AdditionalContentTemplate+="<span class=\"cTargetImage\"><img src=\"/cdn/img/item-images/09726bf92556fc12b55ec5ee00516af0223b7713.png\" width='32' height='32'></span>"
        //AdditionalContentTemplate+="<span class=\"cTargetImage\"><img src=\"/cdn/img/item-images/bec85c7b4868bdd5d634d50de17d8c17d56d40b5.png\" width='32' height='32'></span>"
        AdditionalContentTemplate+="<span class=\"cNotificationImage\"><img src=\"https://gf3.geo.gfsrv.net/cdnb1/148d695e299644aacdd2ef9149db0d.jpg\" width='32' height='32'></span>"
        AdditionalContentTemplate+="<span class=\"cStatus\">Open/Closed</span><br></div>";
        AdditionalContentTemplate+="<span class=\"cItemImage\"><img src=\"/cdn/img/item-images/1ee55efe00bb03743ca031a9eaa1374bb936d863.png\" width='64' height='64'></span>"
        AdditionalContentTemplate+="<span class=\"ctargetTimingT\" style=\"font-size: x-large;font-weight: bolder;display:online-block;\">35:30</span><br>"; //aprox. 25mn
        AdditionalContentTemplate+="<span class=\"cLastBider\">XXXXXXXXX</span> <span class=\"cBidingNumber\">(XXX)</span><br>";
        AdditionalContentTemplate+="<span class=\"cBidingCost\">X.XXX.XXX</span><br>";
        AdditionalContentTemplate+="<span class=\"cItem\">Booster XXX en YYYY</span><br>";
        AdditionalContentTemplate+="<span class=\"cLastRefresh\" style=\"color:green;margin-left:83px;font-size:x-small;border:0px red solid;\">00:00:00.000</span><br>";
        AdditionalContentTemplate+="</div>";

    let IdStartRefresh;
    function toIntOrZero(str) {
        const n = parseInt(str, 10);
        return isNaN(n) ? 0 : n;
    }
    function GetTimeObject() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0'); // Jour (2 chiffres)
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Mois (2 chiffres, getMonth() est 0-indexé)
        const year = now.getFullYear(); // Année
        const hours = String(now.getHours()).padStart(2, '0'); // Heures (2 chiffres)
        const minutes = String(now.getMinutes()).padStart(2, '0'); // Minutes (2 chiffres)
        const seconds = String(now.getSeconds()).padStart(2, '0'); // Secondes (2 chiffres)
        const milliseconds = String(now.getMilliseconds()).padStart(3, '0'); // Millisecondes (3 chiffres)
        let val=`${day}.${month}.${year} ${hours}:${minutes}:${seconds}.${milliseconds}`;
        return val;
    }
    function generateJSONFromDiv(divSelect, jsonName) {
    let div = divSelect; //document.querySelector(divSelect);
    if (!div) {
        console.error(`Le div avec "${divSelect}" n'existe pas.`);
        return null;
    }
    if (!div.attributes) {
        console.error(`Le div n'a pas d'attributs "${divSelect}".`);
        return null;
    }
    // On récupère tous les attributs dans un objet
    const attributes = {};
    for (let attr of div.attributes) {
        attributes[attr.name] = attr.value;
    }

    // On crée un objet avec le nom fourni
    let result = {};
        if (jsonName=="")
            result=attributes;
        else
            result[jsonName] = attributes;

    return result;
}

    function CreateAdditionalContent() {
        //console.log("Le DOM est prêt !");
        console.log("currentPage: "+currentPage);
        let AdditionalContent=AdditionalContentTemplate;
        if (document.querySelector("#left")!=null) document.querySelector("#left").innerHTML = AdditionalContentTemplate + document.querySelector("#left").innerHTML;
        IdStartRefresh = setInterval(refreshOgClock1, 147);
        //console.log("Block3: "+document.querySelector("div.left_content div.image_140px img").alt);
    }

    function getCurrentTimeFormatted(StyleMode) {
        const now = new Date();

        const day = String(now.getDate()).padStart(2, '0'); // Jour (2 chiffres)
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Mois (2 chiffres, getMonth() est 0-indexé)
        const year = now.getFullYear(); // Année
        const hours = String(now.getHours()).padStart(2, '0'); // Heures (2 chiffres)
        const minutes = String(now.getMinutes()).padStart(2, '0'); // Minutes (2 chiffres)
        const seconds = String(now.getSeconds()).padStart(2, '0'); // Secondes (2 chiffres)
        const milliseconds = String(now.getMilliseconds()).padStart(3, '0'); // Millisecondes (3 chiffres)
        let val="";
        switch (StyleMode) {
            case "1":
                val=`${day}.${month}.${year}`;
                break;
            case "2":
                val=`${hours}:${minutes}:${seconds}.${milliseconds}`;
                break;
            case "3":
                val=`${day}.${month}.${year} ${hours}:${minutes}:${seconds}.${milliseconds}`;
                break;
        }
        return val;
    }
    function refreshOgClock() {
        if (document.querySelector("div.hclock")!=null) document.querySelector("div.hclock").innerHTML = getCurrentTimeFormatted("2"); //document.querySelector("div.OGameClock").innerHTML;
        if (localStorage.getItem("cAdditionalData")!=null) {
            const cAddData = JSON.parse(localStorage.getItem("cAdditionalData"));
            if (document.querySelector("div.hclockspot")!=null) document.querySelector("div.hclockspot").innerHTML = cAddData.targetTiming;
        }

    }
    function refreshOgClock1() {
        //if (document.querySelector("div.hclock")!=null) document.querySelector("div.hclock").innerHTML = getCurrentTimeFormatted("2"); //document.querySelector("div.OGameClock").innerHTML;
        if (document.querySelector("div.hclock1 span.cPingClock")!=null) document.querySelector("div.hclock1 span.cPingClock").innerHTML = getCurrentTimeFormatted("2");
        if (document.querySelector("div.hclock1 span.cDate")!=null) document.querySelector("div.hclock1 span.cDate").innerHTML = getCurrentTimeFormatted("1");
        if (localStorage.getItem("cAdditionalData")!=null) {
        const cAddData = JSON.parse(localStorage.getItem("cAdditionalData"));
        if (document.querySelector("div.hclock1 span.cItem")!=null) document.querySelector("div.hclock1 span.cItem").innerHTML = cAddData.Item;
        if (document.querySelector("div.hclock1 span.cStatus")!=null) document.querySelector("div.hclock1 span.cStatus").innerHTML = cAddData.Status;
        if (document.querySelector("div.hclock1 span.cBidingCost")!=null) document.querySelector("div.hclock1 span.cBidingCost").innerHTML = cAddData.BidingCost+ " (" + cAddData.NumberOfBids + ")";
        if (document.querySelector("div.hclock1 span.cLastBider")!=null) document.querySelector("div.hclock1 span.cLastBider").innerHTML = cAddData.LastBider;
        if (document.querySelector("div.hclock1 span.cLastRefresh")!=null) document.querySelector("div.hclock1 span.cLastRefresh").innerHTML = cAddData.LastRefresh;
        if (document.querySelector("div.hclock1 span.ctargetTiming")!=null) document.querySelector("div.hclock1 span.ctargetTiming").innerHTML = cAddData.targetTiming;
        }

    }
    function generateRandomData() {
        const statuses = ["⚔️", "💥", "⏳", "❌", "❓"];
        const statusLabels = ["AttackInProgress", "Attacked", "Waiting", "Expired", "Unknown"];
        const playerStatuses = ["s", "n", "o", "i", "I", "hp"];//["A", "s", "n", "o", "v", "b", "i", "I", "hp"];
        const timestatuses = ["ok", "medium", "height", "expired", "alert"];
        const coords = ["[1:100:1]", "[2:101:2]", "[3:102:3]", "[4:103:4]", "[5:104:5]","[6:499:15]"];
        const ships = ["1,234,514🛰️", "54,321🛰️", "67,890🛰️", "798,765🛰️", "24,680🛰️","4,895🛰️","15,664,747🛰️"];
        const gains = ["12.383M", "8.916M", "15.676M", "20.169M", "18.709M", "128.729M", "8.774M", "22.746M"];
        const mineScores = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        return Array.from({ length: 56 }, (_, index) => {
            const gainValue = parseFloat((Math.random() * 125 + 1).toFixed(3)); // gain en millions
            return {
                index,
                timestatus: timestatuses[Math.floor(Math.random() * timestatuses.length)],
                linkattack: "#",
                linkspy: "#",
                elapsedtime: Math.floor(Math.random() * 60) + 1,
                status: statuses[Math.floor(Math.random() * statuses.length)],
                statuslabel: statusLabels[Math.floor(Math.random() * statusLabels.length)],
                gain: gainValue + "M",
                gainNumeric: gainValue, // pour le tri
                coords: coords[Math.floor(Math.random() * coords.length)],
                ships: ships[Math.floor(Math.random() * ships.length)],
                defship: Math.random() < 0.5 ? 0 : Math.floor(Math.random() * 5000) + 1,
                statusplayer: playerStatuses[Math.floor(Math.random() * playerStatuses.length)],
                MineScore: mineScores[Math.floor(Math.random() * mineScores.length)],
                apiKey: crypto.randomUUID()
            };
        });
  }

  function SendSpyProbes() {
   let d;
                                let maxFleetSlots=0;
                                if (localStorage.getItem("cAdditionalDataF")!=null)
                                    d = JSON.parse(localStorage.getItem("cAdditionalDataF"));
                                if (d!=null)
                                    if (d.MxFleetSlot!=null)
                                        maxFleetSlots = d.MxFleetSlot;
                                if(maxFleetSlots==0)
                                    showNotification("maxFleetSlots not defined "+maxFleetSlots,"error","MaxSlot");
                                let fleetList=0;
                                if (document.querySelector("table#eventContent tbody tr.eventFleet")!=null) {
                                    if(document.querySelectorAll('table#eventContent tbody tr.eventFleet[data-return-flight="true"], table#eventContent tbody tr.eventFleet[data-mission-type="4"]')!=null)
                                    {
                                        fleetList=Array.from(document.querySelectorAll('table#eventContent tbody tr.eventFleet[data-return-flight="true"], table#eventContent tbody tr.eventFleet[data-mission-type="4"]')).filter(row => {
                                            const spn = row.querySelector("td.countDown span");
                                            return spn && spn.textContent.trim().toLowerCase()!="done"  && spn.textContent.trim().toLowerCase()!="terminé";
                                        }).length;
                                    }
                                }
                                let FleetSlots = maxFleetSlots - fleetList;

                                if (document.querySelector("div.CatchIna div.CatchNbSlots span")!=null) {
                                    document.querySelector("div.CatchIna div.CatchNbSlots span").innerHTML = FleetSlots;
                                }
                                if (FleetSlots<=0) {
                                    //console.log("NoFleetDispo: "+maxFleetSlots+" "+fleetList);
                                    showNotification("No Fleet slot available!! ("+ FleetSlots +")<br>"+maxFleetSlots+" - " +fleetList,"error","FleetSlots");
                                }
                                else
                                    if (document.querySelector("div.CatchIna .CellIna")!=null) {
                                        const firstVisible = [...document.querySelectorAll('.CatchIna .CellIna')].find(div => window.getComputedStyle(div).display !== 'none');
                                        if (firstVisible) {
                                            const link = firstVisible.querySelector('a');
                                            if (link) {
                                                link.click();
                                            }
                                        }
                                        FleetSlots--;
                                         if (document.querySelector("div.CatchIna div.CatchNbSlots span")!=null) {
                                             document.querySelector("div.CatchIna div.CatchNbSlots span").innerHTML = FleetSlots;
                                         }
                                    }

  }

  const SPY_REPORT_STORAGE_KEY = "cAdditionalSpyReports";
  let spyReportsVisible = false;
  let spyReportProcessing = false;
  const SPY_REPORT_CATEGORY_NAMES = ["EnnemySpy", "Target1", "Target2", "Target3", "Target4"];
  const SPY_REPORT_RESOURCE_THRESHOLD = 1500000;

  function getSpyReportStore() {
      const saved = localStorage.getItem(SPY_REPORT_STORAGE_KEY);
      if (saved == null) {
          return { version: 1, updatedAt: null, reports: [] };
      }

      try {
          const parsed = JSON.parse(saved);
          if (parsed && Array.isArray(parsed.reports)) {
              const previous = JSON.stringify(parsed);
              updateSpyReportCategories(parsed);
              if (JSON.stringify(parsed) !== previous) {
                  try {
                      localStorage.setItem(SPY_REPORT_STORAGE_KEY, JSON.stringify(parsed));
                  } catch (error) {
                      console.error("Impossible de mettre à jour les catégories des rapports.", error);
                      showNotification("Impossible de mettre à jour les catégories dans localStorage.","error","Spy reports");
                  }
              }
              return parsed;
          }
          throw new Error("Le format de la liste des rapports est invalide.");
      } catch (error) {
          console.error("Impossible de lire les rapports d'espionnage sauvegardés.", error);
          showNotification("La liste des rapports d'espionnage est invalide.","error","Spy reports");
          return null;
      }
  }

  function getSpyNumber(value) {
      const digits = String(value).replace(/[^\d]/g, "");
      return digits ? parseInt(digits, 10) : null;
  }

  function getSpyResource(text, labels) {
      const labelPattern = "(?:" + labels.join("|") + ")";
      const numberPattern = "([\\d]+(?:[\\s.,][\\d]{3})*)";
      let match = new RegExp(labelPattern + "[^\\d]{0,30}" + numberPattern, "i").exec(text);
      if (!match) {
          match = new RegExp(numberPattern + "\\s*" + labelPattern, "i").exec(text);
      }
      return match ? getSpyNumber(match[1]) : null;
  }

  function getSpyReportAttributes(element) {
      const attributes = {};
      Array.from(element.attributes).forEach(attribute => {
          attributes[attribute.name] = attribute.value;
      });
      return attributes;
  }

  function getSpyJsonValue(value) {
      if (value == null || value === "" || value === "-") return null;
      try {
          return JSON.parse(value);
      } catch (error) {
          console.error("Données JSON invalides dans un rapport d'espionnage.", error);
          return null;
      }
  }

  function getSpyUnitCount(units) {
      if (Array.isArray(units)) {
          return units.reduce((total, unit) => total + getSpyUnitCount(unit), 0);
      }
      if (units && typeof units === "object") {
          return Object.values(units).reduce((total, unit) => total + getSpyUnitCount(unit), 0);
      }
      const count = Number(units);
      return Number.isFinite(count) && count > 0 ? count : 0;
  }

  function getSpyReportFacts(report) {
      const rawData = report.rawData || {};
      const resources = report.resources || {};
      const fleetUnits = getSpyJsonValue(rawData["data-raw-fleet"]) || {};
      const defenseUnits = getSpyJsonValue(rawData["data-raw-defense"]) || {};
      const fleetUnitCount = getSpyUnitCount(fleetUnits);
      const defenseUnitCount = getSpyUnitCount(defenseUnits);
      const fleetWeight = getSpyNumber(rawData["data-raw-fleetvalue"]);
      const defenseWeight = getSpyNumber(rawData["data-raw-defensevalue"]);
      const rawResourcesTotal = getSpyNumber(rawData["data-raw-resources"]);
      const resourcesTotal = rawResourcesTotal === null
          ? (resources.metal || 0) + (resources.crystal || 0) + (resources.deuterium || 0)
          : rawResourcesTotal;
      const rawPlayerStatus = getSpyJsonValue(rawData["data-raw-playerstatus"]);
      const playerStatus = Array.isArray(rawPlayerStatus)
          ? rawPlayerStatus.map(status => String(status))
          : (rawPlayerStatus && typeof rawPlayerStatus === "object"
              ? Object.values(rawPlayerStatus).map(status => String(status))
              : (rawData["data-raw-playerstatus"] && rawData["data-raw-playerstatus"] !== "-"
                  ? [String(rawData["data-raw-playerstatus"])]
                  : []));
      const isInactive = playerStatus.some(status => /inactive/i.test(status));
      const enemySpy = Boolean(report.enemySpy)
          || /ogl-spyReportTargetIsSelf/.test((report.attributes && report.attributes.class) || "");
      const hasFleet = fleetUnitCount > 0 || (fleetWeight !== null && fleetWeight > 0);
      const hasDefense = defenseUnitCount > 0 || (defenseWeight !== null && defenseWeight > 0);
      let category = "Target2";
      if (enemySpy) {
          category = "EnnemySpy";
      } else if (resourcesTotal < SPY_REPORT_RESOURCE_THRESHOLD) {
          category = "Target4";
      } else if (hasFleet || hasDefense) {
          category = "Target3";
      } else if (isInactive) {
          category = "Target1";
      }

      return {
          category,
          resourcesTotal,
          fleet: {
              weight: fleetWeight === null || (fleetWeight === 0 && fleetUnitCount > 0) ? fleetUnitCount : fleetWeight,
              units: fleetUnits,
              count: fleetUnitCount
          },
          defense: {
              weight: defenseWeight === null || (defenseWeight === 0 && defenseUnitCount > 0) ? defenseUnitCount : defenseWeight,
              units: defenseUnits,
              count: defenseUnitCount
          },
          playerStatus,
          isInactive,
          enemySpy,
          targetPlanetType: Number(rawData["data-raw-targetplanettype"]) || (report.locationType === "moon" ? 3 : 1)
      };
  }

  function updateSpyReportCategories(store) {
      const categories = {};
      SPY_REPORT_CATEGORY_NAMES.forEach(category => {
          categories[category] = [];
      });

      store.reports.forEach(report => {
          const facts = getSpyReportFacts(report);
          Object.assign(report, facts);
          const savedFleet = {};
          Object.keys(report.fleetToSend || {}).forEach(shipId => {
              const count = Number(report.fleetToSend[shipId]);
              if (/^\d+$/.test(shipId) && Number.isSafeInteger(count) && count > 0) {
                  savedFleet[shipId] = count;
              }
          });
          report.fleetToSend = savedFleet;
          if (!categories[report.category]) {
              categories[report.category] = [];
          }
          categories[report.category].push(report.key);
      });

      store.categories = categories;
  }

  function persistSpyReportStore(store, errorMessage) {
      updateSpyReportCategories(store);
      store.updatedAt = new Date().toISOString();
      try {
          localStorage.setItem(SPY_REPORT_STORAGE_KEY, JSON.stringify(store));
          return true;
      } catch (error) {
          console.error(errorMessage, error);
          showNotification("Impossible d'enregistrer la modification des rapports dans localStorage.","error","Spy reports");
          return false;
      }
  }

  function isSpyReportExpired(report, now = Date.now()) {
      const expiry = Date.parse(report.expiresAt || "");
      if (!isNaN(expiry)) return expiry <= now;
      const reportTime = Date.parse(report.reportedAt || report.scannedAt || "");
      return !isNaN(reportTime) && reportTime + 60 * 60 * 1000 <= now;
  }

  function getSpyReportFleetSelection(report) {
      const selectedShipIds = new Set();
      document.querySelectorAll("span.ogl-option.ogl-fleet-ship.choice").forEach(option => {
          Array.from(option.classList).forEach(className => {
              const match = className.match(/^ogl-fleet-(\d+)$/);
              if (match) selectedShipIds.add(match[1]);
          });
      });
      if (selectedShipIds.size === 0) return {};

      const normalizeCoordinates = value => {
          const match = String(value || "").match(/(\d{1,2})\s*:\s*(\d{1,3})\s*:\s*(\d{1,2})/);
          return match ? `${match[1]}:${match[2]}:${match[3]}` : null;
      };
      const reportIds = [
          report.rawData && report.rawData["data-raw-hashcode"],
          report.messageId
      ].filter(Boolean);
      const reportRows = Array.from(document.querySelectorAll("tr[data-report-id]"));
      let reportRow = reportIds.length > 0
          ? reportRows.find(row => reportIds.includes(row.getAttribute("data-report-id")))
          : null;
      if (!reportRow) {
          reportRow = reportRows.find(row => {
              const cell = row.querySelector("td.ogl-cargo-choice[data-coords]");
              return cell && normalizeCoordinates(cell.getAttribute("data-coords")) === report.coordinates;
          });
      }

      let cargoCell = reportRow && reportRow.querySelector("td.ogl-cargo-choice[data-coords]");
      if (cargoCell && normalizeCoordinates(cargoCell.getAttribute("data-coords")) !== report.coordinates) {
          cargoCell = null;
      }
      if (!cargoCell) {
          cargoCell = reportRows.map(row => row.querySelector("td.ogl-cargo-choice[data-coords]"))
              .find(cell => cell && normalizeCoordinates(cell.getAttribute("data-coords")) === report.coordinates);
      }
      if (!cargoCell) return {};

      const selectedShips = {};
      selectedShipIds.forEach(shipId => {
          const count = Number(cargoCell.getAttribute(`data-ship-${shipId}`));
          if (Number.isSafeInteger(count) && count > 0) {
              selectedShips[shipId] = count;
          }
      });
      return selectedShips;
  }

  function getSpyReportTimestamp(value) {
      if (!value) return null;
      if (/^\d{10}$/.test(value)) return new Date(parseInt(value, 10) * 1000);
      if (/^\d{13}$/.test(value)) return new Date(parseInt(value, 10));
      const timestamp = Date.parse(value);
      return isNaN(timestamp) ? null : new Date(timestamp);
  }

  function scanSpyReports() {
      if (currentPage !== "messages") return null;

      const store = getSpyReportStore();
      if (store == null) return null;

      const now = new Date();
      const nowMs = now.getTime();
      let added = 0;
      let updated = 0;
      const scannedSpyMessages = [];
      const messages = document.querySelectorAll("#messages div.messagesHolder div.msg");

      messages.forEach((message, index) => {
          const rawText = (message.innerText || message.textContent || "").trim();
          const rawDataElement = message.querySelector(".rawMessageData");
          const rawData = rawDataElement ? getSpyReportAttributes(rawDataElement) : {};
          const enemySpy = message.classList.contains("ogl-spyReportTargetIsSelf");
          const reportTitle = message.querySelector(".msgTitle");
          const titleText = reportTitle ? reportTitle.textContent : "";
          const attributeValues = [message.outerHTML];
          [message, ...message.querySelectorAll("*")].forEach(element => {
              Array.from(element.attributes).forEach(attribute => attributeValues.push(attribute.value));
          });
          const searchableText = rawText + " " + attributeValues.join(" ");
          const filteredCoordinates = message.getAttribute("data-messages-filters-coordinates");
          const rawCoordinates = rawData["data-raw-coordinates"];
          const coordinateMatch = searchableText.match(/\[?(\d{1,2})\s*:\s*(\d{1,3})\s*:\s*(\d{1,2})\]?/);
          const coordinates = coordinateMatch
              ? (rawCoordinates || (filteredCoordinates && filteredCoordinates.replace(/[\[\]]/g, "")) || `${coordinateMatch[1]}:${coordinateMatch[2]}:${coordinateMatch[3]}`)
              : (rawCoordinates || (filteredCoordinates && filteredCoordinates.replace(/[\[\]]/g, "")) || "");
          const planetType = rawData["data-raw-targetplanettype"];
          const locationType = planetType === "3" || /\b(moon|lune)\b/i.test(rawText) ? "moon" : "planet";
          const messageId = message.getAttribute("data-msg-id") || String(index + 1);
          const key = coordinates ? `coords:${coordinates}:${locationType}${enemySpy ? ":enemy" : ""}` : `message:${messageId}`;
          const resources = {
              metal: getSpyNumber(rawData["data-raw-metal"]) ?? getSpyResource(rawText, ["metal", "m[eé]tal"]),
              crystal: getSpyNumber(rawData["data-raw-crystal"]) ?? getSpyResource(rawText, ["crystal", "cristal"]),
              deuterium: getSpyNumber(rawData["data-raw-deuterium"]) ?? getSpyResource(rawText, ["deuterium", "deut[eé]rium", "deut"])
          };
          const rawLoot = rawData["data-raw-loot"];
          const rawLootPercent = /^\d+$/.test(rawLoot || "") ? parseInt(rawLoot, 10) : null;
          const isSpyReport = enemySpy
              || (rawDataElement && [50, 75, 100].includes(rawLootPercent))
              || /espionage report|rapport d['’ ]espionnage/i.test(titleText);
          if (!coordinates || !isSpyReport) return;

          const lootMatch = searchableText.match(/(?:loot|plunder|butin|pillage)[^\n%]{0,60}\b(50|75|100)\s*%/i)
              || searchableText.match(/\b(50|75|100)\s*%/);
          const lootPercent = [50, 75, 100].includes(rawLootPercent)
              ? rawLootPercent
              : (lootMatch ? parseInt(lootMatch[1], 10) : null);
          const reportTimeElement = message.querySelector("time[datetime]");
          const reportTimeValue = (reportTimeElement && reportTimeElement.getAttribute("datetime"))
              || rawData["data-raw-timestamp"]
              || message.getAttribute("data-date")
              || message.getAttribute("data-timestamp");
          const reportDate = getSpyReportTimestamp(reportTimeValue);
          const reportTimeMs = reportDate ? reportDate.getTime() : NaN;
          const reportedAt = reportDate ? reportDate.toISOString() : null;
          const existingIndex = store.reports.findIndex(report => report.key === key);
          const existingReport = existingIndex === -1 ? null : store.reports[existingIndex];
          const liveFleetSelection = getSpyReportFleetSelection({ coordinates, messageId, rawData });
          let expiresAt = new Date((reportedAt ? reportTimeMs : nowMs) + 60 * 60 * 1000).toISOString();
          if (!reportedAt && existingReport && existingReport.rawText === rawText && existingReport.expiresAt) {
              expiresAt = existingReport.expiresAt;
          }
          const reportData = {
              key,
              messageId,
              coordinates: coordinates || null,
              locationType,
              targetPlanetType: Number(planetType) || (locationType === "moon" ? 3 : 1),
              resources,
              resourcesTotal: getSpyNumber(rawData["data-raw-resources"]),
              lootPercent,
              loot: lootPercent === null
                  ? null
                  : {
                      metal: resources.metal === null ? null : Math.floor(resources.metal * lootPercent / 100),
                      crystal: resources.crystal === null ? null : Math.floor(resources.crystal * lootPercent / 100),
                      deuterium: resources.deuterium === null ? null : Math.floor(resources.deuterium * lootPercent / 100)
                  },
              scannedAt: now.toISOString(),
              reportedAt,
              expiresAt,
              enemySpy,
              fleetToSend: Object.keys(liveFleetSelection).length > 0
                  ? liveFleetSelection
                  : (existingReport && existingReport.fleetToSend ? existingReport.fleetToSend : {}),
              rawText,
              rawHtml: message.innerHTML,
              attributes: getSpyReportAttributes(message),
              rawData
          };
          Object.assign(reportData, getSpyReportFacts(reportData));

          if (existingIndex === -1) {
              store.reports.push(reportData);
              added++;
          } else {
              store.reports[existingIndex] = reportData;
              updated++;
          }
          scannedSpyMessages.push({ message, key });
      });

      updateSpyReportCategories(store);
      store.updatedAt = now.toISOString();
      try {
          localStorage.setItem(SPY_REPORT_STORAGE_KEY, JSON.stringify(store));
      } catch (error) {
          console.error("Impossible de sauvegarder les rapports d'espionnage.", error);
          showNotification("Impossible de sauvegarder les rapports d'espionnage dans localStorage.","error","Spy reports");
          return null;
      }

      let persistedStore;
      try {
          persistedStore = JSON.parse(localStorage.getItem(SPY_REPORT_STORAGE_KEY) || "null");
      } catch (error) {
          console.error("Impossible de vérifier les rapports sauvegardés.", error);
          showNotification("La sauvegarde des rapports n'a pas pu être vérifiée ; aucun message ne sera supprimé.","error","Spy reports");
          return null;
      }
      const persistedKeys = new Set(
          persistedStore && Array.isArray(persistedStore.reports)
              ? persistedStore.reports.map(report => report.key)
              : []
      );
      const messagesToDelete = scannedSpyMessages
          .filter(candidate => persistedKeys.has(candidate.key))
          .map(candidate => candidate.message);
      if (messagesToDelete.length !== scannedSpyMessages.length) {
          console.error("Certains rapports d'espionnage n'ont pas été retrouvés dans la sauvegarde.", {
              scanned: scannedSpyMessages.length,
              persisted: messagesToDelete.length
          });
          showNotification("La sauvegarde de tous les rapports n'a pas pu être confirmée ; aucun message ne sera supprimé.","error","Spy reports");
          return null;
      }

      showNotification(`${added} nouveau(x) rapport(s), ${updated} actualisé(s).`,"info","Spy reports");
      return { store, messagesToDelete };
  }

  function formatSpyMagnitude(value) {
      if (value == null || !Number.isFinite(Number(value))) return "--";
      const amount = Number(value);
      if (amount === 0) return "0";
      if (amount > 700000000000) return `${(amount / 1000000000000).toFixed(2)}T`;
      if (amount > 700000000) return `${(amount / 1000000000).toFixed(2)}B`;
      return `${(amount / 1000000).toFixed(2)}M`;
  }

  function formatSpyForceMagnitude(value) {
      if (value == null || !Number.isFinite(Number(value))) return "--";
      const amount = Number(value);
      if (amount === 0) return "0";
      if (amount > 0 && amount < 1000000) return `${(amount / 1000).toFixed(2)}k`;
      return formatSpyMagnitude(amount);
  }

  function getSpyReportAgeColor(ageMinutes) {
      if (ageMinutes === null) return "#777";
      if (ageMinutes <= 15) return "#006400";
      if (ageMinutes <= 30) return "#ff8c00";
      if (ageMinutes <= 45) return "#1e90ff";
      return "#808080";
  }

  function getActiveSpyMissions() {
      const activeMissions = new Map();
      document.querySelectorAll("#eventContent tr.eventFleet").forEach(fleet => {
          const missionId = fleet.getAttribute("data-mission-type");
          if (missionId !== "1" && missionId !== "6") return;

          const countdown = fleet.querySelector("td.countDown");
          if (countdown && /^(done|terminé)$/i.test(countdown.textContent.trim())) return;

          const targetLink = fleet.querySelector("td.destCoords a");
          const match = targetLink && targetLink.textContent.match(/(\d{1,2})\s*:\s*(\d{1,3})\s*:\s*(\d{1,2})/);
          if (!match) return;

          const coordinates = `${match[1]}:${match[2]}:${match[3]}`;
          const targetIcon = fleet.querySelector("td.destFleet .planetIcon");
          const locationType = targetIcon && targetIcon.classList.contains("moon") ? "moon" : "planet";
          activeMissions.set(coordinates, {
              missionId,
              locationType,
              returning: fleet.getAttribute("data-return-flight") === "true"
          });
      });
      return activeMissions;
  }

  function getSpyReportDisplayRows(store) {
      updateSpyReportCategories(store);
      const activeMissions = getActiveSpyMissions();

      return store.reports.slice().sort((a, b) => {
          const categoryDifference = SPY_REPORT_CATEGORY_NAMES.indexOf(a.category) - SPY_REPORT_CATEGORY_NAMES.indexOf(b.category);
          const resourceDifference = getSpyReportFacts(b).resourcesTotal - getSpyReportFacts(a).resourcesTotal;
          return categoryDifference
              || resourceDifference
              || String(a.coordinates || a.messageId).localeCompare(String(b.coordinates || b.messageId));
      }).map(report => {
          const facts = getSpyReportFacts(report);
          const reportTime = Date.parse(report.reportedAt || report.scannedAt);
          const ageMinutes = isNaN(reportTime) ? null : Math.max(0, Math.floor((Date.now() - reportTime) / 60000));
          const activeMission = activeMissions.get(report.coordinates);
          const displayResources = report.loot || report.resources || {};
          const rawCounterEspionage = (report.rawData || {})["data-raw-counterespionagechance"];
          const counterEspionageFallback = (report.attributes || {})["data-messages-filters-counterespionagechance"];
          const parsedRawCounterEspionage = getSpyNumber(rawCounterEspionage);
          const parsedCounterEspionage = parsedRawCounterEspionage === null
              ? getSpyNumber(counterEspionageFallback)
              : parsedRawCounterEspionage;
          const resourceTotal = ["metal", "crystal", "deuterium"].reduce(
              (total, key) => total + (Number(displayResources[key]) || 0),
              0
          );
          const forceWeight = facts.fleet.weight + facts.defense.weight;
          return {
              report,
              facts,
              resources: displayResources,
              resourceTotal,
              resourceTotalDisplay: formatSpyMagnitude(resourceTotal),
              resourceDisplay: {
                  metal: formatSpyMagnitude(displayResources.metal),
                  crystal: formatSpyMagnitude(displayResources.crystal),
                  deuterium: formatSpyMagnitude(displayResources.deuterium)
              },
              forceWeight,
              forceDisplay: formatSpyForceMagnitude(forceWeight),
              counterEspionageChance: parsedCounterEspionage === null
                  ? null
                  : Math.max(0, Math.min(100, parsedCounterEspionage)),
              ageMinutes,
              ageColor: getSpyReportAgeColor(ageMinutes),
              activeMission: activeMission || null
          };
      });
  }

  function toggleSpyReportList() {
      if (currentPage !== "messages") return;
      if (typeof window.toggleInfoComptePlusSpyReportView !== "function") {
          showNotification("L'affichage des rapports n'est pas disponible.","error","Spy reports");
          return;
      }
      window.toggleInfoComptePlusSpyReportView(!spyReportsVisible);
  }

  function getSpyMessageDeleteButton(message) {
      const messageId = message.getAttribute("data-msg-id");
      if (messageId) {
          const spyTableTrash = Array.from(document.querySelectorAll("button.icon.icon_trash[data-id]"))
              .find(button => button.getAttribute("data-id") === messageId);
          if (spyTableTrash) return spyTableTrash;
      }
      return message.querySelector("button.msgDeleteBtn[data-message-id], button.msgDeleteBtn");
  }

  async function processSpyReports() {
      if (currentPage !== "messages" || spyReportProcessing) return;
      spyReportProcessing = true;

      try {
          if (typeof window.toggleInfoComptePlusSpyReportView !== "function"
              || !window.toggleInfoComptePlusSpyReportView(false)) {
              return;
          }
          if (!document.querySelector("#messages div.messagesHolder")) {
              showNotification("Conteneur messagesHolder introuvable ; aucun rapport n'a été traité.","error","Spy reports");
              return;
          }
          const scanResult = scanSpyReports();
          if (!scanResult) return;

          const deleteTargets = scanResult.messagesToDelete.map(message => ({
              message,
              button: getSpyMessageDeleteButton(message)
          }));
          const missingButtons = deleteTargets.filter(target => !target.button);
          if (missingButtons.length > 0) {
              console.error("Bouton de suppression introuvable pour certains rapports sauvegardés.", {
                  messageIds: missingButtons.map(({ message }) => message.getAttribute("data-msg-id"))
              });
              showNotification(`${missingButtons.length} rapport(s) sauvegardé(s) sans bouton de suppression ; aucun message ne sera supprimé.`,"error","Spy reports");
              return;
          }

          if (deleteTargets.length > 0) {
              showNotification(`Suppression progressive de ${deleteTargets.length} rapport(s) sauvegardé(s)...`,"info","Spy reports");
          }
          for (let index = 0; index < deleteTargets.length; index++) {
              const target = deleteTargets[index];
              const deleteButton = getSpyMessageDeleteButton(target.message);
              if (!deleteButton || !deleteButton.isConnected) {
                  if (target.message.isConnected) {
                      throw new Error(`Le bouton de suppression du message ${target.message.getAttribute("data-msg-id")} n'est plus disponible.`);
                  }
              } else {
                  deleteButton.click();
              }
              await new Promise(resolve => setTimeout(resolve, 800 + Math.floor(Math.random() * 501)));
          }

          const remainingMessages = deleteTargets.filter(({ message }) => message.isConnected);
          if (remainingMessages.length > 0) {
              showNotification(`${remainingMessages.length} rapport(s) restent dans la boîte ; la liste n'a pas été affichée.`,"error","Spy reports");
              return;
          }

          if (typeof window.toggleInfoComptePlusSpyReportView !== "function"
              || !window.toggleInfoComptePlusSpyReportView(true)) {
              showNotification("Les rapports sont sauvegardés, mais leur affichage dans les messages a échoué.","error","Spy reports");
              return;
          }
          showNotification(`${deleteTargets.length} rapport(s) supprimé(s) après sauvegarde. Appuyez sur T pour revenir aux messages.`,"success","Spy reports");
      } catch (error) {
          console.error("Échec du traitement des rapports d'espionnage.", error);
          showNotification("Le traitement des rapports d'espionnage a été interrompu. Consultez la console pour le détail.","error","Spy reports");
      } finally {
          spyReportProcessing = false;
      }
  }

  window.getInfoComptePlusSpyReportState = function() {
      const store = getSpyReportStore();
      const expiredCounts = {};
      SPY_REPORT_CATEGORY_NAMES.forEach(category => {
          expiredCounts[category] = store
              ? store.reports.filter(report => report.category === category && isSpyReportExpired(report)).length
              : 0;
      });
      return {
          visible: spyReportsVisible,
          rows: store ? getSpyReportDisplayRows(store) : [],
          sortByCategory: store && store.sortByCategory && typeof store.sortByCategory === "object"
              ? store.sortByCategory
              : {},
          expiredCounts
      };
  };
  window.setInfoComptePlusSpyReportsVisible = function(visible) {
      spyReportsVisible = Boolean(visible);
  };
  window.deleteInfoComptePlusSpyReport = function(reportKey) {
      const store = getSpyReportStore();
      if (!store) return false;
      const remainingReports = store.reports.filter(report => report.key !== reportKey);
      if (remainingReports.length === store.reports.length) return false;
      store.reports = remainingReports;
      return persistSpyReportStore(store, "Impossible de supprimer un rapport d'espionnage.");
  };
  window.deleteInfoComptePlusSpyReportCategory = function(category, expiredOnly) {
      if (!SPY_REPORT_CATEGORY_NAMES.includes(category)) {
          console.error(`Catégorie de rapports invalide : ${category}`);
          showNotification("Catégorie de rapports invalide.","error","Spy reports");
          return null;
      }
      const store = getSpyReportStore();
      if (!store) return null;
      const now = Date.now();
      const removedReports = store.reports.filter(report =>
          report.category === category && (!expiredOnly || isSpyReportExpired(report, now))
      );
      if (removedReports.length === 0) return 0;
      const removedKeys = new Set(removedReports.map(report => report.key));
      store.reports = store.reports.filter(report => !removedKeys.has(report.key));
      return persistSpyReportStore(store, "Impossible de supprimer des rapports d'espionnage.")
          ? removedReports.length
          : null;
  };
  window.setInfoComptePlusSpyReportSort = function(category, field, direction) {
      const sortableFields = ["resourcesTotal", "metal", "crystal", "deuterium", "age"];
      if (!SPY_REPORT_CATEGORY_NAMES.includes(category)
          || !sortableFields.includes(field)
          || !["asc", "desc"].includes(direction)) {
          console.error("Paramètres de tri des rapports invalides.", { category, field, direction });
          showNotification("Paramètres de tri invalides.","error","Spy reports");
          return false;
      }
      const store = getSpyReportStore();
      if (!store) return false;
      if (!store.sortByCategory || typeof store.sortByCategory !== "object") {
          store.sortByCategory = {};
      }
      store.sortByCategory[category] = { field, direction };
      return persistSpyReportStore(store, "Impossible de mémoriser le tri des rapports.");
  };

  window.getInfoComptePlusFleetSelection = function(report) {
      const liveSelection = getSpyReportFleetSelection(report);
      if (Object.keys(liveSelection).length > 0) return liveSelection;
      return report.fleetToSend || {};
  };

  if (!window.infoComptePlusKeyboardInstalled) {
    window.infoComptePlusKeyboardInstalled = true;
    window.addEventListener("keydown", function(e) {
        if (e.ctrlKey || e.altKey || e.metaKey) return;
        if (e.repeat) return;
        var char = e.which || e.keyCode;
        if (!char) return;
        switch (char) {
            case 46: // Delete
                //console.log("currentPage: "+currentPage);
                if (currentPage=="trader") {
                    if (document.querySelector("a.pay")!=null) document.querySelector("a.pay").style = "position:absolute;top:40px;left:410px;width:100px;";
                    if (document.querySelector("div.left_content")!=null) document.querySelector("div.left_content").innerHTML="<div class=\"hclock\" style=\"color:yellow;margin-left:20px;\">00.00.0000 <span>00:00:00</span></div><div class=\"hclockspot\" style=\"color:#99CC00;margin-left:20px;margin-top:3px;\">HH:mm:ss</div>"+document.querySelector("div.left_content").innerHTML;
                    setInterval(refreshOgClock, 147);

                    cAdditionalData.Status="Status"
                    cAdditionalData.Item="Item"
                    cAdditionalData.targetTiming="Target"
                    cAdditionalData.BidingCost="BidingCost"
                    cAdditionalData.NumberOfBids="NumberOfBids"
                    cAdditionalData.LastBider="LastBider"
                    cAdditionalData.LastRefresh="LastRefresh"

                    if (document.querySelector("div.left_box div.left_header h2")!=null)
                    {
                        cAdditionalData.Status = document.querySelector("div.left_box div.left_header h2").innerHTML;
                        if (cAdditionalData.Status=="Vente terminée" || cAdditionalData.Status=="Auction completed")
                            cAdditionalData.Status="Closed";
                        else
                            cAdditionalData.Status = "Opened";
                    }
                    if (document.querySelector("div.left_content div.image_140px img")!=null) {
                        cAdditionalData.Item = document.querySelector("div.left_content div.image_140px img").alt;
                        switch (cAdditionalData.Item ) {
                            case "Booster de métal en or": cAdditionalData.Item = "Metal 30%"; break;
                            case "Booster de deutérium en or": cAdditionalData.Item = "Deut 30%"; break;
                            case "Booster de cristal en or": cAdditionalData.Item = "Cristal 30%"; break;
                            case "Booster de métal en argent": cAdditionalData.Item = "Metal 20%"; break;
                            case "Booster de deutérium en argent": cAdditionalData.Item = "Deut 20%"; break;
                            case "Booster de cristal en argent": cAdditionalData.Item = "Cristal 20%"; break;
                            case "Booster de métal en bronze": cAdditionalData.Item = "Metal 10%"; break;
                            case "Booster de deutérium en bronze": cAdditionalData.Item = "Deut 10%"; break;
                            case "Booster de cristal en bronze": cAdditionalData.Item = "Cristal 10%"; break;
                            case "Boosteur de métal en platine": cAdditionalData.Item = "Metal 40%"; break;
                            case "Booster de deutérium en platine": cAdditionalData.Item = "Deut 40%"; break;
                            case "Booster de cristal en platine": cAdditionalData.Item = "Cristal 40%"; break;
                            case "Boosteurs d`énergie en bronze": cAdditionalData.Item = "Energy 20%"; break;
                            case "Boosteurs d`énergie en argent": cAdditionalData.Item = "Energy 40%"; break;
                            case "Boosteurs d`énergie en or": cAdditionalData.Item = "Energy 60%"; break;
                            case "Boosteurs d`énergie en platine": cAdditionalData.Item = "Energy 80%"; break;
                            case "NEWTRON en bronze": cAdditionalData.Item = "Research 30mn"; break;
                            case "NEWTRON en argent": cAdditionalData.Item = "Research 2h"; break;
                            case "NEWTRON en or": cAdditionalData.Item = "Research 6h"; break;
                            case "NEWTRON en platine": cAdditionalData.Item = "Research 1j"; break;
                            case "KRAKEN en bronze": cAdditionalData.Item = "Building 30mn"; break;
                            case "KRAKEN en argent": cAdditionalData.Item = "Building 2h"; break;
                            case "KRAKEN en or": cAdditionalData.Item = "Building 6h"; break;
                            case "KRAKEN en platine": cAdditionalData.Item = "Building 1j"; break;
                            case "DETROID en bronze": cAdditionalData.Item = "Shipyard 30mn"; break;
                            case "DETROID en argent": cAdditionalData.Item = "Shipyard 2h"; break;
                            case "DETROID en or": cAdditionalData.Item = "Shipyard 6h"; break;
                            case "DETROID en platine": cAdditionalData.Item = "Shipyard 1j"; break;
                            default : break;
                        }
                    }
                    if (document.querySelector("div.left_content p.auction_info span span")!=null)
                        cAdditionalData.targetTiming = document.querySelector("div.left_content p.auction_info span span").innerHTML.replace("approx. ", "").replace("m","");
                    if (document.querySelector("div.left_content div.currentSum")!=null)
                        cAdditionalData.BidingCost = document.querySelector("div.left_content div.currentSum").innerHTML;
                    if (document.querySelector("div.left_content div.numberOfBids")!=null)
                        cAdditionalData.NumberOfBids = document.querySelector("div.left_content div.numberOfBids").innerHTML;
                    if (document.querySelector("div.left_content a.currentPlayer")!=null)
                        cAdditionalData.LastBider  = document.querySelector("div.left_content a.currentPlayer").innerHTML.trim();
                    const now = new Date();
                    let spotTiming=30;
                    if (cAdditionalData.Status == "Opened") {
                        spotTiming= parseInt(cAdditionalData.targetTiming,10) + now.getMinutes()-5-1;
                        cAdditionalData.targetTiming=String(now.getHours()).padStart(2, '0')+":"+String(spotTiming).padStart(2, '0')+":30";
                    }
                    else {
                        spotTiming= 30;
                        let spothour =now.getHours()+1;
                        if (spothour==24)
                            spothour=0;
                        cAdditionalData.targetTiming=String(spothour).padStart(2, '0')+":"+String(spotTiming).padStart(2, '0')+":00";
                    }

                    cAdditionalData.LastRefresh = getCurrentTimeFormatted("2");

                    /*console.log("cItem: " + cAdditionalData.Item);
                console.log("cStatus: " + cAdditionalData.Status);
                console.log("ctargetTiming: " + cAdditionalData.targetTiming);
                console.log("cBidingCost: " + cAdditionalData.BidingCost + " (" + cAdditionalData.NumberOfBids + ")");
                console.log("cLastBider: " + cAdditionalData.LastBider );
                console.log("cLastRefresh: " + cAdditionalData.LastRefresh);
                */

                    localStorage.setItem("cAdditionalData",JSON.stringify(cAdditionalData));
                    //const donnees = JSON.parse(localStorage.getItem("cAdditionalData"));

                }
                break;
            case 36: // Home
                if (currentPage=="trader") {

                }
                break;
            case 65: // a
                //console.log("Page: " + currentPage);
                if (currentPage=="trader")
                    document.querySelector("a.js_sliderMetalMax").click();
                else
                    if (currentPage=="messages") {
                        let cssToAdd =".cards-row{width:670px;display:flex;gap:5px;flex-wrap:wrap;border:1px solid #666;background: #2b2b2b;}.target-card{position:relative;border:2px solid #666;border-radius:12px;width:82px;background:linear-gradient(145deg,#383838,#404040);box-shadow:0 3px 8px rgba(0,0,0,.4);overflow:hidden}.target-meta,.time-label{display:flex;position:absolute}.target-card.time-ok{border-color:#28a745}.target-card.time-medium{border-color:#fd7e14}.target-card.time-height{border-color:#ffc107}.target-card.time-expired{border-color:#666}.target-card.time-alert{border-color:#6c0f11}.target-meta{top:0;left:0;right:0;justify-content:space-between;align-items:center;padding:4px 6px;background:linear-gradient(180deg,#3b3b3b,#141e26);border-bottom:1px solid #555;z-index:10;gap:4px}.actions-left{display:flex;gap:4px}.square-btn{width:20px;height:20px;display:flex;align-items:center;justify-content:center;border:1px solid #292c32;border-radius:6px;font-size:.75em;text-decoration:none;background:linear-gradient(145deg,#505050,#585858);color:#e0e0e0;transition:background .2s,transform .2s}.square-btn:hover{background:linear-gradient(145deg,#606060,#686868);transform:scale(1.1)}.time-label{font-size:.56em;font-weight:700;width:12px;height:12px;align-items:center;justify-content:center;border:1px solid #f90;border-radius:2px;padding:0;background:#232323;color:#f90;top:2px;right:2px;pointer-events:none;z-index:12}.target-main{display:block;text-decoration:none;color:inherit;padding:35px 5px 5px;background:#2b3645;transition:background .2s;position:relative;height:21px;border-radius:0 0 12px 12px}.target-main:hover{background:#344055}.target-main>div{margin:0;text-align:left;padding-left:1px;font-size:.76em;line-height:1em}.target-gain{color:#3cc}.target-ships{color:#6c6}.target-coords{color:#c6c;display:none}.target-main:hover .target-coords,.target-ships{display:block}.target-main:hover .target-ships{display:none}.status-label{position:absolute;top:16px;right:0;border:none;border-radius:5px;padding:1px;background:0 0;font-size:.65em;text-align:center;pointer-events:none;z-index:11}.statusplayer-A{color:orange}.statusplayer-s{color:red}.statusplayer-n{color:#0f0}.statusplayer-o{color:#ff00ff}.statusplayer-v{color:#0ff}.statusplayer-b{color:#fff;text-decoration:line-through}.statusplayer-I,.statusplayer-i{color:gray}.statusplayer-hp{color:#ff0}";
                        const data = { "legend": {
                            "statusplayer": {
                                "A": "Administrator",
                                "s": "Stronger player",
                                "n": "Weaker player (newbie)",
                                "o": "Outlaw (temporary)",
                                "v": "Vacation mode",
                                "b": "Banned",
                                "i": "7 day inactive",
                                "I": "28 day inactive",
                                "hp": "Honorable target"
                            },
                            "status": {
                                "⚔️": "Target available for attack",
                                "💥": "Target has been attacked",
                                "⏳": "Target is waiting",
                                "❌": "Target expired",
                                "❓": "Unknown target"
                            },
                            "statuslabel": {
                                "AttackInProgress": "Target currently being attacked",
                                "Attacked": "Target has already been attacked",
                                "Waiting": "Target is in waiting state",
                                "Expired": "Target has expired",
                                "Unkown": "Target status unknown"
                            },
                            "timestatus": {
                                "ok": "Elapsed time ≤ 15 min",
                                "medium": "Elapsed time ≤ 30 min",
                                "height": "Elapsed time ≤ 45 min",
                                "expired": "Elapsed time > 45 min",
                                "alert": "Target has defenses (defship > 0)"
                            },
                            "defship": {
                                "0": "No defenses",
                                "positive number": "Weight of defenses present"
                            }
                        }, "targets" : generateRandomData() };
                        // Génération
                        const targets = data.targets;

                        // Tri par gain décroissant
                        targets.sort((a, b) => b.gainNumeric - a.gainNumeric);

                        // Supprimer la propriété temporaire gainNumeric pour le JSON final
                        targets.forEach(t => delete t.gainNumeric);
                        data.targets=targets;

                        if(document.querySelector("div.Spy2Content"))
                             document.querySelector("div.Spy2Content").remove();
                        if (document.querySelectorAll("div#messagecontainercomponent")!=null) {
                             let divcontainer=  document.createElement("div");
                             divcontainer.innerHTML='<div class="Spy2Content" style="display:flex;justify-content: left;padding: 0px;margin:0px;"><div class="cards-row"></div></div>';
                             document.querySelector("div#messagecontainercomponent").insertBefore(divcontainer,document.querySelector("div.content"));
                            const card = document.querySelector('.cards-row');
                            // Récupérer les styles appliqués
                            let styles = window.getComputedStyle(card);
                            // Exemple : vérifier la couleur de fond
                            //console.log(styles.backgroundColor);
                            if(styles.backgroundColor=="rgba(0, 0, 0, 0)") {
                                const style = document.createElement('style');
                                style.textContent = `${cssToAdd}`;
                                document.head.appendChild(style);
                                styles = window.getComputedStyle(card);
                                //console.log("new "+styles.backgroundColor);
                            }

                            let container = document.querySelector('div.Spy2Content div.cards-row');

                            data.targets.forEach(target => {
                                const card = document.createElement('div');
                                card.className = `target-card time-${target.timestatus}`;

                                card.innerHTML = `
      <div class="target-meta">
        <div class="actions-left">
          <a class="square-btn" href="${target.linkattack}">⚔️</a>
          <a class="square-btn" href="${target.linkspy}">👁️</a>
        </div>
        <div class="time-label">${target.elapsedtime}</div>
        <div class="status-label">${target.status}</div>
      </div>
      <a class="target-main" href="${target.linkattack}">
        <div class="target-gain">${target.gain} <span class="statusplayer-${target.statusplayer}">(${target.statusplayer})</span></div>
        <div class="target-coords">${target.coords}</div>
        <div class="target-ships">${target.ships}</div>
      </a>
    `;
                                container.appendChild(card);
                            });

                         }
                    }
                break;
            case 71: //g
                 if (currentPage=="fleetdispatch"){
                        let m = {
                            //"FleetMoon":       [LF, HF, CR,   BS,   BC,   BB,  DSR, DS, RP,  EXP,  SC,    LC, CS,  REC,  PRB],
                            "FleetMoon":       [100, 100, 10,   10,   10,   10,  10, 0, 20,  10,  0,    0, 0,  0,  100],
                            "FleetPlanet":     [100, 100, 10,   10,   10,   10,  10, 0, 20, 100,  0, 6000, 999, 120, 1000]//,
                            //"FleetFound":      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                        };
                        const frm=document.forms["shipsChosen"];
                        const units = ["fighterLight", "fighterHeavy", "cruiser", "battleship", "interceptor","bomber", "destroyer", "deathstar", "reaper", "explorer","transporterSmall", "transporterLarge", "colonyShip", "recycler", "espionageProbe"];
                        m.FleetFound = units.map(name => {
                            const el = document.querySelector(`#shipsChosen span.${name} span.stockAmount`);
                            if (!el) return 0;
                            let raw = el.textContent.trim().replace(/\./g, "");
                            raw = raw.replace(/\,/g, "");
                            return parseInt(raw, 10) || 0;
                        });

                        m.FleetCalculated = m.FleetFound.map((val, i) => {
                            let diff = val;
                            return diff < 0 ? 0 : (val || 0);
                        });
                        //console.log(m.FleetCalculated);
                        units.forEach((name, i) => {
                            const input = document.querySelector(`#shipsChosen input[name="${name}"]`);
                            if (input) {
                                input.focus();
                                input.click();

                                // Donner une valeur (ex: un nombre aléatoire ou l'index)
                                if (m.FleetCalculated[i]==0)
                                    input.value = "";
                                else
                                    input.value = m.FleetCalculated[i];
                                // Déclencher un événement 'input' (comme si l'utilisateur avait tapé)
                                input.dispatchEvent(new Event("input", { bubbles: true }));

                            }

                        });
                        document.activeElement.blur();
                        if (document.querySelector("div.ogl-dest a.ogl-planet-icon")!=null)
                            document.querySelector("div.ogl-dest a.ogl-planet-icon").click();

                        if (document.querySelector("div#missionsDiv")!=null) {
                            //document.querySelector("div.ogl-fleetSpeed [data-step=\"10\"]").classList.toggle('ogl-active');
                            //document.querySelector("div#missionsDiv div.ogl-mission-4").classList.toggle('ogl-active');
                            if (document.querySelector("a#continueToFleet2")!=null)
                                document.querySelector("a#continueToFleet2").click();
                        }
                }
                break;
            case 72: //h
                console.log(currentPage);
                if (currentPage=="shipyard"){
                    if (document.querySelector("div.information table.combat_unit_details tbody tr.cargo_capacity td span")!=null) {
                        console.log(document.querySelector("div.information table.combat_unit_details tbody tr.cargo_capacity td span").innerHTML);
                        let Storage={ StorageLC : 0, KeyTime : GetTimeObject()};
                        const spanStorage =  document.querySelector("div.information table.combat_unit_details tbody tr.cargo_capacity td span").innerHTML;
                        let stStorage=spanStorage.trim().replace(/\./g, "");
                        stStorage = stStorage.replace(/\,/g, "");
                        Storage.StorageLC = toIntOrZero(stStorage);
                        localStorage.setItem("cAdditionalDataStorage",JSON.stringify(Storage));
                        showNotification("Storage set to : <br>StorageLC: "+Storage.StorageLC +"<br>"+Storage.KeyTime ,"info","Storage");
                    }
                }
                else
                    if (currentPage=="fleetdispatch"){
                        if (document.querySelectorAll("div#slots span.tooltip.advice")!=null) {
                              let MxFleetSlot={ MxFleetSlot : 0, MxExpeditions : 0, KeyTime : GetTimeObject()};
                              const spansFleetExpe =  document.querySelectorAll("div#slots span.tooltip.advice");
                              //console.log(spansFleetExpe);
                              const stFleet=spansFleetExpe[0].textContent.trim();
                              const stExpe=spansFleetExpe[1].textContent.trim();
                              const stNbFleet = stFleet.match(/\/(\d+)/)[1];
                              const stNbExpe = stExpe.match(/\/(\d+)/)[1];
                              MxFleetSlot.MxFleetSlot = toIntOrZero(stNbFleet);
                              MxFleetSlot.MxExpeditions = toIntOrZero(stNbExpe);
                              localStorage.setItem("cAdditionalDataF",JSON.stringify(MxFleetSlot));
                              showNotification("FleetSlots set to : <br>Fleet: "+MxFleetSlot.MxFleetSlot +"<br>Expeditions: "+MxFleetSlot.MxExpeditions+"<br>"+MxFleetSlot.KeyTime ,"info","MaxSlot");
                        }

                    }
                    else
                        if (currentPage=="overview"){
                            let LstPlanets={ Planets : [], Moons : [], KeyTime : GetTimeObject()};
                            let ActivePM ={Planet :-1 , Moon:-1, KeyTime : GetTimeObject()};
                            /*if (document.querySelectorAll("div#planetList div.smallplanet")!=null) {
                                // get id planet-NNNNNNNN attribute
                                // get hightlightPlanet class
                                if (document.querySelectorAll("div#planetList div.smallplanet a.moonlink")!=null) {
                                    // get href => get cp=NNNNNNNN
                                    // get hightlighMoon class from  div.smallplanet
                                }
                            }*/
                            if (document.querySelectorAll("div#planetList div.smallplanet:not(.ogl-summary)")!=null) {
                                document.querySelectorAll("#planetList .smallplanet:not(.ogl-summary)").forEach((div, index) => {
                                // Récupère l'identifiant CP de la planète
                                let planetId = div.id.replace("planet-", "");
                                LstPlanets.Planets.push(planetId);

                                // Vérifie s'il existe un lien vers la lune
                                let moonLink = div.querySelector("a.moonlink");
                                if (moonLink) {
                                    // extrait le cp du href (paramètre cp=nnnnnnnn)
                                    let url = new URL(moonLink.href);
                                    let cp = url.searchParams.get("cp");
                                    LstPlanets.Moons.push(cp);
                                } else {
                                    LstPlanets.Moons.push(0);
                                }
                                // Vérifie si cette planète est active
                                if (div.classList.contains("hightlightPlanet")) {
                                    ActivePM.Planet = index;
                                } else if (div.classList.contains("hightlightMoon")) {
                                    ActivePM.Moon = index;
                                }
                            });
                            }
                        localStorage.setItem("cAdditionalListPlanets",JSON.stringify(LstPlanets));
                        localStorage.setItem("cAdditionalActivePM",JSON.stringify(ActivePM));
                        showNotification("ListPlanet and ActivePM set to : <br>(Planet,Moons): "+LstPlanets.Planets.length + ","+ LstPlanets.Moons.filter(cp => cp !== 0).length +"<br>ActivePM:"+ ActivePM.Planet+","+ActivePM.Moon+"<br>"+ActivePM.KeyTime ,"info","Storage");
                        // console.log(ActivePM);
                        // console.log(LstPlanets);
                        }
                break;
            //case 82: //r
            //    break;
            case 80: //p
                break;
            case 77: //m
                break;
            case 84: //t
                if (currentPage=="messages") {
                    toggleSpyReportList();
                }
                break;
            case 70: //f
                break;
            case 78: //n
                if (currentPage=="messages") {
                    processSpyReports();
                }
                break;
            case 86: //v
                break;
            case 66: //b
                break;
            case 90: // z
                if (currentPage=="trader")
                    document.querySelector("a.js_sliderMetalMore").click();
                 else
                    if (currentPage=="messages") {
                        if (document.querySelectorAll("div.messagesHolder div.msg")!=null) {
                            let msgdivs=document.querySelectorAll("div.messagesHolder div.msg");
                            let result = {};
                            result["messages"] = [];

                            msgdivs.forEach((div, index) => {
                                let divraw = div.firstElementChild;
                                const key = div.attributes["data-msg-id"].value || `${index + 1}`;
                                let resultall={key : key,values : generateJSONFromDiv(div,""),rawvalues : generateJSONFromDiv(divraw,"")};
                                result["messages"].push(resultall);
                            });

                        console.log(result);
                        }
                    }
                else
                    //console.log("currentPage: "+currentPage);
                if (currentPage=="fleetdispatch"){
                    let m = {
                        "FleetSign":       ["LF", "HF", "CR",   "BS",   "BC",   "BB",  "DSR", "DS", "RP",  "EXP",  "SC",  "LC", "CS",  "REC",  "PRB"],
                        "FleetUnits":      ["fighterLight", "fighterHeavy", "cruiser", "battleship", "interceptor","bomber", "destroyer", "deathstar", "reaper", "explorer","transporterSmall", "transporterLarge", "colonyShip", "recycler", "espionageProbe"],
                        "Fleetreset":      [0, 0, 0,   0,   0,   0,  0, 0, 0,  0,  0,    0, 0,  0,  0],
                        "FleetMoon":       [100, 100, 10,   10,   10,   10,  10, 0, 20,  10,  0,    0, 0,  0,  100],
                        "FleetPlanet":     [100, 100, 10,   10,   10,   10,  10, 0, 20, 100,  0, 6000, 999, 120, 1000]//,
                        //"FleetFound":      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                    };
                    const frm=document.forms["shipsChosen"];
                    const units = m.FleetUnits; // ["fighterLight", "fighterHeavy", "cruiser", "battleship", "interceptor","bomber", "destroyer", "deathstar", "reaper", "explorer","transporterSmall", "transporterLarge", "colonyShip", "recycler", "espionageProbe"];
                     m.FleetFound = units.map(name => {
                         const el = document.querySelector(`#shipsChosen span.${name} span.stockAmount`);
                         if (!el) return 0;
                         let raw = el.textContent.trim().replace(/\./g, "");
                         raw = raw.replace(/\,/g, "");
                         return parseInt(raw, 10) || 0;
                     });

                    m.FleetCalculated = m.FleetFound.map((val, i) => {
                    let diff = val - ((m.FleetMoon[i] || 0) + (m.FleetPlanet[i] || 0));
                    return diff < 0 ? 0 : diff;
                    });
                    //console.log(m.FleetCalculated);
                     units.forEach((name, i) => {
                         const input = document.querySelector(`#shipsChosen input[name="${name}"]`);
                         if (input) {
                             input.focus();
                             input.click();

                             // Donner une valeur (ex: un nombre aléatoire ou l'index)
                             if (m.FleetCalculated[i]==0)
                                 input.value = "";
                            else
                                 input.value = m.FleetCalculated[i];
                             // Déclencher un événement 'input' (comme si l'utilisateur avait tapé)
                             input.dispatchEvent(new Event("input", { bubbles: true }));

                         }

                     });
                    document.activeElement.blur();
                    if (document.querySelector("div.ogl-dest a.ogl-moon-icon")!=null)
                      document.querySelector("div.ogl-dest a.ogl-moon-icon").click();

                    if (document.querySelector("div#missionsDiv")!=null) {
                            //document.querySelector("div.ogl-fleetSpeed [data-step=\"10\"]").classList.toggle('ogl-active');
                            //document.querySelector("div#missionsDiv div.ogl-mission-4").classList.toggle('ogl-active');
                            if (document.querySelector("a#continueToFleet2")!=null)
                                document.querySelector("a#continueToFleet2").click();
                        }
                }
                break;
            case 81: // q
                //document.querySelector("a.js_sliderCrystalMax").click();
                if (currentPage=="trader") {
                    clearInterval(IdStartRefresh);
                    document.querySelector("div.hclock1").remove();
                }
                else
                    if (currentPage=="fleetdispatch"){
                        let m = {
                            //"FleetMoon":       [LF, HF, CR,   BS,   BC,   BB,  DSR, DS, RP,  EXP,  SC,    LC, CS,  REC,  PRB],
                            "FleetMoon":       [100, 100, 10,   10,   10,   10,  10, 0, 20,  10,  0,    0, 0,  0,  100],
                            "FleetPlanet":     [100, 100, 10,   10,   10,   10,  10, 0, 20, 100,  0, 6000, 999, 120, 1000]//,
                            //"FleetFound":      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                        };
                        const frm=document.forms["shipsChosen"];
                        const units = ["fighterLight", "fighterHeavy", "cruiser", "battleship", "interceptor","bomber", "destroyer", "deathstar", "reaper", "explorer","transporterSmall", "transporterLarge", "colonyShip", "recycler", "espionageProbe"];
                        m.FleetFound = units.map(name => {
                            const el = document.querySelector(`#shipsChosen span.${name} span.stockAmount`);
                            if (!el) return 0;
                            let raw = el.textContent.trim().replace(/\./g, "");
                            raw = raw.replace(/\,/g, "");
                            return parseInt(raw, 10) || 0;
                        });

                        m.FleetCalculated = m.FleetFound.map((val, i) => {
                            let diff = val-(m.FleetMoon[i] || 0);
                            return diff < 0 ? 0 : (m.FleetMoon[i] || 0);
                        });
                        //console.log(m.FleetCalculated);
                        units.forEach((name, i) => {
                            const input = document.querySelector(`#shipsChosen input[name="${name}"]`);
                            if (input) {
                                input.focus();
                                input.click();

                                // Donner une valeur (ex: un nombre aléatoire ou l'index)
                                if (m.FleetCalculated[i]==0)
                                    input.value = "";
                                else
                                    input.value = m.FleetCalculated[i];
                                // Déclencher un événement 'input' (comme si l'utilisateur avait tapé)
                                input.dispatchEvent(new Event("input", { bubbles: true }));

                            }

                        });
                        document.activeElement.blur();
                        if (document.querySelector("div.ogl-dest a.ogl-moon-icon")!=null)
                            document.querySelector("div.ogl-dest a.ogl-moon-icon").click();

                        if (document.querySelector("div#missionsDiv")!=null) {
                            //document.querySelector("div.ogl-fleetSpeed [data-step=\"10\"]").classList.toggle('ogl-active');
                            //document.querySelector("div#missionsDiv div.ogl-mission-4").classList.toggle('ogl-active');
                            if (document.querySelector("a#continueToFleet2")!=null)
                                document.querySelector("a#continueToFleet2").click();
                        }
                }
                break;
            case 83: // s
                //document.querySelector("a.js_sliderCrystalMore").click();
                if (currentPage=="trader")
                    CreateAdditionalContent();
                break;
            case 87: // w
                //console.log("currentPage: "+currentPage);
                if (currentPage=="trader")
                   document.querySelector("a.js_sliderDeuteriumMax").click();
                else
                    if (currentPage=="fleetdispatch") {
                        if (document.querySelector("div.ogl-fleetSpeed")!=null) {
                            //document.querySelector("div.ogl-fleetSpeed [data-step=\"10\"]").classList.toggle('ogl-active');
                            document.querySelector("div.ogl-fleetSpeed [data-step=\"3\"]").click(); //classList.toggle('ogl-active');
                            if (document.querySelector("a#continueToFleet2")!=null)
                                document.querySelector("a#continueToFleet2").click();
                        }
                    }
                else
                    if (currentPage=="galaxy") {
                        let d;
                        let maxFleetSlots=0;
                        let maxExpeditionsSlots=0;

                        if (localStorage.getItem("cAdditionalDataF")!=null)
                            d = JSON.parse(localStorage.getItem("cAdditionalDataF"));
                        if (d!=null)
                            if (d.MxFleetSlot!=null) {
                                maxFleetSlots = d.MxFleetSlot;
                                maxExpeditionsSlots = d.MxExpeditions;
                            }
                        if(maxFleetSlots==0)
                            showNotification("maxFleetSlots not defined "+maxFleetSlots,"error","MaxSlot");
                        let fleetList=0;
                        if (document.querySelector("table#eventContent tbody tr.eventFleet")!=null) {
                            if(document.querySelectorAll('table#eventContent tbody tr.eventFleet[data-return-flight="true"], table#eventContent tbody tr.eventFleet[data-mission-type="4"]')!=null)
                            {
                                fleetList=Array.from(document.querySelectorAll('table#eventContent tbody tr.eventFleet[data-return-flight="true"], table#eventContent tbody tr.eventFleet[data-mission-type="4"]')).filter(row => {
                                    const spn = row.querySelector("td.countDown span");
                                    return spn && spn.textContent.trim().toLowerCase()!="done" && spn.textContent.trim().toLowerCase()!="terminé";
                                }).length;

                            }
                        }
                        let FleetSlots = maxFleetSlots - fleetList;
                        let PlanetData={
                            Data : []
                        };
                        document.querySelectorAll('.galaxyTable .galaxyRow.ctContentRow.inactive_filter:not(.vacation_filter)').forEach(row => {  //
                            let coords = row.querySelector('.htmlTooltip h1 span')?.innerText || '';
                            let planetName = row.querySelector('.cellPlanetName span')?.innerText || '';
                            let playerName = row.querySelector('.cellPlayerName .playerName')?.childNodes[0].nodeValue.trim() || '';
                            let pAttack = false;
                            if (row.querySelector('.cellPlanet .microplanet div.fleetHostile')!=null)
                                pAttack = true;
                            let pBanned = false;
                            if (row.querySelector('.cellPlayerName span.status_abbr_banned ')!=null)
                                pBanned = true;

                            let onclickAttr = row.querySelector('.cellPlanet a')?.getAttribute('onclick') || '';
                            onclickAttr = onclickAttr.replace(/;return\s+false\s*;?$/,
                                                              `; this.closest('.CellIna').style.display='none'; return false;`);
                            let ranking = row.querySelector('.cellPlayerName .ogl-ranking')?.innerText.trim() || '';

                            let statusSpan = row.querySelector('.cellPlayerName pre span');
                            let status = '';
                            if (statusSpan) {
                                let statusText = statusSpan.innerText.trim();
                                let tooltip = statusSpan.getAttribute('data-tooltip-title') || '';
                                status = `${statusText} - ${tooltip}`.trim();
                            }

                            let planetImgDiv = row.querySelector('.cellPlanet .microplanet');
                            let planetImage = '';
                            if (planetImgDiv) {
                                let bgStyle = planetImgDiv.style.backgroundImage;
                                // Nettoyage de url("...") → juste l’URL
                                planetImage = bgStyle.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
                            }

                            if (playerName!="" && !(pAttack) && !(pBanned))
                                PlanetData.Data.push( {
                                    coords,
                                    planetName,
                                    planetImage,
                                    playerName,
                                    ranking,
                                    onclickAttr,
                                    status
                                });
                        });
                        //console.log(PlanetData);
                        // HTML
                        let catchInaHTML = '<div class="CatchIna" style=\"display:flex;garp:5px;\"><div class="CatchNbSlots" style="width:34px;height:34px;margin:4px;display:flex;justify-content:center;align-items:flex-end;position:relative;color: yellow;font-size: xx-large;"><span>'+FleetSlots+'</span></div>';
                        PlanetData.Data.forEach(item => {
                            let cellHTML = `
        <div class="CellIna" style="margin:4px;">
            <a href="javascript:void(0);" onclick="${item.onclickAttr}" title="${item.playerName} ${item.ranking} (${item.status})<br>${item.planetName}">
                <div class="PlanetIna" style="width:34px;height:34px;display:flex;justify-content:center;align-items:flex-end;position:relative;background-image: url('${item.planetImage}'); background-size: contain;background-repeat:no-repeat;background-position:center;">
                    <div class="CoordIna fleetHostile" style="font-size:8px;color:white; background:rgba(0,0,0,0.5);width:100%;text-align:center;position:absolute;bottom:0;left:0;"><span>${item.coords}</span></div>
                </div>
            </a>
        </div>
`;
                            catchInaHTML += cellHTML;
                        });
                        catchInaHTML += '</div>';
                     if (document.querySelector("div#inhalt")!=null) {
                         let v;
                         if(document.querySelector("div#expeditionDebrisSlotActions")!=null)
                             v=document.querySelector("div#expeditionDebrisSlotActions").innerHTML;
                         if(document.querySelector("div.CatchIna")) {
                             document.querySelector("div.CatchIna").remove();
                         }
                         let divcontainer=  document.createElement("div");
                         divcontainer.innerHTML=catchInaHTML;
                         document.querySelector("div#galaxycomponent").insertBefore(divcontainer,document.querySelector("div#inhalt"));
                        }
                    SendSpyProbes();

					}
                else
                    if (currentPage=="messages") {
                        let d;
                        let maxFleetSlots=0;
                        let maxExpeditionsSlots=0;

                        if (localStorage.getItem("cAdditionalDataF")!=null)
                            d = JSON.parse(localStorage.getItem("cAdditionalDataF"));
                        if (d!=null)
                            if (d.MxFleetSlot!=null) {
                                maxFleetSlots = d.MxFleetSlot;
                                maxExpeditionsSlots = d.MxExpeditions;
                            }
                        if(maxFleetSlots==0)
                            showNotification("maxFleetSlots not defined "+maxFleetSlots,"error","MaxSlot");
                        let fleetList=0;
                        if (document.querySelector("table#eventContent tbody tr.eventFleet")!=null) {
                            if(document.querySelectorAll('table#eventContent tbody tr.eventFleet[data-return-flight="true"], table#eventContent tbody tr.eventFleet[data-mission-type="4"]')!=null)
                            {
                                fleetList=Array.from(document.querySelectorAll('table#eventContent tbody tr.eventFleet[data-return-flight="true"], table#eventContent tbody tr.eventFleet[data-mission-type="4"]')).filter(row => {
                                    const spn = row.querySelector("td.countDown span");
                                    return spn && spn.textContent.trim().toLowerCase()!="done" && spn.textContent.trim().toLowerCase()!="terminé";
                                }).length;

                            }
                        }
                        let FleetSlots = maxFleetSlots - fleetList;
                        if (FleetSlots==0)
                            showNotification("No free Slot!!","error","Attack");
                        else
                        {
                            //console.log("currentPage: "+currentPage);
                            if (document.querySelectorAll('table.ogl-spyTable tbody tr.ogi-attacked')) {
                                document.querySelectorAll('table.ogl-spyTable tbody tr.ogi-attacked')
                                    .forEach(tr => tr.remove());
                            }
                            /*const firstlink = [...document.querySelectorAll('table.ogl-spyTable tbody tr.ogl-marked td.ogl-cargo-choice a')];
                                        if (firstlink) {
                                            let nblinks =firstlink.length;
                                            if (nblinks>0)
                                                firstlink[0].click();
                                        }
                                        */
                            const firstlink = document.querySelector('table.ogl-spyTable tbody tr.ogl-marked td.ogl-cargo-choice a');
                            if (firstlink) {
                                firstlink.click();
                            }
                            else
                                showNotification("No Position Toattack ","error","Attack");
                        }
                    }
                break;
            case 88: // x
                  //console.log("currentPage: "+currentPage);
                if (currentPage=="trader")
                  document.querySelector("a.js_sliderDeuteriumMore").click();
                else
                  if (currentPage=="fleetdispatch") {
                      if (document.querySelector("div a#sendFleet")!=null) {
                            document.querySelector("div a#sendFleet").click();
                        }

                    }
                    else
                        /*if(currentPage=="research") {
                            if (document.querySelector('div#technologies_advanced ul li.technology[data-technology="108"] span span span.stockAmount')!=null) {
                                let MxFleetSlot={ MxFleetSlot : 0, KeyTime : GetTimeObject()};
                                MxFleetSlot.MxFleetSlot = toIntOrZero(document.querySelector('div#technologies_advanced ul li.technology[data-technology="108"] span span span.stockAmount').innerHTML) +1;
                                localStorage.setItem("cAdditionalDataF",JSON.stringify(MxFleetSlot));
                                showNotification("maxFleetSlots set to : "+MxFleetSlot.MxFleetSlot +"<br>"+MxFleetSlot.KeyTime ,"info","MaxSlot");
                            }
                        }
                        else
                        */
                            if (currentPage=="galaxy") {
                               SendSpyProbes();
                            }
                break;
            case 82: //r
                if (currentPage=="trader")
                    document.querySelector("a.pay").click();
                break;
            case 13: //enter
                //console.log("currentPage: "+currentPage);
                if (currentPage=="trader")
                   document.querySelector("a.pay").click();
                break;
            case 49: // 1 keyboard
                console.log("currentPage: "+currentPage);
                updateStatus();
                break;
            //case 97: // 1 numpad
            default: break;
        }
        return;
    }, true);
  }
    // Call creating additional content
    //CreateAdditionalContent();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeInfoComptePlus, { once: true });
} else {
    initializeInfoComptePlus();
}



  if (window.apiMonitorInstalled) return;
  window.apiMonitorInstalled = true;

  const STORAGE_KEY = "apiMonitorEnabled";
  const IDLE_DELAY = 2000;
  const FLEET_REFRESH_INTERVAL = 5793;

  const missionTypes = {
    "1": "Attack",
    "2": "ACS Attack",
    "3": "Transport",
    "4": "Deployment",
    "5": "ACS Hold",
    "6": "Espionage",
    "7": "Colonization",
    "8": "Recycler",
    "9": "Moon Destruction",
    "10": "Interplanetary Missile Attack",
    "15": "Expedition"
  };

  let enabled = localStorage.getItem(STORAGE_KEY) !== "false";
  let pending = 0;
  let ok = 0;
  let ko = 0;
  let generation = 0;
  let idleTimer = null;
  let detailsVisible = true;
  let lastFleetRefresh = null;
  let messageHolderForReports = null;
  let spyReportViewElement = null;
  let spyMessagesOriginalStyles = null;
  let activeResourcesTooltip = null;
  const SPY_REPORT_TAB_CATEGORIES = ["EnnemySpy", "Target1", "Target2", "Target3", "Target4"];
  const SPY_REPORT_SELECTED_CATEGORY_KEY = "cAdditionalSpyReportSelectedCategory";
  let selectedSpyReportCategory = "Target1";
  try {
    const savedCategory = localStorage.getItem(SPY_REPORT_SELECTED_CATEGORY_KEY);
    if (SPY_REPORT_TAB_CATEGORIES.includes(savedCategory)) {
      selectedSpyReportCategory = savedCategory;
    }
  } catch (error) {
    console.error("Impossible de lire l'onglet de rapports mémorisé.", error);
  }

  // Création du panneau
  const panel = document.createElement("div");

  Object.assign(panel.style, {
    position: "fixed",
    top: "10px",
    left: "10px",
    zIndex: "999999",
    background: "#222",
    color: "#fff",
    padding: "10px",
    boxSizing: "border-box",
    borderRadius: "6px",
    font: "12px Arial, sans-serif",
    width: "300px",
    maxWidth: "95vw",
    maxHeight: "85vh",
    overflowY: "auto",
    boxShadow: "0 2px 8px rgba(0,0,0,.4)"
  });

  // En-tête : activation + statut API
  const header = document.createElement("div");

  Object.assign(header.style, {
    display: "flex",
    alignItems: "center",
    gap: "6px"
  });

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = enabled;
  toggle.style.cursor = "pointer";

  const status = document.createElement("span");

  Object.assign(status.style, {
    fontWeight: "bold"
  });

  header.append(toggle, status);

  // Ligne des flottes
  const fleetButton = document.createElement("div");

  Object.assign(fleetButton.style, {
    display: "none",
    marginTop: "6px",
    color: "#00ff00",
    fontWeight: "bold",
    cursor: "pointer",
    font: "bold 12px Arial, sans-serif"
  });

  // Détails des missions
  const fleetDetails = document.createElement("div");

  Object.assign(fleetDetails.style, {
    display: "none",
    marginTop: "8px",
    paddingTop: "6px",
    borderTop: "1px solid #666",
    lineHeight: "1.6"
  });

  panel.append(header, fleetButton, fleetDetails);
  document.body.appendChild(panel);

  // Vérifie si le compte à rebours est terminé
  function isFleetDone(fleet) {
    const countDown = fleet.querySelector("td.countDown");

    if (!countDown) return false;

    return countDown.textContent.trim().toLowerCase() === "done";
  }

  // Comptage des flottes par ID
  // L'ID du retour = ID de l'envoi + 1
  function getFleetStats() {
    const table = document.querySelector("#eventContent");

    const stats = {
      active: 0,
      returning: 0,
      missions: {}
    };

    if (!table) return stats;

    const fleetsById = new Map();

    const fleets = table.querySelectorAll("tr.eventFleet");

    fleets.forEach(fleet => {
      const fleetId = fleet.id;
      const match = fleetId && fleetId.match(/^eventRow-(\d+)$/);

      if (!match) return;

      // Ignore les flottes terminées
      if (isFleetDone(fleet)) return;

      const id = Number(match[1]);
      const missionId = fleet.getAttribute("data-mission-type");
      const returnFlight = fleet.getAttribute("data-return-flight");

      if (missionId === null) return;

      if (returnFlight !== "true" && returnFlight !== "false") {
        return;
      }

      fleetsById.set(id, {
        id,
        missionId,
        returnFlight
      });
    });

    const countedFleetIds = new Set();

    fleetsById.forEach((fleet, id) => {
      if (countedFleetIds.has(id)) return;

      let missionId;
      let isReturning;

      if (fleet.returnFlight === "false") {
        // Envoi : priorité à la ligne d'envoi
        missionId = fleet.missionId;
        isReturning = false;

        // Le retour associé possède l'ID + 1
        countedFleetIds.add(id + 1);

      } else {
        // Retour : recherche de l'envoi correspondant (ID - 1)
        const sendingFleet = fleetsById.get(id - 1);

        if (sendingFleet && sendingFleet.returnFlight === "false") {
          // L'envoi existe encore : ne pas compter le retour
          countedFleetIds.add(id);
          return;
        }

        // L'envoi a disparu : on compte le retour
        missionId = fleet.missionId;
        isReturning = true;
      }

      countedFleetIds.add(id);

      const missionName =
        missionTypes[missionId] || `Mission ${missionId}`;

      if (!stats.missions[missionName]) {
        stats.missions[missionName] = {
          active: 0,
          returning: 0
        };
      }

      if (isReturning) {
        stats.returning++;
        stats.missions[missionName].returning++;
      } else {
        stats.active++;
        stats.missions[missionName].active++;
      }
    });

    return stats;
  }

  // Formate la date avec les millisecondes
  function formatTimestamp(date) {
    const pad = (value, size = 2) =>
      String(value).padStart(size, "0");

    return (
      `${pad(date.getDate())}/` +
      `${pad(date.getMonth() + 1)}/` +
      `${date.getFullYear()} ` +
      `${pad(date.getHours())}:` +
      `${pad(date.getMinutes())}:` +
      `${pad(date.getSeconds())}.` +
      `${pad(date.getMilliseconds(), 3)}`
    );
  }

  function getSpyReportNavigationUrl(report, component, missionId) {
    const coordinates = String(report.coordinates || "").match(/^(\d{1,2}):(\d{1,3}):(\d{1,2})$/);
    if (!coordinates) return "#";

    const url = new URL(window.location.href);
    url.searchParams.set("page", "ingame");
    url.searchParams.set("component", component);
    url.searchParams.set("galaxy", coordinates[1]);
    url.searchParams.set("system", coordinates[2]);
    url.searchParams.set("position", coordinates[3]);

    if (component === "fleetdispatch") {
      const selectedShips = window.getInfoComptePlusFleetSelection
        ? window.getInfoComptePlusFleetSelection(report)
        : (report.fleetToSend || {});
      url.searchParams.set("type", String(report.targetPlanetType || (report.locationType === "moon" ? 3 : 1)));
      url.searchParams.set("mission", String(missionId || 1));
      Object.entries(selectedShips).forEach(([shipId, count]) => {
        if (/^\d+$/.test(shipId) && Number.isSafeInteger(Number(count)) && Number(count) > 0) {
          url.searchParams.set(`am${shipId}`, String(count));
        }
      });
    }

    return url.toString();
  }

  const SPY_GALAXY_HIGHLIGHT_KEY = "cAdditionalSpyGalaxyHighlight";

  function normalizeSpyCoordinates(value) {
    const match = String(value || "").match(/(\d{1,2})\s*:\s*(\d{1,3})\s*:\s*(\d{1,2})/);
    return match ? `${match[1]}:${match[2]}:${match[3]}` : null;
  }

  function highlightPendingSpyPosition() {
    if (currentPage !== "galaxy") return;

    const pendingValue = sessionStorage.getItem(SPY_GALAXY_HIGHLIGHT_KEY);
    if (!pendingValue) return;

    let pending;
    try {
      pending = JSON.parse(pendingValue);
    } catch (error) {
      console.error("La position à surligner dans la galaxie est invalide.", error);
      sessionStorage.removeItem(SPY_GALAXY_HIGHLIGHT_KEY);
      return;
    }

    let attempts = 0;
    const findAndHighlight = () => {
      const rows = document.querySelectorAll(".galaxyTable .galaxyRow");
      const expectedPosition = String(pending.coordinates || "").split(":")[2];
      const targetRow = Array.from(rows).find(row => {
        const rowPosition = row.querySelector(".htmlTooltip h1 span")
          || row.querySelector(".cellPosition")
          || row.querySelector("[data-position]");
        if (!rowPosition) return false;
        const rowCoordinates = normalizeSpyCoordinates(rowPosition.textContent)
          || normalizeSpyCoordinates(rowPosition.getAttribute("data-position"));
        if (rowCoordinates) return rowCoordinates === pending.coordinates;

        const position = row.getAttribute("data-position") || rowPosition.textContent;
        return String(parseInt(position, 10)) === expectedPosition;
      });

      if (targetRow) {
        targetRow.classList.add("ogl-highlighted");
        targetRow.scrollIntoView({ behavior: "smooth", block: "center" });
        sessionStorage.removeItem(SPY_GALAXY_HIGHLIGHT_KEY);
        return;
      }

      attempts++;
      if (attempts < 30) {
        setTimeout(findAndHighlight, 150);
      } else {
        sessionStorage.removeItem(SPY_GALAXY_HIGHLIGHT_KEY);
        console.warn(`Position galaxie introuvable pour le surlignage : ${pending.coordinates}`);
      }
    };

    findAndHighlight();
  }

  highlightPendingSpyPosition();

  // Affichage du détail des missions
  function renderFleetDetails(stats) {
    fleetDetails.innerHTML = "";

    Object.entries(stats.missions)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .forEach(([mission, counts]) => {
        const line = document.createElement("div");
        line.textContent = `${mission} (${counts.active}/${counts.returning})`;
        fleetDetails.appendChild(line);
      });

    const total = document.createElement("div");
    Object.assign(total.style, {
      fontWeight: "bold",
      marginTop: "5px",
      borderTop: "1px solid #666",
      paddingTop: "5px"
    });
    total.textContent = `TOTAL (${stats.active}/${stats.returning})`;
    fleetDetails.appendChild(total);

    const updateLine = document.createElement("div");
    Object.assign(updateLine.style, {
      marginTop: "3px",
      color: "#aaa",
      fontSize: "11px"
    });
    updateLine.textContent = `MAJ : ${lastFleetRefresh ? formatTimestamp(lastFleetRefresh) : "--"}`;
    fleetDetails.appendChild(updateLine);

  }

  function renderSpyReportList() {
    const spyReportState = window.getInfoComptePlusSpyReportState
      ? window.getInfoComptePlusSpyReportState()
      : null;
    if (!spyReportState || !spyReportState.visible) return;

    if (activeResourcesTooltip) {
      activeResourcesTooltip.remove();
      activeResourcesTooltip = null;
    }

    const reportSection = document.createElement("div");
    reportSection.style.cssText = "width:100%;box-sizing:border-box;padding:4px;color:#f2f2f2;font:12px Arial,sans-serif;";
    const title = document.createElement("div");
    title.textContent = `Rapports d'espionnage (${spyReportState.rows.length}) — T : messages`;
    title.style.cssText = "margin-bottom:4px;padding:4px;border-bottom:1px solid #52616f;font-weight:bold;";
    reportSection.appendChild(title);

    const categoryCounts = {};
    SPY_REPORT_TAB_CATEGORIES.forEach(category => {
      categoryCounts[category] = 0;
    });
    spyReportState.rows.forEach(({ report }) => {
      if (Object.prototype.hasOwnProperty.call(categoryCounts, report.category)) {
        categoryCounts[report.category]++;
      }
    });

    const tabs = document.createElement("div");
    tabs.style.cssText = "display:flex;gap:2px;margin-top:2px;width:100%;";
    SPY_REPORT_TAB_CATEGORIES.forEach(category => {
      const tab = document.createElement("button");
      tab.type = "button";
      tab.setAttribute("aria-pressed", String(selectedSpyReportCategory === category));
      tab.style.cssText = `position:relative;flex:1;min-width:0;padding:5px 1px 4px;border:${selectedSpyReportCategory === category ? "2px solid #8be9fd" : "1px solid #718096"};border-radius:4px;background:${selectedSpyReportCategory === category ? "#17445b" : "#202a36"};color:#fff;font:9px Arial,sans-serif;font-weight:${selectedSpyReportCategory === category ? "bold" : "normal"};white-space:nowrap;cursor:pointer;box-shadow:${selectedSpyReportCategory === category ? "0 0 0 1px #36bffa,inset 0 0 7px rgba(139,233,253,.3)" : "0 1px 2px rgba(0,0,0,.5)"};`;
      const label = document.createElement("span");
      label.textContent = category;
      const count = document.createElement("sup");
      count.textContent = String(categoryCounts[category]);
      count.style.cssText = "position:absolute;top:-5px;right:1px;display:inline-flex;min-width:12px;height:12px;box-sizing:border-box;align-items:center;justify-content:center;padding:0 2px;border:1px solid #fff;border-radius:2px;background:#ffd54f;color:#17212b;font: bold 8px Arial,sans-serif;box-shadow:0 1px 3px rgba(0,0,0,.7);";
      tab.append(label, count);
      tab.addEventListener("click", () => {
        selectedSpyReportCategory = category;
        try {
          localStorage.setItem(SPY_REPORT_SELECTED_CATEGORY_KEY, category);
        } catch (error) {
          console.error("Impossible de mémoriser l'onglet de rapports sélectionné.", error);
          showNotification("Impossible de mémoriser l'onglet sélectionné.","error","Spy reports");
        }
        renderSpyReportList();
      });
      tabs.appendChild(tab);
    });
    reportSection.appendChild(tabs);

    const savedSort = spyReportState.sortByCategory[selectedSpyReportCategory] || {};
    const validSortFields = ["resourcesTotal", "metal", "crystal", "deuterium", "age"];
    const hasSavedSort = validSortFields.includes(savedSort.field);
    const sortField = hasSavedSort ? savedSort.field : "resourcesTotal";
    const sortDirection = savedSort.direction === "asc" ? "asc" : "desc";
    const visibleRows = spyReportState.rows
      .filter(({ report }) => report.category === selectedSpyReportCategory)
      .slice();
    const getSortValue = row => {
      if (sortField === "age") return row.ageMinutes;
      if (sortField === "resourcesTotal") return row.resourceTotal;
      return Number(row.resources[sortField]) || 0;
    };
    visibleRows.sort((a, b) => {
      const aValue = getSortValue(a);
      const bValue = getSortValue(b);
      if (aValue == null || bValue == null) {
        if (aValue == null && bValue != null) return 1;
        if (aValue != null && bValue == null) return -1;
      } else if (aValue !== bValue) {
        return (sortDirection === "desc" ? -1 : 1) * (aValue - bValue);
      }
      return String(a.report.coordinates || a.report.messageId)
        .localeCompare(String(b.report.coordinates || b.report.messageId));
    });

    const toolbar = document.createElement("div");
    toolbar.style.cssText = "display:flex;justify-content:flex-end;align-items:center;flex-wrap:wrap;gap:2px;margin:3px 0 4px;";
    const addToolbarButton = (label, buttonTitle, onClick, options = {}) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = label;
      button.title = buttonTitle;
      button.setAttribute("aria-label", buttonTitle);
      button.setAttribute("aria-pressed", String(Boolean(options.active)));
      button.disabled = Boolean(options.disabled);
      button.style.cssText = `display:inline-flex;min-width:25px;height:24px;box-sizing:border-box;align-items:center;justify-content:center;padding:0 4px;border:1px solid ${options.active ? "#70cfff" : "#75879a"};border-radius:4px;background:${options.active ? "#17445b" : options.danger ? "#482126" : "#202a36"};color:#fff;font:bold 11px Arial,sans-serif;cursor:${options.disabled ? "default" : "pointer"};opacity:${options.disabled ? ".45" : "1"};box-shadow:0 1px 2px rgba(0,0,0,.4);`;
      button.addEventListener("click", onClick);
      toolbar.appendChild(button);
      return button;
    };

    addToolbarButton(
      "🗑",
      `Supprimer tous les rapports sauvegardés de ${selectedSpyReportCategory}`,
      () => {
        const count = categoryCounts[selectedSpyReportCategory];
        if (!count || !window.confirm(`Supprimer les ${count} rapport(s) enregistrés dans ${selectedSpyReportCategory} ?`)) return;
        const removed = window.deleteInfoComptePlusSpyReportCategory(selectedSpyReportCategory, false);
        if (removed === null) return;
        showNotification(`${removed} rapport(s) supprimé(s) de ${selectedSpyReportCategory}.`,"success","Spy reports");
        renderSpyReportList();
      },
      { danger: true, disabled: categoryCounts[selectedSpyReportCategory] === 0 }
    );
    const expiredCount = spyReportState.expiredCounts[selectedSpyReportCategory] || 0;
    addToolbarButton(
      "⌛",
      `Supprimer les ${expiredCount} rapport(s) expirés depuis plus d'une heure de ${selectedSpyReportCategory}`,
      () => {
        if (!expiredCount || !window.confirm(`Supprimer les ${expiredCount} rapport(s) expirés de ${selectedSpyReportCategory} ?`)) return;
        const removed = window.deleteInfoComptePlusSpyReportCategory(selectedSpyReportCategory, true);
        if (removed === null) return;
        showNotification(`${removed} rapport(s) expiré(s) supprimé(s).`,"success","Spy reports");
        renderSpyReportList();
      },
      { danger: true, disabled: expiredCount === 0 }
    );

    const sortButtons = [
      ["resourcesTotal", "Σ", "somme des ressources"],
      ["metal", "M", "métal"],
      ["crystal", "C", "cristal"],
      ["deuterium", "D", "deutérium"],
      ["age", "◷", "âge"]
    ];
    sortButtons.forEach(([field, icon, label]) => {
      const active = sortField === field;
      const direction = active ? sortDirection : "desc";
      const directionIcon = direction === "desc" ? "↓" : "↑";
      addToolbarButton(
        `${icon}${active ? directionIcon : ""}`,
        `Trier par ${label} ${direction === "desc" ? "décroissant" : "croissant"}${active ? " (tri actif)" : ""}`,
        () => {
          const nextDirection = active && hasSavedSort && sortDirection === "desc" ? "asc" : "desc";
          if (window.setInfoComptePlusSpyReportSort(
            selectedSpyReportCategory,
            field,
            nextDirection
          )) {
            renderSpyReportList();
          }
        },
        { active }
      );
    });
    reportSection.appendChild(toolbar);

    const reportList = document.createElement("div");
    reportList.style.cssText = "width:100%;max-height:none;overflow:visible;margin-top:2px;";
    if (visibleRows.length === 0) {
      const empty = document.createElement("div");
      empty.textContent = `Aucun rapport dans ${selectedSpyReportCategory}. Appuyez sur N pour scanner.`;
      reportList.appendChild(empty);
    } else {
      const reportGrid = document.createElement("div");
      reportGrid.style.cssText = "display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:3px;width:100%;align-items:stretch;";
      visibleRows.forEach(({ report, facts, resources, resourceTotal, resourceTotalDisplay, resourceDisplay, forceWeight, forceDisplay, counterEspionageChance, ageMinutes, ageColor, activeMission }) => {
        const card = document.createElement("div");
        card.title = report.rawText || "";
        card.style.cssText = "position:relative;min-width:0;box-sizing:border-box;padding:3px 23px 3px 3px;border:1px solid #8297ab;border-radius:4px;background:linear-gradient(145deg,#202a35,#151c24);box-shadow:0 1px 3px rgba(0,0,0,.4);";
        const isEnemySpy = report.category === "EnnemySpy";
        const rawData = report.rawData || {};

        const contents = document.createElement("div");
        contents.style.cssText = "display:flex;align-items:center;align-content:center;flex-wrap:wrap;gap:2px;min-width:0;min-height:24px;";

        const addCoordinateLink = (container, coordinatesValue, locationType, title, compact = false) => {
          const normalizedCoordinates = normalizeSpyCoordinates(coordinatesValue);
          const coordinatesLink = document.createElement("a");
          coordinatesLink.href = normalizedCoordinates
            ? getSpyReportNavigationUrl({ coordinates: normalizedCoordinates }, "galaxy")
            : "#";
          coordinatesLink.title = title;
          coordinatesLink.style.cssText = `display:inline-flex;align-items:center;justify-content:center;gap:2px;min-height:24px;box-sizing:border-box;padding:2px ${compact ? 2 : 4}px;border:1px solid #527f88;border-radius:4px;background:#102e36;color:#f2ffff;text-decoration:none;font-size:${compact ? 8 : 9}px;box-shadow:inset 0 0 2px rgba(83,184,194,.18);`;
          const coordinateLabel = normalizedCoordinates || "?:???:??";
          coordinatesLink.appendChild(document.createTextNode(compact ? coordinateLabel : `[${coordinateLabel}]`));
          if (locationType === "moon") {
            const moonIcon = document.createElement("figure");
            moonIcon.className = "planetIcon moon";
            moonIcon.style.cssText = "display:inline-block;width:14px;height:14px;margin:0;vertical-align:middle;";
            coordinatesLink.appendChild(moonIcon);
          }
          coordinatesLink.addEventListener("click", event => {
            if (!normalizedCoordinates) {
              event.preventDefault();
              return;
            }
            try {
              sessionStorage.setItem(SPY_GALAXY_HIGHLIGHT_KEY, JSON.stringify({ coordinates: normalizedCoordinates }));
            } catch (error) {
              console.error("Impossible de mémoriser la position à surligner.", error);
            }
          });
          container.appendChild(coordinatesLink);
        };

        const coordinatesGroup = document.createElement("span");
        if (isEnemySpy) {
          const sourceCoordinates = rawData["data-raw-sourceplanetcoordinates"];
          const sourcePlayerName = rawData["data-raw-sourceplayername"] || "Ennemi inconnu";
          const sourcePlayerId = rawData["data-raw-sourceplayerid"] || "inconnu";
          const sourcePlanetId = rawData["data-raw-sourceplanetid"] || "inconnue";
          const sourceLocationType = rawData["data-raw-sourceplanettype"] === "3" ? "moon" : "planet";
          const sourceDetails = [
            `Espionneur : ${sourcePlayerName}`,
            `Coordonnées : ${sourceCoordinates || "inconnues"}`,
            `Type : ${sourceLocationType === "moon" ? "Lune" : "Planète"}`,
            `ID joueur : ${sourcePlayerId}`,
            `ID planète : ${sourcePlanetId}`
          ];
          addCoordinateLink(coordinatesGroup, sourceCoordinates, sourceLocationType, sourceDetails.join("\n"));
        } else {
          addCoordinateLink(
            coordinatesGroup,
            report.coordinates,
            report.locationType,
            "Ouvrir cette position dans la galaxie"
          );
        }
        contents.appendChild(coordinatesGroup);

        const resourcesCell = document.createElement("span");
        resourcesCell.style.cssText = "display:inline-flex;align-items:center;gap:2px;";
        const resourceColors = [
          ["metal", "#d6d6d6", "Métal"],
          ["crystal", "#51d6ff", "Cristal"],
          ["deuterium", "#66dd66", "Deutérium"]
        ];
        if (isEnemySpy) {
          addCoordinateLink(
            resourcesCell,
            report.coordinates,
            report.locationType,
            `Position espionnée : ${report.coordinates || "inconnue"} (${report.locationType === "moon" ? "Lune" : "Planète"})`,
            true
          );
        } else if (resourceTotal > 0) {
          const diskColors = ["#006400", "#ff00ff", "#00008b"];
          const resourceValues = resourceColors.map(([key]) => Math.max(0, Number(resources[key]) || 0));
          const metalEnd = resourceValues[0] / resourceTotal * 100;
          const crystalEnd = (resourceValues[0] + resourceValues[1]) / resourceTotal * 100;
          const totalLabel = document.createElement("div");
          totalLabel.textContent = resourceTotalDisplay;
          totalLabel.style.cssText = "margin-right:2px;color:#fff;font:9px Arial,sans-serif;white-space:nowrap;";
          resourcesCell.appendChild(totalLabel);

          const resourceDisk = document.createElement("span");
          resourceDisk.setAttribute("role", "img");
          resourceDisk.setAttribute("aria-label", "Survoler pour afficher les ressources");
          resourceDisk.style.cssText = `display:inline-block;width:20px;height:20px;border:1px solid #aeb9c4;border-radius:50%;background:conic-gradient(${diskColors[0]} 0 ${metalEnd}%,${diskColors[1]} ${metalEnd}% ${crystalEnd}%,${diskColors[2]} ${crystalEnd}% 100%);cursor:help;box-shadow:0 1px 2px rgba(0,0,0,.4);`;

          let diskTooltip = null;
          const positionDiskTooltip = event => {
            if (!diskTooltip) return;
            diskTooltip.style.left = `${Math.max(4, Math.min(event.clientX + 12, window.innerWidth - diskTooltip.offsetWidth - 4))}px`;
            diskTooltip.style.top = `${Math.max(4, Math.min(event.clientY + 12, window.innerHeight - diskTooltip.offsetHeight - 4))}px`;
          };
          resourceDisk.addEventListener("mouseenter", event => {
            if (activeResourcesTooltip) activeResourcesTooltip.remove();
            diskTooltip = document.createElement("div");
            diskTooltip.style.cssText = "position:fixed;z-index:1000001;padding:5px 7px;background:#171d23;border:1px solid #777;border-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,.5);pointer-events:none;font:11px Arial,sans-serif;";
            const tooltipTable = document.createElement("table");
            tooltipTable.style.cssText = "border-collapse:collapse;";
            resourceColors.forEach(([key, color, label]) => {
              const tooltipRow = document.createElement("tr");
              const nameCell = document.createElement("td");
              nameCell.textContent = label;
              nameCell.style.cssText = `padding:1px 8px 1px 0;color:${color};`;
              const amountCell = document.createElement("td");
              amountCell.textContent = resourceDisplay[key];
              amountCell.style.cssText = `padding:1px 0;text-align:right;color:${color};`;
              tooltipRow.append(nameCell, amountCell);
              tooltipTable.appendChild(tooltipRow);
            });
            diskTooltip.appendChild(tooltipTable);
            document.body.appendChild(diskTooltip);
            activeResourcesTooltip = diskTooltip;
            positionDiskTooltip(event);
          });
          resourceDisk.addEventListener("mousemove", positionDiskTooltip);
          resourceDisk.addEventListener("mouseleave", () => {
            if (diskTooltip) diskTooltip.remove();
            if (activeResourcesTooltip === diskTooltip) activeResourcesTooltip = null;
            diskTooltip = null;
          });
          resourcesCell.appendChild(resourceDisk);
        }
        contents.appendChild(resourcesCell);

        const forceBadge = document.createElement("span");
        if (isEnemySpy) {
          const chance = counterEspionageChance;
          const hue = chance === null ? 0 : Math.round(chance * 1.2);
          forceBadge.textContent = chance === null ? "--" : `${chance}%`;
          forceBadge.title = chance === null
            ? "Chance de contre-espionnage inconnue"
            : `Chance de contre-espionnage détectée : ${chance}%`;
          forceBadge.style.cssText = `display:inline-flex;box-sizing:border-box;min-width:31px;min-height:20px;align-items:center;justify-content:center;padding:1px 3px;border:1px solid ${chance === null ? "#aeb9c4" : `hsl(${hue},65%,58%)`};border-radius:12px;background:${chance === null ? "#4b5563" : `hsl(${hue},72%,30%)`};color:#fff;font:bold 8px Arial,sans-serif;text-shadow:0 1px 1px rgba(0,0,0,.8);box-shadow:0 1px 2px rgba(0,0,0,.4);`;
        } else {
          const hasForces = forceWeight > 0;
          forceBadge.textContent = `${hasForces ? "⚔" : "✓"} ${forceDisplay}`;
          forceBadge.title = `🚀 Flotte : ${facts.fleet.count} unité(s) — 🛡 Défense : ${facts.defense.count} unité(s) — poids total`;
          forceBadge.style.cssText = `display:inline-flex;box-sizing:border-box;min-width:31px;min-height:20px;align-items:center;justify-content:center;gap:2px;padding:1px 3px;border:1px solid ${hasForces ? "#d97870" : "#59c894"};border-radius:12px;background:${hasForces ? "#7f1d1d" : "#14532d"};color:#fff;font:bold 8px Arial,sans-serif;white-space:nowrap;text-shadow:0 1px 1px rgba(0,0,0,.8);box-shadow:0 1px 2px rgba(0,0,0,.4);`;
        }
        contents.appendChild(forceBadge);

        const lootBadge = document.createElement("span");
        const lootPercent = report.lootPercent;
        const lootColor = lootPercent === 100 ? "#e53935" : lootPercent === 75 ? "#ff00ff" : lootPercent === 50 ? "#007bff" : "#555";
        lootBadge.textContent = lootPercent == null ? "—" : `${lootPercent}%`;
        lootBadge.style.cssText = `display:inline-flex;box-sizing:border-box;width:22px;height:22px;align-items:center;justify-content:center;border:1px solid rgba(235,242,250,.8);border-radius:50%;background:${lootColor};color:#fff;font:8px Arial,sans-serif;font-weight:bold;text-shadow:0 1px 2px #000;box-shadow:0 1px 2px rgba(0,0,0,.45);`;
        contents.appendChild(lootBadge);

        const ageBadge = document.createElement("span");
        ageBadge.textContent = ageMinutes === null ? "--" : ageMinutes > 60 ? ">>" : String(ageMinutes).padStart(2, "0");
        const reportIsActive = Date.parse(report.expiresAt) > Date.now();
        ageBadge.title = ageMinutes === null ? "Date du rapport inconnue" : `${ageMinutes} minute(s)`;
        ageBadge.style.cssText = `display:inline-flex;box-sizing:border-box;width:22px;height:22px;align-items:center;justify-content:center;border:1px solid ${reportIsActive ? "#63c995" : "#aeb9c4"};border-radius:50%;background:${ageColor};color:#fff;font:8px Arial,sans-serif;font-weight:bold;text-shadow:0 1px 2px #000;box-shadow:0 1px 2px rgba(0,0,0,.45);`;
        contents.appendChild(ageBadge);

        const categoryBadge = document.createElement("span");
        const category = report.category;
        if (category === "EnnemySpy") {
          categoryBadge.textContent = "⚠";
          categoryBadge.title = "Ennemi — rapport d'espionnage ennemi";
          categoryBadge.style.cssText = "display:inline-flex;box-sizing:border-box;width:22px;height:22px;align-items:center;justify-content:center;border:1px solid #d5b44c;border-radius:50%;background:#7d1111;color:#fff;font-size:13px;font-weight:bold;text-shadow:0 1px 2px #000;box-shadow:0 1px 2px rgba(0,0,0,.45);";
        } else {
          const categoryNumber = category.replace("Target", "");
          const categoryColors = { Target1: "#123d75", Target2: "#d87900", Target3: "#8b0000", Target4: "#777" };
          const categoryDescriptions = {
            Target1: "≥1,5M de ressources, inactif, sans flotte ni défense",
            Target2: "≥1,5M de ressources, non-inactif, sans flotte ni défense",
            Target3: "≥1,5M de ressources, avec flotte ou défense",
            Target4: "<1,5M de ressources"
          };
          categoryBadge.textContent = categoryNumber;
          categoryBadge.title = `${category} — ${categoryDescriptions[category] || ""}`;
          const categoryColor = categoryColors[category] || "#777";
          categoryBadge.style.cssText = `display:inline-flex;box-sizing:border-box;width:22px;height:22px;align-items:center;justify-content:center;border:1px solid #b9c9dc;border-radius:50%;background:${categoryColor};color:#fff;font:8px Arial,sans-serif;font-weight:bold;text-shadow:0 1px 2px #000;box-shadow:0 1px 2px rgba(0,0,0,.45);`;
        }
        contents.appendChild(categoryBadge);

        if (activeMission) {
          const activeIcon = document.createElement("span");
          activeIcon.textContent = "🚀";
          activeIcon.title = `${activeMission.missionId === "6" ? "Espionnage" : "Attaque"} en cours${activeMission.returning ? " (retour)" : " (aller)"}`;
          activeIcon.style.cssText = "display:inline-flex;width:22px;height:22px;align-items:center;justify-content:center;border:1px solid #63c995;border-radius:50%;background:#174c35;font-size:13px;box-shadow:0 1px 2px rgba(0,0,0,.45);";
          contents.appendChild(activeIcon);
        } else {
          const waitingLink = document.createElement("a");
          waitingLink.href = getSpyReportNavigationUrl(report, "fleetdispatch", 1);
          waitingLink.textContent = "⏳";
          waitingLink.title = "En attente — préparer une attaque avec les vaisseaux sélectionnés";
          waitingLink.style.cssText = "display:inline-flex;width:22px;height:22px;align-items:center;justify-content:center;border:1px solid #d6aa4d;border-radius:50%;background:#513b12;font-size:13px;text-decoration:none;box-shadow:0 1px 2px rgba(0,0,0,.45);";
          waitingLink.addEventListener("click", event => {
            event.preventDefault();
            window.location.href = getSpyReportNavigationUrl(report, "fleetdispatch", 1);
          });
          contents.appendChild(waitingLink);
        }

        const spyLink = document.createElement("button");
        spyLink.type = "button";
        spyLink.className = "icon icon_eye";
        spyLink.disabled = isEnemySpy;
        spyLink.title = isEnemySpy ? "Espionnage désactivé pour les rapports ennemis" : "Lancer l'espionnage de cette cible";
        spyLink.setAttribute("aria-label", spyLink.title);
        spyLink.style.cssText = "box-sizing:border-box;width:22px;height:22px;padding:0;border:1px solid #82aaca;border-radius:50%;background:#173451;vertical-align:middle;box-shadow:0 1px 2px rgba(0,0,0,.45);";
        const coordinates = String(report.coordinates || "").match(/^(\d{1,2}):(\d{1,3}):(\d{1,2})$/);
        if (!isEnemySpy && coordinates) {
          const targetType = Number(report.targetPlanetType || (report.locationType === "moon" ? 3 : 1));
          spyLink.setAttribute(
            "onclick",
            `sendShipsWithPopup(6,${coordinates[1]},${coordinates[2]},${coordinates[3]},${targetType},100); return false;`
          );
        }
        if (isEnemySpy) spyLink.style.opacity = "0.35";
        contents.appendChild(spyLink);

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "icon icon_trash";
        deleteButton.title = `Supprimer ce rapport de ${selectedSpyReportCategory}`;
        deleteButton.setAttribute("aria-label", deleteButton.title);
        deleteButton.style.cssText = "position:absolute;top:3px;right:3px;width:18px;height:18px;padding:0;border:1px solid #a4777c;border-radius:3px;background-color:#482126;cursor:pointer;";
        deleteButton.addEventListener("click", event => {
          event.preventDefault();
          event.stopPropagation();
          if (!window.deleteInfoComptePlusSpyReport(report.key)) {
            showNotification("Impossible de supprimer ce rapport sauvegardé.","error","Spy reports");
            return;
          }
          renderSpyReportList();
        });
        card.append(contents, deleteButton);
        reportGrid.appendChild(card);
      });
      reportList.appendChild(reportGrid);
    }
    reportSection.appendChild(reportList);
    const messagesContainer = document.getElementById("messages");
    if (!messagesContainer) {
      console.error("Conteneur #messages introuvable pour afficher les rapports d'espionnage.");
      showNotification("Impossible d'afficher les rapports : conteneur des messages introuvable.","error","Spy reports");
      return;
    }
    if (spyReportViewElement && spyReportViewElement.parentNode === messagesContainer) {
      messagesContainer.replaceChild(reportSection, spyReportViewElement);
    } else {
      if (!messageHolderForReports || messageHolderForReports.parentNode !== messagesContainer) {
        messageHolderForReports = messagesContainer.querySelector(".messagesHolder");
      }
      if (!messageHolderForReports || messageHolderForReports.parentNode !== messagesContainer) {
        console.error("Conteneur messagesHolder introuvable pour afficher les rapports d'espionnage.");
        showNotification("Impossible d'afficher les rapports : messagesHolder introuvable.","error","Spy reports");
        return;
      }
      messagesContainer.replaceChild(reportSection, messageHolderForReports);
    }
    spyReportViewElement = reportSection;
  }

  function setSpyMessagesExpanded(messagesContainer, expanded) {
    const messageContent = messagesContainer.closest(".messageContent");
    const messageHolder = messageHolderForReports || messagesContainer.querySelector(".messagesHolder");
    const elements = [messagesContainer, messageContent, messageHolder].filter(Boolean);

    if (expanded) {
      if (!spyMessagesOriginalStyles) {
        spyMessagesOriginalStyles = elements.map(element => ({
          element,
          height: element.style.height,
          maxHeight: element.style.maxHeight,
          overflow: element.style.overflow,
          overflowY: element.style.overflowY
        }));
      }
      elements.forEach(element => {
        element.style.height = "auto";
        element.style.maxHeight = "none";
        element.style.overflow = "visible";
        element.style.overflowY = "visible";
      });
      return;
    }

    if (!spyMessagesOriginalStyles) return;
    spyMessagesOriginalStyles.forEach(saved => {
      saved.element.style.height = saved.height;
      saved.element.style.maxHeight = saved.maxHeight;
      saved.element.style.overflow = saved.overflow;
      saved.element.style.overflowY = saved.overflowY;
    });
    spyMessagesOriginalStyles = null;
  }

  window.toggleInfoComptePlusSpyReportView = function(visible) {
    const messagesContainer = document.getElementById("messages");
    if (!messagesContainer) {
      console.error("Conteneur #messages introuvable.");
      showNotification("Impossible d'accéder au conteneur des messages.","error","Spy reports");
      return false;
    }

    if (visible) {
      if (!spyReportViewElement || spyReportViewElement.parentNode !== messagesContainer) {
        const currentMessagesHolder = messagesContainer.querySelector(".messagesHolder");
        if (currentMessagesHolder) {
          messageHolderForReports = currentMessagesHolder;
        } else if (!messageHolderForReports || messageHolderForReports.parentNode !== messagesContainer) {
          messageHolderForReports = document.createElement("div");
          messageHolderForReports.className = "messagesHolder";
          messagesContainer.appendChild(messageHolderForReports);
        }
      }
      setSpyMessagesExpanded(messagesContainer, true);
      window.setInfoComptePlusSpyReportsVisible(true);
      renderSpyReportList();
      const reportViewMounted = Boolean(spyReportViewElement && spyReportViewElement.parentNode === messagesContainer);
      if (!reportViewMounted) {
        window.setInfoComptePlusSpyReportsVisible(false);
        setSpyMessagesExpanded(messagesContainer, false);
      }
      return reportViewMounted;
    }

    if (activeResourcesTooltip) {
      activeResourcesTooltip.remove();
      activeResourcesTooltip = null;
    }
    if (spyReportViewElement && spyReportViewElement.parentNode === messagesContainer) {
      if (!messageHolderForReports) {
        console.error("Le conteneur messagesHolder d'origine est introuvable.");
        showNotification("Impossible de revenir aux messages d'origine.","error","Spy reports");
        return false;
      }
      messagesContainer.replaceChild(messageHolderForReports, spyReportViewElement);
      spyReportViewElement = null;
    }
    setSpyMessagesExpanded(messagesContainer, false);
    window.setInfoComptePlusSpyReportsVisible(false);
    return true;
  };

  // Actualisation de la partie flotte
  function refreshFleetDisplay(force = false) {
    // Actualisation uniquement en mode OK
    if ((!enabled || pending > 0) && !force) return;

    // Capture l'heure de cette actualisation
    lastFleetRefresh = new Date();

    const stats = getFleetStats();

    fleetButton.textContent =
      `Flottes Actives (${stats.active}/${stats.returning}) ${detailsVisible ? "▲" : "▼"}`;

    renderFleetDetails(stats);

    fleetButton.style.display = "block";

    fleetDetails.style.display =
      detailsVisible ? "block" : "none";
  }

  // Actualisation générale
  function render() {
    if (!enabled) {
      status.textContent = "OFF";
      status.style.color = "#aaa";

      fleetButton.style.display = "none";
      fleetDetails.style.display = "none";
      return;
    }

    if (pending > 0) {
      status.textContent =
        `Loading... (${pending}/${ok}/${ko})`;

      status.style.color = "orange";

      fleetButton.style.display = "none";
      fleetDetails.style.display = "none";
      return;
    }

    status.textContent = `OK (0/${ok}/${ko})`;
    status.style.color = "#00ff00";

    refreshFleetDisplay();
  }

  // Début d'une requête
  function startRequest() {
    if (!enabled) return null;

    clearTimeout(idleTimer);

    if (pending === 0) {
      ok = 0;
      ko = 0;
      generation++;
    }

    pending++;
    render();

    return generation;
  }

  // Fin d'une requête
  function finishRequest(success, trackedGeneration) {
    if (trackedGeneration === null) return;
    if (trackedGeneration !== generation) return;
    if (!enabled) return;

    pending = Math.max(0, pending - 1);

    if (success) {
      ok++;
    } else {
      ko++;
    }

    render();

    if (pending === 0) {
      idleTimer = setTimeout(() => {
        if (enabled && pending === 0) {
          render();
        }
      }, IDLE_DELAY);
    }
  }

  // Interception de fetch
  const originalFetch = window.fetch;

  window.fetch = function (...args) {
    const trackedGeneration = startRequest();

    let promise;

    try {
      promise = originalFetch.apply(this, args);
    } catch (error) {
      finishRequest(false, trackedGeneration);
      throw error;
    }

    return promise.then(
      response => {
        finishRequest(response.ok, trackedGeneration);
        return response;
      },
      error => {
        finishRequest(false, trackedGeneration);
        throw error;
      }
    );
  };

  // Interception de XMLHttpRequest
  const originalXHROpen = XMLHttpRequest.prototype.open;
  const originalXHRSend = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.open = function (...args) {
    return originalXHROpen.apply(this, args);
  };

  XMLHttpRequest.prototype.send = function (...args) {
    const trackedGeneration = startRequest();

    if (trackedGeneration !== null) {
      this.addEventListener("loadend", () => {
        const success =
          this.status >= 200 && this.status < 400;

        finishRequest(success, trackedGeneration);
      }, { once: true });
    }

    try {
      return originalXHRSend.apply(this, args);
    } catch (error) {
      finishRequest(false, trackedGeneration);
      throw error;
    }
  };

  // Déplier / replier les détails
  fleetButton.addEventListener("click", () => {
    detailsVisible = !detailsVisible;
    refreshFleetDisplay();
  });

  // Activation / désactivation
  toggle.addEventListener("change", () => {
    enabled = toggle.checked;

    localStorage.setItem(
      STORAGE_KEY,
      String(enabled)
    );

    clearTimeout(idleTimer);

    generation++;
    pending = 0;
    ok = 0;
    ko = 0;
    detailsVisible = true;

    render();
  });

  // Actualisation automatique toutes les 1583 ms
  // Seulement lorsque le statut API est OK
  setInterval(() => {
    if (enabled && pending === 0) {
      refreshFleetDisplay();
    }
  }, FLEET_REFRESH_INTERVAL);

  // API publique
  window.apiMonitor = {
    getStats() {
      return {
        enabled,
        pending,
        ok,
        ko,
        fleets: getFleetStats(),
        lastFleetRefresh: lastFleetRefresh
          ? formatTimestamp(lastFleetRefresh)
          : null
      };
    },

    enable() {
      toggle.checked = true;
      toggle.dispatchEvent(new Event("change"));
    },

    disable() {
      toggle.checked = false;
      toggle.dispatchEvent(new Event("change"));
    },

    reset() {
      generation++;
      pending = 0;
      ok = 0;
      ko = 0;

      clearTimeout(idleTimer);
      render();
    },

    refreshFleets() {
      refreshFleetDisplay();
    }
  };

  render();
