//initializing our map variable to refrence in our initMap function
let map;
let directionsRenderer = new google.maps.DirectionsRenderer();
let directionsService = new google.maps.DirectionsService();
let infoWindow;

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

  //replace with data from miniMoviesAPI *DD Coordinate Form*
  //e.g. The Sandlot Movie
  var locations = [
    ["Smith Ballpark", 40.7377753822, -111.889054777],
    ["Lagoon", 40.984444, -111.895],
    ["George S. Eccles Dinosaur Park", 41.23773, -111.9379],
    ["Tracy Aviary", 40.74258, -111.87489],
    ["Salt Lake City", 40.7608, -111.8911],
  ];

  //loop through given locations array to generate on map
  for (var i = 0; i < locations.length; ++i) {
    // adds location label onto markers
    InfoWindow = new google.maps.InfoWindow({
      content: locations[i][0] + '<p<a href=" ">     GET DIRECTIONS</a>></p>',
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map,
    });
  }
}

function GetDirections() {
  //request directions from google API
  var origin = { latitude: 40.7608, longitude: -111.8911 };
  var destination = { latitude: 40.984444, longitude: -111.895 };
  var apiKey = AIzaSyD2VPogU8kLJ5gD4fPpZZq8DQHCEWHPS9g;

  var apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Process the JSON response here
      console.log(data);
    })
    .catch((error) => {
      // Handle any errors that occur during the request
      console.error("Error:", error);
    });
  }
  // calling function to generate map on page
  initMap();

  //trying to make an element so i can add an event listener to the link "click"
  var element = document.getElementById("directions");
  var newElement = document.createElement("a");
  element.appendChild(newElement);

  //eventListener for the link to call function GetDirections
  a.addListener("click", function(event) {
    GetDirections();
    event.preventDefault();
    console.log("link was clicked");
  });
}

//----------end of code---------

directionsRenderer.setMap(map);
directionsRenderer.setPanel(document.getElementById("info"));

///NEW FUNCTION TO GET ROUTE//
function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  //start will be current location
  var startLocation = { latitude: 43.653225, longitude: -79.383186 };
  //end will be a location from map---> coordinates maybe?
  var endLocation = { latitude: 45.501689, longitude: -73.567256 };

  directionsService
    .route({
      origin: {
        query: startLocation,
      },
      destination: {
        query: endLocation,
      },
      travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
    })
    .catch((e) => window.alert("Directions request failed due to " + status));
}
