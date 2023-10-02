$(document).ready(function() {
    // ... (your existing code for fetching news)
  
    // Initialize the state map
    $('#map').usmap({
      'mouseoverState': {
        function(event, data) {
          // Fetch news based on the state code
          if (data.name === 'VA') {
            fetchNewsForState(ENDPOINT_VIRGINIA);
          } else if (data.name === 'CA') {
            fetchNewsForState(ENDPOINT_CALIFORNIA);
          } else {
            // Default to fetching top headlines for the entire US
            fetchNewsForState(ENDPOINT);
          }
        }
      },
      // ... (other map configuration options)
    });
  });