const apiKey = '5131599b8amsh5cd7960c965ca44p1c76fcjsnf65b00e1bb62'
const movieName = 'Rocky Horror Picture Show'; // Replace with the movie name you want to search for

const url = "https://moviesminidatabase.p.rapidapi.com/movie/imdb_id/byTitle/${encodeURIComponent(movieName)}/";

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
    console.log('Response Data:', data); // Log the response data
  })
  .catch(error => {
    console.error('Fetch Error:', error);
  });