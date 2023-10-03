function searchMovieLocations() {
    const movieTitle = encodeURIComponent(document.getElementById('searchBar').value);
    const url = `https://moviesminidatabase.p.rapidapi.com/movie/id/%7Bmovie_id%7D/production_locations/`;

    const settings = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5131599b8amsh5cd7960c965ca44p1c76fcjsnf65b00e1bb62',
            'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
        }
    };
 
}