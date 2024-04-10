// Wait for fully loaded DOM
$(document).ready(function() {
  // Dictionary to store amenities
  let amenityList = {};

  // Listen for changes on each input checkbox tag
  $('input[type="checkbox"]').change(function() {
      // Extract amenity id and name of selected checkbox
      const clickedAmenity = $(this).data('id');
      const amenityName = $(this).data('name');

      // If the checkbox is checked, store amenity in dictionary
      if ($(this).is(':checked')) {
          amenityList[clickedAmenity] = amenityName;
      } else { 
          // If unchecked, remove the amenity from dictionary
          delete amenityList[clickedAmenity];
      }

      // Update the h4 tag with the list of checked amenities
      const updatedAmenityList = Object.values(amenityList).join(', ');
      $('.amenities h4').text(updatedAmenityList);
  });
});
// function is to add and remove the class 'available' to/from api_status
function addRemoveAvailable() {
$.ajax({
    url: "http://0.0.0.0:5001/api/v1/status/",
    success: function(data) {
       if (data.status === "OK") {
         // Add the class 'available' to the div#api_status
         $('#api_status').addClass('available');
       } else {
         // Remove the class 'available' from the div#api_status
         $('#api_status').removeClass('available');
       }
    }
   })};
addRemoveAvailable();
// Function to fetch places and update the DOM
function fetchPlacesAndUpdateDOM() {
$.ajax({
  url: "http://0.0.0.0:5001/api/v1/places_search/",
  type: "POST",
  contentType: "application/json",
  data: JSON.stringify({}),
  dataType: 'json',
  success: function(data) {
      // Loop through the result of the request and create article tags
      for (let i = 0; i < data.length; i++) {
      const place = data[i];
      // Construct HTML for the article tag and append it to .places element
      $('.places').append(
          '<article>' +
              '<h2>' + place.name + '</h2>' +
              '<div class="price_by_night"><p>$' + place.price_by_night + '</p></div>' +
              '<div class="information">' +
                  '<div class="max_guest"><div class="guest_image"></div><p>' + place.max_guest + '</p></div>' +
                  '<div class="number_rooms"><div class="bed_image"></div><p>' + place.number_rooms + '</p></div>' +
                  '<div class="number_bathrooms"><div class="bath_image"></div><p>' + place.number_bathrooms + '</p></div>' +
              '</div>' +
              '<div class="description"><p>' + place.description + '</p></div>' +
          '</article>'
      );
  }
  }
})};
fetchPlacesAndUpdateDOM();
// Function to handle the button click
function searchPlaces() {
  // Collect checked amenities
  var amenities = [];
  $("input[type='checkbox']:checked").each(function() {
      amenities.push($(this).val());
  });

  // Prepare data for the POST request
  var data = { 'amenities': amenities };

  // Send POST request
  $.ajax({
      url: "http://0.0.0.0:5001/api/v1/places_search/",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      dataType: 'json',
      success: function(data) {
          // Handle the response here
          console.log(data);
      },
      error: function() {
          console.log("Error fetching places");
      }
  });
}

// Attach the function to the button click event
$('button').click(searchPlaces);
