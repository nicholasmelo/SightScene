const apiKey = '5131599b8amsh5cd7960c965ca44p1c76fcjsnf65b00e1bb62';
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
function openNModal() {
  nModal.classList.remove('hidden');
};

function closeNModal() {
  nModal.classList.add('hidden');
};

nModal.addEventListener('click', (event) => {
  if (event.target === nModal) {
    closeNModal();
  }
});

//Modal function for Title modal
function openTModal() {
  tModal.classList.remove('hidden');
};

function closeTModal() {
  tModal.classList.add('hidden');
};

tModal.addEventListener('click', (event) => {
  if (event.target === tmodal) {
    closeTModal();
  }
});

//Modal function for Location Modal
function openLModal() {
  lModal.classList.remove('hidden');
};

function closeLModal() {
  lModal.classList.add('hidden');
};

lModal.addEventListener('click', (event) => {
  if (event.target === lModal) {
    closeLModal();
  }
});


//Function that handles search function
function getMovie() {
  movieName = searchBar.value;

  const url = `https://moviesminidatabase.p.rapidapi.com/movie/imdb_id/byTitle/${encodeURIComponent(movieName)}/`;

  console.log('Request URL:', url); // Log the request URL

  //First Fetch request for MiniMovies API to get Movie ID
  fetch(url, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
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
      let movieID = data.results[0].imdb_id;
      let movieTitle = data.results[0].title; //Gets movie title info from the fetch
      
      console.log('MovieID: ', movieID);
      console.log('Movie Name: ', movieTitle);

      let currentMovie = document.querySelector(".currentMovie");
      currentMovie.textContent = movieTitle; //Sets the searched movies title to the currentMovie H2 in the HTML to display to users what movie they have searched.

      const pUrl = `https://moviesminidatabase.p.rapidapi.com/movie/id/${movieID}/production_locations/`;

        //Second Fetch request to use mini movies ID to request location info
      fetch(pUrl, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
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
          console.log(data.results.locations.locations[0][0]);
          let movieLo = data.results.locations.locations[0][0];
          console.log('Addresses:', movieLo);
          var addresses = [movieLo]; //Sets the addresses array with the MovieLo info grabbed from the mini movies api
          var geocoder = new google.maps.Geocoder();
          
          // Iterate over the array and geocode each address.
          for (var i = 0; i < addresses.length; i++) {
            // Capture the address variable in a closure.
            (function(address) {
              // Geocode the address.
              geocoder.geocode({ address: address }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                  // Get the latitude and longitude of the address.
                  var latitude = results[0].geometry.location.lat();
                  var longitude = results[0].geometry.location.lng();
                  var locationDetails = [
                    address,
                    latitude,
                    (-longitude)
                  ];
                  console.log("Location Details Array:", locationDetails);
                  
                  //loop through given locations array to generate on map
                  for (var i = 0; i < locationDetails.length; ++i) {
                    // adds location label onto markers
                    console.log("length: ", locationDetails.length);
                    console.log("i: ", i);
                    console.log("details: ", locationDetails[i]);
                    console.log("location details: ", locationDetails[1], "and second: ", locationDetails[2]);
                    InfoWindow = new google.maps.InfoWindow({
                      content: locationDetails[i],
                      position: new google.maps.LatLng(locationDetails[1], locationDetails[2]),
                      //position: new google.maps.LatLng(40.76078, -111.89105),
                      map: map,
                    });
                    console.log("info window:", infoWindow);
                  }
                  
                  // Display the coordinates on the web page.
                  console.log("for "+ address + " the corresponding latitude is " + latitude + " and the corresponding longitude is " + longitude + ".");
                } else {
                  // Handle the error.
                  console.log("Geocoding failed:", status);
                }
              });
            })(addresses[i]);
          } 
          
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

function previousL(savedLocationDetails){
  for (var i = 0; i < savedLocationDetails.length; i++){
    //need to create code to add the savedLocationsDetails to the map here
  };
};

previousBtn.addEventListener('click', function () {

  let savedSearchData = localStorage.getItem('lastSearchData')

  if (savedSearchData) {
    const searchData = JSON.parse(savedSearchData);
    searchBar.value = searchData.savedMovie; // Populate the search bar with the saved movie title

    // Use the location information to populate the map
    populateMapWithLocationData(searchData.savedLocation);
  }
})
searchBtn.addEventListener('click', getMovie);