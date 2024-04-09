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
