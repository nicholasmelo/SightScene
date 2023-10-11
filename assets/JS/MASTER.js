const apiKey = '5131599b8amsh5cd7960c965ca44p1c76fcjsnf65b00e1bb62';
let movieName = '';
const searchBar = document.querySelector(".searchBar");
const searchBtn = document.querySelector(".searchBtn");
const goBack = document.querySelector(".goBack");
let movieLo ='';


//Function that handles search function
function getMovie() 
  movieName = searchBar.value;

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

//Code to recall local storage information and display it on the map. incomplete
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