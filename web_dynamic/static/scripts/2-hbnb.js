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
   });
