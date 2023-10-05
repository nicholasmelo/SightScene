// Create a geocoder object.
var geocoder = new google.maps.Geocoder();

// Create an array of addresses to geocode.
var addresses = ["1600 Amphitheatre Parkway, Mountain View, CA 94043", "2300 N Shoreline Blvd, Mountain View, CA 94043", "4401 Great America Parkway, Santa Clara, CA 95054", "101 Main St, Sunnyvale, CA 94086", "1800 Technology Dr, Milpitas, CA 95035"];

// Iterate over the array and geocode each address.
for (var i = 0; i < addresses.length; i++) {
  // Get the address to geocode.
  var address = addresses[i];

  // Geocode the address.
  geocoder.geocode({ address: address }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      // Get the latitude and longitude of the address.
      var latitude = results[0].geometry.location.lat();
      var longitude = results[0].geometry.location.lng();

      // Display the coordinates on the web page.
      document.getElementById("coordinates").innerHTML += " Latitude: " + latitude + ", Longitude: " + longitude + "<br>";
    } else {
      // Handle the error.
      console.log("Geocoding failed:", status);
    }
  });
}