var map;

// Function to initialize a map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 45.504, lng: -73.612},
    zoom: 15
  });
}

// Defining a Station prototype
function Station(name, id, isBlocked, isSuspended, isOutOfService, availableBikes, availableTerminals, unavailableBikes, unavailableTerminals, latitude, longitude) {
  this.name = name;
  this.id = id;
  this.isBlocked = isBlocked;
  this.isSuspended = isSuspended;
  this.isOutOfService = isOutOfService;
  this.availableBikes = availableBikes;
  this.availableTerminals = availableTerminals;
  this.unavailableBikes = unavailableBikes;
  this.unavailableTerminals = unavailableTerminals;
  this.latitude = latitude;
  this.longitude = longitude;
}

// Station default values
Station.prototype.name = "";
Station.prototype.id = "";
Station.prototype.isBlocked = "";
Station.prototype.isSuspended = "";
Station.prototype.isOutOfService = "";
Station.prototype.availableBikes = "";
Station.prototype.availableTerminals = "";
Station.prototype.unavailableBikes = "";
Station.prototype.unavailableTerminals = "";
Station.prototype.latitude = "";
Station.prototype.longitude = "";

var stationNames = []; //Station names list
var stationsList = []; //Stations list
var markerList= []; //Markers List

$(document).ready(
  function () {
  //When a station is selected, we update the status table
  $('#stations-input').on('autocompleteselect', function (e, ui) {
    $('#selected-station').html(ui.item.value); //Display the name of the station
    for(i = 0; i < stationsList.length; i++){
      if(ui.item.value == stationsList[i].name)
      {
        //Display ID
        $('#idValue').html(stationsList[i].id);
        //Display the number of bike available
        $('#availableBikesValue').html(stationsList[i].availableBikes);
        //Set the right background color
        if(stationsList[i].availableBikes == 0){
          document.getElementById("availableBikesValue").style.backgroundColor = "Red";
        }
        else{
          document.getElementById("availableBikesValue").style.backgroundColor = "#00b066"; //green
        }
        //Display if a station is blocked and the right background color
        if(stationsList[i].isBlocked == 1){
          $('#isBlockedValue').html("Oui");
          document.getElementById("isBlockedValue").style.backgroundColor = "Red";
        }
        else{
          $('#isBlockedValue').html("Non");
          document.getElementById("isBlockedValue").style.backgroundColor = "#00b066"; //green
        }
        //Display the number of terminal available
        $('#availableTerminalsValue').html(stationsList[i].availableTerminals);
        //Set the right background color
        if(stationsList[i].availableTerminals == 0){
          document.getElementById("availableTerminalsValue").style.backgroundColor = "Red";
        }
        else{
          document.getElementById("availableTerminalsValue").style.backgroundColor = "#00b066"; //green
        }
        //Display if the station is suspended and set the right background color
        if (stationsList[i].isSuspended == 1){
          $('#isSuspendedValue').html("Oui");
          document.getElementById("isSuspendedValue").style.backgroundColor = "Red";
        }
        else {
          $('#isSuspendedValue').html("Non");
          document.getElementById("isSuspendedValue").style.backgroundColor = "00b066"; //green
        }
        //Display the number of bike unavailable
        $('#unavailableBikesValue').html(stationsList[i].unavailableBikes);
        //Display if the station is out of service and set the right background color
        if(stationsList[i].isOutOfService == 1){
          $('#isOutOfServiceValue').html("Oui");
          document.getElementById("isOutOfServiceValue").style.backgroundColor = "Red";
        }
        else {
          $('#isOutOfServiceValue').html("Non");
          document.getElementById("isOutOfServiceValue").style.backgroundColor = "00b066"; //green
        }
        //Display the number of terminal unavailable
        $('#unavailableTerminalsValue').html(stationsList[i].unavailableTerminals);
        
        //Remove old markers
        for (i = 0; i < markerList.length; i++){
          markerList[i].setMap(null);
        }
        makerList = []; // clear markers list
        markerLocation = new google.maps.LatLng(stationsList[i].latitude, stationsList[i].longitude); //station location
        //create new marker
        marker = new google.maps.Marker({
          position: markerLocation,
          map: map
        });
        //reposition map
        map.setCenter(markerLocation);
        //add the marker to the marker's list
        markerList.push(marker);
      }
    }
    
  });

  $(function() {
    //access the json file for stations data
    $.ajax({
      url: "https://secure.bixi.com/data/stations.json",
      success: function( data ) {
        for (i = 0; i < data.stations.length; i++){
          //add station name to the list for autocompletion
          stationNames.push(data.stations[i].s);
          //Create a new station
          var tempStation = new Station(data.stations[i].s, data.stations[i].n, data.stations[i].b, data.stations[i].su, data.stations[i].m,
            data.stations[i].ba, data.stations[i].da, data.stations[i].bx, data.stations[i].dx, data.stations[i].la, data.stations[i].lo);
          //Adding the station to the station list
          stationsList.push(tempStation);
        }
        
        //fill dataTable with the JSON file contents
        $('#table-stations-list').dataTable({
          //To display the list in french
          language: {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"
          },
          data: data.stations,
          aoColumns: [
              { data : "n" },   //id
              { data : "s" },   //name
              { data : "ba" },  //available bikes
              { data : "da" },  //available terminals
              { mData : "b", mRender: function(data, type, full) { //blocked
                if(data === false) {
                  return "Non";
                }
                else {
                  return "Oui";
                }
              }},
              { mData : "su", mRender: function(data, type, full) { //suspended
                if(data === false) {
                  return "Non";
                }
                else {
                  return "Oui";
                }
              }},  
          ]
        });
      }
    });
    //Autocomplete function
    $("#stations-input").autocomplete({
      source: stationNames
    });
  });
});
