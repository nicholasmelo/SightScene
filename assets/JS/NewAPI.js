//initializing our map variable to refrence in our initMap function
let map;
let directionsService;
let directionsRenderer;
// Create a single array to hold all markers and infoWindows
let markers = [];
let infoWindows = [];

//calculate route to selected location
function GetDirections() {
  //orign should = originLocation (city/state)
  var origin = "moab, ut";
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

  // var locations = [movieLo];

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

    //center map to hardcorded location
    map.setCenter({lat: 45.8918, lng: 123.9615});

    //EventListener for directions link
    directionsLink.addEventListener("click", function (event) {
      console.log("directions link clicked");

      //Get current location from geocoder API in city/state form
      let originLocation;
      //let originLocationLat = 0;
      //let originLocationLng = 0;
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        originLocationLat = position.coords.latitude;
        originLocationLng = position.coords.longitude;

        //MUST BE IN CITY/STATE
        originLocation = "moab, ut";
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

let movieName = '';
const searchBar = document.querySelector(".searchBar");
const searchBtn = document.querySelector(".searchBtn");
let movieLo ='';

//Brings modals into JS
const nModal = document.getElementById('mNetwork');
const tModal = document.getElementById('mTitle');
const lModal = document.getElementById('mLocation');

//Local Storage declarations
let savedLocationDetails = [];




//Modal function for Network Modal
//function openNModal() {
//  nModal.classList.remove('hidden');
//};

//function closeNModal() {
//  nModal.classList.add('hidden');
//};

//nModal.addEventListener('click', (event) => {
//  if (event.target === nModal) {
//    closeNModal();
//  }
//});

//Modal function for Title modal
//function openTModal() {
//  tModal.classList.remove('hidden');
//};

//function closeTModal() {
//  tModal.classList.add('hidden');
//};

//tModal.addEventListener('click', (event) => {
//  if (event.target === tmodal) {
//    closeTModal();
//  }
//});

//Modal function for Location Modal
//function openLModal() {
//  lModal.classList.remove('hidden');
//};

//function closeLModal() {
//  lModal.classList.add('hidden');
//};

//lModal.addEventListener('click', (event) => {
//  if (event.target === lModal) {
//    closeLModal();
//  }
//});


//Function that handles search function
function getMovie() {
  movieName = searchBar.value;
  
  const url = `https://moviesdatabase.p.rapidapi.com/titles/search/title/${movieName}?titleType=movie`; //UPDATED API LINK

  console.log('Request URL:', url); // Log the request URL

  //First Fetch request for MiniMovies API to get Movie ID
  fetch(url, {
    method: 'GET',
    headers: {
		'X-RapidAPI-Key': '66c1ef1f94msh8651ee6ecab8edbp195f28jsn7054b5e3cfe0', //UPDATED API KEY
		'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com' //UPDATED 
    }
  })
  .then(response => {
    if (!response.ok) {
      openNModal();
      throw new Error('Network response was not ok');
    }
    return response.json();
    })
  .then(data => {
    console.log('Request URL:', url); // Log the request URL
    console.log('API Response Data:', data);
    if (data && Array.isArray(data.results) && data.results.length >= 0) {
      let movieID = data.results[0].id; //UPDATED
      let movieTitle = data.results[0].originalTitleText.text; //Gets movie title info from the fetch UPDATED
      
      console.log('MovieID: ', movieID);
      console.log('Movie Name: ', movieTitle);

      let currentMovie = document.querySelector(".currentMovie");
      currentMovie.textContent = movieTitle; //Sets the searched movies title to the currentMovie H2 in the HTML to display to users what movie they have searched.

      const pUrl = `https://moviesdatabase.p.rapidapi.com/titles/${movieID}?info=filmingLocations`; //UPDATED

        //Second Fetch request to use mini movies ID to request location info
      fetch(pUrl, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '66c1ef1f94msh8651ee6ecab8edbp195f28jsn7054b5e3cfe0', //UPDATED
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com' //UPDATED
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('API Location Response Data:', data);
        
        if (data) {
          console.log(data.results.filmingLocations.edges[0].node.text);
          let movieLo = data.results.filmingLocations.edges[0].node.text;
          console.log('Addresses:', movieLo);
          var locations = [movieLo]; //Sets the addresses array with the MovieLo info grabbed from the mini movies api
          
          //Setting local storage info here.
          const searchData = {
            savedMovie: movieTitle,
            savedLocation: locationbar
          }
          localStorage.setItem('lastSearchData', JSON.stringify(searchData));
          
        } else {
          openTModal();
        }
      }) 
    } else {
      openLModal();
    }
  })
  .catch(error => {
    console.error('Fetch Error 1:', error);
  });
};





searchBtn.addEventListener('click', getMovie);



function goback() {

  movieName = prevSearch;

  const url = `https://moviesdatabase.p.rapidapi.com/titles/search/title/${movieName}?titleType=movie`; //UPDATED API LINK

  console.log('Request URL:', url); // Log the request URL

  //First Fetch request for MiniMovies API to get Movie ID
  fetch(url, {
    method: 'GET',
    headers: {
		'X-RapidAPI-Key': '66c1ef1f94msh8651ee6ecab8edbp195f28jsn7054b5e3cfe0', //UPDATED API KEY
		'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com' //UPDATED 
    }
  })
  .then(response => {
    if (!response.ok) {
      openNModal();
      throw new Error('Network response was not ok');
    }
    return response.json();
    })
  .then(data => {
    console.log('API Response Data:', data);
    if (data && Array.isArray(data.results) && data.results.length >= 0) {
      let movieID = data.results[0].id; //UPDATED
      let movieTitle = data.results[0].originalTitleText.text; //Gets movie title info from the fetch UPDATED
      
      console.log('MovieID: ', movieID);
      console.log('Movie Name: ', movieTitle);

      let currentMovie = document.querySelector(".currentMovie");
      currentMovie.textContent = movieTitle; //Sets the searched movies title to the currentMovie H2 in the HTML to display to users what movie they have searched.

      const pUrl = `https://moviesdatabase.p.rapidapi.com/titles/${movieID}?info=filmingLocations`; //UPDATED

        //Second Fetch request to use mini movies ID to request location info
        fetch(pUrl, {
          method: 'GET',
          headers: {
              'X-RapidAPI-Key': '66c1ef1f94msh8651ee6ecab8edbp195f28jsn7054b5e3cfe0', //UPDATED
              'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com' //UPDATED
          }
        })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('API Location Response Data:', data);
        
        if (data) {
          console.log(data.results.filmingLocations.edges[0].node.text);
          let movieLo = data.results.filmingLocations.edges[0].node.text;
          console.log('Addresses:', movieLo);
          var addresses = [movieLo]; //Sets the addresses array with the MovieLo info grabbed from the mini movies api

          
        } else {
          openTModal();
        }
      }) 
    } else {
      openLModal();
    }
  })
  .catch(error => {
    console.error('Fetch Error 1:', error);
  });
};




// Sets user input(movie name) into local stoage
var input = document.getElementById('searchbear').value;
localStorage.setItem('searchbear', input);
var prevSearch = localStorage.getItem('goBack') || 0;


goBack.addEventListener('click', goback);
