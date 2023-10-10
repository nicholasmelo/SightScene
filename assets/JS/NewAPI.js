const apiKey = '66c1ef1f94msh8651ee6ecab8edbp195f28jsn7054b5e3cfe0';
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
//Code to recall local storage information and display it on the map. incomplete
//function previousL(savedLocationDetails){
//  for (var i = 0; i < savedLocationDetails.length; i++){
//    //need to create code to add the savedLocationsDetails to the map here
//  };
//};

//previousBtn.addEventListener('click', function () {
//
//  let savedSearchData = localStorage.getItem('lastSearchData')
//
// if (savedSearchData) {
//    const searchData = JSON.parse(savedSearchData);
//    searchBar.value = searchData.savedMovie; // Populate the search bar with the saved movie title

    // Use the location information to populate the map
//    populateMapWithLocationData(searchData.savedLocation);
//  }
//})
searchBtn.addEventListener('click', getMovie);
searchBtn.addEventListener('click', console.log('Button Clicked'))