// I only copy the useful data from last week assignment
 var parseData = function(data) {
     return JSON.parse(data);
 };

 var makeMarkers = function(a) {
    var m = _.map(a, function(aa){
      return L.marker([aa.Y, aa.X]);
    });
  return m;
 };

var plotMarkers = function(markers) {
       _.each(markers,function(m){
         m.addTo(map);
       });
 };

/* =====================
 Leaflet setup
===================== */

var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 14
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

/*
#### Task 3

Make sure it works.
The user should be able to type in a URL of one of our datasets,
as well as the keys for latitude and longitude, click the button, and have
their specified dataset mapped.

To do this, you will need to use jQuery to select the button and create a click
event on it. When the button is clicked, it should run a function that selects
the three input fields, checks their values, and assigns those values to
variables. Those variables should be used in your application to replace
previously hardcoded data.
*/

$(document).ready(function() {
  $( "button" ).click(function() {
    var url =  $('#url-input').val();
    var long = $('#lat-input').val();
    var lat =  $('#long-input').val();

    var phillySolarInstallationDataUrl = "https://raw.githubusercontent.com/CPLN692-MUSA611/datasets/master/json/philadelphia-solar-installations.json";
    var solardata = $.ajax(phillySolarInstallationDataUrl);
    solardata.done(function(data) {
      var parsed = parseData(data);
      if (url == "solardata" || long == "X" || lat == "Y"){
        var markers = makeMarkers(parsed);
        plotMarkers(markers);
    }
    });
  });
});
