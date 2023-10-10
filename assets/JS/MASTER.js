// initializing our map variable to reference in our initMap function
let map;
let directionsRenderer = new google.maps.DirectionsRenderer();
let directionsService = new google.maps.DirectionsService();
let infoWindow;

// function for building out map with film location data onto page *name from googleAPI url*
function initMap() {
  var mapOptions = {
    zoom: 9,
    // map renders centered on Salt Lake City, Utah
    center: { lat: 40.76078, lng: -111.89105 },
    // customized map display colors
    styles: [
      // ... Your map styles ...
    ],
  };

  // places map on page in the location designated "map" in our HTML based on our mapOptions
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

function addMovieLocationMarker(location, title) {
  // Create a marker for the movie location
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    title: title,
  });

  // Add an info window with movie information
  var infoWindow = new google.maps.InfoWindow({
    content: '<strong>' + title + '</strong><br>' + location,
  });

  // Show the info window when the marker is clicked
  marker.addListener('click', function() {
    infoWindow.open(map, marker);
  });
}

function geocodeAddress(address, callback) {
  // Create a geocoder instance
  var geocoder = new google.maps.Geocoder();

  // Geocode the address
  geocoder.geocode({ address: address }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      // If geocoding is successful, call the callback function with the location
      callback(results[0].geometry.location);
    } else {
      // Handle geocoding error
      console.error('Geocoding failed:', status);
      callback(null); // Pass null as the result in case of an error
    }
  });
}

function getMovieLocation() {
  // ... Your existing code for fetching movie location data ...

  // Geocode and add a marker for the movie location
  geocodeAddress(movieLocation, function (location) {
    if (location) {
      addMovieLocationMarker(location, movieTitle);
    } else {
      // Handle geocoding error
      console.error('Geocoding failed for movie location');
    }
  });

  // ... The rest of your existing code ...
}

// Initialize the map
initMap();

// ... Your main JavaScript code here ...