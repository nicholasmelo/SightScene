//initializing our map variable to refrence in our initMap function
let map;
let directionsService;
let directionsRenderer;

// Create a single array to hold all markers and infoWindows
let markers = [];
let infoWindows = [];

/*       //Get current location from geocoder API in city/state form
      let originLocation;
      //let originLocationLat = 0;
      //let originLocationLng = 0;
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        var originLocationLat = position.coords.latitude;
        var originLocationLng = position.coords.longitude;

        //MUST BE IN CITY/STATE
        originLocation = { lat: originLocationLat, lng: originLocationLng };;
        console.log("your current location is " + originLocation);
      }); */

//calculate route to selected location
function GetDirections() {
  //orign should = originLocation (city/state)
  var origin = originLocation;
  var destination = "salt lake city, ut";

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

  //var locations = [movieLo];

  // Create an info window to share between markers.
  var infoWindow = new google.maps.InfoWindow();

  // Create the markers
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
    //initialize infoWindow content and link
    let infoWindowContent = "";
    let directionsLink = "";

    //create element for infoWindow and directions link
    directionsLink = document.createElement("p");
    directionsLink.textContent = "Get Directions";
    directionsLink.style = "color: blue; text-decoration: underline";

    //set infoWindow content to the directionsLink content string
    infoWindowContent = directionsLink;

    //EventListener for directions link
    directionsLink.addEventListener("click", function (event) {
      console.log("directions link clicked");

      //Get current location from geocoder API in city/state form
      let originLocation;
      //let originLocationLat = 0;
      //let originLocationLng = 0;
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        var originLocationLat = position.coords.latitude;
        var originLocationLng = position.coords.longitude;

        //MUST BE IN CITY/STATE
        originLocation = { lat: originLocationLat, lng: originLocationLng };
        console.log("your current location is " + originLocation);
      });

      //calculate directions after link clicked
      GetDirections();
    });

    // Add a click listener for each marker, and set up the info window.
    marker.addListener("click", ({ domEvent, latLng }) => {
      const { target } = domEvent; //might not be necessary
      infoWindow.close();
      infoWindow.setContent(infoWindowContent);
      infoWindow.open(marker.map, marker);
      console.log("location selected");
    });
  }
}
