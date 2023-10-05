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
        console.log('MovieID: ', movieID);

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
            }
          })
          .catch(error => {
            console.error('Fetch Error 2:', error);
          });
      }
    })
    .catch(error => {
      console.error('Fetch Error 1:', error);
    });
}

searchBtn.addEventListener('click', getMovie);