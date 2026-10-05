var GPSDatas = [];
var map3 = null;
var map4 = null;

const MapBackground = [
    {
      id: 501,
      name: 'Hybrid map',
      technicalLayerName: 'streets_jpeg'
    },
    {
      id: 502,
      name: 'Topographic map B/W',
      technicalLayerName: 'topo_bw_jpeg'
    },
    {
      id: 529,
      name: 'Topographic map',
      technicalLayerName: 'topogr_global'
    },
    {
      id: 530,
      name: 'Aerial Imagery',
      technicalLayerName: 'orthogr_2013_global'
    },
    {
      id: 556,
      name: 'Road map',
      technicalLayerName: 'basemap_2015_global'
    }
  ];

  document.querySelector("#buttons button").addEventListener('click', function() {
    window.open("", "", "width=400,height=400").document.write(htmlSOSText);
});

var htmlSOSText = '<p>FR</p>'+
''+
'<p>Née de pure paresse, une structure créée à partir de HTML, CSS et Java est apparue, capable de parcourir les photos pour des données GPS EXIF à une vitesse époustouflante et de les afficher sur deux cartes grâce à la plateforme www.geoportail.lu. Cela permet de transmettre ces données ainsi que les adresses associées plus rapidement que la lumière.</p>'+
''+
'<p>Si votre écran reste blanc, même après avoir glissé vos photos dans le navigateur avec la fonction glisser-déposer, c\'est parce qu\'aucunes données GPS n\'ont été trouvées dans les données EXIF de l\'image.</p>'+
''+
'<p>Pour modifier cet état et pour ancrer les données GPS dans l\'image, vous devez plonger dans les profondeurs des réglages/settings de votre appareil et activer la fonction correspondante. Lorsque vous transférez ensuite les images sur votre PC via un câble USB, les données GPS devraient être intégrées dans le fichier image.</p>'+
''+
'<p>Petite note en passant : même si vous autorisez l\'incorporation de données GPS dans les paramètres de votre système d\'exploitation, il se peut que ces données ne soient pas transmises lors de l\'envoi du fichier .jpg (c\'est-à-dire de votre image) par courrier électronique ou d\'autres plateformes de communication. La raison en est que un grand nombre de ces plateformes ont intégré une fonction de sécurité qui ne permet la transmission des données GPS que si l\'utilisateur l\'a expressément souhaité.</p>'+
''+
'<p>La copie du logiciel est autorisée de mon côté, bien sûr, toute responsabilité est exclue. Des conseils et des souhaits peuvent volontiers être transmis à moi, mais la mise en œuvre reste plutôt incertaine. (Mail: c.damme@gmail.com)</p>'+
''+
'<p> DE</p>'+
''+
'<p>Aus purer Faulheit entstand ein aus HTML, CSS und Java zusammengezimmertes Konstrukt, das in atemberaubender Geschwindigkeit Fotos auf EXIF-GPS-Daten durchsucht und mithilfe der Plattform www.geoportail.lu auf zwei Karten darstellt. Dies ermöglicht, diese Daten mitsamt den dazugehörigen Adressdaten schneller als das Licht weiterzuleiten.</p>'+
''+
'<p>Sollte Ihr Bildschirm in Weiß erstrahlen, auch nachdem Sie Ihre Fotos mit Drag-and-Drop in den Browser gezogen haben, so liegt das daran, dass keine GPS-Daten in den EXIF-Daten des Bildes gefunden wurden.</p>'+
''+
'<p>Um diesen bedauerlichen Zustand zu ändern und die GPS-Daten im Bild zu verankern, müssen Sie in die Tiefen der Einstellungen/Settings Ihres Geräts abtauchen und die entsprechende Funktion aktivieren. Transferieren Sie die Bilder dann via USB-Kabel auf Ihren PC, so sind die GPS-Daten bereits in der Bilddatei verankert.</p>'+
''+
'<p>Kleine Notiz am Rande: Selbst wenn Sie in den Einstellungen Ihres Betriebssystems der GPS-Dateneinbettung freien Lauf lassen, kann es dennoch vorkommen, dass diese Daten beim Versand der .jpg-Datei (also Ihres Bildes) über E-Mail oder andere Kommunikationsplattformen nicht mit übermittelt werden. Der Grund dafür liegt in der Tatsache, dass viele dieser Plattformen eine Sicherheitsfunktion eingebaut haben, welche die Übermittlung von GPS-Daten nur dann zulässt, wenn dies auch ausdrücklich vom Nutzer gewünscht wird.</p>'+
''+
'<p>Das Kopieren der Software ist von meiner Seite erlaubt, Haftung in jeder Form ist natürlich ausgeschlossen. Tipps und Wünsche können gerne an mich weitergeleitet werden, allerdings ist die Umsetzung wohl eher ungewiss.  (Mail: c.damme@gmail.com)</p>'+
''+
'<p> EN</p>'+
''+
'<p>Born from pure laziness, a code got put together from HTML, CSS, and Java. This marvel is capable of rapidly scouring photos for EXIF GPS data and displaying them on two maps with the aid of the platform www.geoportail.lu. This feature allows to associated the images with address information, and with the help of printscreen you can in nearly one step forward the information of where the pictures got shot.</p>'+
''+
'<p>If your screen stays white, even after you\'ve used drag-and-drop to move your photos into the browser, this suggests that no GPS data have been found within the image\'s EXIF data.</p>'+
''+
'<p>To alter this regrettable situation and embed the GPS data in your image, you will need to dive into the abyss of your device\'s settings and activate the relevant function. Once you transferred your images to your PC via a USB cable, the GPS data will stay nestled within your image file.</p>'+
''+
'<p>Here\'s a side note: Even if you\'ve given your operating system\'s settings free rein to embed GPS data, there\'s a chance these data won\'t be transmitted when the .jpg file (your image, that is) is sent via email or other communication platforms. This often occurs because many of these platforms have a built-in security function, which only permits the transmission of GPS data if the user has expressly allowed it.</p>'+
''+
'<p>The copying of the software is permitted on my part, of course, any form of liability is excluded. Tips and suggestions can be happily forwarded to me, although the implementation is somewhat uncertain. (Mail: c.damme@gmail.com)</p>';
	

  

// drag and drop event handlers
document.getElementById("dropzone").addEventListener("dragover", function(event) {
    event.preventDefault();
});

document.getElementById("dropzone").addEventListener("drop", function(event) {
    extractExifData(event, function() {
        printGPSData();
        
        searchAddresses();
        var properties = Object.keys(GPSDatas[i]);
        console.log(properties);
        printAddresses();
        displayFirstImage(event.dataTransfer.files);
        refreshMaps();
    });
});


function extractExifData(event, callback) {
  resetProgramState(); // Clear global variables and arrays
  event.preventDefault();

  var files = event.dataTransfer.files;
  var filesProcessed = 0;

  var temporaryData = [];

  for (var i = 0; i < files.length; i++) {
      (function(file) {
          EXIF.getData(file, function() {
              var lat = EXIF.getTag(this, "GPSLatitude");
              var lon = EXIF.getTag(this, "GPSLongitude");
              var imgDirection = EXIF.getTag(this, "GPSImgDirection");
              var fileName = file.name;
              var folderName = file.webkitRelativePath.split("/")[0]; // Extract the folder name

              if (lat && lon) {
                  var latDecimal = lat[0] + lat[1] / 60 + lat[2] / 3600;
                  var lonDecimal = lon[0] + lon[1] / 60 + lon[2] / 3600;

                  var luRefCoord = convertToLuRef(latDecimal, lonDecimal);

                  var data = {
                      latitude: latDecimal,
                      longitude: lonDecimal,
                      xLuref: luRefCoord.xLuref,
                      yLuref: luRefCoord.yLuref,
                      name: fileName,
                      folderName: folderName // Add folderName property to the data object
                  };

                  if (imgDirection) {
                      data.imgDirection = imgDirection;
                  }

                  temporaryData.push(data);
              }

              filesProcessed++;
              if (filesProcessed === files.length) {
                  temporaryData.sort(function(a, b) {
                      return a.name.localeCompare(b.name);
                  });

                  for (var j = 0; j < temporaryData.length; j++) {
                      temporaryData[j].sequenceNumber = j + 1;
                      GPSDatas.push(temporaryData[j]);
                  }

                  calculateCenterXY();
                  displayFirstImage(files);

                  callback();
              }
          });
      })(files[i]);
  }
}



function displayFirstImage(files) {
    if (files.length > 0) {
        var file = files[0];
        var dropzone = document.getElementById("dropzone");
        var reader = new FileReader();

        reader.onload = function(event) {
            var img = document.createElement("img");
            img.src = event.target.result;
            dropzone.innerHTML = '';
            dropzone.appendChild(img);
        }

        reader.readAsDataURL(file);
    }
}


var LUREF = "+proj=tmerc +lat_0=49.83333333333334 +lon_0=6.166666666666667 +k=1 +x_0=80000 +y_0=100000 +ellps=intl +towgs84=-189.6806,18.3463,-42.7695,-0.33746,-3.09264,2.53861,0.4598 +units=m +no_defs";
proj4.defs("EPSG:2169", LUREF);

function convertToLuRef(lat, lon) {
    var coords = proj4(proj4.defs['EPSG:4326'], proj4.defs['EPSG:2169'], [lon, lat]);

    return {
        xLuref: coords[0],
        yLuref: coords[1]
    };
}

function calculateCenterXY() {
  var minX = Infinity;
  var maxX = -Infinity;
  var minY = Infinity;
  var maxY = -Infinity;

  for (var i = 0; i < GPSDatas.length; i++) {
    var x = GPSDatas[i].xLuref;
    var y = GPSDatas[i].yLuref;

    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }

  var centerX = (minX + maxX) / 2;
  var centerY = (minY + maxY) / 2;

  centerXYmap = { x: centerX, y: centerY };

  for (var i = 0; i < GPSDatas.length; i++) {
    GPSDatas[i].centerOfListX = centerX;
    GPSDatas[i].centerOfListY = centerY;
  }

  initMap3();
  initMap4();
}



function searchAddresses() {
  GPSDatas.forEach(function (gpsData, index) {
    var apiUrl =
      "https://apiv3.geoportail.lu/geocode/reverse?lon=" +
      gpsData.longitude +
      "&lat=" +
      gpsData.latitude;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) {
          var addressData = data.results[0];

          gpsData.number = addressData.number || "";
          gpsData.street = addressData.street || "";
          gpsData.postalCode = addressData.postal_code || "";
          gpsData.locality = addressData.locality || "";
          gpsData.country = addressData.country || "";
          gpsData.distance =
            parseFloat(addressData.distance).toFixed(0) + "m";
        } else {
          gpsData.number = "";
          gpsData.street = "";
          gpsData.postalCode = "";
          gpsData.locality = "";
          gpsData.country = "";
          gpsData.distance = "";
        }
      })
      .catch((error) => {
        console.error(error);
        gpsData.number = "";
        gpsData.street = "";
        gpsData.postalCode = "";
        gpsData.locality = "";
        gpsData.country = "";
        gpsData.distance = "";
      });
  });
}

function printAddresses() {
  var output = document.getElementById("window2");
  var table = document.createElement("table");
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";

  // Create the overall header row
  var overallHeaderText = "GPS datas";

  // Create the column headers
  var headers = [
    "No",
    "File Name",
    "Latitude",
    "Longitude",
    "X-LuRef",
    "Y-LuRef",
    "Orientation",
  ];

  var headerHTML = '<tr><th colspan="7">' + overallHeaderText + "</th></tr><tr>";
  for (var i = 0; i < headers.length; i++) {
    headerHTML += "<th>" + headers[i] + "</th>";
  }
  headerHTML += "</tr>";

  // Create the table body
  var bodyHTML = "";
  GPSDatas.sort(function (a, b) {
    return a.sequenceNumber - b.sequenceNumber;
  });
  for (var i = 0; i < GPSDatas.length; i++) {
    bodyHTML += "<tr>";
    bodyHTML += "<td>" + GPSDatas[i].sequenceNumber + "</td>";
    bodyHTML += "<td>" + GPSDatas[i].name + "</td>";
    bodyHTML += "<td>" + parseFloat(GPSDatas[i].latitude).toFixed(5) + "</td>";
    bodyHTML += "<td>" + parseFloat(GPSDatas[i].longitude).toFixed(5) + "</td>";
    bodyHTML += "<td>" + parseFloat(GPSDatas[i].xLuref).toFixed(2) + "</td>";
    bodyHTML += "<td>" + parseFloat(GPSDatas[i].yLuref).toFixed(2) + "</td>";
    bodyHTML += "<td>" + (GPSDatas[i].orientation || "N/A") + "</td>";
    bodyHTML += "</tr>";
  }

  // Set the table HTML
  table.innerHTML = headerHTML + bodyHTML;

  output.innerHTML = "";
  output.appendChild(table);
}

function printGPSData() {
  var output = document.getElementById("window2");
  var table = document.createElement('table');
  table.style.width = '100%';
  table.style.borderCollapse = 'collapse'; // Add this line to collapse borders

  // Create the overall header row
  var overallHeaderText = "GPS datas";

  // Create the column headers
  var headers = ["No", "File Name", "Latitude", "Longitude", "X-LuRef", "Y-LuRef", "Orientation"];

  var headerHTML = '<tr><th colspan="7">' + overallHeaderText + '</th></tr><tr>';
  for (var i = 0; i < headers.length; i++) {
      headerHTML += '<th>' + headers[i] + '</th>';
  }
  headerHTML += '</tr>';

  // Create the table body
  var bodyHTML = '';
  GPSDatas.sort(function(a, b) {
      return a.sequenceNumber - b.sequenceNumber;
  });
  for (var i = 0; i < GPSDatas.length; i++) {
      bodyHTML += '<tr>';
      bodyHTML += '<td>' + GPSDatas[i].sequenceNumber + '</td>';
      bodyHTML += '<td>' + GPSDatas[i].name + '</td>';
      bodyHTML += '<td>' + parseFloat(GPSDatas[i].latitude).toFixed(5) + '</td>';
      bodyHTML += '<td>' + parseFloat(GPSDatas[i].longitude).toFixed(5) + '</td>';
      bodyHTML += '<td>' + parseFloat(GPSDatas[i].xLuref).toFixed(2) + '</td>';
      bodyHTML += '<td>' + parseFloat(GPSDatas[i].yLuref).toFixed(2) + '</td>';
      bodyHTML += '<td>' + (GPSDatas[i].orientation || 'N/A') + '</td>';
      bodyHTML += '</tr>';
  }

  // Set the table HTML
  table.innerHTML = headerHTML + bodyHTML;

  output.innerHTML = '';
  output.appendChild(table);
}


// '501', name: 'Hybrid map', technicalName: 'streets_jpeg' },
// '502', name: 'Topographic map B/W', technicalName: 'topo_bw_jpeg' },
// '529', name: 'Topographic map', technicalName: 'topogr_global' },
// '530', name: 'Aerial Imagery', technicalName: 'orthogr_2013_global' },
// '556', name: 'Road map', technicalName: 'basemap_2015_global' }

// '152' Addresses
// '199' Buildings
// '351' Road Names
// '352' Mileage of the CFL tracks
// '353' Cadastral parcels (numbers)
// '415' Contour 10 m

function printAddresses() {
  var output = document.getElementById("window2");
  var addressTable = document.createElement('table');
  addressTable.style.width = '100%';
  addressTable.style.borderCollapse = 'collapse';

  // Create the overall header row
  var overallHeaderText = "Closest known addresses for each picture";
  var overallHeaderRow = document.createElement('tr');
  var overallHeaderCell = document.createElement('th');
  overallHeaderCell.colSpan = 8; // Adjust the colspan to match the number of columns in the GPS table
  overallHeaderCell.textContent = overallHeaderText;
  overallHeaderRow.appendChild(overallHeaderCell);
  addressTable.appendChild(overallHeaderRow);

  // Create the column headers
  var addressHeaders = ["No", "File Name", "Number", "Street", "Postal Code", "Locality", "Country", "Distance"];
  var addressHeaderRow = document.createElement('tr');
  for (var i = 0; i < addressHeaders.length; i++) {
    var addressHeaderCell = document.createElement('th');
    addressHeaderCell.textContent = addressHeaders[i];
    addressHeaderRow.appendChild(addressHeaderCell);
  }
  addressTable.appendChild(addressHeaderRow);

  // Create the table body
  var addressTableBody = document.createElement('tbody');
  addressTable.appendChild(addressTableBody);

  // Loop through GPSDatas and make API calls for each data
  GPSDatas.forEach(function(gpsData, index) {
    // Create a new row for each GPS data
    var addressDataRow = document.createElement('tr');

    // Create table data for sequence number and name
    var sequenceNumberCell = document.createElement('td');
    sequenceNumberCell.textContent = gpsData.sequenceNumber;
    var nameCell = document.createElement('td');
    nameCell.textContent = gpsData.name;

    // Append the cells to the row
    addressDataRow.appendChild(sequenceNumberCell);
    addressDataRow.appendChild(nameCell);

    // Make the API call to fetch address data
    var apiUrl = "https://apiv3.geoportail.lu/geocode/reverse?lon=" + gpsData.longitude + "&lat=" + gpsData.latitude;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.results.length > 0) {
          var addressData = data.results[0];
          var addressTableDataCells = [];

          // Create table data for address details
          var addressDetails = [
            "number",
            "street",
            "postal_code",
            "locality",
            "country",
            "distance"
          ];
          for (var i = 0; i < addressDetails.length; i++) {
            var dataCell = document.createElement('td');
            if (addressDetails[i] === "distance") {
              dataCell.textContent = parseFloat(addressData[addressDetails[i]]).toFixed(0) + "m";
            } else {
              dataCell.textContent = addressData[addressDetails[i]];
            }
            addressDataRow.appendChild(dataCell);
            addressTableDataCells.push(addressData[addressDetails[i]]);
          }
        } else {
          // Create empty cells if no address data found
          for (var i = 0; i < addressHeaders.length - 2; i++) {
            var emptyCell = document.createElement('td');
            addressDataRow.appendChild(emptyCell);
          }
        }

        // Append the row to the table body
        addressTableBody.appendChild(addressDataRow);
      })
      .catch(error => {
        console.error(error);
        // Create empty cells in case of API error
        for (var i = 0; i < addressHeaders.length - 2; i++) {
          var emptyCell = document.createElement('td');
          addressDataRow.appendChild(emptyCell);
        }

        // Append the row to the table body
        addressTableBody.appendChild(addressDataRow);
      });
  });

  output.appendChild(addressTable);
}


