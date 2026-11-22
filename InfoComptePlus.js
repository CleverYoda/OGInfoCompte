
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

  function getSpyReportStore() {
      const saved = localStorage.getItem(SPY_REPORT_STORAGE_KEY);
      if (saved == null) {
          return { version: 1, updatedAt: null, reports: [] };
      }

      try {
          const parsed = JSON.parse(saved);
          if (parsed && Array.isArray(parsed.reports)) {
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
          const key = coordinates ? `coords:${coordinates}:${locationType}` : `message:${messageId}`;
          const resources = {
              metal: getSpyNumber(rawData["data-raw-metal"]) ?? getSpyResource(rawText, ["metal", "m[eé]tal"]),
              crystal: getSpyNumber(rawData["data-raw-crystal"]) ?? getSpyResource(rawText, ["crystal", "cristal"]),
              deuterium: getSpyNumber(rawData["data-raw-deuterium"]) ?? getSpyResource(rawText, ["deuterium", "deut[eé]rium", "deut"])
          };
          const rawLoot = rawData["data-raw-loot"];
          const rawLootPercent = /^\d+$/.test(rawLoot || "") ? parseInt(rawLoot, 10) : null;
          const isSpyReport = (rawDataElement && [50, 75, 100].includes(rawLootPercent))
              || /espionage|espionnage|spy report|rapport d['’ ]espionnage/i.test(searchableText);
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
          let expiresAt = new Date((reportedAt ? reportTimeMs : nowMs) + 60 * 60 * 1000).toISOString();
          if (!reportedAt && existingReport && existingReport.rawText === rawText && existingReport.expiresAt) {
              expiresAt = existingReport.expiresAt;
          }
          const reportData = {
              key,
              messageId,
              coordinates: coordinates || null,
              locationType,
              resources,
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
              rawText,
              rawHtml: message.innerHTML,
              attributes: getSpyReportAttributes(message),
              rawData
          };

          if (existingIndex === -1) {
              store.reports.push(reportData);
              added++;
          } else {
              store.reports[existingIndex] = reportData;
              updated++;
          }
      });

      store.updatedAt = now.toISOString();
      try {
          localStorage.setItem(SPY_REPORT_STORAGE_KEY, JSON.stringify(store));
      } catch (error) {
          console.error("Impossible de sauvegarder les rapports d'espionnage.", error);
          showNotification("Impossible de sauvegarder les rapports d'espionnage dans localStorage.","error","Spy reports");
          return null;
      }

      showNotification(`${added} nouveau(x) rapport(s), ${updated} actualisé(s).`,"info","Spy reports");
      if (spyReportsVisible) refreshFleetDisplay();
      return store;
  }

  function getSpyReportDisplayRows(store) {
      return store.reports.slice().sort((a, b) =>
          String(a.coordinates || a.messageId).localeCompare(String(b.coordinates || b.messageId))
      ).map(report => {
          const resources = report.loot || report.resources || {};
          const active = Date.parse(report.expiresAt) > Date.now();
          return {
              report,
              text: `[${report.coordinates || "?:???:??"}] ${resources.metal ?? "?"}/${resources.crystal ?? "?"}/${resources.deuterium ?? "?"} ${report.lootPercent ?? "?"}% ${active ? "on" : "off"}`
          };
      });
  }

  function toggleSpyReportList() {
      if (currentPage !== "messages") return;
      spyReportsVisible = !spyReportsVisible;
      refreshFleetDisplay();
  }

  window.getInfoComptePlusSpyReportState = function() {
      const store = getSpyReportStore();
      return {
          visible: spyReportsVisible,
          rows: store ? getSpyReportDisplayRows(store) : []
      };
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
                if (currentPage=="messages")
                    toggleSpyReportList();
                break;
            case 70: //f
                break;
            case 78: //n
                if (currentPage=="messages")
                    scanSpyReports();
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
    borderRadius: "6px",
    font: "12px Arial, sans-serif",
    width: "300px",
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

  // Affichage du détail des missions
  function renderFleetDetails(stats) {
    fleetDetails.innerHTML = "";

    Object.entries(stats.missions)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .forEach(([mission, counts]) => {
        const line = document.createElement("div");

        line.textContent =
          `${mission} (${counts.active}/${counts.returning})`;

        fleetDetails.appendChild(line);
      });

    // Total
    const total = document.createElement("div");

    Object.assign(total.style, {
      fontWeight: "bold",
      marginTop: "5px",
      borderTop: "1px solid #666",
      paddingTop: "5px"
    });

    total.textContent =
      `TOTAL (${stats.active}/${stats.returning})`;

    fleetDetails.appendChild(total);

    // Timestamp de la dernière actualisation
    const updateLine = document.createElement("div");

    Object.assign(updateLine.style, {
      marginTop: "3px",
      color: "#aaa",
      fontSize: "11px"
    });

    updateLine.textContent =
      `MAJ : ${lastFleetRefresh ? formatTimestamp(lastFleetRefresh) : "--"}`;

    fleetDetails.appendChild(updateLine);

    const spyReportState = window.getInfoComptePlusSpyReportState
      ? window.getInfoComptePlusSpyReportState()
      : null;
    if (spyReportState && spyReportState.visible) {
      const title = document.createElement("div");
      title.textContent = `Rapports d'espionnage (${spyReportState.rows.length})`;
      title.style.cssText = "margin-top:5px;padding-top:4px;border-top:1px solid #444;font-weight:bold;";
      fleetDetails.appendChild(title);

      const reportList = document.createElement("div");
      reportList.style.cssText = "max-height:40vh;overflow-y:auto;";
      if (spyReportState.rows.length === 0) {
        const empty = document.createElement("div");
        empty.textContent = "Aucun rapport enregistré. Appuyez sur N pour scanner.";
        reportList.appendChild(empty);
      } else {
        spyReportState.rows.forEach(({ report, text }) => {
          const row = document.createElement("div");
          row.textContent = text;
          row.title = report.rawText || "";
          row.style.cssText = "padding:3px 0;border-bottom:1px solid #444;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:11px;";
          reportList.appendChild(row);
        });
      }
      fleetDetails.appendChild(reportList);
    }
  }

  // Actualisation de la partie flotte
  function refreshFleetDisplay() {
    // Actualisation uniquement en mode OK
    if (!enabled || pending > 0) return;

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
