
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
      const messages = document.querySelectorAll("div.messagesHolder div.msg");

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

      showNotification(`${added} nouveau(x) rapport(s), ${updated} actualisé(s).`,"info","Spy reports");
      return store;
  }

  function formatSpyMagnitude(value) {
      if (value == null || !Number.isFinite(Number(value))) return "--";
      const amount = Number(value);
      if (amount === 0) return "0";
      if (amount > 700000000000) return `${(amount / 1000000000000).toFixed(2)}T`;
      if (amount > 700000000) return `${(amount / 1000000000).toFixed(2)}B`;
      return `${(amount / 1000000).toFixed(2)}M`;
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
          const resourceTotal = ["metal", "crystal", "deuterium"].reduce(
              (total, key) => total + (Number(displayResources[key]) || 0),
              0
          );
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
              fleetDisplay: formatSpyMagnitude(facts.fleet.weight),
              defenseDisplay: formatSpyMagnitude(facts.defense.weight),
              ageMinutes,
              ageColor: getSpyReportAgeColor(ageMinutes),
              activeMission: activeMission || null
          };
      });
  }

  function toggleSpyReportList() {
      if (currentPage !== "messages") return;
      spyReportsVisible = true;
      detailsVisible = true;
      refreshFleetDisplay(true, true);
  }

  window.getInfoComptePlusSpyReportState = function() {
      const store = getSpyReportStore();
      return {
          visible: spyReportsVisible,
          rows: store ? getSpyReportDisplayRows(store) : []
      };
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
                    scanSpyReports();
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
  let cachedSpyReportList = null;
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
  function renderFleetDetails(stats, refreshSpyReports = false) {
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

    if (refreshSpyReports) {
      renderSpyReportList();
    } else if (cachedSpyReportList) {
      fleetDetails.appendChild(cachedSpyReportList);
    }
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

    panel.style.width = "360px";
    const reportSection = document.createElement("div");
    const title = document.createElement("div");
    title.textContent = `Rapports d'espionnage (${spyReportState.rows.length})`;
    title.style.cssText = "margin-top:5px;padding-top:4px;border-top:1px solid #444;font-weight:bold;";
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
    tabs.style.cssText = "display:flex;gap:2px;margin-top:4px;width:100%;";
    SPY_REPORT_TAB_CATEGORIES.forEach(category => {
      const tab = document.createElement("button");
      tab.type = "button";
      tab.setAttribute("aria-pressed", String(selectedSpyReportCategory === category));
      tab.style.cssText = `position:relative;flex:1;min-width:0;padding:4px 1px 3px;border:1px solid ${selectedSpyReportCategory === category ? "#8ab4f8" : "#555"};border-radius:3px;background:${selectedSpyReportCategory === category ? "#34465d" : "#252a30"};color:#fff;font:9px Arial,sans-serif;white-space:nowrap;cursor:pointer;`;
      const label = document.createElement("span");
      label.textContent = category;
      const count = document.createElement("sup");
      count.textContent = String(categoryCounts[category]);
      count.style.cssText = "position:absolute;top:-5px;right:1px;font:8px Arial,sans-serif;color:#ffd54f;";
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

    const reportList = document.createElement("div");
    reportList.style.cssText = "max-height:45vh;overflow:auto;margin-top:4px;width:100%;";
    const visibleRows = spyReportState.rows.filter(({ report }) => report.category === selectedSpyReportCategory);
    if (visibleRows.length === 0) {
      const empty = document.createElement("div");
      empty.textContent = `Aucun rapport dans ${selectedSpyReportCategory}. Appuyez sur N pour scanner.`;
      reportList.appendChild(empty);
    } else {
      const table = document.createElement("table");
      table.style.cssText = "border-collapse:collapse;table-layout:fixed;width:100%;font:9px Arial,sans-serif;line-height:1;text-align:center;";
      const columns = document.createElement("colgroup");
      ["20%", "17%", "10%", "10%", "8%", "9%", "9%", "8%", "9%"].forEach(width => {
        const column = document.createElement("col");
        column.style.width = width;
        columns.appendChild(column);
      });
      table.appendChild(columns);

      const body = document.createElement("tbody");
      visibleRows.forEach(({ report, facts, resources, resourceTotal, resourceTotalDisplay, resourceDisplay, fleetDisplay, defenseDisplay, ageMinutes, ageColor, activeMission }) => {
        const row = document.createElement("tr");
        row.title = report.rawText || "";
        row.style.borderBottom = "1px solid #444";

        const addCell = () => {
          const cell = document.createElement("td");
          cell.style.cssText = "padding:1px;white-space:nowrap;vertical-align:middle;overflow:hidden;";
          row.appendChild(cell);
          return cell;
        };

        const coordinatesCell = addCell();
        const coordinatesLink = document.createElement("a");
        coordinatesLink.href = getSpyReportNavigationUrl(report, "galaxy");
        coordinatesLink.title = "Ouvrir cette position dans la galaxie";
        coordinatesLink.style.cssText = "color:#e8e8e8;text-decoration:none;font-size:9px;";
        coordinatesLink.appendChild(document.createTextNode(`[${report.coordinates || "?:???:??"}]`));
        if (report.locationType === "moon") {
          const moonIcon = document.createElement("figure");
          moonIcon.className = "planetIcon moon";
          moonIcon.style.cssText = "display:inline-block;width:16px;height:16px;margin:0 0 0 2px;vertical-align:middle;";
          coordinatesLink.appendChild(moonIcon);
        }
        coordinatesLink.addEventListener("click", () => {
          try {
            sessionStorage.setItem(SPY_GALAXY_HIGHLIGHT_KEY, JSON.stringify({ coordinates: report.coordinates }));
          } catch (error) {
            console.error("Impossible de mémoriser la position à surligner.", error);
          }
        });
        coordinatesCell.appendChild(coordinatesLink);

        const resourcesCell = addCell();
        const resourceColors = [
          ["metal", "#d6d6d6", "Métal"],
          ["crystal", "#51d6ff", "Cristal"],
          ["deuterium", "#66dd66", "Deutérium"]
        ];
        if (resourceTotal > 0) {
          const diskColors = ["#006400", "#ff00ff", "#00008b"];
          const resourceValues = resourceColors.map(([key]) => Math.max(0, Number(resources[key]) || 0));
          const metalEnd = resourceValues[0] / resourceTotal * 100;
          const crystalEnd = (resourceValues[0] + resourceValues[1]) / resourceTotal * 100;
          const totalLabel = document.createElement("div");
          totalLabel.textContent = resourceTotalDisplay;
          totalLabel.style.cssText = "margin-bottom:1px;color:#fff;font:inherit;white-space:nowrap;";
          resourcesCell.appendChild(totalLabel);

          const resourceDisk = document.createElement("span");
          resourceDisk.setAttribute("role", "img");
          resourceDisk.setAttribute("aria-label", "Survoler pour afficher les ressources");
          resourceDisk.style.cssText = `display:inline-block;width:24px;height:24px;border:1px solid #bbb;border-radius:50%;background:conic-gradient(${diskColors[0]} 0 ${metalEnd}%,${diskColors[1]} ${metalEnd}% ${crystalEnd}%,${diskColors[2]} ${crystalEnd}% 100%);cursor:help;`;

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

        const fleetCell = addCell();
        fleetCell.textContent = fleetDisplay;
        fleetCell.style.color = "#ffb347";
        fleetCell.title = `${facts.fleet.count} vaisseau(x)`;

        const defenseCell = addCell();
        defenseCell.textContent = defenseDisplay;
        defenseCell.style.color = "#ff3030";
        defenseCell.title = `${facts.defense.count} unité(s) de défense`;

        const lootCell = addCell();
        const lootBadge = document.createElement("span");
        const lootPercent = report.lootPercent;
        const lootColor = lootPercent === 100 ? "#e53935" : lootPercent === 75 ? "#ff00ff" : lootPercent === 50 ? "#007bff" : "#555";
        lootBadge.textContent = lootPercent == null ? "—" : `${lootPercent}%`;
        lootBadge.style.cssText = `display:inline-flex;box-sizing:border-box;width:24px;height:24px;align-items:center;justify-content:center;border-radius:50%;background:${lootColor};color:#fff;font:inherit;font-weight:bold;`;
        lootCell.appendChild(lootBadge);

        const ageCell = addCell();
        const ageBadge = document.createElement("span");
        ageBadge.textContent = ageMinutes === null ? "--" : ageMinutes > 60 ? ">>" : String(ageMinutes).padStart(2, "0");
        const reportIsActive = Date.parse(report.expiresAt) > Date.now();
        ageBadge.title = ageMinutes === null ? "Date du rapport inconnue" : `${ageMinutes} minute(s)`;
        ageBadge.style.cssText = `display:inline-flex;box-sizing:border-box;width:28px;height:28px;align-items:center;justify-content:center;border:2px solid ${reportIsActive ? "#008000" : "#444"};border-radius:50%;background:${ageColor};color:#fff;font:inherit;font-weight:bold;`;
        ageCell.appendChild(ageBadge);

        const categoryCell = addCell();
        const categoryBadge = document.createElement("span");
        const category = report.category;
        if (category === "EnnemySpy") {
          categoryBadge.textContent = "⚠";
          categoryBadge.title = "Ennemi — rapport d'espionnage ennemi";
          categoryBadge.style.cssText = "display:inline-flex;width:28px;height:28px;align-items:center;justify-content:center;border-radius:50%;background:#7d1111;color:#ffd54f;font-size:16px;font-weight:bold;";
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
          categoryBadge.style.cssText = `display:inline-flex;width:28px;height:28px;align-items:center;justify-content:center;border-radius:50%;background:${categoryColors[category] || "#777"};color:#fff;font:inherit;font-weight:bold;`;
        }
        categoryCell.appendChild(categoryBadge);

        const stateCell = addCell();
        if (activeMission) {
          const activeIcon = document.createElement("span");
          activeIcon.textContent = "🚀";
          activeIcon.title = `${activeMission.missionId === "6" ? "Espionnage" : "Attaque"} en cours${activeMission.returning ? " (retour)" : " (aller)"}`;
          activeIcon.style.fontSize = "16px";
          stateCell.appendChild(activeIcon);
        } else {
          const waitingLink = document.createElement("a");
          waitingLink.href = getSpyReportNavigationUrl(report, "fleetdispatch", 1);
          waitingLink.textContent = "⏳";
          waitingLink.title = "En attente — préparer une attaque avec les vaisseaux sélectionnés";
          waitingLink.style.fontSize = "16px";
          waitingLink.addEventListener("click", event => {
            event.preventDefault();
            window.location.href = getSpyReportNavigationUrl(report, "fleetdispatch", 1);
          });
          stateCell.appendChild(waitingLink);
        }

        const spyCell = addCell();
        const spyLink = document.createElement("button");
        spyLink.type = "button";
        spyLink.className = "icon icon_eye";
        spyLink.title = "Lancer l'espionnage de cette cible";
        spyLink.style.cssText = "width:24px;height:24px;padding:0;vertical-align:middle;";
        const coordinates = String(report.coordinates || "").match(/^(\d{1,2}):(\d{1,3}):(\d{1,2})$/);
        if (coordinates) {
          const targetType = Number(report.targetPlanetType || (report.locationType === "moon" ? 3 : 1));
          spyLink.setAttribute(
            "onclick",
            `sendShipsWithPopup(6,${coordinates[1]},${coordinates[2]},${coordinates[3]},${targetType},100); return false;`
          );
        }
        spyCell.appendChild(spyLink);

        body.appendChild(row);
      });
      table.appendChild(body);
      reportList.appendChild(table);
    }
    reportSection.appendChild(reportList);
    if (cachedSpyReportList && cachedSpyReportList.parentNode) {
      cachedSpyReportList.parentNode.replaceChild(reportSection, cachedSpyReportList);
    } else {
      fleetDetails.appendChild(reportSection);
    }
    cachedSpyReportList = reportSection;
  }

  // Actualisation de la partie flotte
  function refreshFleetDisplay(force = false, refreshSpyReports = false) {
    // Actualisation uniquement en mode OK
    if ((!enabled || pending > 0) && !force) return;

    // Capture l'heure de cette actualisation
    lastFleetRefresh = new Date();

    const stats = getFleetStats();

    fleetButton.textContent =
      `Flottes Actives (${stats.active}/${stats.returning}) ${detailsVisible ? "▲" : "▼"}`;

    renderFleetDetails(stats, refreshSpyReports);

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