var dropdownInitializedMap3 = false;
var dropdownInitializedMap4 = false;

function initMap3() {
    var xDecimal = centerXYmap.x;
    var yDecimal = centerXYmap.y;

    var layerOptions = [
        { id: '501', name: 'Hybrid map', technicalName: 'streets_jpeg' },
        { id: '502', name: 'Topographic map B/W', technicalName: 'topo_bw_jpeg' },
        { id: '529', name: 'Topographic map', technicalName: 'topogr_global' },
        { id: '530', name: 'Aerial Imagery', technicalName: 'orthogr_2013_global' },
        { id: '556', name: 'Road map', technicalName: 'basemap_2015_global' }
    ];

    if (!dropdownInitializedMap3) {
        // Create the dropdown menu for map3
        var dropdown = document.createElement('select');
        dropdown.addEventListener('change', function() {
            var selectedLayerId = dropdown.value;
            var selectedLayer = layerOptions.find(function(layer) {
                return layer.id === selectedLayerId;
            });
            if (selectedLayer) {
                recreateMap(selectedLayer.technicalName, xDecimal, yDecimal, 'map3');
            }
        });

        // Add the options to the dropdown
        layerOptions.forEach(function(layer) {
            var option = document.createElement('option');
            option.value = layer.id;
            option.textContent = layer.name;
            dropdown.appendChild(option);
        });

        // Append the dropdown to the map3 container
        var mapContainer = document.getElementById('map3');
        mapContainer.parentNode.insertBefore(dropdown, mapContainer);

        dropdownInitializedMap3 = true;
    }

    function recreateMap(bgLayer, x, y, mapId) {
        var map = mapId === 'map3' ? map3 : map4;

        map.setTarget(null); // Remove the existing map

        var newMap = new lux.Map({
            target: mapId,
            bgLayer: bgLayer,
            layers: ['320', '353', '423', '415', '352', '351 ', '152'],
            layerOpacities: [0.5, 0.5, 0.5, 1, 1, 1, 1],
            layerVisibilities: [true, true, true, true, true, true , true],
            zoom: 18,
            position: [x, y]
        });

        addCross(newMap, x, y, 20);
        addCircles(newMap, 20);

        if (mapId === 'map3') {
            map3 = newMap;
        } else if (mapId === 'map4') {
            map4 = newMap;
        }
    }

    if (map3 === null) {
        map3 = new lux.Map({
            target: 'map3',
            bgLayer: '501',
            layers: ['320', '353', '423', '415', '352', '351 ', '152'],
            layerOpacities: [0.5, 0.5, 0.5, 1, 1, 1, 1],
            layerVisibilities: [true, true, true, true, true, true , true],
            zoom: 18,
            position: [xDecimal, yDecimal]
        });

        addCross(map3, xDecimal, yDecimal, 20);
        addCircles(map3, 20);
    }
}

function initMap4() {
    var xDecimal = centerXYmap.x;
    var yDecimal = centerXYmap.y;

    var layerOptions = [
        { id: '501', name: 'Hybrid map', technicalName: 'streets_jpeg' },
        { id: '502', name: 'Topographic map B/W', technicalName: 'topo_bw_jpeg' },
        { id: '529', name: 'Topographic map', technicalName: 'topogr_global' },
        { id: '530', name: 'Aerial Imagery', technicalName: 'orthogr_2013_global' },
        { id: '556', name: 'Road map', technicalName: 'basemap_2015_global' }
    ];

    if (!dropdownInitializedMap4) {
        // Create the dropdown menu for map4
        var dropdown = document.createElement('select');
        dropdown.addEventListener('change', function() {
            var selectedLayerId = dropdown.value;
            var selectedLayer = layerOptions.find(function(layer) {
                return layer.id === selectedLayerId;
            });
            if (selectedLayer) {
                recreateMap(selectedLayer.technicalName, xDecimal, yDecimal, 'map4');
            }
        });

        // Add the options to the dropdown
        layerOptions.forEach(function(layer) {
            var option = document.createElement('option');
            option.value = layer.id;
            option.textContent = layer.name;
            dropdown.appendChild(option);
        });

        // Append the dropdown to the map4 container
        var mapContainer = document.getElementById('map4');
        mapContainer.parentNode.insertBefore(dropdown, mapContainer);

        dropdownInitializedMap4 = true;
    }

    function recreateMap(bgLayer, x, y, mapId) {
        var map = mapId === 'map3' ? map3 : map4;

        map.setTarget(null); // Remove the existing map

        var newMap = new lux.Map({
            target: mapId,
            bgLayer: bgLayer,
            layers: ['353', '423', '415', '352','351','199', '152'],
            layerOpacities: [0.5, 0.5, 1, 1 ,1 ,1 , 1],
            layerVisibilities: [true, true, true, true, true, true, true],
            zoom: 18,
            position: [x, y]
        });

        addCross(newMap, x, y, 20);
        addCircles(newMap, 20);

        if (mapId === 'map3') {
            map3 = newMap;
        } else if (mapId === 'map4') {
            map4 = newMap;
        }
    }

    if (map4 === null) {
        map4 = new lux.Map({
            target: 'map4',
            bgLayer: '359',
            layers: ['353', '423', '352','351','199', '152'],
            layerOpacities: [0.5, 0.5, 1 ,1 ,1 , 1],
            layerVisibilities: [true, true, true, true, true, true],
            zoom: 18,
            position: [xDecimal, yDecimal]
        });

        addCross(map4, xDecimal, yDecimal, 20);
        addCircles(map4, 20);
    }
}



function refreshMaps() {
    if (map3 !== null) {
        map3.setTarget(null); // Remove the map3 from its current target
        map3 = null; // Reset the map3 variable
        initMap3(); // Initialize a new map3
    }
    if (map4 !== null) {
        map4.setTarget(null); // Remove the map4 from its current target
        map4 = null; // Reset the map4 variable
        initMap4(); // Initialize a new map4
    }
}

function addCircles(map, size) {
    var circleFeatures = GPSDatas.map(function(data) {
        var centerLonLat = proj4(proj4.defs['EPSG:2169'], proj4.defs['EPSG:4326'], [data.xLuref, data.yLuref]);

        var feature = new ol.Feature({
            geometry: new ol.geom.Circle(
                ol.proj.transform(centerLonLat, 'EPSG:4326', 'EPSG:3857'), size
            )
        });

        feature.set('name', data.sequenceNumber.toString());

        return feature;
    });

    var vectorSource = new ol.source.Vector({
        features: circleFeatures
    });

    var vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: function(feature) {
            return new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: '#0066ff',
                    width: 2
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(0, 255, 255, 0.25)'
                }),
                text: new ol.style.Text({
                    text: feature.get('name'),
                    font: '24px Calibri,sans-serif',
                    fill: new ol.style.Fill({ color: '#000' }),
                    stroke: new ol.style.Stroke({
                        color: '#fff', width: 2
                    })
                })
            });
        }
    });

    map.addLayer(vectorLayer);
}

function addCross(map, xLuref, yLuref, size) {
    var centerLonLat = ol.proj.transform([xLuref, yLuref], 'EPSG:2169', 'EPSG:3857');
    var crossCoordinates = [
        [centerLonLat[0] - size, centerLonLat[1] - size],
        [centerLonLat[0] + size, centerLonLat[1] + size],
        [centerLonLat[0] - size, centerLonLat[1] + size],
        [centerLonLat[0] + size, centerLonLat[1] - size]
    ];
    var crossFeatures = crossCoordinates.map(function(coordinates, index) {
        return new ol.Feature({
            geometry: new ol.geom.LineString([
                centerLonLat,
                coordinates
            ])
        });
    });

    var vectorSource = new ol.source.Vector({
        features: crossFeatures
    });

    var vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#ff0000',
                width: 2
            })
        })
    });

    map.addLayer(vectorLayer);
}


function resetProgramState() {
    // Clear global variables and arrays
    GPSDatas = [];
    centerXYmap = {};
    //W2 = undefined;

    

    //W4 = undefined;

    // Reset other variables and elements
    //var window3 = document.getElementById("window3");
    //window3.innerHTML = '';

    // Reset other program state or variables as needed
}



window.onload = function() {
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    // Define header row
    let headRow = document.createElement('tr');
    let th1 = document.createElement('th');
    th1.textContent = "ID";
    let th2 = document.createElement('th');
    th2.textContent = "Name";
    let th3 = document.createElement('th'); // column for checkbox
    th3.textContent = "Select";
    let th4 = document.createElement('th'); // column for slider
    th4.textContent = "Opacity";
    let th5 = document.createElement('th'); // new column for numeric display
    th5.textContent = "Value";
    headRow.appendChild(th1);
    headRow.appendChild(th2);
    headRow.appendChild(th3); 
    headRow.appendChild(th4);
    headRow.appendChild(th5); // append new column to the header row
    thead.appendChild(headRow);

    // Append rows
    nonBackgroundLayers.forEach(function(layer) {
        let row = document.createElement('tr');
        let td1 = document.createElement('td');
        td1.textContent = layer.Id;
        let td2 = document.createElement('td');
        td2.textContent = layer.Name;
        let td3 = document.createElement('td'); 
        let checkbox = document.createElement('input'); 
        checkbox.type = 'checkbox';
        checkbox.checked = layer.Checked; // initialize with the saved value
        td3.appendChild(checkbox); 
        let td4 = document.createElement('td'); 
        let slider = document.createElement('input'); 
        slider.type = 'range';
        slider.min = 0;
        slider.max = 1.0;
        slider.step = 0.1;
        slider.value = layer.OpacityValue; // initialize with the saved value
        td4.appendChild(slider); 
        let td5 = document.createElement('td'); // new cell for numeric display
        td5.textContent = slider.value; // display initial slider value
        slider.oninput = function() {
            td5.textContent = this.value; // update numeric display when slider changes
            layer.OpacityValue = this.value; // save the state when it's changed
        }
        checkbox.onchange = function() { 
            layer.Checked = this.checked; // save the state when it's changed
            if (this.checked) {
                slider.value = 0.5;
            } else {
                slider.value = 0;
            }
            layer.OpacityValue = slider.value;
            td5.textContent = slider.value; // also update the numeric display
        };
        row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3); 
        row.appendChild(td4);
        row.appendChild(td5); // append new cell to the row
        tbody.appendChild(row);
    });

    // Append table components
    table.appendChild(thead);
    table.appendChild(tbody);

    // Append table to sidebar
    document.querySelector('.left-sidebar').appendChild(table);
}







