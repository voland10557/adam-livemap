function fillMapWithData() {
	var circle;
	var circleLayer = new L.LayerGroup();
	
	// Step 1: Alle Stammdaten aller Bahnhöfe holen:
	$.getJSON( "http://52.28.216.160/api/station", function( bahnhofstammdaten ) {
		// Step 2: Alle facilities (aktuell nur Aufzüge) holen:
		$.getJSON( "https://adam.noncd.db.de/api/v1.0/facilities?type=ELEVATOR", function( facilities ) {
			// Alle Layer clearen sobald alle Daten geladen sind:
			clearMap();

			// TODO: SORT nach State-Kritikalität (unten: ACTIVE, mitte: UNKNOWN, oben: INACTIVE); aktuell alphabetisch
			facilities.sort(function(a, b) {
				return a["state"].localeCompare(b["state"]);
			});
			
			// Loop durch alle facilites:
			$.each( facilities, function( key, val ) {
				var equipmentnumber = val["equipmentnumber"];
				var x 				= val["geocoordX"];
				var y 				= val["geocoordY"];
				var state 			= val["state"];
				var stationnumber 	= val["stationnumber"];
				var description 	= val["description"];
				// Extrahiere die folgenden Daten aus den Stammdaten:
				var station;
				var bundesland;
				var bm;
				var bfDsAbk;
				var katVst;
				var strasse;
				var plz;
				var ort;
				var aufgabentraeger;
				var verkehrsVerb;
				var fernverkehr;
				var nahverkehr;
				
				// Stationsname aus den Stammdaten suchen:
				for(var i = 0; i < bahnhofstammdaten.length; i++) {
					if(bahnhofstammdaten[i].bfNr == stationnumber) {
						station_name = bahnhofstammdaten[i].station;
						bundesland = bahnhofstammdaten[i].bundesland;
						bm = bahnhofstammdaten[i].bm;
						bfDsAbk = bahnhofstammdaten[i].bfDsAbk;
						katVst = bahnhofstammdaten[i].katVst;
						strasse = bahnhofstammdaten[i].strasse;
						plz = bahnhofstammdaten[i].plz;
						ort = bahnhofstammdaten[i].ort;
						aufgabentraeger = bahnhofstammdaten[i].aufgabentraeger;
						verkehrsVerb = bahnhofstammdaten[i].verkehrsVerb;
						fernverkehr = bahnhofstammdaten[i].fernverkehr;
						nahverkehr = bahnhofstammdaten[i].nahverkehr;
					}
				}

				switch(state) {
					case "ACTIVE":
						circle = L.circleMarker([y, x], {radius: 5, color: '#000000', weight: 1, fillColor: '#00FF00', fill: true, fillOpacity: 1});
						circle.bindPopup(	"<b>Station:</b> " + station_name + " (" + stationnumber + ")" + "<br />" +
											"<b>Equipment-ID:</b> " + equipmentnumber + "<br />" +
											"<b>Anlagenstatus:</b> Anlage aktiv<br />" +
											"<b>Beschreibung:</b> " + description + "<br /><br />" +
											"<b>Bundesland:</b> " +bundesland+ "<br />" +
											"<b>Bahnhofsmanagement:</b> " +bm+ "<br />" +
											"<b>RL100:</b> " +bfDsAbk+ "<br />" +
											"<b>Kategorie:</b> " +katVst+ "<br />" +
											"<b>Stra&szlig;e:</b> " +strasse+ "<br />" +
											"<b>PLZ:</b> " +plz+ "<br />" +
											"<b>Ort:</b> " +ort+ "<br />" +
											"<b>Aufgabentr&auml;ger:</b> " +aufgabentraeger+ "<br />" +
											"<b>Verkehrsverbund:</b> " +verkehrsVerb+ "<br />" +
											"<b>Fernverkehr:</b> " +fernverkehr+ "<br />" +
											"<b>Nahverkehr:</b> " +  nahverkehr
						);
						circle.addTo(circleLayer)
						break;
					case "INACTIVE":
						circle = L.circleMarker([y, x], {radius: 5, color: '#000000', weight: 1, fillColor: '#FF0000', fill: true, fillOpacity: 1});
						circle.bindPopup(	"<b>Station:</b> " + station_name + " (" + stationnumber + ")" + "<br />" +
											"<b>Equipment-ID:</b> " + equipmentnumber + "<br />" +
											"<b>Anlagenstatus:</b> Anlage inaktiv<br />" +
											"<b>Beschreibung:</b> " + description + "<br /><br />" +
											"<b>Bundesland:</b> " +bundesland+ "<br />" +
											"<b>Bahnhofsmanagement:</b> " +bm+ "<br />" +
											"<b>RL100:</b> " +bfDsAbk+ "<br />" +
											"<b>Kategorie:</b> " +katVst+ "<br />" +
											"<b>Stra&szlig;e:</b> " +strasse+ "<br />" +
											"<b>PLZ:</b> " +plz+ "<br />" +
											"<b>Ort:</b> " +ort+ "<br />" +
											"<b>Aufgabentr&auml;ger:</b> " +aufgabentraeger+ "<br />" +
											"<b>Verkehrsverbund:</b> " +verkehrsVerb+ "<br />" +
											"<b>Fernverkehr:</b> " +fernverkehr+ "<br />" +
											"<b>Nahverkehr:</b> " +  nahverkehr
						);
						circle.addTo(circleLayer)
						break;
					case "UNKNOWN":
						circle = L.circleMarker([y, x], {radius: 5, color: '#000000', weight: 1, fillColor: '#B0B0B0', fill: true, fillOpacity: 1});
						circle.bindPopup(	"<b>Station:</b> " + station_name + " (" + stationnumber + ")" + "<br />" +
											"<b>Equipment-ID:</b> " + equipmentnumber + "<br />" +
											"<b>Anlagenstatus:</b> Anlagenstatus unbekannt<br />" +
											"<b>Beschreibung:</b> " + description + "<br /><br />" +
											"<b>Bundesland:</b> " +bundesland+ "<br />" +
											"<b>Bahnhofsmanagement:</b> " +bm+ "<br />" +
											"<b>RL100:</b> " +bfDsAbk+ "<br />" +
											"<b>Kategorie:</b> " +katVst+ "<br />" +
											"<b>Stra&szlig;e:</b> " +strasse+ "<br />" +
											"<b>PLZ:</b> " +plz+ "<br />" +
											"<b>Ort:</b> " +ort+ "<br />" +
											"<b>Aufgabentr&auml;ger:</b> " +aufgabentraeger+ "<br />" +
											"<b>Verkehrsverbund:</b> " +verkehrsVerb+ "<br />" +
											"<b>Fernverkehr:</b> " +fernverkehr+ "<br />" +
											"<b>Nahverkehr:</b> " +  nahverkehr
						);
						circle.addTo(circleLayer)
						break;
					default:
						console.log("invalid state");
				}
			});
		});
	});
	map.addLayer(circleLayer);
	
	// Refresh nach 120 Sekunden:
	window.setTimeout("fillMapWithData()", 120 * 1000);
}

// Clear Map (vor dem Refresh):
function clearMap() {
    for(i in map._layers) {
        if(map._layers[i]._path != undefined) {
            try {
                map.removeLayer(map._layers[i]);
            }
            catch(e) {
                console.log("problem with " + e + map._layers[i]);
            }
        }
    }
}