//initializing our map variable to refrence in our initMap function
let map;
let directionsService;
let directionsRenderer;

// Create a single array to hold all markers and infoWindows
let markers = [];
let infoWindows = [];

//function for building out map with film location data onto page *name from googleAPI url*
async function initMap() {
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const { PinElement } = await google.maps.importLibrary("marker");

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  var mapOptions = {
    zoom: 9,
    //map renders centered on Salt Lake City, Utah
    center: { lat: 40.76078, lng: -111.89105 },
    //customized map display colors at https://console.cloud.google.com/google/maps-apis/studio/styles/new/edit?project=my-project-1-400500
    mapId: "78bd156d9d1c765e",
  };

  // places map on page in the location designated "map" in our html based on our mapOptions
  map = new /*google.maps.*/ Map(document.getElementById("map"), mapOptions);

  //replace with data from miniMoviesAPI *DD Coordinate Form*
  //e.g. The Sandlot Movie
  var locations = [
    {
      position: { lat: 40.7377753822, lng: -111.889054777 },
      title: "Smith Ballpark",
    },
    {
      position: { lat: 40.984444, lng: -111.895 },
      title: "Lagoon",
    },
    {
      position: { lat: 41.23773, lng: -111.9379 },
      title: "George S. Eccles Dinosaur Park",
    },
    {
      position: { lat: 40.74258, lng: -111.87489 },
      title: "Tracy Aviary",
    },
    {
      position: { lat: 40.7608, lng: -111.8911 },
      title: "Salt Lake City",
    },
  ];

  // Create an info window to share between markers.
  var infoWindow = new google.maps.InfoWindow();

  // Create the markers.
  // tourStops.forEach(({ position, title, }, i) => {
  for (let i = 0; i < locations.length; i++) {
    const pin = new PinElement({
      glyph: `${i + 1}`,
    });
    let position = locations[i].position;
    let title = locations[i].title;
    const marker = new AdvancedMarkerElement({
      position: position,
      map: map,
      title: `${i + 1}. ${title}`,
      content: pin.element,
    });
    //CREATE DIRECTIONS LINK USING FOR LOOP TO ASSIGN THE LAT & LNG TO EACH CONTENT WINDOW
    let infoWindowContent = "";
    let directionsLink = "";

    directionsLink = document.createElement("p");
    directionsLink.textContent = "Get Directions";
    directionsLink.style = "color: blue; text-decoration: underline";

    //SET THE LAT & LNG FOR EACH END LOCATION AS A DATA ATTRIBUTE
    directionsLink.setAttribute("data-destLat", i); //setting dummy values for the lat
    directionsLink.setAttribute("data-destLng", i + 10); //setting dummy values for the lng

    //SET THE CONTENT IN THE INFO WINDOW TO BE EQUAL TO THE DIRECTIONS LINK
    infoWindowContent = directionsLink;

    //ADD AN EVENT LISTENER TO THE DIRECTIONS LINK
    directionsLink.addEventListener("click", function (event) {
      console.log("click on directions link");

      //GET CURRENT LOCATION
      let originLocationLat = 0;
      let originLocationLng = 0;
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        originLocationLat = position.coords.latitude;
        originLocationLng = position.coords.longitude;
      });
      console.log(originLocationLat);
      console.log(originLocationLng);

      //GET THE END LAT AND LNG FOR THE MARKER / END LOCATION
      let destLat = event.target.getAttribute("data-destLat");
      let destLng = event.target.getAttribute("data-destLng");
      console.log("data attibute destLat= " + destLat);
      console.log("data attibute destLng= " + destLng);
    });
    // Add a click listener for each marker, and set up the info window.
    marker.addListener("click", ({ domEvent, latLng }) => {
      //parameters here might not be necessary
      const { target } = domEvent; //might not be necessary
      // console.log(target);
      // console.log(latLng);
      infoWindow.close();
      infoWindow.setContent(infoWindowContent);

      // infoWindow.setContent(marker.title); //original code
      infoWindow.open(marker.map, marker);
      console.log("click on marker");

      // Add the directionsRenderer to the map---------> THROWING AN ISSUE HERE!!!!!!!
      //directionsRenderer.setMap(map);

      //calculate route to selected location
      function GetDirections(destLat, destLng) {
        var origin = "los angeles, ca";
        var destination = "sacramento, ca";

        var request = {
          origin: origin,
          destination: destination,
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
      //call getDirections function
      GetDirections();
    });
  }
}

//-------------------------------------------------------------------------------------//
// old styling- NOT COMPATIBLE WITH MARKERS
/*styles: [
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
],*/