let nonBackgroundLayers = [
    {
      "Id": 501,
      "Name": "Hybrid map",
      "Technical layer name": "streets_jpeg",
      "Is Background": true,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 502,
      "Name": "Topographic map B/W",
      "Technical layer name": "topo_bw_jpeg",
      "Is Background": true,
      "Format": "image/jpeg",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 529,
      "Name": "Topographic map",
      "Technical layer name": "topogr_global",
      "Is Background": true,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 530,
      "Name": "Aerial Imagery",
      "Technical layer name": "orthogr_2013_global",
      "Is Background": true,
      "Format": "image/jpeg",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 556,
      "Name": "Road map",
      "Technical layer name": "basemap_2015_global",
      "Is Background": true,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 137,
      "Name": "Orthophoto Préizerdaul",
      "Technical layer name": "ac_preizerdaul_ortho_2009",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 138,
      "Name": "Forest edges",
      "Technical layer name": "asta_esp_lisiere",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 139,
      "Name": "Landscape features",
      "Technical layer name": "asta_esp_esp",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 140,
      "Name": "Aerial images from 1963 (1:20k)",
      "Technical layer name": "aero_1963_20k",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 147,
      "Name": "Public Transport - Stops",
      "Technical layer name": "arrets_bus",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 149,
      "Name": "Regional tourist map 1:20000 R",
      "Technical layer name": "topo_tour_20k",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 152,
      "Name": "Addresses",
      "Technical layer name": "addresses",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 153,
      "Name": "Cadastral municipalities",
      "Technical layer name": "communes_cadastrales",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 155,
      "Name": "Topographical Map 1:50000",
      "Technical layer name": "topo_50k",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 156,
      "Name": "Topographical Map 1:20k 1979 B/W",
      "Technical layer name": "TOPO_CARTESHISTO_1979",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 157,
      "Name": "Major airport 2011 (Lden)",
      "Technical layer name": "env_bruit_air_lden",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 158,
      "Name": "CFL rail & hike",
      "Technical layer name": "tour_cfl",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 162,
      "Name": "Buildings",
      "Technical layer name": "ac_wellenstein_pag_volumes_batiments",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 163,
      "Name": "Landcover 1999",
      "Technical layer name": "env_obs1999",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 167,
      "Name": "Corine Landcover 2006",
      "Technical layer name": "env_corine",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 168,
      "Name": "Dream loops",
      "Technical layer name": "tour_rando_traumschleifen_new",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 173,
      "Name": "Topographical Map 1:20k 1964",
      "Technical layer name": "TOPO_CARTESHISTO_1964_RGB",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 175,
      "Name": "Winegrowing areas",
      "Technical layer name": "ivv_grosslagen",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 176,
      "Name": "Auto-Pédestre trails",
      "Technical layer name": "tour_autopedestre",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 177,
      "Name": "Municipality Trails",
      "Technical layer name": "tour_sentiers_communaux",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 181,
      "Name": "Road Network",
      "Technical layer name": "roads",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 182,
      "Name": "Zones",
      "Technical layer name": "ac_wellenstein_pag_zones",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 185,
      "Name": "Topographical Map 1:50k 1990",
      "Technical layer name": "TOPO_CARTESHISTO_1990_50k",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 188,
      "Name": "Regional mapsheets",
      "Technical layer name": "topo_decoupage_tc",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 189,
      "Name": "Mullerthal Trail",
      "Technical layer name": "tour_mullerthal_trail",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 191,
      "Name": "Topographical Map 1:20k 1979",
      "Technical layer name": "TOPO_CARTESHISTO_1979_RGB",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 193,
      "Name": "Regional Mapsheets",
      "Technical layer name": "topo_decoupage_5000",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 195,
      "Name": "Topographical Map 1:5000",
      "Technical layer name": "topo_5k",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 197,
      "Name": "Youthhostel Trails",
      "Technical layer name": "tour_sentiers_ajl",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 199,
      "Name": "Buildings",
      "Technical layer name": "buildings",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 200,
      "Name": "Regional mapsheets",
      "Technical layer name": "topo_decoupage_100k",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 201,
      "Name": "Topographical Map 1:20k 1964 B/W",
      "Technical layer name": "TOPO_CARTESHISTO_1964",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 205,
      "Name": "Escapardenne Lee & Eislek Trail",
      "Technical layer name": "tour_escape_ardenne",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 206,
      "Name": "Topographical Map 1:20000",
      "Technical layer name": "topo_20k",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 210,
      "Name": "Complete plan",
      "Technical layer name": "ac_wellenstein_pag_complet",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 211,
      "Name": "Mapsheets geological plan 1:25.000 / 1:50.000",
      "Technical layer name": "decoupage_geo25_50k",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 214,
      "Name": "Provisional ZPS",
      "Technical layer name": "eau_new_Provisorische_ZPS",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 215,
      "Name": "Landcover 2007",
      "Technical layer name": "env_obs2007",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 216,
      "Name": "Municipality code",
      "Technical layer name": "decoupage_communes",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 217,
      "Name": "Topographical Map 1:50k 1966",
      "Technical layer name": "TOPO_CARTESHISTO_1966-74_50k",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 218,
      "Name": "Way of St. James",
      "Technical layer name": "tour_saint_jacques",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 219,
      "Name": "Regional mapsheets",
      "Technical layer name": "topo_decoupage_50k",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 220,
      "Name": "German War map 1:25k 1939",
      "Technical layer name": "TOPO_CARTES_1944",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 221,
      "Name": "Climate map",
      "Technical layer name": "ivv_klimakarte",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 223,
      "Name": "Topographical Map 1:250000",
      "Technical layer name": "topo_250k",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 224,
      "Name": "Orthophoto 2004",
      "Technical layer name": "ortho_2004",
      "Is Background": false,
      "Format": "image/jpeg",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 225,
      "Name": "Orthophoto 2001",
      "Technical layer name": "ortho_2001",
      "Is Background": false,
      "Format": "image/jpeg",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 227,
      "Name": "National hiking trails",
      "Technical layer name": "tour_sentiers_nationaux",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 229,
      "Name": "Aerial images from 1951 (1:25k)",
      "Technical layer name": "aero_1951_25k",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 231,
      "Name": "Orthophoto 2007",
      "Technical layer name": "ortho_2007",
      "Is Background": false,
      "Format": "image/jpeg",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 235,
      "Name": "International long-distance paths",
      "Technical layer name": "tour_sentiers_gr",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 237,
      "Name": "Topographical Map 1:20k 2000",
      "Technical layer name": "TOPO_CARTESHISTO_2000",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 240,
      "Name": "Small winegrowing areas",
      "Technical layer name": "ivv_kleinlagen",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 246,
      "Name": "Local Syndicate Trails",
      "Technical layer name": "tour_sentiers_syndicats",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 250,
      "Name": "NaturWanderPark delux",
      "Technical layer name": "tour_DeLux",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 252,
      "Name": "Topographical Map 1927",
      "Technical layer name": "1927_CAHANSEN",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 254,
      "Name": "Mullerthal Touring",
      "Technical layer name": "tour_touring",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 255,
      "Name": "Major Roads 2011 (Lngt)",
      "Technical layer name": "env_bruit_axes_routiers_lngt",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 256,
      "Name": "Historical cadastral sheets",
      "Technical layer name": "feuilles_cadastrales",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 257,
      "Name": "Limits",
      "Technical layer name": "ac_wellenstein_pag_limites",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 258,
      "Name": "Roads",
      "Technical layer name": "ac_wellenstein_pag_voies_acces",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 259,
      "Name": "Major Railways 2011 (Lngt)",
      "Technical layer name": "env_bruit_axes_ferroviaires_lngt",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 262,
      "Name": "Cadastre plan",
      "Technical layer name": "cadastre",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 265,
      "Name": "Regional Mapsheets",
      "Technical layer name": "topo_decoupage_r",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 266,
      "Name": "Cadastral sections (names)",
      "Technical layer name": "sections_cadastrales_labels",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 267,
      "Name": "Orthophoto Remich",
      "Technical layer name": "ac_remich_ortho",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 268,
      "Name": "Districts (names)",
      "Technical layer name": "districts_labels",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 269,
      "Name": "Municipalities (names)",
      "Technical layer name": "communes_labels",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 272,
      "Name": "Soil map 1:100'000",
      "Technical layer name": "pedologie_100k",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 274,
      "Name": "Topographical Map 1954",
      "Technical layer name": "TOPO25K1954C24",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 278,
      "Name": "Topographical Map 1:50k 2000",
      "Technical layer name": "TOPO_CARTESHISTO_2000_50k",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 282,
      "Name": "Alignments to be saved",
      "Technical layer name": "ac_wellenstein_pag_alignements_a_preserver",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 283,
      "Name": "Weatherstations",
      "Technical layer name": "asta_meteo",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 285,
      "Name": "Topographical Map 1:20k 1989",
      "Technical layer name": "TOPO_CARTESHISTO_1989",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 292,
      "Name": "Satellite pictures Ikonos",
      "Technical layer name": "wg_ikonos_satellitendaten",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 293,
      "Name": "Mountain bike trails",
      "Technical layer name": "tour_pistes_vtt",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 295,
      "Name": "Automatical Topographical Map",
      "Technical layer name": "topo",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 297,
      "Name": "FLIK reference parcels for Vineyards",
      "Technical layer name": "ivv_flik_parcels",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 299,
      "Name": "Topographical Map 1:50k 1993",
      "Technical layer name": "TOPO_CARTESHISTO_1993_50k",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 300,
      "Name": "Zone contours",
      "Technical layer name": "ac_wellenstein_pag_perimetres_zones",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 301,
      "Name": "Land use",
      "Technical layer name": "wg_landnutzung",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 302,
      "Name": "Municipalities",
      "Technical layer name": "communes",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 305,
      "Name": "Spaces to be saved",
      "Technical layer name": "ac_wellenstein_pag_volumes_a_sauvegarder",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 306,
      "Name": "Regional mapsheets",
      "Technical layer name": "decoupage_geo25k",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 308,
      "Name": "Sealing",
      "Technical layer name": "wg_versiegelungsklassen",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 310,
      "Name": "Major Railways 2011 (Lden)",
      "Technical layer name": "env_bruit_axes_ferroviaires_lden",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 311,
      "Name": "Orthophoto 2010 (infrared)",
      "Technical layer name": "ortho_irc",
      "Is Background": false,
      "Format": "image/jpeg",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 316,
      "Name": "Nature trails",
      "Technical layer name": "env_sentiersnature",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 320,
      "Name": "Cadastral region names",
      "Technical layer name": "toponymes",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 326,
      "Name": "Major Roads 2011 (Lden)",
      "Technical layer name": "env_bruit_axes_routiers_lden",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 327,
      "Name": "Major airport 2011 (Lngt)",
      "Technical layer name": "env_bruit_air_lngt",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 328,
      "Name": "Topographical Map 1905",
      "Technical layer name": "1907_CAHANSEN",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 329,
      "Name": "Cantons",
      "Technical layer name": "cantons",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 331,
      "Name": "Land use plan",
      "Technical layer name": "ac_preizerdaul_pag",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 341,
      "Name": "Aerial images from 1951 (1:10k)",
      "Technical layer name": "aero_1951_10k",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 342,
      "Name": "Orthophoto 2010",
      "Technical layer name": "ortho_2010",
      "Is Background": false,
      "Format": "image/jpeg",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 343,
      "Name": "Orthophoto 2013",
      "Technical layer name": "ortho",
      "Is Background": false,
      "Format": "image/jpeg",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 344,
      "Name": "Land Use Plan Remich",
      "Technical layer name": "ac_remich_pag",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 345,
      "Name": "Orthophoto Grid",
      "Technical layer name": "topo_decoupage_ortho",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 346,
      "Name": "Cantons (names)",
      "Technical layer name": "cantons_labels",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 349,
      "Name": "Country",
      "Technical layer name": "country",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 350,
      "Name": "Cadastral municipalities (names)",
      "Technical layer name": "communes_cadastrales_labels",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 351,
      "Name": "Road Names",
      "Technical layer name": "roads_labels",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 352,
      "Name": "Mileage of the CFL tracks",
      "Technical layer name": "cfl_hecto",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": true,
      "OpacityValue": 0.5
    },
    {
      "Id": 353,
      "Name": "Cadastral parcels (numbers)",
      "Technical layer name": "parcels_labels",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": true,
      "OpacityValue": 0.5
    },
    {
      "Id": 354,
      "Name": "Districts",
      "Technical layer name": "districts",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 355,
      "Name": "Cadastral sections",
      "Technical layer name": "sections_cadastrales",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 359,
      "Name": "Cadastral parcels",
      "Technical layer name": "parcels",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 360,
      "Name": "Orthophoto 2013",
      "Technical layer name": "ortho_2013",
      "Is Background": false,
      "Format": "image/jpeg",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 363,
      "Name": "Orthophoto Préizerdaul",
      "Technical layer name": "ac_preizerdaul_ortho",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 368,
      "Name": "Bike sharing",
      "Technical layer name": "mobiliteit_bikeshare",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 370,
      "Name": "Bridle paths",
      "Technical layer name": "luxembourg_on_horse",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 374,
      "Name": "Orthophoto grid",
      "Technical layer name": "topo_decoupage_ortho_2013",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 377,
      "Name": "Park + Ride",
      "Technical layer name": "mobiliteit_pr",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 389,
      "Name": "Forests seed stands",
      "Technical layer name": "anf_peuplements_semenciers",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 395,
      "Name": "Large landscape units",
      "Technical layer name": "at_psp_gep",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 396,
      "Name": "Green belts",
      "Technical layer name": "at_psp_cv",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 401,
      "Name": "Priority zones for housing",
      "Technical layer name": "at_psl1",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 402,
      "Name": "Planned business and industrial parks",
      "Technical layer name": "at_pszae2",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 403,
      "Name": "Existing business and industrial parks to be reclassified",
      "Technical layer name": "at_pszae3",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 407,
      "Name": "Existing business and industrial parks",
      "Technical layer name": "at_pszae1",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 408,
      "Name": "Superimposed corridors and zones",
      "Technical layer name": "at_pst2",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 409,
      "Name": "Interurban green zone",
      "Technical layer name": "at_psp_zvi",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 410,
      "Name": "SPT projects",
      "Technical layer name": "at_pst1",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 411,
      "Name": "Height reference points (old sketches)",
      "Technical layer name": "ng",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 415,
      "Name": "Contour 10 m",
      "Technical layer name": "wg_hohenlinien_10m_map",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 417,
      "Name": "Land consolidation zones",
      "Technical layer name": "remembrements",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 418,
      "Name": "Height bolts",
      "Technical layer name": "repere_alti",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 419,
      "Name": "Remarkable subsidisable trees",
      "Technical layer name": "anf_arbres_remarquables",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 423,
      "Name": "CFL train stations",
      "Technical layer name": "mobiliteit_cfl",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 425,
      "Name": "Land use plan of the municipality of Lintgen",
      "Technical layer name": "pag_lintgen_layer",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 427,
      "Name": "Regional nature and forest districts",
      "Technical layer name": "anf_arrondissements",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 428,
      "Name": "Local nature and forest districts",
      "Technical layer name": "anf_triages",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 441,
      "Name": "Chemical status of the WB 2009",
      "Technical layer name": "eau_new_Chemischer_Zustand_der_WK_2009",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 444,
      "Name": "Battue hunts",
      "Technical layer name": "anf_dates_battues",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 457,
      "Name": "Mapsheets topographic plan 1:5000 edition 2015",
      "Technical layer name": "topo_decoupage_5000_ed2015",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 481,
      "Name": "Drinking water shortage at critical level (level \"red\")",
      "Technical layer name": "eau_new_Erhoehte_Trinkwasserknappheit_(Zustand_rot)",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 490,
      "Name": "Sanitary protection zones Esch-sur-Sûre dam (repealed, for information only)",
      "Technical layer name": "eau_new_Sanitaere_Schutzzonen_Stausee_EschSauer",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 492,
      "Name": "Vulnerable zones [Nitrates directive]",
      "Technical layer name": "eau_new_Gefaehrdete_Gebiete_(Nitratrichtlinie)",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 494,
      "Name": "Groceries stores",
      "Technical layer name": "lenoz_lmg",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 495,
      "Name": "Ecoles",
      "Technical layer name": "lenoz_ecoles",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 496,
      "Name": "Nurseries",
      "Technical layer name": "lenoz_creches",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 504,
      "Name": "Doctors",
      "Technical layer name": "lenoz_Ärzte",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 505,
      "Name": "High schools",
      "Technical layer name": "lenoz_Lycees",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 506,
      "Name": "Gas stations",
      "Technical layer name": "lenoz_Tankstelle",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 510,
      "Name": "Vineyards",
      "Technical layer name": "ivv_parcels",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 511,
      "Name": "Post offices",
      "Technical layer name": "lenoz_Post",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 512,
      "Name": "Regional cycle paths",
      "Technical layer name": "tour_pistes_velo_mymaps2",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 516,
      "Name": "Banks",
      "Technical layer name": "lenoz_Banken",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 519,
      "Name": "Restaurants",
      "Technical layer name": "lenoz_Restaurants",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 533,
      "Name": "Bird protection zones Natura 2000",
      "Technical layer name": "natura2000_oiseaux",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 536,
      "Name": "Surface water bodies 2015",
      "Technical layer name": "eau_new_Oberflaechenwasserkoerper_2015",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 538,
      "Name": "Drinking water syndicates",
      "Technical layer name": "eau_new_Trinkwassersyndikate",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 540,
      "Name": "Habitats Natura 2000",
      "Technical layer name": "natura2000_habitats",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 542,
      "Name": "Administration and other services",
      "Technical layer name": "editus_poi_299",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 543,
      "Name": "Bank, finance, insurance",
      "Technical layer name": "editus_poi_286",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 544,
      "Name": "Beauty, sports and wellness",
      "Technical layer name": "editus_poi_285",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 545,
      "Name": "Trading",
      "Technical layer name": "editus_poi_287",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 546,
      "Name": "Communication and multimedia",
      "Technical layer name": "editus_poi_289",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 547,
      "Name": "Culture, leisure and tourism",
      "Technical layer name": "editus_poi_290",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 548,
      "Name": "Hotel, restaurant, tavern",
      "Technical layer name": "editus_poi_294",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 549,
      "Name": "Education, training and employment",
      "Technical layer name": "editus_poi_291",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 550,
      "Name": "Garage, transport and mobility",
      "Technical layer name": "editus_poi_292",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 551,
      "Name": "Living",
      "Technical layer name": "editus_poi_293",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 552,
      "Name": "Industrial",
      "Technical layer name": "editus_poi_295",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 553,
      "Name": "Medicine and health",
      "Technical layer name": "editus_poi_296",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 554,
      "Name": "Services at the specialists",
      "Technical layer name": "editus_poi_298",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 559,
      "Name": "Areas in which the application of Metazachlor is forbidden",
      "Technical layer name": "eau_new_Zones_interdiction_utilisation_metazachlore",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 563,
      "Name": "Air pressure",
      "Technical layer name": "eau_new_Luftdruck",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 567,
      "Name": "Drinking water abstraction points",
      "Technical layer name": "eau_new_Trinkwasserentnahmepunkte",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 569,
      "Name": "Upper Sure Lake",
      "Technical layer name": "eau_new_Stausee_Sauer",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 570,
      "Name": "Groundwater Nitrates Directive 91/676/CEE",
      "Technical layer name": "eau_new_Grundwasser_Nitratrichtlinie_91_676_CEE",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 573,
      "Name": "ZPS created by grand-ducal regulation",
      "Technical layer name": "eau_new_ZPS_durch_grosshrzgl._Verordnung_festgelegt",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 581,
      "Name": "Bathing Water Quality",
      "Technical layer name": "eau_new_Badegewaesser_-_Qualitaet",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 582,
      "Name": "Nitrates concentrations groundwater",
      "Technical layer name": "eau_new_Messstationen_Grundwasser_-_Nitratrichtlinie",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 583,
      "Name": "Physico-chemistry 2015",
      "Technical layer name": "eau_new_Physiko-Chemie_2015",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 585,
      "Name": "Global status 2009",
      "Technical layer name": "eau_new_Gesamtzustand_2009",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 586,
      "Name": "Chemical status 2009",
      "Technical layer name": "eau_new_Chemischer_Zustand_2009",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 588,
      "Name": "Types of watercourses 2015",
      "Technical layer name": "eau_new_Typologie_Gewaesser_2015",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 589,
      "Name": "Nitrates concentrations surface water",
      "Technical layer name": "eau_new_Messstationen_Oberflaechengewaesser_-_Nitratrichtlinie",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 591,
      "Name": "Status of the WB 2015",
      "Technical layer name": "eau_new_Zustand_der_WK_2015",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 592,
      "Name": "Quantitative status of the WB 2015",
      "Technical layer name": "eau_new_Quantitativer_Zustand_der_WK_2015",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 593,
      "Name": "Hydromorphological status 2009",
      "Technical layer name": "eau_new_Hydromorphologischer_Zustand_2009",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 595,
      "Name": "Air temperature",
      "Technical layer name": "eau_new_Lufttemperatur",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 598,
      "Name": "Drinking water tanks",
      "Technical layer name": "eau_new_Trinkwasserbehaelter",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 600,
      "Name": "Macrobenthos 2015",
      "Technical layer name": "eau_new_Makro-Invertebraten_2015",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 601,
      "Name": "Surface water bodies 2009",
      "Technical layer name": "eau_new_Oberflaechenwasserkoerper_2009",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 603,
      "Name": "Groundwater bodies 2009",
      "Technical layer name": "eau_new_Grundwasserkoerper_2009",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 605,
      "Name": "Quantitative status of the WB 2009",
      "Technical layer name": "eau_new_Quantitativer_Zustand_der_WK_2009",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 607,
      "Name": "Surface water typology 2009",
      "Technical layer name": "eau_new_Typologie_Oberflaechengewasser_2009",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 609,
      "Name": "Precipitation",
      "Technical layer name": "eau_new_Niederschlag",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 610,
      "Name": "Snow height",
      "Technical layer name": "eau_new_Schneehoehe",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 612,
      "Name": "Sensitive areas [Urban waste water treatment directive]",
      "Technical layer name": "eau_new_Empfindliche_Gebiete_(Kommunalabwasserrichtlinie)",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 614,
      "Name": "Ecological status 2009",
      "Technical layer name": "eau_new_Oekologischer_Zustand_2009",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 615,
      "Name": "Air humidity",
      "Technical layer name": "eau_new_Luftfeucht",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 616,
      "Name": "Global radiation",
      "Technical layer name": "eau_new_Globalstrahlung",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 617,
      "Name": "Drinking water shortage (level \"orange\")",
      "Technical layer name": "eau_new_Trinkwasserknappheit_(Zustand_orange)",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 619,
      "Name": "Study zones 2015",
      "Technical layer name": "eau_new_Betrachtungsraeume_2015",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 620,
      "Name": "Soil temperature",
      "Technical layer name": "eau_new_Bodentemperatur",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 621,
      "Name": "Chemical status 2015 [Directive 2008/105/EC]",
      "Technical layer name": "eau_new_Chemischer Zustand 2015_Richtlinie 2008_105_EG",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 622,
      "Name": "Ecological status 2015",
      "Technical layer name": "eau_new_Oekologischer_Zustand_2015",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 626,
      "Name": "Fishing sections",
      "Technical layer name": "eau_new_Fischereiabschnitte",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 627,
      "Name": "WFD - surveillance monitoring",
      "Technical layer name": "eau_new_WRRL_-_Ueberblicksueberwachung",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 628,
      "Name": "Hydrogeological drillings",
      "Technical layer name": "eau_new_Bohrungen",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 629,
      "Name": "Springs",
      "Technical layer name": "eau_new_Quellen",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 631,
      "Name": "Aquifers",
      "Technical layer name": "eau_new_Grundwasserleiter",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 632,
      "Name": "Chemical status of the WB 2015",
      "Technical layer name": "eau_new_Chemischer_Zustand_der_WK_2015",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 633,
      "Name": "Floodplain Sauer 1995",
      "Technical layer name": "eau_new_UESG_Sauer_1995",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 634,
      "Name": "Heavily modified waterbodies 2009",
      "Technical layer name": "eau_new_Erheblich veränderte Wasserkörper 2009",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 636,
      "Name": "Catchment areas",
      "Technical layer name": "eau_new_Einzugsgebiete",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 637,
      "Name": "Floodplain 1983 - Mosel",
      "Technical layer name": "eau_new_UESG_1983_-_Mosel",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 641,
      "Name": "Floodplain 1993 [without Mosel]",
      "Technical layer name": "eau_new_UESG_1993_(ausser_Mosel)",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 642,
      "Name": "Floodplain Alzette 1995",
      "Technical layer name": "eau_new_UESG_Alzette_1995",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 643,
      "Name": "Waste water syndicats",
      "Technical layer name": "eau_new_Abwassersyndikate",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 644,
      "Name": "Catchment areas 2009",
      "Technical layer name": "eau_new_Betrachtungsraeume_2009",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 645,
      "Name": "Waste water treatment plants",
      "Technical layer name": "eau_new_Klaeranlagen",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 646,
      "Name": "Fish 2015",
      "Technical layer name": "eau_new_Fische_2015",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 649,
      "Name": "Groundwater [WFD] - Quantitative monitoring",
      "Technical layer name": "eau_new_Grundwasser_(WRRL)_-_Ueberwachung_der_Quantitaet",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 650,
      "Name": "Groundwater [WFD] - Qualitative monitoring",
      "Technical layer name": "eau_new_Grundwasser_(WRRL)_-_Ueberwachung_der_Qualitaet",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 651,
      "Name": "Channel - Millchannel",
      "Technical layer name": "eau_new_Kanal_-__Muehlgraben",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 653,
      "Name": "Alluvial groundwater level",
      "Technical layer name": "eau_new_Alluvialer_Grundwasserspiegel",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 654,
      "Name": "Surface water Nitrates Directive 91/676/CEE",
      "Technical layer name": "eau_new_Oberflächengewässer_Nitratrichtlinie_91_676_CEE",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 655,
      "Name": "Water level",
      "Technical layer name": "eau_new_Wasserstand",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 656,
      "Name": "Bathing Waters",
      "Technical layer name": "eau_new_Badegewaesser",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 657,
      "Name": "Status of the WB 2009",
      "Technical layer name": "eau_new_Zustand_der_WK_2009",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 658,
      "Name": "Heavily modified waterbodies 2015",
      "Technical layer name": "eau_new_Erheblich veränderte Wasserkörper 2015",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 659,
      "Name": "Ground water bodies 2015",
      "Technical layer name": "eau_new_Grundwasserkoerper_2015",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 660,
      "Name": "Risk assessment of the WB to reach good chemical status 2021",
      "Technical layer name": "eau_new_Risikobeurteilung des WK hinsichtlich der Verfehlung des guten chemischen Zustandes 2021",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 661,
      "Name": "Risk assessment of the WB to reach good quantitative status 2021",
      "Technical layer name": "eau_new_Risikobeurteilung des WK hinsichtlich der Verfehlung des guten mengenmäßigen Zustandes 2021",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 662,
      "Name": "Macrophytes and phytobenthos 2015",
      "Technical layer name": "eau_new_Makrophyten_2015",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 663,
      "Name": "Ecological Potential 2015",
      "Technical layer name": "eau_new_Gesamtzustand_2015",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 664,
      "Name": "ZPS ongoing public procedure",
      "Technical layer name": "eau_new_ZPS_laufende_oeffentliche_Verfahrungsweise",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 665,
      "Name": "Aerial images from 1977 (1:30k)",
      "Technical layer name": "aero_1977_30k",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 667,
      "Name": "Closings & detours",
      "Technical layer name": "tour_restrictions_autre",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 676,
      "Name": "road bike tours",
      "Technical layer name": "tour_velo_route",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 677,
      "Name": "Public forests",
      "Technical layer name": "anf_proprietes_forestieres",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 678,
      "Name": "Regional biological stations",
      "Technical layer name": "anf_stations_biologiques",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 681,
      "Name": "ADAC Motorbike Tour",
      "Technical layer name": "tour_moto",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 682,
      "Name": "mBox",
      "Technical layer name": "mobi_mbox",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 685,
      "Name": "current road works (CITA)",
      "Technical layer name": "cita_chantiers_actuel",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 686,
      "Name": "future road works (CITA)",
      "Technical layer name": "cita_chantiers_futur",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 688,
      "Name": "IVV permanent trails",
      "Technical layer name": "tour_ivv_perm",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 690,
      "Name": "Ecological sectors",
      "Technical layer name": "anf_secteurs_ecologiques",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 693,
      "Name": "IVV events",
      "Technical layer name": "tour_ivv_temp",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 696,
      "Name": "approved PAP plans",
      "Technical layer name": "pag_pap_approuves",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 697,
      "Name": "Base plan",
      "Technical layer name": "pag_pcn",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 698,
      "Name": "PAG",
      "Technical layer name": "pag_pag",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 702,
      "Name": "Soil map 1:25'000",
      "Technical layer name": "asta_pedologie_new",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 703,
      "Name": "Soil acidity (pHCaCl2)",
      "Technical layer name": "asta_pedologie_ph",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 704,
      "Name": "Topsoil Organic Carbon Content",
      "Technical layer name": "asta_pedologie_humus",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 709,
      "Name": "national protected sites and monuments",
      "Technical layer name": "pag_ssmn",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 710,
      "Name": "Special zoning plan (POS)",
      "Technical layer name": "pag_pos",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 713,
      "Name": "Localisation of traffic radars",
      "Technical layer name": "pch_radars",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 725,
      "Name": "Skoda Tour de Luxembourg 2022",
      "Technical layer name": "tour_tdl",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 732,
      "Name": "Judicial districts",
      "Technical layer name": "limadmin_judiciaire",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 733,
      "Name": "Legislative circonscriptions",
      "Technical layer name": "limadmin_legislatif",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 734,
      "Name": "UTM Grid",
      "Technical layer name": "utm_grid",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 738,
      "Name": "Graticules in LUREF",
      "Technical layer name": "luref_graticules",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 740,
      "Name": "Environmentally sensitive grasslands",
      "Technical layer name": "asta_herbages_sensibles",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 743,
      "Name": "Aerial images from 1987 (1:30k)",
      "Technical layer name": "aero_1987_30k",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 744,
      "Name": "Regional Tourist Offices",
      "Technical layer name": "tour_ort",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 745,
      "Name": "Orthophoto 2016",
      "Technical layer name": "ortho_2016",
      "Is Background": false,
      "Format": "image/jpeg",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 746,
      "Name": "LEADER Areas",
      "Technical layer name": "tour_leader",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 747,
      "Name": "Nature Parks",
      "Technical layer name": "tour_parcsnaturels",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 748,
      "Name": "Aerial images from 1994 (1:30k)",
      "Technical layer name": "aero_1994_30k",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 749,
      "Name": "Watercourses",
      "Technical layer name": "eau_new_Gewässer",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 750,
      "Name": "Watercourses kilometrage",
      "Technical layer name": "eau_new_Kilometrierung der Gewässer",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 756,
      "Name": "Flood foci",
      "Technical layer name": "eau_new_Hochwasser Brennpunkte",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 758,
      "Name": "Programme of measures FRMP 2015",
      "Technical layer name": "eau_new_Maßnahmens des Hochwasserrisikomanagementplans",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 759,
      "Name": "Structural quality mapping 2015 [7-stage evaluation]",
      "Technical layer name": "eau_new_Strukturgütekartierung 2015 [7-stufige Bewertung]",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 760,
      "Name": "Structural quality mapping 2015 [5-stage evaluation]",
      "Technical layer name": "eau_new_Strukturgütekartierung 2015 [5-stufige Bewertung]",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 761,
      "Name": "Structural quality mapping 2015 in 5 stripes [7-stage evaluation]",
      "Technical layer name": "eau_new_Struktukartierung 2015 in 5 Band [7-stufige Bewertung]",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 763,
      "Name": "Structural quality mapping 2015 in 5 stripes [5-stage evaluation]",
      "Technical layer name": "eau_new_Struktukartierung 2015 in 5 Band [5-stufige Bewertung]",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 764,
      "Name": "Chemical status without ubiquitous substances 2015 [Directive 2008/105/EC]",
      "Technical layer name": "eau_new_Chemischer_Zustand_ohne_ubiquitaere_Stoffe 2015_Richtlinie_2008_105_EG",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 765,
      "Name": "Chemical status 2015 [Directive 2013/39/EU]",
      "Technical layer name": "eau_new_Chemischer_Zustand_2015_Richtlinie 2013_39_EU",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 766,
      "Name": "Chemical status without ubiquitous substances 2015 [Directive 2013/39/EU]",
      "Technical layer name": "eau_new_Chemischer_Zustand_ohne_ubiquitaere_Stoffe_2015_Richtlinie 2013_39_EU",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 767,
      "Name": "Hydromorphology 2015",
      "Technical layer name": "eau_new_Hydromorphologische Gesamtbewertung 2015",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 768,
      "Name": "Monitoringprogramms - Results",
      "Technical layer name": "eau_new_Überwachungsprogramme - Resultate",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 769,
      "Name": "Morphology 2015",
      "Technical layer name": "eau_new_Morphologie 2015",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 770,
      "Name": "Continuity 2015",
      "Technical layer name": "eau_new_Durchgängigkeit 2015",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 771,
      "Name": "Phytoplankton 2015",
      "Technical layer name": "eau_new_Phytoplankton 2015",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 773,
      "Name": "Risk assessment of the WB to reach good status 2021",
      "Technical layer name": "eau_new_Risikobeurteilung des WK hinsichtlich der Verfehlung des guten Zustandes 2021",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 774,
      "Name": "Risk assessment of the WB to reach good status 2027",
      "Technical layer name": "eau_new_Risikobeurteilung des WK hinsichtlich der Verfehlung des guten Zustandes 2027",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 776,
      "Name": "Risk assessment of the WB to reach good quantitative status 2027",
      "Technical layer name": "eau_new_Risikobeurteilung des WK hinsichtlich der Verfehlung des guten mengenmäßigen Zustandes 2027",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 777,
      "Name": "Risk assessment of the WB to reach good chemical status 2027",
      "Technical layer name": "eau_new_Risikobeurteilung des WK hinsichtlich der Verfehlung des guten chemischen Zustandes 2027",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 785,
      "Name": "Detailed programme of measures HY",
      "Technical layer name": "eau_new_WRRL und HWRM-RL Massnahmen",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 791,
      "Name": "Orthophoto 2010 infrared",
      "Technical layer name": "ortho_2010_irc",
      "Is Background": false,
      "Format": "image/jpeg",
      "Queryable": true,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 792,
      "Name": "Orthophoto 2013 infrared",
      "Technical layer name": "ortho_2013_irc",
      "Is Background": false,
      "Format": "image/jpeg",
      "Queryable": true,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 793,
      "Name": "Orthophoto 2016 infrared",
      "Technical layer name": "ortho_2016_irc",
      "Is Background": false,
      "Format": "image/jpeg",
      "Queryable": true,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 797,
      "Name": "Prevention phase (Phase yellow)",
      "Technical layer name": "eau_new_trockenheit_gelb",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 798,
      "Name": "SEVESO Sites",
      "Technical layer name": "seveso",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 801,
      "Name": "Base stations for public mobile communication networks ≥ 50 Watt",
      "Technical layer name": "mat_antennes_plus_50_watt",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 802,
      "Name": "Measuring points",
      "Technical layer name": "mat_points_mesure",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 804,
      "Name": "Designated protected areas",
      "Technical layer name": "anf_zpin_declarees",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 805,
      "Name": "Protected areas in view of designation",
      "Technical layer name": "anf_zpin_a_declarer",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 806,
      "Name": "Protected areas undergoing the official designation procedure",
      "Technical layer name": "anf_zpin_en_procedure",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 808,
      "Name": "National cycle paths",
      "Technical layer name": "velo_by_pch",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 809,
      "Name": "Cycle tours",
      "Technical layer name": "lvi_circuits_cyclables",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 811,
      "Name": "Base stations for public mobile communication networks < 50 Watt",
      "Technical layer name": "mat_antennes_moins_50_watt",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 813,
      "Name": "Public Transport Network",
      "Technical layer name": "cdt_lignes_all",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 814,
      "Name": "Bus lines AVL",
      "Technical layer name": "cdt_lignes_avl",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 815,
      "Name": "Bus lines RGTR",
      "Technical layer name": "cdt_lignes_rgtr",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 816,
      "Name": "Bus lines TICE",
      "Technical layer name": "cdt_lignes_tice",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 817,
      "Name": "Train Lines CFL",
      "Technical layer name": "cdt_lignes_cfl",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 823,
      "Name": "",
      "Technical layer name": "feuilles_cadastrales_urplang2",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 830,
      "Name": "1971-2000 - Reference period 1971-2000, Precipitation, yearly sum [mm]",
      "Technical layer name": "lux_norm1971_2000_00_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 833,
      "Name": "Jan. 1971-2000 - Reference period 1971-2000, Precipitation, monthly sum [mm]",
      "Technical layer name": "lux_norm1971_2000_01_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 836,
      "Name": "Feb. 1971-2000 - Reference period 1971-2000, Precipitation, monthly sum [mm]",
      "Technical layer name": "lux_norm1971_2000_02_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 839,
      "Name": "Mar. 1971-2000 - Reference period 1971-2000, Precipitation, monthly sum [mm]",
      "Technical layer name": "lux_norm1971_2000_03_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 842,
      "Name": "Apr. 1971-2000 - Reference period 1971-2000, Precipitation, monthly sum [mm]",
      "Technical layer name": "lux_norm1971_2000_04_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 845,
      "Name": "May 1971-2000 - Reference period 1971-2000, Precipitation, monthly sum [mm]",
      "Technical layer name": "lux_norm1971_2000_05_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 848,
      "Name": "Jun. 1971-2000 - Reference period 1971-2000, Precipitation, monthly sum [mm]",
      "Technical layer name": "lux_norm1971_2000_06_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 851,
      "Name": "Jul. 1971-2000 - Reference period 1971-2000, Precipitation, monthly sum [mm]",
      "Technical layer name": "lux_norm1971_2000_07_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 854,
      "Name": "Aug. 1971-2000 - Reference period 1971-2000, Precipitation, monthly sum [mm]",
      "Technical layer name": "lux_norm1971_2000_08_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 857,
      "Name": "Sep. 1971-2000 - Reference period 1971-2000, Precipitation, monthly sum [mm]",
      "Technical layer name": "lux_norm1971_2000_09_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 860,
      "Name": "Oct. 1971-2000 - Reference period 1971-2000, Precipitation, monthly sum [mm]",
      "Technical layer name": "lux_norm1971_2000_10_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 863,
      "Name": "Nov. 1971-2000 - Reference period 1971-2000, Precipitation, monthly sum [mm]",
      "Technical layer name": "lux_norm1971_2000_11_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 866,
      "Name": "Dec. 1971-2000 - Reference period 1971-2000, Precipitation, monthly sum [mm]",
      "Technical layer name": "lux_norm1971_2000_12_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 872,
      "Name": "2012 - Temperature yearly minimum [ºC]",
      "Technical layer name": "lux_2012_00_temp_minimum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 875,
      "Name": "Jan. 2012 - Average monthly minimum temperatures [ºC]",
      "Technical layer name": "lux_2012_01_temp_minimum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 878,
      "Name": "Feb. 2012 - Average monthly minimum temperatures [ºC]",
      "Technical layer name": "lux_2012_02_temp_minimum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 881,
      "Name": "Mar. 2012 - Average monthly minimum temperatures [ºC]",
      "Technical layer name": "lux_2012_03_temp_minimum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 884,
      "Name": "Apr. 2012 - Average monthly minimum temperatures [ºC]",
      "Technical layer name": "lux_2012_04_temp_minimum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 887,
      "Name": "May 2012 - Average monthly minimum temperatures [ºC]",
      "Technical layer name": "lux_2012_05_temp_minimum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 890,
      "Name": "Jun. 2012 - Average monthly minimum temperatures [ºC]",
      "Technical layer name": "lux_2012_06_temp_minimum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 893,
      "Name": "Jul. 2012 - Average monthly minimum temperatures [ºC]",
      "Technical layer name": "lux_2012_07_temp_minimum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 896,
      "Name": "Aug. 2012 - Average monthly minimum temperatures [ºC]",
      "Technical layer name": "lux_2012_08_temp_minimum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 899,
      "Name": "Sep. 2012 - Average monthly minimum temperatures [ºC]",
      "Technical layer name": "lux_2012_09_temp_minimum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 902,
      "Name": "Oct. 2012 - Average monthly minimum temperatures [ºC]",
      "Technical layer name": "lux_2012_10_temp_minimum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 905,
      "Name": "Nov. 2012 - Average monthly minimum temperatures [ºC]",
      "Technical layer name": "lux_2012_11_temp_minimum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 908,
      "Name": "Dec. 2012 - Average monthly minimum temperatures [ºC]",
      "Technical layer name": "lux_2012_12_temp_minimum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 912,
      "Name": "2012 - Temperature yearly average [ºC]",
      "Technical layer name": "lux_2012_00_temp_average",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 915,
      "Name": "Jan. 2012 - Temperature monthly average [ºC]",
      "Technical layer name": "lux_2012_01_temp_average",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 918,
      "Name": "Feb. 2012 - Temperature monthly average [ºC]",
      "Technical layer name": "lux_2012_02_temp_average",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 921,
      "Name": "Mar. 2012 - Temperature monthly average [ºC]",
      "Technical layer name": "lux_2012_03_temp_average",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 924,
      "Name": "Apr. 2012 - Temperature monthly average [ºC]",
      "Technical layer name": "lux_2012_04_temp_average",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 927,
      "Name": "May 2012 - Temperature monthly average [ºC]",
      "Technical layer name": "lux_2012_05_temp_average",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 930,
      "Name": "Jun. 2012 - Temperature monthly average [ºC]",
      "Technical layer name": "lux_2012_06_temp_average",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 933,
      "Name": "Jul. 2012 - Temperature monthly average [ºC]",
      "Technical layer name": "lux_2012_07_temp_average",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 936,
      "Name": "Aug. 2012 - Temperature monthly average [ºC]",
      "Technical layer name": "lux_2012_08_temp_average",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 939,
      "Name": "Sep. 2012 - Temperature monthly average [ºC]",
      "Technical layer name": "lux_2012_09_temp_average",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 942,
      "Name": "Oct. 2012 - Temperature monthly average [ºC]",
      "Technical layer name": "lux_2012_10_temp_average",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 945,
      "Name": "Nov. 2012 - Temperature monthly average [ºC]",
      "Technical layer name": "lux_2012_11_temp_average",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 948,
      "Name": "Dec. 2012 - Temperature monthly average [ºC]",
      "Technical layer name": "lux_2012_12_temp_average",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 952,
      "Name": "2012 - Average annual maximum temperatures [ºC]",
      "Technical layer name": "lux_2012_00_temp_maximum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 955,
      "Name": "Jan. 2012 - Average monthly maximum temperatures [ºC]",
      "Technical layer name": "lux_2012_01_temp_maximum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 958,
      "Name": "Feb. 2012 - Average monthly maximum temperatures [ºC]",
      "Technical layer name": "lux_2012_02_temp_maximum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 961,
      "Name": "Mar. 2012 - Average monthly maximum temperatures [ºC]",
      "Technical layer name": "lux_2012_03_temp_maximum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 964,
      "Name": "Apr. 2012 - Average monthly maximum temperatures [ºC]",
      "Technical layer name": "lux_2012_04_temp_maximum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 967,
      "Name": "May 2012 - Average monthly maximum temperatures [ºC]",
      "Technical layer name": "lux_2012_05_temp_maximum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 970,
      "Name": "Jun. 2012 - Average monthly maximum temperatures [ºC]",
      "Technical layer name": "lux_2012_06_temp_maximum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 973,
      "Name": "Jul. 2012 - Average monthly maximum temperatures [ºC]",
      "Technical layer name": "lux_2012_07_temp_maximum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 976,
      "Name": "Aug. 2012 - Average monthly maximum temperatures [ºC]",
      "Technical layer name": "lux_2012_08_temp_maximum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 979,
      "Name": "Sep. 2012 - Average monthly maximum temperatures [ºC]",
      "Technical layer name": "lux_2012_09_temp_maximum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 982,
      "Name": "Oct. 2012 - Average monthly maximum temperatures [ºC]",
      "Technical layer name": "lux_2012_10_temp_maximum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 985,
      "Name": "Nov. 2012 - Average monthly maximum temperatures [ºC]",
      "Technical layer name": "lux_2012_11_temp_maximum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 988,
      "Name": "Dec. 2012 - Average monthly maximum temperatures [ºC]",
      "Technical layer name": "lux_2012_12_temp_maximum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 993,
      "Name": "2012 - Precipitation, yearly sum [mm]",
      "Technical layer name": "lux_2012_00_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 996,
      "Name": "Jan. 2012 - Precipitation, monthly sum [mm]",
      "Technical layer name": "lux_2012_01_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 999,
      "Name": "Feb. 2012 - Precipitation, monthly sum [mm]",
      "Technical layer name": "lux_2012_02_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1002,
      "Name": "Mar. 2012 - Precipitation, monthly sum [mm]",
      "Technical layer name": "lux_2012_03_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1005,
      "Name": "Apr. 2012 - Precipitation, monthly sum [mm]",
      "Technical layer name": "lux_2012_04_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1008,
      "Name": "May 2012 - Precipitation, monthly sum [mm]",
      "Technical layer name": "lux_2012_05_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1011,
      "Name": "Jun. 2012 - Precipitation, monthly sum [mm]",
      "Technical layer name": "lux_2012_06_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1014,
      "Name": "Jul. 2012 - Precipitation, monthly sum [mm]",
      "Technical layer name": "lux_2012_07_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1017,
      "Name": "Aug. 2012 - Precipitation, monthly sum [mm]",
      "Technical layer name": "lux_2012_08_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1020,
      "Name": "Sep. 2012 - Precipitation, monthly sum [mm]",
      "Technical layer name": "lux_2012_09_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1023,
      "Name": "Oct. 2012 - Precipitation, monthly sum [mm]",
      "Technical layer name": "lux_2012_10_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1026,
      "Name": "Nov. 2012 - Precipitation, monthly sum [mm]",
      "Technical layer name": "lux_2012_11_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1029,
      "Name": "Dec. 2012 - Precipitation, monthly sum [mm]",
      "Technical layer name": "lux_2012_12_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1033,
      "Name": "2012 - Precipitation, yearly difference to reference period [mm]",
      "Technical layer name": "lux_2012_00_pluvio_diff_mm",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1036,
      "Name": "Jan. 2012 - Precipitation, monthly difference to reference period [mm]",
      "Technical layer name": "lux_2012_01_pluvio_diff_mm",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1039,
      "Name": "Feb. 2012 - Precipitation, monthly difference to reference period [mm]",
      "Technical layer name": "lux_2012_02_pluvio_diff_mm",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1042,
      "Name": "Mar. 2012 - Precipitation, monthly difference to reference period [mm]",
      "Technical layer name": "lux_2012_03_pluvio_diff_mm",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1045,
      "Name": "Apr. 2012 - Precipitation, monthly difference to reference period [mm]",
      "Technical layer name": "lux_2012_04_pluvio_diff_mm",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1048,
      "Name": "May 2012 - Precipitation, monthly difference to reference period [mm]",
      "Technical layer name": "lux_2012_05_pluvio_diff_mm",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1051,
      "Name": "Jun. 2012 - Precipitation, monthly difference to reference period [mm]",
      "Technical layer name": "lux_2012_06_pluvio_diff_mm",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1054,
      "Name": "Jul. 2012 - Precipitation, monthly difference to reference period [mm]",
      "Technical layer name": "lux_2012_07_pluvio_diff_mm",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1057,
      "Name": "Aug. 2012 - Precipitation, monthly difference to reference period [mm]",
      "Technical layer name": "lux_2012_08_pluvio_diff_mm",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1060,
      "Name": "Sep. 2012 - Precipitation, monthly difference to reference period [mm]",
      "Technical layer name": "lux_2012_09_pluvio_diff_mm",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1063,
      "Name": "Oct. 2012 - Precipitation, monthly difference to reference period [mm]",
      "Technical layer name": "lux_2012_10_pluvio_diff_mm",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1066,
      "Name": "Nov. 2012 - Precipitation, monthly difference to reference period [mm]",
      "Technical layer name": "lux_2012_11_pluvio_diff_mm",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1069,
      "Name": "Dec. 2012 - Precipitation, monthly difference to reference period [mm]",
      "Technical layer name": "lux_2012_12_pluvio_diff_mm",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1073,
      "Name": "2012 - Precipitation, yearly difference to reference [%]",
      "Technical layer name": "lux_2012_00_pluvio_diff_perc",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1076,
      "Name": "Jan. 2012 - Precipitation, monthly difference to reference [%]",
      "Technical layer name": "lux_2012_01_pluvio_diff_perc",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1079,
      "Name": "Feb. 2012 - Precipitation, monthly difference to reference [%]",
      "Technical layer name": "lux_2012_02_pluvio_diff_perc",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1082,
      "Name": "Mar. 2012 - Precipitation, monthly difference to reference [%]",
      "Technical layer name": "lux_2012_03_pluvio_diff_perc",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1085,
      "Name": "Apr. 2012 - Precipitation, monthly difference to reference [%]",
      "Technical layer name": "lux_2012_04_pluvio_diff_perc",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1088,
      "Name": "May 2012 - Precipitation, monthly difference to reference [%]",
      "Technical layer name": "lux_2012_05_pluvio_diff_perc",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1091,
      "Name": "Jun. 2012 - Precipitation, monthly difference to reference [%]",
      "Technical layer name": "lux_2012_06_pluvio_diff_perc",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1094,
      "Name": "Jul. 2012 - Precipitation, monthly difference to reference [%]",
      "Technical layer name": "lux_2012_07_pluvio_diff_perc",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1097,
      "Name": "Aug. 2012 - Precipitation, monthly difference to reference [%]",
      "Technical layer name": "lux_2012_08_pluvio_diff_perc",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1100,
      "Name": "Sep. 2012 - Precipitation, monthly difference to reference [%]",
      "Technical layer name": "lux_2012_09_pluvio_diff_perc",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1103,
      "Name": "Oct. 2012 - Precipitation, monthly difference to reference [%]",
      "Technical layer name": "lux_2012_10_pluvio_diff_perc",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1106,
      "Name": "Nov. 2012 - Precipitation, monthly difference to reference [%]",
      "Technical layer name": "lux_2012_11_pluvio_diff_perc",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1109,
      "Name": "Dec. 2012 - Precipitation, monthly difference to reference [%]",
      "Technical layer name": "lux_2012_12_pluvio_diff_perc",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1115,
      "Name": "2013 - Average annual minimum temperatures [ºC]",
      "Technical layer name": "lux_2013_00_temp_minimum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1118,
      "Name": "Jan. 2013 - Average monthly minimum temperatures [ºC]",
      "Technical layer name": "lux_2013_01_temp_minimum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1121,
      "Name": "Feb. 2013 - Average monthly minimum temperatures [ºC]",
      "Technical layer name": "lux_2013_02_temp_minimum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1124,
      "Name": "Mar. 2013 - Average monthly minimum temperatures [ºC]",
      "Technical layer name": "lux_2013_03_temp_minimum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1127,
      "Name": "Apr. 2013 - Average monthly minimum temperatures [ºC]",
      "Technical layer name": "lux_2013_04_temp_minimum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1130,
      "Name": "May 2013 - Average monthly minimum temperatures [ºC]",
      "Technical layer name": "lux_2013_05_temp_minimum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1133,
      "Name": "Jun. 2013 - Average monthly minimum temperatures [ºC]",
      "Technical layer name": "lux_2013_06_temp_minimum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1136,
      "Name": "Jul. 2013 - Average monthly minimum temperatures [ºC]",
      "Technical layer name": "lux_2013_07_temp_minimum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1139,
      "Name": "Aug. 2013 - Average monthly minimum temperatures [ºC]",
      "Technical layer name": "lux_2013_08_temp_minimum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1142,
      "Name": "Sep. 2013 - Average monthly minimum temperatures [ºC]",
      "Technical layer name": "lux_2013_09_temp_minimum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1145,
      "Name": "Oct. 2013 - Average monthly minimum temperatures [ºC]",
      "Technical layer name": "lux_2013_10_temp_minimum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1148,
      "Name": "Nov. 2013 - Average monthly minimum temperatures [ºC]",
      "Technical layer name": "lux_2013_11_temp_minimum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1151,
      "Name": "Dec. 2013 - Average monthly minimum temperatures [ºC]",
      "Technical layer name": "lux_2013_12_temp_minimum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1155,
      "Name": "2013 - Temperature yearly average [ºC]",
      "Technical layer name": "lux_2013_00_temp_average",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1158,
      "Name": "Jan. 2013 - Temperature monthly average [ºC]",
      "Technical layer name": "lux_2013_01_temp_average",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1161,
      "Name": "Feb. 2013 - Temperature monthly average [ºC]",
      "Technical layer name": "lux_2013_02_temp_average",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1164,
      "Name": "Mar. 2013 - Temperature monthly average [ºC]",
      "Technical layer name": "lux_2013_03_temp_average",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1167,
      "Name": "Apr. 2013 - Temperature monthly average [ºC]",
      "Technical layer name": "lux_2013_04_temp_average",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1170,
      "Name": "May 2013 - Temperature monthly average [ºC]",
      "Technical layer name": "lux_2013_05_temp_average",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1173,
      "Name": "Jun. 2013 - Temperature monthly average [ºC]",
      "Technical layer name": "lux_2013_06_temp_average",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1176,
      "Name": "Jul. 2013 - Temperature monthly average [ºC]",
      "Technical layer name": "lux_2013_07_temp_average",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1179,
      "Name": "Aug. 2013 - Temperature monthly average [ºC]",
      "Technical layer name": "lux_2013_08_temp_average",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1182,
      "Name": "Sep. 2013 - Temperature monthly average [ºC]",
      "Technical layer name": "lux_2013_09_temp_average",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1185,
      "Name": "Oct. 2013 - Temperature monthly average [ºC]",
      "Technical layer name": "lux_2013_10_temp_average",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1188,
      "Name": "Nov. 2013 - Temperature monthly average [ºC]",
      "Technical layer name": "lux_2013_11_temp_average",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1191,
      "Name": "Dec. 2013 - Temperature monthly average [ºC]",
      "Technical layer name": "lux_2013_12_temp_average",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1195,
      "Name": "2013 - Average annual maximum temperatures [ºC]",
      "Technical layer name": "lux_2013_00_temp_maximum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1198,
      "Name": "Jan. 2013 - Average monthly maximum temperatures [ºC]",
      "Technical layer name": "lux_2013_01_temp_maximum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1201,
      "Name": "Feb. 2013 - Average monthly maximum temperatures [ºC]",
      "Technical layer name": "lux_2013_02_temp_maximum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1204,
      "Name": "Mar. 2013 - Average monthly maximum temperatures [ºC]",
      "Technical layer name": "lux_2013_03_temp_maximum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1207,
      "Name": "Apr. 2013 - Average monthly maximum temperatures [ºC]",
      "Technical layer name": "lux_2013_04_temp_maximum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1210,
      "Name": "May 2013 - Average monthly maximum temperatures [ºC]",
      "Technical layer name": "lux_2013_05_temp_maximum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1213,
      "Name": "Jun. 2013 - Average monthly maximum temperatures [ºC]",
      "Technical layer name": "lux_2013_06_temp_maximum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1216,
      "Name": "Jul. 2013 - Average monthly maximum temperatures [ºC]",
      "Technical layer name": "lux_2013_07_temp_maximum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1219,
      "Name": "Aug. 2013 - Average monthly maximum temperatures [ºC]",
      "Technical layer name": "lux_2013_08_temp_maximum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1222,
      "Name": "Sep. 2013 - Average monthly maximum temperatures [ºC]",
      "Technical layer name": "lux_2013_09_temp_maximum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1225,
      "Name": "Oct. 2013 - Average monthly maximum temperatures [ºC]",
      "Technical layer name": "lux_2013_10_temp_maximum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1228,
      "Name": "Nov. 2013 - Average monthly maximum temperatures [ºC]",
      "Technical layer name": "lux_2013_11_temp_maximum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1231,
      "Name": "Dec. 2013 - Average annual maximum temperatures [ºC]",
      "Technical layer name": "lux_2013_12_temp_maximum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1236,
      "Name": "2013 - Precipitation, yearly sum [mm]",
      "Technical layer name": "lux_2013_00_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1239,
      "Name": "Jan. 2013 - Precipitation, monthly sum [mm]",
      "Technical layer name": "lux_2013_01_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1242,
      "Name": "Feb. 2013 - Precipitation, monthly sum [mm]",
      "Technical layer name": "lux_2013_02_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1245,
      "Name": "Mar. 2013 - Precipitation, monthly sum [mm]",
      "Technical layer name": "lux_2013_03_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1248,
      "Name": "Apr. 2013 - Precipitation, monthly sum [mm]",
      "Technical layer name": "lux_2013_04_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1251,
      "Name": "May 2013 - Precipitation, monthly sum [mm]",
      "Technical layer name": "lux_2013_05_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1254,
      "Name": "Jun. 2013 - Precipitation, monthly sum [mm]",
      "Technical layer name": "lux_2013_06_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1257,
      "Name": "Jul. 2013 - Precipitation, monthly sum [mm]",
      "Technical layer name": "lux_2013_07_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1260,
      "Name": "Aug. 2013 - Precipitation, monthly sum [mm]",
      "Technical layer name": "lux_2013_08_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1263,
      "Name": "Sep. 2013 - Precipitation, monthly sum [mm]",
      "Technical layer name": "lux_2013_09_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1266,
      "Name": "Oct. 2013 - Precipitation, monthly sum [mm]",
      "Technical layer name": "lux_2013_10_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1269,
      "Name": "Nov. 2013 - Precipitation, monthly sum [mm]",
      "Technical layer name": "lux_2013_11_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1272,
      "Name": "Dec. 2013 - Precipitation, monthly sum [mm]",
      "Technical layer name": "lux_2013_12_pluvio_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1276,
      "Name": "2013 - Precipitation, yearly difference to reference period [mm]",
      "Technical layer name": "lux_2013_00_pluvio_diff_mm",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1279,
      "Name": "Jan. 2013 - Precipitation, monthly difference to reference period [mm]",
      "Technical layer name": "lux_2013_01_pluvio_diff_mm",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1282,
      "Name": "Feb. 2013 - Precipitation, monthly difference to reference period [mm]",
      "Technical layer name": "lux_2013_02_pluvio_diff_mm",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1285,
      "Name": "Mar. 2013 - Precipitation, monthly difference to reference period [mm]",
      "Technical layer name": "lux_2013_03_pluvio_diff_mm",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1288,
      "Name": "Apr. 2013 - Precipitation, monthly difference to reference period [mm]",
      "Technical layer name": "lux_2013_04_pluvio_diff_mm",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1291,
      "Name": "May 2013 - Precipitation, monthly difference to reference period [mm]",
      "Technical layer name": "lux_2013_05_pluvio_diff_mm",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1294,
      "Name": "Jun. 2013 - Precipitation, monthly difference to reference period [mm]",
      "Technical layer name": "lux_2013_06_pluvio_diff_mm",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1297,
      "Name": "Jul. 2013 - Precipitation, monthly difference to reference period [mm]",
      "Technical layer name": "lux_2013_07_pluvio_diff_mm",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1300,
      "Name": "Aug. 2013 - Precipitation, monthly difference to reference period [mm]",
      "Technical layer name": "lux_2013_08_pluvio_diff_mm",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1303,
      "Name": "Sep. 2013 - Precipitation, monthly difference to reference period in percent [mm]",
      "Technical layer name": "lux_2013_09_pluvio_diff_mm",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1306,
      "Name": "Oct. 2013 - Precipitation, monthly difference to reference period [mm]",
      "Technical layer name": "lux_2013_10_pluvio_diff_mm",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1309,
      "Name": "Nov. 2013 - Precipitation, monthly difference to reference period [mm]",
      "Technical layer name": "lux_2013_11_pluvio_diff_mm",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1312,
      "Name": "Dec. 2013 - Precipitation, monthly difference to reference period [mm]",
      "Technical layer name": "lux_2013_12_pluvio_diff_mm",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1316,
      "Name": "2013 - Precipitation, yearly difference to reference period [%]",
      "Technical layer name": "lux_2013_00_pluvio_diff_perc",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1319,
      "Name": "Jan. 2013 - Precipitation, monthly difference to reference period [%]",
      "Technical layer name": "lux_2013_01_pluvio_diff_perc",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1322,
      "Name": "Feb. 2013 - Precipitation, monthly difference to reference period [%]",
      "Technical layer name": "lux_2013_02_pluvio_diff_perc",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1325,
      "Name": "Mar. 2013 - Precipitation, monthly difference to reference period [%]",
      "Technical layer name": "lux_2013_03_pluvio_diff_perc",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1328,
      "Name": "Apr. 2013 - Precipitation, monthly difference to reference period [%]",
      "Technical layer name": "lux_2013_04_pluvio_diff_perc",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1331,
      "Name": "May 2013 - Precipitation, monthly difference to reference period [%]",
      "Technical layer name": "lux_2013_05_pluvio_diff_perc",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1334,
      "Name": "Jun. 2013 - Precipitation, monthly difference to reference period [%]",
      "Technical layer name": "lux_2013_06_pluvio_diff_perc",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1337,
      "Name": "Jul. 2013 - Precipitation, monthly difference to reference period [%]",
      "Technical layer name": "lux_2013_07_pluvio_diff_perc",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1340,
      "Name": "Aug. 2013 - Precipitation, monthly difference to reference period [%]",
      "Technical layer name": "lux_2013_08_pluvio_diff_perc",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1343,
      "Name": "Sep. 2013 - Precipitation, monthly difference to reference period [%]",
      "Technical layer name": "lux_2013_09_pluvio_diff_perc",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1346,
      "Name": "Oct. 2013 - Precipitation, monthly difference to reference period [%]",
      "Technical layer name": "lux_2013_10_pluvio_diff_perc",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1349,
      "Name": "Nov. 2013 - Precipitation, monthly difference to reference period [%]",
      "Technical layer name": "lux_2013_11_pluvio_diff_perc",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1352,
      "Name": "Dec. 2013 - Precipitation, monthly difference to reference period [%]",
      "Technical layer name": "lux_2013_12_pluvio_diff_perc",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1357,
      "Name": "Telemetry Network",
      "Technical layer name": "aev_reseau_telemetrique",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1358,
      "Name": "Particulate Matter (filter reference method)",
      "Technical layer name": "aev_poussieres_fines",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1359,
      "Name": "Dust deposition (Bergerhoff Network)",
      "Technical layer name": "aev_reseau_bergerhoff",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1360,
      "Name": "Wind turbines",
      "Technical layer name": "aev_emplacements_eoliennes",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1362,
      "Name": "Cadastre of potentially polluted sites",
      "Technical layer name": "aev_casipo",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1363,
      "Name": "",
      "Technical layer name": "reagis",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1364,
      "Name": "Distances from the (country) border",
      "Technical layer name": "act_frontieres_isodistances",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1366,
      "Name": "Additional information",
      "Technical layer name": "pag_infos_supp",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1367,
      "Name": "Point elements",
      "Technical layer name": "anf_biotopes_points",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1368,
      "Name": "Orchards",
      "Technical layer name": "anf_biotopes_vergers",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1369,
      "Name": "Surface elements without orchards",
      "Technical layer name": "anf_biotopes_surfaces",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1370,
      "Name": "Buffer",
      "Technical layer name": "anf_biotopes_tampons",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1371,
      "Name": "Orthophoto 2017",
      "Technical layer name": "ortho_2017",
      "Is Background": false,
      "Format": "image/jpeg",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1372,
      "Name": "Orthophoto 2017 infrared",
      "Technical layer name": "ortho_2017_irc",
      "Is Background": false,
      "Format": "image/jpeg",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1374,
      "Name": "Tram lines",
      "Technical layer name": "cdt_lignes_tram",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1375,
      "Name": "",
      "Technical layer name": "makerspaces",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1376,
      "Name": "Cadastral parcels",
      "Technical layer name": "parcels_daily",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1377,
      "Name": "Digital Surface Model (Nordstad region)",
      "Technical layer name": "lidar_mns",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1378,
      "Name": "Digital Elevation Model (Nordstad region)",
      "Technical layer name": "lidar_mnt",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1379,
      "Name": "Orthophoto 2017 (winter)",
      "Technical layer name": "lidar_ortho_2017_winter",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1381,
      "Name": "Chargy stations",
      "Technical layer name": "chargy",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1383,
      "Name": "Potential quiet rural areas",
      "Technical layer name": "aev_zones_calmes_rurales",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1384,
      "Name": "Potential quiet urban areas",
      "Technical layer name": "aev_zones_calmes_urbaines",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1385,
      "Name": "Potential quiet urban oases",
      "Technical layer name": "aev_oases_urbaines",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1386,
      "Name": "Bike sharing (live data)",
      "Technical layer name": "mobiliteit_livebikes",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1425,
      "Name": "Geostatistical Interpolation PM10",
      "Technical layer name": "air_quality_pm10",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1426,
      "Name": "Biomonitoring Network",
      "Technical layer name": "aev_reseau_biosurveillance",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1429,
      "Name": "Geostatistical Interpolation NO2",
      "Technical layer name": "air_quality_no2",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1430,
      "Name": "Geostatistical Interpolation O3",
      "Technical layer name": "air_quality_o3",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1435,
      "Name": "Pre-emptive right",
      "Technical layer name": "at_pszae_droit_preemption",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1436,
      "Name": "Pre-emptive right",
      "Technical layer name": "at_psl_droit_preemption",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1459,
      "Name": "",
      "Technical layer name": "OSM_MQ",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1460,
      "Name": "Relief",
      "Technical layer name": "wg_relief_map",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1461,
      "Name": "Slope",
      "Technical layer name": "wg_hangneigung_map",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1462,
      "Name": "Exposition",
      "Technical layer name": "wg_exposition_map",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1463,
      "Name": "Digital Object Height Model",
      "Technical layer name": "lidar_mnh",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1464,
      "Name": "Grand-ducal regulation regarding the safeguard zones around the Upper Sûre Lake",
      "Technical layer name": "eau_prgd_zones_protection_lac",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1465,
      "Name": "Medium combustion plants",
      "Technical layer name": "aev_medium_combustion_plants",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1468,
      "Name": "Radon concentrations per municipality",
      "Technical layer name": "carte_radon_communes",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1469,
      "Name": "Functional elements of concept of aquatic habitat connectivity",
      "Technical layer name": "eau_strahlwirkungskonzept",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1470,
      "Name": "Types of watercourses 2015 (LAWA)",
      "Technical layer name": "eau_fliessgewaessertypen_2015",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1471,
      "Name": "Detailed programme of measures SWW",
      "Technical layer name": "eau_detailliertes_massnahmenprogramm_sww",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1475,
      "Name": "Priority noise hotspots - road traffic 2011",
      "Technical layer name": "env_bruit_axes_routiers_hotspots",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1476,
      "Name": "Priority noise hotspots - railway traffic 2011",
      "Technical layer name": "env_bruit_axes_ferroviaires_hotspots",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1477,
      "Name": "Climate pact 2018 - NO2",
      "Technical layer name": "aev_pacte_climat_2018",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1480,
      "Name": "Geostatistical Interpolation PM2.5",
      "Technical layer name": "air_quality_pm2_5",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1482,
      "Name": "Contraintes pour le stockage d’engrais organiques et de silos taupinières (pentes > 5%)",
      "Technical layer name": "asta_contrainte_stockage_engrais",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1483,
      "Name": "Contraintes pour l’épandage d’engrais organiques à action rapide et mesures contre l’érosion (pentes > 10%)",
      "Technical layer name": "asta_contrainte_utilisation_engrais",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1484,
      "Name": "Safeguard zones",
      "Technical layer name": "eau_asta_prgd_zones_protection_lac",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1485,
      "Name": "Priority noise hotspots - road traffic 2011 agglomeration",
      "Technical layer name": "env_bruit_axes_routiers_agglomeration",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1492,
      "Name": "Certificate SMP",
      "Technical layer name": "at_pds_parcels",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1494,
      "Name": "Disponibility of natural gas",
      "Technical layer name": "gaz_naturel",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1496,
      "Name": "Collection centres for wild roadkill and guts",
      "Technical layer name": "anf_centre_ramassage",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1497,
      "Name": "Major Roads 2016 (Lden)",
      "Technical layer name": "env_bruit2016_axes_routiers_lden",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1498,
      "Name": "Major Railways 2016 (Lden)",
      "Technical layer name": "env_bruit2016_axes_ferroviaires_lden",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1499,
      "Name": "Major Airport 2016 (Lngt)",
      "Technical layer name": "env_bruit2016_axes_aeroport_lngt",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1500,
      "Name": "Major Roads 2016 (Lngt)",
      "Technical layer name": "env_bruit2016_axes_routiers_lngt",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1501,
      "Name": "Major Airport 2016 (Lden)",
      "Technical layer name": "env_bruit2016_axes_aeroport_lden",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1502,
      "Name": "Major Railways 2016 (Lngt)",
      "Technical layer name": "env_bruit2016_axes_ferroviaires_lngt",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1503,
      "Name": "Priority noise hotspots - railway traffic 2016",
      "Technical layer name": "env_bruit_axes_ferroviaires_hotspots_2016",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1504,
      "Name": "Priority noise hotspots - road traffic 2016",
      "Technical layer name": "env_bruit_axes_routiers_hotspots_2016",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1505,
      "Name": "Priority noise hotspots - road traffic 2016 agglomeration",
      "Technical layer name": "env_bruit_axes_routiers_agglomeration_2016",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1506,
      "Name": "Composting facilities",
      "Technical layer name": "aev_dechets_composting",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1507,
      "Name": "Inert waste landfills",
      "Technical layer name": "aev_dechets_inert_waste",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1508,
      "Name": "Recycling Centres",
      "Technical layer name": "aev_dechets_recycling",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1509,
      "Name": "Co-fermentation plants",
      "Technical layer name": "aev_dechets_biogas",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1511,
      "Name": "Status Permanent Grassland 2023",
      "Technical layer name": "asta_prairies_permanentes",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1514,
      "Name": "Public forest certification FSC and/or PEFC",
      "Technical layer name": "anf_forets_publiques_fsc_pefc",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1518,
      "Name": "Éislek Pied",
      "Technical layer name": "tour_rando_eislekpied_new",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1527,
      "Name": "Orthophoto 2018",
      "Technical layer name": "ortho_2018",
      "Is Background": false,
      "Format": "image/jpeg",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1529,
      "Name": "Orthophoto 2018 infrared",
      "Technical layer name": "ortho2018_IR",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1531,
      "Name": "Overview of the fusions of the municipalities since 1920",
      "Technical layer name": "ad_fusions_communes",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1532,
      "Name": "The 12 cantons and 102 municipalities on 1st January 2018",
      "Technical layer name": "ad_communes_cantons",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1533,
      "Name": "Evolution of the population",
      "Technical layer name": "ad_evol_pop_1981_2018",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1534,
      "Name": "Frenchmen",
      "Technical layer name": "ad_part_francais_commune",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1535,
      "Name": "Population density per municipality on the 1st January 2018",
      "Technical layer name": "ad_densite_pop_comm",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1536,
      "Name": "Portuguese",
      "Technical layer name": "ad_part_portugais_commune",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1537,
      "Name": "Africans",
      "Technical layer name": "ad_part_africains_commune",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1538,
      "Name": "Germans",
      "Technical layer name": "ad_part_allemands_commune",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1539,
      "Name": "Americans",
      "Technical layer name": "ad_part_americains_commune",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1540,
      "Name": "Asians and Oceanians",
      "Technical layer name": "ad_part_asiates_commune",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1541,
      "Name": "Belgians",
      "Technical layer name": "ad_part_belges_commune",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1542,
      "Name": "Europeans (no EU-28)",
      "Technical layer name": "ad_part_nonUE28_commune",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1543,
      "Name": "Europeans (EU-28)",
      "Technical layer name": "ad_part_UE28_commune",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1544,
      "Name": "Italians",
      "Technical layer name": "ad_part_italiens_commune",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1561,
      "Name": "Average age of women",
      "Technical layer name": "ad_age_moyen_femmes",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1562,
      "Name": "Average age of men",
      "Technical layer name": "ad_age_moyen_hommes",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1563,
      "Name": "Average age (total)",
      "Technical layer name": "ad_age_moyen_2",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1564,
      "Name": "Proportion of under 20-year-old people",
      "Technical layer name": "ad_moins20",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1565,
      "Name": "Proportion of 20 to 64 year-old people",
      "Technical layer name": "ad_20_64",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1566,
      "Name": "Proportion of people aged 65 years and more",
      "Technical layer name": "ad_65plus",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1567,
      "Name": "Proportion of people aged less than 3 years",
      "Technical layer name": "ad_moins3",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1568,
      "Name": "Proportion of people aged 3-5 years",
      "Technical layer name": "ad_3_5",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1569,
      "Name": "Proportion of people aged 6-10 years",
      "Technical layer name": "ad_6_10",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1570,
      "Name": "Proportion of people aged 11-17 years",
      "Technical layer name": "ad_11_17",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1571,
      "Name": "Proportion of people aged 65-74 years",
      "Technical layer name": "ad_65_74",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1572,
      "Name": "Proportion of people aged 75-89 years",
      "Technical layer name": "ad_75_89",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1573,
      "Name": "Proportion of people aged 90 years and more",
      "Technical layer name": "ad_90plus",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1574,
      "Name": "3 urban centres in Luxembourg",
      "Technical layer name": "ad_poles_urbains",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1576,
      "Name": "Population per canton",
      "Technical layer name": "ad_population_canton",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1577,
      "Name": "Population per municipality",
      "Technical layer name": "ad_population_commune",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1578,
      "Name": "Proportion of women per municipality on the 1st January 2018",
      "Technical layer name": "ad_prop_femmes_comm_2018",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1579,
      "Name": "Age structure per municipality on the 1st January 2018",
      "Technical layer name": "ad_structure_pop_comm",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1581,
      "Name": "Place of birth per municipality on the 1st January 2018",
      "Technical layer name": "ad_lieu_naissance_commune",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1582,
      "Name": "Dependency of the elderly people",
      "Technical layer name": "ad_rapport_dependance_personnes_agees",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1583,
      "Name": "Dependency of the youth per municipality",
      "Technical layer name": "ad_rapport_dependance_jeunes",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1584,
      "Name": "Total dependency ratio",
      "Technical layer name": "ad_rapport_dependance_total",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1585,
      "Name": "Unmarried people",
      "Technical layer name": "ad_celibataires",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1586,
      "Name": "Married people/people living in civil partnership",
      "Technical layer name": "ad_maries_pacses",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1587,
      "Name": "Divorced people",
      "Technical layer name": "ad_divorces_separes",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1588,
      "Name": "Widowed people",
      "Technical layer name": "ad_veufs_veuves",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1597,
      "Name": "Births and birth rate per municipality (average 2013-2017)",
      "Technical layer name": "ad_naissances_taux_natalite",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1598,
      "Name": "Proportion of births within mariage per municipality (average 2013-2017)",
      "Technical layer name": "ad_naissances_mariage",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1599,
      "Name": "Average age at the birth per municipality (average 2013-2017)",
      "Technical layer name": "ad_naissances_age_maternite",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1600,
      "Name": "Deaths and mortality rate per municipality (average 2013-2017)",
      "Technical layer name": "ad_deces_taux_mortalite",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1601,
      "Name": "Natural balance and natural balance rate per municipality (average 2013-2017)",
      "Technical layer name": "ad_solde_naturel_nombre_absolu",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1603,
      "Name": "Internal migratory balance and internal migratory balance rate per municipality (average 2013-2017)",
      "Technical layer name": "ad_migrations_solde_interne",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1604,
      "Name": "International migratory balance and international migratory balance rate per municipality (average 2013-2017)",
      "Technical layer name": "ad_migrations_solde_international",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1605,
      "Name": "Total migratory balance and total migratory balance rate per municipality (average 2013-2017)",
      "Technical layer name": "ad_migrations_solde_total",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1606,
      "Name": "Marriages and rate of marriage per municipality (average 2013-2017)",
      "Technical layer name": "ad_mariages_taux_nuptialite",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1607,
      "Name": "Women's average age at the marriage per municipality (average 2013-2017)",
      "Technical layer name": "ad_mariages_age_femme",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1608,
      "Name": "Men's average age at the marriage per municipality (average 2013-2017)",
      "Technical layer name": "ad_mariage_age_hommes",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1609,
      "Name": "Luxembourgish",
      "Technical layer name": "ad_langues_luxembourgeois",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1610,
      "Name": "French",
      "Technical layer name": "ad_langues_francais",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1611,
      "Name": "German",
      "Technical layer name": "ad_langues_allemand",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1612,
      "Name": "Portuguese",
      "Technical layer name": "ad_langues_portugais",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1613,
      "Name": "Italian",
      "Technical layer name": "ad_langues_italien",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1614,
      "Name": "English",
      "Technical layer name": "ad_langues_anglais",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1615,
      "Name": "Other language",
      "Technical layer name": "ad_langues_autre",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1621,
      "Name": "Emergency spots",
      "Technical layer name": "points_sauvetage_vdl",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1637,
      "Name": "FLIK parcels 2023",
      "Technical layer name": "asta_flik_parcels",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1642,
      "Name": "Road noise hotspots",
      "Technical layer name": "env_bruit_routes_hotspots_2019",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1644,
      "Name": "Private properties",
      "Technical layer name": "act_privately_owned_land",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1645,
      "Name": "State properties",
      "Technical layer name": "act_state_owned_land",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1646,
      "Name": "Municipality properties",
      "Technical layer name": "act_municipality_owned_land",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1647,
      "Name": "Public domain",
      "Technical layer name": "act_domainepublic_owned_land",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1648,
      "Name": "Publicly owned properties",
      "Technical layer name": "act_publicly_owned_land",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1650,
      "Name": "UNESCO Bike tour",
      "Technical layer name": "unseco_biketour",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1651,
      "Name": "City of Luxembourg - Boundary of the property",
      "Technical layer name": "unesco_city_boundary",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1652,
      "Name": "City of Luxembourg - Protected zone (old quarters)",
      "Technical layer name": "unesco_city_old_quarters",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1653,
      "Name": "City of Luxembourg - Protected zone (other quarters)",
      "Technical layer name": "unesco_city_other_quarters",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1654,
      "Name": "City of Luxembourg - Existing fortress",
      "Technical layer name": "unesco_city_fortress",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1655,
      "Name": "City of Luxembourg - Bufferzone",
      "Technical layer name": "unesco_city_bufferzone",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1658,
      "Name": "Zone for the prevention of propagation of African swine fever",
      "Technical layer name": "anf_zone_prevention_ppa",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1674,
      "Name": "Flat roofs",
      "Technical layer name": "Toitures plates",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1675,
      "Name": "Height of buildings",
      "Technical layer name": "Hauteur des bâtiments",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1676,
      "Name": "Sunlighting",
      "Technical layer name": "Ensoleillement",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1679,
      "Name": "Available Data",
      "Technical layer name": "Données disponibles",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1680,
      "Name": "Legal accessibility",
      "Technical layer name": "Accessibilité légale",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1681,
      "Name": "Distribution and consumption sites",
      "Technical layer name": "Sites de commercialisation et consommation",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1682,
      "Name": "Solar radiation 15.08",
      "Technical layer name": "Ensoleillement au 15.08",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1683,
      "Name": "Solar radiation 15.05",
      "Technical layer name": "Ensoleillement au 15.05",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1687,
      "Name": "Weighted map (Typology 1)",
      "Technical layer name": "Typologie 1 - Carte pondérée pour le 15.02",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1688,
      "Name": "Weighted map (Typology 2)",
      "Technical layer name": "Typologie 2 - Carte pondérée pour le 15.02",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1689,
      "Name": "Weighted map (Typology 3)",
      "Technical layer name": "Typologie 3 - Carte pondérée pour le 15.02",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1703,
      "Name": "Watercourses with significant flood risks 2019",
      "Technical layer name": "eau_Risikogewaesser_2019",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1712,
      "Name": "Base plan SMP",
      "Technical layer name": "at_psl_fond_de_plan",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1713,
      "Name": "Current bicycle path work",
      "Technical layer name": "chantiers_actuels_pc",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1714,
      "Name": "Future bicycle path work",
      "Technical layer name": "chantiers_futurs_pc",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1724,
      "Name": "2nd order network GNSS reference points",
      "Technical layer name": "points_reference_gps",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1727,
      "Name": "Topographical Map 1:50.000",
      "Technical layer name": "topo_50k_2019",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1728,
      "Name": "Topographical Map 1:50.000 B/W",
      "Technical layer name": "topo_50k_BW_2019",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1729,
      "Name": "Topographical Map 1:100.000 B/W",
      "Technical layer name": "topo_100k_BW_2019",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1730,
      "Name": "Topographical Map 1:100.000",
      "Technical layer name": "topo_100k_2019",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1739,
      "Name": "Existing apartments (April 1, 2019 - March 31, 2020)",
      "Technical layer name": "log_prix_app_existants",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1740,
      "Name": "Apartments under construction (VEFA) (April 1, 2019 - March 31, 2020)",
      "Technical layer name": "log_prix_app_en_construction",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1741,
      "Name": "Apartments (January 1, 2019 - December 31, 2019)",
      "Technical layer name": "log_loyers_app",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1742,
      "Name": "Houses (January 1, 2019 - December 31, 2019)",
      "Technical layer name": "log_loyers_maisons",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1743,
      "Name": "Median price (January 1, 2017 - Dezember 31, 2019)",
      "Technical layer name": "log_prix_median_terrain_15_17",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1744,
      "Name": "Available land area (2016)",
      "Technical layer name": "log_superficie_2016",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1745,
      "Name": "Available land area by type of owner (2016)",
      "Technical layer name": "log_superficie_selon_type_2016",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1746,
      "Name": "Land area used for residential production (2010-2016)",
      "Technical layer name": "log_superficie_consommee",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1747,
      "Name": "Land area in which rebuilding occurred (2010-2016)",
      "Technical layer name": "log_superficie_reconstruite",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1752,
      "Name": "Digital Elevation Model",
      "Technical layer name": "lidar_2019_mnt",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1753,
      "Name": "Digital Surface Model",
      "Technical layer name": "lidar_2019_mns",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1783,
      "Name": "Hunting lots",
      "Technical layer name": "anf_lots_chasse_2021",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1784,
      "Name": "Orthophoto 2019",
      "Technical layer name": "ortho_2019",
      "Is Background": false,
      "Format": "image/jpeg",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1785,
      "Name": "Orthophoto 2019 infrared",
      "Technical layer name": "ortho2019_IR",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1786,
      "Name": "General meetings of the hunting syndicates",
      "Technical layer name": "anf_chasse_assemblees",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1787,
      "Name": "LiDAR tiles",
      "Technical layer name": "lidar_tiles_2017",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1788,
      "Name": "LiDAR tiles",
      "Technical layer name": "lidar_tiles_2019",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1789,
      "Name": "Orthophoto 2019 (winter)",
      "Technical layer name": "ortho_2019_winter",
      "Is Background": false,
      "Format": "image/jpeg",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1798,
      "Name": "Infrastructures COVID-19",
      "Technical layer name": "sante_infrastructures_covid19",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1800,
      "Name": "Theaters and cultural institutions",
      "Technical layer name": "sip_theatres",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1801,
      "Name": "Landfill for non-hazardous waste",
      "Technical layer name": "aev_dechets_menager",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1802,
      "Name": "Waste warehouses",
      "Technical layer name": "aev_dechets_entrepots",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1806,
      "Name": "Solar radiation 15.02",
      "Technical layer name": "Ensoleillement au 15.02",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1810,
      "Name": "Structures d’hébergement pour personnes âgées et personnes handicapées",
      "Technical layer name": "sante_covid_altersheemer",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1813,
      "Name": "Solar potential",
      "Technical layer name": "myenergy_solarkataster_luxemburg_solar_potentials",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1818,
      "Name": "Potential for large installations",
      "Technical layer name": "myenergy_solarkataster_luxemburg_roofs_above_30_kWp",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1819,
      "Name": "Feed-In tariff",
      "Technical layer name": "myenergy_solarkataster_luxemburg_feed_in_potential",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1822,
      "Name": "Compensation areas",
      "Technical layer name": "anf_projets_compensation_approuves",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1826,
      "Name": "IED installations",
      "Technical layer name": "aev_facilities_ied",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1827,
      "Name": "Compensation districts",
      "Technical layer name": "anf_secteurs_ecologiques_compensation_ecopoint",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1829,
      "Name": "Campaign 2020 - Potential quiet areas",
      "Technical layer name": "aev_zones_calmes_camp2020_ZCP",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1831,
      "Name": "Height reference points (new sketches)",
      "Technical layer name": "ng_new",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1836,
      "Name": "Biogas",
      "Technical layer name": "ilr_energie_biogas",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1837,
      "Name": "Biomass",
      "Technical layer name": "ilr_energie_biomasse",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1838,
      "Name": "Cogeneration (Natural gas)",
      "Technical layer name": "ilr_energie_cogeneration",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1839,
      "Name": "Wind power",
      "Technical layer name": "ilr_energie_eolienne",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1840,
      "Name": "Hydro power",
      "Technical layer name": "ilr_energie_hydroelectrique",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1841,
      "Name": "Solar power",
      "Technical layer name": "ilr_energie_photovoltaique",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1848,
      "Name": "Climate pact 2019 - NO2",
      "Technical layer name": "aev_pacte_climat_2019",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1857,
      "Name": "“État de la nature” Route",
      "Technical layer name": "anf_itineraire_nature",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1858,
      "Name": "Closed large landfills",
      "Technical layer name": "aev_anciennes_decharges",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1878,
      "Name": "Transport and traffic",
      "Technical layer name": "npour_poi_transport",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1880,
      "Name": "Public administration",
      "Technical layer name": "npour_poi_admin",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1881,
      "Name": "Religious building",
      "Technical layer name": "npour_poi_batiments_reli",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1883,
      "Name": "Rescue service",
      "Technical layer name": "npour_poi_secours",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1884,
      "Name": "Other services",
      "Technical layer name": "npour_poi_autres",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1885,
      "Name": "Social life",
      "Technical layer name": "npour_poi_sociale",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1886,
      "Name": "Education",
      "Technical layer name": "npour_poi_enseignement",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1887,
      "Name": "Health",
      "Technical layer name": "npour_poi_sante",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1888,
      "Name": "Attraction",
      "Technical layer name": "npour_poi_attraction",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1889,
      "Name": "Accomodation",
      "Technical layer name": "npour_poi_logement",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1890,
      "Name": "Catering",
      "Technical layer name": "npour_poi_gastronomie",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1891,
      "Name": "Sports and leisure",
      "Technical layer name": "npour_poi_sport",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1892,
      "Name": "Tourism",
      "Technical layer name": "npour_poi_tourisme",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1893,
      "Name": "Commerce",
      "Technical layer name": "npour_poi_commerce",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1894,
      "Name": "Culture",
      "Technical layer name": "npour_poi_culture",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1895,
      "Name": "Foot Trails Nature Parc Our",
      "Technical layer name": "npour_wanderwege_eigene",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1915,
      "Name": "Steering committees Natura2000 and municipalities",
      "Technical layer name": "anf_communes_copil_2020",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1917,
      "Name": "Silent Cities - Phase 1 (20/04-10/05)",
      "Technical layer name": "aev_silent_cities_2020_phase1",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1918,
      "Name": "Silent Cities - Phase 2 (11/05-24/05)",
      "Technical layer name": "aev_silent_cities_2020_phase2",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1919,
      "Name": "Silent Cities - Phase 3 (25/05-17/06)",
      "Technical layer name": "aev_silent_cities_2020_phase3",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1927,
      "Name": "Flight height from 0 to 50m",
      "Technical layer name": "zones_UAS_0_50m",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1928,
      "Name": "Flight height from 50 to 120m",
      "Technical layer name": "zones_UAS_50_120m",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1930,
      "Name": "700MHz Base stations for public mobile communication networks ≥ 50 Watt",
      "Technical layer name": "mat_5G_antennes_plus_50_watt",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1933,
      "Name": "Waste from wastewater treatment plants",
      "Technical layer name": "aev_dechets_stations_epuration",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1950,
      "Name": "Land Cover 2015",
      "Technical layer name": "LISL_Landcover_2015_v2",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1951,
      "Name": "Land Cover 2018",
      "Technical layer name": "LISL_Landcover_2018",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1952,
      "Name": "Imperviousness degree of the Land Use surfaces 2018",
      "Technical layer name": "LISL_taux_impermeabilisation_2018",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1960,
      "Name": "",
      "Technical layer name": "stations_sps_Lux",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1962,
      "Name": "Rescue actions",
      "Technical layer name": "anf_amphibiens_sauvetage",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1968,
      "Name": "World Water Day 2021",
      "Technical layer name": "np_uewersauer_randonnee_eau",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1969,
      "Name": "Land Use 2007",
      "Technical layer name": "LISL_Landuse_2007",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 1970,
      "Name": "Land Use 2018",
      "Technical layer name": "LISL_Landuse_2018",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2004,
      "Name": "Pharmacies",
      "Technical layer name": "pharmacies",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2019,
      "Name": "Guttland.Trails",
      "Technical layer name": "tour_rando_guttlandtrails_new",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2020,
      "Name": "Minett Trail",
      "Technical layer name": "tour_rando_minetttrail_new",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2021,
      "Name": "Nature & geology",
      "Technical layer name": "tour_rando_natur_geologie_new",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2022,
      "Name": "Art & culture",
      "Technical layer name": "tour_rando_kunst_kultur_new",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2023,
      "Name": "History",
      "Technical layer name": "tour_rando_geschichte_new",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2024,
      "Name": "Accessible to all",
      "Technical layer name": "tour_rando_barrierefrei_new",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2025,
      "Name": "Children & family",
      "Technical layer name": "tour_rando_kinder_familie_new",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2026,
      "Name": "Closings & detours on mountain bike trails",
      "Technical layer name": "tour_restrictions_MTB_new",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2027,
      "Name": "UNESCO World Heritage Sites",
      "Technical layer name": "tour_unesco_new",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2028,
      "Name": "Wine & delights",
      "Technical layer name": "tour_rando_wein_genuss_new",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2029,
      "Name": "Fitness & well being",
      "Technical layer name": "tour_rando_fitness_new",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2033,
      "Name": "Restaurants",
      "Technical layer name": "tour_restaurants_new",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2034,
      "Name": "Bed & Breakfast",
      "Technical layer name": "tour_bb_new",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2035,
      "Name": "Rentals",
      "Technical layer name": "tour_fewo_new",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2036,
      "Name": "Youth Hostels",
      "Technical layer name": "tour_jugendherberge_new",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2037,
      "Name": "Campsites",
      "Technical layer name": "tour_camping_new",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2038,
      "Name": "Hotels",
      "Technical layer name": "tour_hotels_new",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2039,
      "Name": "Bike repair & washing station",
      "Technical layer name": "tour_fahrradstationen_reparatur_wasch_new",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2040,
      "Name": "E-bike charging",
      "Technical layer name": "tour_ebike_ladestationen",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2042,
      "Name": "Tourist Info",
      "Technical layer name": "tour_tourist_info_new",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2043,
      "Name": "Museums",
      "Technical layer name": "tour_museen_new",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2044,
      "Name": "Castles",
      "Technical layer name": "tour_burgen_schloesser_new",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2045,
      "Name": "Flashflood hazard map",
      "Technical layer name": "age_dangers_fortes",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2046,
      "Name": "Flashflood risk map",
      "Technical layer name": "age_risques_fortes",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2047,
      "Name": "Hospitals",
      "Technical layer name": "hopitaux",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2048,
      "Name": "Local hiking trails",
      "Technical layer name": "tour_rando_lokale_wanderwege_new",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2053,
      "Name": "3.6GHz Base stations for public mobile communication networks ≥ 50 Watt",
      "Technical layer name": "mat_5G-3.6GHZ_antennes_plus_50_watt",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2054,
      "Name": "Land Use 2018",
      "Technical layer name": "LISL_Landuse_2015_v3",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2056,
      "Name": "Orthophoto 2020",
      "Technical layer name": "ortho_2020",
      "Is Background": false,
      "Format": "image/jpeg",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2058,
      "Name": "Grand Tour du Luxembourg",
      "Technical layer name": "grand_tour_luxembourg",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2088,
      "Name": "Climate pact 2020 - NO2",
      "Technical layer name": "aev_pacte_climat_2020",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2089,
      "Name": "Orthophoto 2020 infrared",
      "Technical layer name": "ortho2020_IR",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2090,
      "Name": "Surface water bodies 2021 (catchment areas)",
      "Technical layer name": "eau_Oberflaechenwasserkoerper_2021",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2091,
      "Name": "Surface water bodies (watercourses)",
      "Technical layer name": "eau_Erheblich veränderte Wasserkörper 2021",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2092,
      "Name": "HY DU.01 Restoration of the ecological continuity – barriers and dams (2021)",
      "Technical layer name": "eau_Weiderherstellung_Durchgaengigkeit_Querbauwerk_2021",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2093,
      "Name": "HY DU.02 Restoration of the ecological continuity – culverts (2021)",
      "Technical layer name": "eau_Weiderherstellung_Durchgaengigkeit_Verrohrung_2021",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2094,
      "Name": "HY MO.01 Incorporation of structural elements in the river bed (2021)",
      "Technical layer name": "eau_Strukturelemente_Sohle_2021",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2095,
      "Name": "HY MO.02 Removal/replacement of riverbed stabilizations (2021)",
      "Technical layer name": "eau_Umgestalten_Sohlverbau_2021",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2096,
      "Name": "HY MO.03 Incorporation of flow deflectors to promote river dynamics (2021)",
      "Technical layer name": "eau_Stroemungslenkern_2021",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2097,
      "Name": "HY MO.04 Removal/replacement of riverbank stabilizations (2021)",
      "Technical layer name": "eau_Umgestalten_Uferverbau_2021",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2098,
      "Name": "HY MO.05 Re-meandering and restoration of riverbed (2021)",
      "Technical layer name": "eau_naturnah_Gewaesserbett_2021",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2099,
      "Name": "HY MO.06 Establishment of riparian buffer strips (2021)",
      "Technical layer name": "eau_Gewaesserrandstreifen_2021",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2100,
      "Name": "HY MO.07 Establishment of river corridor (2021)",
      "Technical layer name": "eau_Gewaesserentwicklungskorridor_2021",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2101,
      "Name": "HY MO.08 Restoration and protection of natural floodplains and hydraulic annexes (2021)",
      "Technical layer name": "eau_natuerlich_Ueberflutungsraeume_2021",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2102,
      "Name": "HY MO.09 Enable autonomous dynamic development of rivers (2021)",
      "Technical layer name": "eau_eigendynamische_Entwicklung_2021",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2103,
      "Name": "HY WA.01 Restoration and securing of near-natural flow conditions (2021)",
      "Technical layer name": "eau_naturnahe_Abflussverhaeltnisse_2021",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2104,
      "Name": "HY WA.02 Restoration and securing of near-natural water balance (2021)",
      "Technical layer name": "eau_naturnaher_Wasserhaushalt_2021",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2105,
      "Name": "HY WA.03 Flow regulation (hydropeaking, water intakes, water discharges) (2021)",
      "Technical layer name": "eau_Abflussregulierung_2021",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2106,
      "Name": "Detailed programme of measures SWW 2021",
      "Technical layer name": "eau_Masssnahmenprogramm_SWW_2021",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2117,
      "Name": "HQ10 [high probability]",
      "Technical layer name": "eau_Hochwassergefahrenkarten_HQ10_2021",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2118,
      "Name": "HQ100 [medium probability]",
      "Technical layer name": "eau_Hochwassergefahrenkarten_HQ100_2021",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2119,
      "Name": "HQextreme [low probability]",
      "Technical layer name": "eau_Hochwassergefahrenkarten_HQext_2021",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2120,
      "Name": "HQ10 [high probability]",
      "Technical layer name": "eau_Hochwasserrisikokarten_HQ10_2021",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2121,
      "Name": "HQ100 [medium probability]",
      "Technical layer name": "eau_Hochwasserrisikokarten_HQ100_2021",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2122,
      "Name": "HQextreme [low probability]",
      "Technical layer name": "eau_Hochwasserrisikokarten_HQext_2021",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2125,
      "Name": "Multiexposure 2016 (Lden)",
      "Technical layer name": "aev_multiexposition_Lden",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2126,
      "Name": "Multiexposure 2016 (Lngt)",
      "Technical layer name": "aev_multiexposition_Lnight",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2127,
      "Name": "Fading Thunders of Belval",
      "Technical layer name": "aev_soundwalks_fading_thunders",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2128,
      "Name": "City Stories for the Ear",
      "Technical layer name": "aev_soundwalks_city_stories",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2129,
      "Name": "Memories of the blue noise",
      "Technical layer name": "aev_soundwalks_blue_noise",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2133,
      "Name": "Current air temperature [°C]",
      "Technical layer name": "meteo_live_temp",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2135,
      "Name": "Current air humidity [%]",
      "Technical layer name": "meteo_live_humidity",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2136,
      "Name": "Current wind speed [m/s]",
      "Technical layer name": "meteo_live_windspeed",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2137,
      "Name": "Current global radiation [Wh/m2]",
      "Technical layer name": "meteo_live_irradiation",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2138,
      "Name": "Current sunshine duration [hours]",
      "Technical layer name": "meteo_live_sunshine",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2139,
      "Name": "Sum of precipitation since midnight [mm]",
      "Technical layer name": "meteo_live_precipitation_sum",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2141,
      "Name": "Circuit du Lac",
      "Technical layer name": "tour_circuit_du_lac",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2142,
      "Name": "Sentier Adrien Ries",
      "Technical layer name": "tour_sentier_adrien_ries",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2144,
      "Name": "Public Power",
      "Technical layer name": "aev_GRETA_A_PublicPower_NOX",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2145,
      "Name": "Industry",
      "Technical layer name": "aev_GRETA_B_Industry_PCB",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2146,
      "Name": "OtherStationaryCombustion",
      "Technical layer name": "aev_GRETA_C_OtherStationaryComb_CO",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2147,
      "Name": "Fugitive",
      "Technical layer name": "aev_GRETA_D_Fugitive_NMVOC",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2148,
      "Name": "Solvents",
      "Technical layer name": "aev_GRETA_E_Solvents_NMVOC",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2149,
      "Name": "RoadTransport",
      "Technical layer name": "aev_GRETA_F_RoadTransport_NOX",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2150,
      "Name": "Shipping",
      "Technical layer name": "aev_GRETA_G_Shipping_CO",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2151,
      "Name": "Aviation",
      "Technical layer name": "aev_GRETA_H_Aviation_NOX",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2152,
      "Name": "Offroad",
      "Technical layer name": "aev_GRETA_I_Offroad_CO",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2153,
      "Name": "Waste",
      "Technical layer name": "aev_GRETA_J_Waste_PCDD",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2154,
      "Name": "AgriLiveStock",
      "Technical layer name": "aev_GRETA_K_AgrilLivestock_NH3",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2155,
      "Name": "AgriOther",
      "Technical layer name": "aev_GRETA_L_AgriOther_NH3",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2167,
      "Name": "Harmonised geological map",
      "Technical layer name": "geo_carte_geol_harmonisee",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2168,
      "Name": "Harmonised geological map (uncovered)",
      "Technical layer name": "geo_carte_geol_harmonisee_decouverte",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2169,
      "Name": "Simplified geological map",
      "Technical layer name": "geo_carte_geol_simplifiee",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2170,
      "Name": "Simplified geological map (uncovered)",
      "Technical layer name": "geo_carte_geol_simplifiee_decouverte",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2173,
      "Name": "Geological sections",
      "Technical layer name": "geo_coupes_geologiques",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2175,
      "Name": "Geological unit thicknesses",
      "Technical layer name": "geo_epaisseurs_unites",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2176,
      "Name": "Reference drillings",
      "Technical layer name": "geo_forages_ref",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2185,
      "Name": "Geological detailed maps 1:25k, 1971-2021",
      "Technical layer name": "geo_carte_detail_25k",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2186,
      "Name": "Geological overview map 1:100k, 1992",
      "Technical layer name": "geo_carte_generale_100k",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2187,
      "Name": "Digital Elevation Model for the Greater Region with alternative coloring",
      "Technical layer name": "act_mnt2017_GR",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2188,
      "Name": "Digital Elevation Model with alternative coloring",
      "Technical layer name": "act_mnt_2019_coloration_alternative_Lux",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2191,
      "Name": "Geomorphological map 1:100k, 1984",
      "Technical layer name": "geo_geomorphologie_carte100K",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2192,
      "Name": "Spectrometric map, U Count",
      "Technical layer name": "geo_geophysique_comptage_uranium",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2193,
      "Name": "Spectrometric map, Th Count",
      "Technical layer name": "geo_geophysique_comptage_thorium",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2194,
      "Name": "Spectrometric map, K Count",
      "Technical layer name": "geo_geophysique_comptage_potassium",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2195,
      "Name": "Spectrometric map, U-Th-K Synthesis",
      "Technical layer name": "geo_geophysique_synthese_uthk",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2196,
      "Name": "Aeromagnetic map, Total VLF field",
      "Technical layer name": "geo_geophysique_champ_vlf",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2197,
      "Name": "Aeromagnetic map, Total residual field",
      "Technical layer name": "geo_geophysique_champ_total",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2198,
      "Name": "Aeromagnetic map, Total residual field, reduced to the pole",
      "Technical layer name": "geo_geophysique_champ_total_reduit_pole",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2202,
      "Name": "Geological map Wies & Siegen 1:40k, 1877",
      "Technical layer name": "geo_geologie_wies_siegen",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2203,
      "Name": "Geological map van Werveke 1:80k, 1896",
      "Technical layer name": "geo_geologie_van_werweke",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2204,
      "Name": "Geological map Lucius 1:80k, 1911",
      "Technical layer name": "geo_geologie_lucius",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2205,
      "Name": "Geological map Robert 1:100k, 1915",
      "Technical layer name": "geo_geologie_robert",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2206,
      "Name": "Geological map Lucius 1:25k/50k, 1947-49",
      "Technical layer name": "geo_geologie_detail_anc_edition",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2213,
      "Name": "UNESCO Biosphere Minett",
      "Technical layer name": "at_unesco_minett",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2214,
      "Name": "Construction period of the buildings",
      "Technical layer name": "at_batiments_periode_construction",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2215,
      "Name": "Imperviousness degree (Grid 1km²)",
      "Technical layer name": "at_impermeabilisation_grid_2018_1km",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2216,
      "Name": "Imperviousness degree (Grid 100m)",
      "Technical layer name": "at_impermeabilisation_grid_2018_100m",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2265,
      "Name": "Hydrogeological drillings",
      "Technical layer name": "eau_new_Bohrungen_grand_public",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2272,
      "Name": "Orthophoto 2021",
      "Technical layer name": "ortho_2021",
      "Is Background": false,
      "Format": "image/jpeg",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2275,
      "Name": "High power transmitter radio services",
      "Technical layer name": "smc_radio_haute_puissance",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2277,
      "Name": "Local radio services",
      "Technical layer name": "smc_radio_locale",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2278,
      "Name": "Network radio services",
      "Technical layer name": "smc_radio_reseau_emission",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2281,
      "Name": "Imperviousness degree at the municipality level 2018",
      "Technical layer name": "at_impermeabilisation_communes_2018",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2282,
      "Name": "Soil sealing per user (population + employment)",
      "Technical layer name": "at_impermeabilisation_communes_utilisateur_2018",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2283,
      "Name": "Orthophoto 2021 infrared",
      "Technical layer name": "ortho2021_IR",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2288,
      "Name": "Restrictions for feasibility of very shallow geothermal installations (< 15 m)",
      "Technical layer name": "eau_new_Einschraenkung_Waermepumpe_nouvelle_couche",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2315,
      "Name": "Businesses by economic sector",
      "Technical layer name": "cadastre_commerce_wirtschaftszweig",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2330,
      "Name": "3D Model 2020",
      "Technical layer name": "2020 mesh",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2346,
      "Name": "3D Buildings",
      "Technical layer name": "ACT2022_BD_L_BATI3D_LOD2",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2348,
      "Name": "3D Buildings (Luxembourg City)",
      "Technical layer name": "VDL2022_LOD2_IMPORT",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2350,
      "Name": "Modeled 3D Bridges",
      "Technical layer name": "VDL2022_BRIDGES_IMPORT",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2351,
      "Name": "VHCN coverage",
      "Technical layer name": "ilr_vhcn",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2352,
      "Name": "Fiber coverage",
      "Technical layer name": "ilr_fibre_optique",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2353,
      "Name": "DOCSIS coverages",
      "Technical layer name": "ilr_docsis",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2363,
      "Name": "5G - achievable speed",
      "Technical layer name": "ilr_technologie_5G_vitesse_max",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2364,
      "Name": "Sufficient",
      "Technical layer name": "ilr_technologie_5G_proximus_satisfaisant",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2365,
      "Name": "Very good",
      "Technical layer name": "ilr_technologie_5G_proximus_tres_bien",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2366,
      "Name": "Excellent",
      "Technical layer name": "ilr_technologie_5G_proximus_excellent",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2369,
      "Name": "Sufficient",
      "Technical layer name": "ilr_technologie_5G_post_satisfaisant",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2370,
      "Name": "Very good",
      "Technical layer name": "ilr_technologie_5G_post_tres_bien",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2371,
      "Name": "Excellent",
      "Technical layer name": "ilr_technologie_5G_post_excellent",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2372,
      "Name": "Excellent",
      "Technical layer name": "ilr_technologie_5G_orange_excellent",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2373,
      "Name": "Sufficient",
      "Technical layer name": "ilr_technologie_5G_orange_satisfaisant",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2374,
      "Name": "4G - achievable speed",
      "Technical layer name": "ilr_technologie_4G_vitesse_max",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2375,
      "Name": "Sufficient",
      "Technical layer name": "ilr_technologie_4G_proximus_satisfaisant",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2376,
      "Name": "Very good",
      "Technical layer name": "ilr_technologie_4G_proximus_tres_bien",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2377,
      "Name": "Good",
      "Technical layer name": "ilr_technologie_4G_proximus_bien",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2378,
      "Name": "Sufficient",
      "Technical layer name": "ilr_technologie_4G_post_satisfaisant",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2379,
      "Name": "Very good",
      "Technical layer name": "ilr_technologie_4G_post_tres_bien",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2380,
      "Name": "Good",
      "Technical layer name": "ilr_technologie_4G_post_bien",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2381,
      "Name": "Good",
      "Technical layer name": "ilr_technologie_4G_orange_bien",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2382,
      "Name": "Very good",
      "Technical layer name": "ilr_technologie_4G_orange_tres_bien",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2383,
      "Name": "Sufficient",
      "Technical layer name": "ilr_technologie_4G_orange_satisfaisant",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2384,
      "Name": "3D Trees",
      "Technical layer name": "ACT2019_LiDAR_Vegetation",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2386,
      "Name": "3G - Proximus Luxembourg S.A.",
      "Technical layer name": "ilr_technologie_3G_proximus",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2387,
      "Name": "3G - Orange Communications Luxembourg S.A.",
      "Technical layer name": "ilr_technologie_3G_orange",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2388,
      "Name": "2G - Orange Communications Luxembourg S.A.",
      "Technical layer name": "ilr_technologie_2G_orange",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2389,
      "Name": "2G - Proximus Luxembourg S.A.",
      "Technical layer name": "ilr_technologie_2G_proximus",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2390,
      "Name": "2G - Post Luxembourg",
      "Technical layer name": "ilr_technologie_2G_post",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2391,
      "Name": "3G - achievable speed",
      "Technical layer name": "ilr_technologie_3G_vitesse_max",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2392,
      "Name": "2G - achievable speed",
      "Technical layer name": "ilr_technologie_2G_vitesse_max",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2396,
      "Name": "Restrictions for feasibility of shallow geothermal drillings",
      "Technical layer name": "eau_new_Einschraenkung_Waermepumpe_(public)",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2397,
      "Name": "Automatically extracted 3D Bridges",
      "Technical layer name": "ACT2019_LiDAR_Bridges",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2400,
      "Name": "Climate pact 2021 - NO2",
      "Technical layer name": "aev_pacte_climat_2021",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2401,
      "Name": "Overview 3D bridges",
      "Technical layer name": "act_ponts",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2407,
      "Name": "Soil erosion risk on cropland 2023",
      "Technical layer name": "asta_erosion_2023",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2409,
      "Name": "Tracks",
      "Technical layer name": "TDL2022_path_all_stages",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2412,
      "Name": "Track decoration (Stage 1)",
      "Technical layer name": "TDL2022_barriers_stage1",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2413,
      "Name": "Approx. track kilometer",
      "Technical layer name": "TDL2022_points_km_all_stages",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2419,
      "Name": "Track decoration (Stage 5)",
      "Technical layer name": "TDL2022_barriers_stage5",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2420,
      "Name": "Track decoration (Stage 2)",
      "Technical layer name": "TDL2022_barriers_stage2",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2421,
      "Name": "Track decoration (Stage 3)",
      "Technical layer name": "TDL2022_barriers_stage3",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2422,
      "Name": "Track decoration (Stage 4)",
      "Technical layer name": "TDL2022_barriers_stage4",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2423,
      "Name": "Approx. track kilometer (Stage 1)",
      "Technical layer name": "TDL2022_points_km_stage1",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2424,
      "Name": "Approx. track kilometer (Stage 2)",
      "Technical layer name": "TDL2022_points_km_stage2",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2425,
      "Name": "Approx. track kilometer (Stage 3)",
      "Technical layer name": "TDL2022_points_km_stage3",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2426,
      "Name": "Approx. track kilometer (Stage 4)",
      "Technical layer name": "TDL2022_points_km_stage4",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2427,
      "Name": "Approx. track kilometer (Stage 5)",
      "Technical layer name": "TDL2022_points_km_stage5",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2428,
      "Name": "Track (Stage 1)",
      "Technical layer name": "TDL2022_path_stage1",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2429,
      "Name": "Track (Stage 2)",
      "Technical layer name": "TDL2022_path_stage2",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2430,
      "Name": "Track (Stage 3)",
      "Technical layer name": "TDL2022_path_stage3",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2431,
      "Name": "Track (Stage 4)",
      "Technical layer name": "TDL2022_path_stage4",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2432,
      "Name": "Track (Stage 5)",
      "Technical layer name": "TDL2022_path_stage5",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2433,
      "Name": "Cyclists (Stage 4)",
      "Technical layer name": "TDL2022_cyclistes_stage4",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2434,
      "Name": "Cyclists (Stage 1)",
      "Technical layer name": "TDL2022_cyclistes_stage1",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2435,
      "Name": "Cyclists (Stage 2)",
      "Technical layer name": "TDL2022_cyclistes_stage2",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2436,
      "Name": "Cyclists (Stage 3)",
      "Technical layer name": "TDL2022_cyclistes_stage3",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2437,
      "Name": "Cyclists (Stage 5)",
      "Technical layer name": "TDL2022_cyclistes_stage5",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2439,
      "Name": "Businesses by main industry",
      "Technical layer name": "cadastre_commerce_branchen",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2444,
      "Name": "Businesses by operation form",
      "Technical layer name": "cadastre_commerce_betriebsform",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2450,
      "Name": "Year 2013",
      "Technical layer name": "aev_ets_quota_2013",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2451,
      "Name": "Year 2014",
      "Technical layer name": "aev_ets_quota_2014",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2452,
      "Name": "Year 2015",
      "Technical layer name": "aev_ets_quota_2015",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2453,
      "Name": "Year 2016",
      "Technical layer name": "aev_ets_quota_2016",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2454,
      "Name": "Year 2017",
      "Technical layer name": "aev_ets_quota_2017",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2455,
      "Name": "Year 2018",
      "Technical layer name": "aev_ets_quota_2018",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2456,
      "Name": "Year 2019",
      "Technical layer name": "aev_ets_quota_2019",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2457,
      "Name": "Year 2020",
      "Technical layer name": "aev_ets_quota_2020",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2458,
      "Name": "Year 2021",
      "Technical layer name": "aev_ets_quota_2021",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2472,
      "Name": "Forest biotope cadastre",
      "Technical layer name": "anf_biotopes_forestiers",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2482,
      "Name": "Wildlife corridors",
      "Technical layer name": "anf_corridors_faune_sauvage",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2514,
      "Name": "Population by 1 km² grid",
      "Technical layer name": "statec_population_grid",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2537,
      "Name": "Orthophoto 2022",
      "Technical layer name": "ortho_2022",
      "Is Background": false,
      "Format": "image/jpeg",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2572,
      "Name": "Very good",
      "Technical layer name": "ilr_technologie_5G_orange_tresbien",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2573,
      "Name": "Certificat d'Excellence \"Drëpsi",
      "Technical layer name": "eau_certificat_drepsi",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2575,
      "Name": "Buffer strips along watercourses",
      "Technical layer name": "asta_uferrandstreifen",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2592,
      "Name": "Orthophoto with time slider",
      "Technical layer name": "act_ortho_time",
      "Is Background": false,
      "Format": "image/jpeg",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2594,
      "Name": "Climate pact 2022 - NO2",
      "Technical layer name": "aev_pacte_climat_2022",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2595,
      "Name": "Orthophoto 2022 infrared",
      "Technical layer name": "ortho2022_IR",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2596,
      "Name": "Population per municipality",
      "Technical layer name": "statec_population_commune",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2597,
      "Name": "Population density per municipality",
      "Technical layer name": "statec_densite_population_commune",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2601,
      "Name": "UNESCO Biosphere Minett Overlay",
      "Technical layer name": "anf_overlay_expo_biosphere",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2603,
      "Name": "Communal orchards TUTTI FRUTTI",
      "Technical layer name": "at_fruitiers",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2604,
      "Name": "Parking for orchards",
      "Technical layer name": "at_fruitiers_parking",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2606,
      "Name": "Day 1",
      "Technical layer name": "armee_marche_j1",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2607,
      "Name": "Day 2",
      "Technical layer name": "armee_marche_j2",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2608,
      "Name": "Proportion of Portuguese per municipality",
      "Technical layer name": "statec_census_portugais",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2609,
      "Name": "Proportion of Frenchmen per municipality",
      "Technical layer name": "statec_census_francais",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2610,
      "Name": "Proportion of Italians per municipality",
      "Technical layer name": "statec_census_italiens",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2611,
      "Name": "Proportion of Belgiums per municipality",
      "Technical layer name": "statec_census_belges",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2612,
      "Name": "Proportion of Germans per municipality",
      "Technical layer name": "statec_census_allemands",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2613,
      "Name": "Proportion of foreign persons per municipality",
      "Technical layer name": "statec_census_etrangers",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2614,
      "Name": "",
      "Technical layer name": "act_topo_time",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2615,
      "Name": "Ferraris Map 1:20k 1778",
      "Technical layer name": "FERRARIS",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2616,
      "Name": "Topographical Map 1:150k 1950",
      "Technical layer name": "TOPO_CARTEHISTO_1950",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": false,
      "Type": "WMTS",
      "Metadata ID": "MetaData",
      "Checked": false,
      "OpacityValue": 0
    },
    {
      "Id": 2624,
      "Name": "",
      "Technical layer name": "mae_ambassades",
      "Is Background": false,
      "Format": "image/png",
      "Queryable": true,
      "Type": "WMS",
      "Metadata ID": "N/A",
      "Checked": false,
      "OpacityValue": 0
    }
  ]
