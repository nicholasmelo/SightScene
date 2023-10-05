
// Check if geolocation is available in the browser
if ("geolocation" in navigator) {
    // Get the current position
    navigator.geolocation.getCurrentPosition(function(position) {
      // Extract latitude and longitude from the position object
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      
      // Log the latitude and longitude to the console
      console.log("Current Latitude: " + latitude);
      console.log("Current Longitude: " + longitude);
    }, function(error) {
      // Handle errors if any occur
      switch(error.code) {
        case error.PERMISSION_DENIED:
          console.error("User denied the request for geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          console.error("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          console.error("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          console.error("An unknown error occurred.");
          break;
      }
    });
  } else {
    console.error("Geolocation is not available in this browser.");
  }