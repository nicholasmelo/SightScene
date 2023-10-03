function searchMovieLocations() {
    const movieTitle = encodeURIComponent(document.getElementById('searchInput').value);
    const url = `https://moviesminidatabase.p.rapidapi.com/movie/id/%7Bmovie_id%7D/production_locations/`;

    const settings = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5131599b8amsh5cd7960c965ca44p1c76fcjsnf65b00e1bb62',
            'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
        }
    };

    
}

function constructSearchURL(movieId) {
    const baseUrl = 'https://moviesminidatabase.p.rapidapi.com/movie/id/';
    const productionLocationsEndpoint = '/production_locations/';
  
    const searchURL = `${baseUrl}${movieId}${productionLocationsEndpoint}`;
    return searchURL;
  }
  
  // Example usage:
  const userInput = '123';  // Replace with the actual movie ID
  const searchURL = constructSearchURL(userInput);
  console.log(searchURL);  // Log the constructed search URL