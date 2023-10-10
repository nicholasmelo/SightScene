const apiKey = '5131599b8amsh5cd7960c965ca44p1c76fcjsnf65b00e1bb62';
let movieName = '';
const searchBar = document.querySelector(".searchBar");
const searchBtn = document.querySelector(".searchBtn");
let movieLo ='';


function getMovie() {
  movieName = searchBar.value;

  const url = `https://moviesminidatabase.p.rapidapi.com/movie/imdb_id/byTitle/${encodeURIComponent(movieName)}/`;

  console.log('Request URL:', url); // Log the request URL

  fetch(url, {
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
      console.log('API Response Data:', data);
      if (data && Array.isArray(data.results) && data.results.length >= 0) {
        let movieID = data.results[0].imdb_id;
        let movieTitle = data.results[0].title; //Gets movie title info from the fetch
        console.log('MovieID: ', movieID);
        console.log('Movie Name: ', movieTitle);

        let currentMovie = document.querySelector(".currentMovie");
        currentMovie.textContent = movieTitle; //Sets the searched movies title to the currentMovie H2 in the HTML to display to users what movie they have searched.

        const pUrl = `https://moviesminidatabase.p.rapidapi.com/movie/id/${movieID}/production_locations/`;

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
              var addresses = [movieLo];
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
    

/*   //loop through given locations array to generate on map
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
  } */

/*         // Display the coordinates on the web page.
        console.log("for "+ address + " the corresponding latitude is " + latitude + " and the corresponding longitude is " + longitude + ".");
      } else {
        // Handle the error.
        console.log("Geocoding failed:", status);
      }
    });
  })(addresses[i]);
}
            }
          })
      }
    })
    .catch(error => {
      console.error('Fetch Error 1:', error);
    }); */
}


searchBtn.addEventListener('click', getMovie);