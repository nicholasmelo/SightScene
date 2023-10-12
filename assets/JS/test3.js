let movieName = '';
const searchBar = document.querySelector('.searchBar');
const searchBtn = document.querySelector('.searchBtn');
let movieLo = '';
let locations = [];
let latitude;
let longitude;
let map;
let directionsService;
let directionsRenderer;

// Brings modals into JS
const nModal = document.getElementById('mNetwork');
const tModal = document.getElementById('mTitle');
const lModal = document.getElementById('mLocation');

// Local Storage declaration
let savedLocationDetails = [];

// Modal function for Network Modal
function openNModal() {
  nModal.classList.remove('hidden');
}

function closeNModal() {
  nModal.classList.add('hidden');
}

// Modal function for Title modal
function openTModal() {
  tModal.classList.remove('hidden');
}

function closeTModal() {
  tModal.classList.add('hidden');
}

// Modal function for Location Modal
function openLModal() {
  lModal.classList.remove('hidden');
}

function closeLModal() {
  lModal.classList.add('hidden');
}

nModal.addEventListener('click', (event) => {
  if (event.target === nModal) {
    closeNModal();
  }
});

tModal.addEventListener('click', (event) => {
  if (event.target === tModal) {
    closeTModal();
  }
});

lModal.addEventListener('click', (event) => {
  if (event.target === lModal) {
    closeLModal();
  }
});

// Function that handles the search function
function getMovie() {
  movieName = searchBar.value;

  const url = `https://moviesdatabase.p.rapidapi.com/titles/search/title/${movieName}?titleType=movie`;

  console.log('Request URL:', url);

  // First Fetch request for MiniMovies API to get Movie ID
  fetch(url, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '66c1ef1f94msh8651ee6ecab8edbp195f28jsn7054b5e3cfe0',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
    },
  })
    .then((response) => {
      if (!response.ok) {
        openNModal();
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Request URL:', url);
      console.log('API Response Data:', data);
      if (data && Array.isArray(data.results) && data.results.length > 0) {
        let movieID = data.results[0].id;
        let movieTitle = data.results[0].originalTitleText.text;

        console.log('MovieID: ', movieID);
        console.log('Movie Name: ', movieTitle);

        let currentMovie = document.querySelector('.currentMovie');
        currentMovie.textContent = movieTitle;

        const pUrl = `https://moviesdatabase.p.rapidapi.com/titles/${movieID}?info=filmingLocations`;

        // Second Fetch request to use MiniMovies ID to request location info
        fetch(pUrl, {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '66c1ef1f94msh8651ee6ecab8edbp195f28jsn7054b5e3cfe0',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
          },
        })
          .then((response) => {
            if (!response.ok) {
              openTModal();
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            console.log('API Location Response Data:', data);

            if (data) {
              console.log(data.results.filmingLocations.edges[0].node.text);
              movieLo = data.results.filmingLocations.edges[0].node.text;
              console.log('Addresses:', movieLo);
              locations.push(movieLo);

              // Setting local storage info here.
              const searchData = {
                savedMovie: movieTitle,
                savedLocation: movieLo,
              };
              localStorage.setItem('lastSearchData', JSON.stringify(searchData));
              initMap();
            } else {
              openLModal();
            }
          });
      } else {
        openLModal();
      }
    })
    .catch((error) => {
      console.error('Fetch Error 1:', error);
    });
}

// Initialize map function
async function initMap() {
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary('maps');
  const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');
  const { PinElement } = await google.maps.importLibrary('marker');

  // Create a single array to hold all markers and infoWindows
  let markers = [];
  let infoWindows = [];

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  var mapOptions = {
    zoom: 9,
    center: { lat: 45.8917738, lng: -123.9615274 }, // Update to your desired coordinates
    mapId: '78bd156d9d1c765e',
  };

  // places map on the page in the location designated "map" in our HTML based on our mapOptions
  map = new Map(document.getElementById('map'), mapOptions);

  // Fetch coordinates for the movie location
  const apiKey = 'AIzaSyA5BEtfrs1m7xukhEaEha-M-9rYQnlXjMw';
  const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    movieLo
  )}&key=${apiKey}`;

  // Fetch coordinates from Google Geocoding API
  fetch(geocodingUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Geocoding request failed with status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.status === 'OK' && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        latitude = location.lat;
        longitude = location.lng;

        locations = [
          {
            position: { lat: latitude, lng: longitude },
            title: 'Movie Location',
          },
        ];

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

          // Create an info window to share between markers.
          var infoWindow = new google.maps.InfoWindow();

          //initialize infoWindow content and link
          let infoWindowContent = '';
          let directionsLink = '';

          //create element for directions link
          directionsLink = document.createElement('p');
          directionsLink.textContent = 'Get Directions';
          directionsLink.style = 'color: blue; text-decoration: underline';

          //set infoWindow content to the directionsLink content string
          infoWindowContent = directionsLink;

          // EventListener for directions link
          directionsLink.addEventListener('click', function (event) {
            console.log('Directions link clicked');
            // Get current location from geocoder API in city/state form
            let originLocation;
            navigator.geolocation.getCurrentPosition((position) => {
              console.log(position.coords.latitude, position.coords.longitude);
              originLocation = 'moab, ut'; // MUST BE IN CITY/STATE
              console.log('Your current location is ' + originLocation);

              // Calculate directions after link clicked
              GetDirections();
            });
          });

          // Add a click listener for each marker and set up the info window.
          marker.addListener('click', ({ domEvent, latLng }) => {
            const { target } = domEvent;
            infoWindow.close();
            infoWindow.setContent(infoWindowContent);
            infoWindow.open(marker.map, marker);
            console.log('Location selected');
          });

          // Store markers and infoWindows in arrays
          markers.push(marker);
          infoWindows.push(infoWindow);
        }
      }
    });
}

// Function to handle going back to the previous search
function goback() {
  // Retrieve the previous search data from local storage
  const searchDataJSON = localStorage.getItem('lastSearchData');

  if (searchDataJSON) {
    const searchData = JSON.parse(searchDataJSON);

    // Update the search bar and trigger a new search
    searchBar.value = searchData.savedMovie;
    getMovie();
  } else {
    // Handle the case when there is no previous search data
    alert('No previous search data found.');
  }
}

// Set user input (movie name) into local storage
searchBtn.addEventListener('click', getMovie);

// Attach a click event listener to the "goBack" button
const goBackButton = document.getElementById('goBack');
if (goBackButton) {
  goBackButton.addEventListener('click', goback);
}

// Function to calculate route to the selected location
function GetDirections() {
  var origin = 'moab, ut'; // Origin should be updated based on user's input or your requirements
  var destination = movieLo; // Use the movie location as the destination

  var request = {
    origin: origin,
    destination: destination,
    travelMode: 'DRIVING', // or 'WALKING', 'BICYCLING', etc.
  };

  directionsService.route(request, function (result, status) {
    if (status == 'OK') {
      // Display the route on the map
      directionsRenderer.setDirections(result);
    } else {
      console.error('Directions request failed due to ' + status);
    }
  });
  directionsRenderer.setPanel(document.getElementById('info'));
}