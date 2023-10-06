//initializing our map variable to refrence in our initMap function
let map;
let directionsService = new google.maps.DirectionsService();
let directionsRenderer;
// Create a single array to hold all infoWindows
let infoWindows = [];

//function for building out map with film location data onto page *name from googleAPI url*
function initMap() {
  var mapOptions = {
    zoom: 9,
    //map renders centered on Salt Lake City, Utah
    center: { lat: 40.76078, lng: -111.89105 },
    //customized map display colors
    styles: [
      {
        elementType: "geometry",
        stylers: [
          {
            color: "#ebe3cd",
          },
        ],
      },
      {
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#523735",
          },
        ],
      },
      {
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#f5f1e6",
          },
        ],
      },
      {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#c9b2a6",
          },
        ],
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#dcd2be",
          },
        ],
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#ae9e90",
          },
        ],
      },
      {
        featureType: "landscape.natural",
        elementType: "geometry",
        stylers: [
          {
            color: "#dfd2ae",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
          {
            color: "#dfd2ae",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#93817c",
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#a5b076",
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#447530",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {
            color: "#f5f1e6",
          },
        ],
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
          {
            color: "#fdfcf8",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
          {
            color: "#f8c967",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#e9bc62",
          },
        ],
      },
      {
        featureType: "road.highway.controlled_access",
        elementType: "geometry",
        stylers: [
          {
            color: "#e98d58",
          },
        ],
      },
      {
        featureType: "road.highway.controlled_access",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#db8555",
          },
        ],
      },
      {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#806b63",
          },
        ],
      },
      {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [
          {
            color: "#dfd2ae",
          },
        ],
      },
      {
        featureType: "transit.line",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#8f7d77",
          },
        ],
      },
      {
        featureType: "transit.line",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#ebe3cd",
          },
        ],
      },
      {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [
          {
            color: "#dfd2ae",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#a3c2ae",
          },
          {
            visibility: "on",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#92998d",
          },
        ],
      },
    ],
  };

  // places map on page in the location designated "map" in our html based on our mapOptions
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  directionsRenderer = new google.maps.DirectionsRenderer();
  // Add the directionsRenderer to the map
  directionsRenderer.setMap(map);

  //replace with data from miniMoviesAPI *DD Coordinate Form*
  //e.g. The Sandlot Movie
  var locations = [
    ["Smith Ballpark", 40.7377753822, -111.889054777],
    ["Lagoon", 40.984444, -111.895],
    ["George S. Eccles Dinosaur Park", 41.23773, -111.9379],
    ["Tracy Aviary", 40.74258, -111.87489],
    ["Salt Lake City", 40.7608, -111.8911],
  ];

  for (var i = 0; i < locations.length; ++i) {
    // Create a link element
    var link = document.createElement("a");
    link.href = "#";
    link.textContent = "GET DIRECTIONS";

    // Add a click event listener to the link using an IIFE
    (function (index) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        GetDirections(locations[index][1], locations[index][2]);
        console.log("link was clicked for location " + index);
      });
    })(i);

    // Create the InfoWindow with the location label and the link
    var infoWindow = new google.maps.InfoWindow({
      content: locations[i][0] + "<br>" + link.outerHTML,
    });

    // Create a marker for the location
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map,
    });

    // Associate the marker with the infoWindow
    marker.addListener("click", function () {
      // Close any open infoWindows
      infoWindows.forEach(function (iw) {
        iw.close();
      });

      // Open the current infoWindow
      infoWindow.open(marker.map, marker);
    });

    // Push the current InfoWindow to the array
    infoWindows.push(infoWindow);
  }
}
function GetDirections(destLat, destLng) {
  var origin = { lat: 40.7608, lng: -111.8911 };

  var request = {
    origin: new google.maps.LatLng(origin.lat, origin.lng),
    destination: new google.maps.LatLng(destLat, destLng),
    travelMode: "DRIVING", // or 'WALKING', 'BICYCLING', etc.
  };

  directionsService.route(request, function (result, status) {
    if (status == "OK") {
      // Display the route on the map
      directionsRenderer.setDirections(result);
    } else {
      console.error("Directions request failed due to " + status);
    }
  });
  directionsRenderer.setPanel(document.getElementById("info"));
}

// calling function to generate map on page
initMap();
