'use strict';

/* seatgeek credentials */
const clientID = 'MjA2OTU3MDN8MTU4MTQ2OTU2My45OA'; 
const seatgeekURL = 'https://api.seatgeek.com/2/events';


/* format query parameters */ 

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

  /* seatgeek display */ 

function displayEventResults(responseJson) {
    console.log(responseJson);
    let newData = responseJson.events
    $('#resultList').empty();
    newData.forEach(function(val){
        
            $('#eventList').append(`
                <li>
                    <a class="eventTitleLink" href="${val.url}" target="_blank"><h4 class="eventTitle">${val.title}</h4></a>
                    <h5 class="eventVenue">${val.venue.name}</h5>
                    <img src="${val.performers[0].image}">
                </li> `)
    });   
        const searchTerm = $('.text').val();
        $('#results').removeClass('hidden');
        $('.eventsNear').html(`<h3 class='eventsNear'> '${searchTerm}' related events near ${responseJson.meta.geolocation.city}`) 
    }
/* seatgeek fetch */ 

function getEvent(searchTerm) {
    const params = { 
      q: searchTerm,
      geoip: true,
      'taxonomies.name': 'concert',
      client_id: clientID,
     

      };

    const seatgeekQueryString = formatQueryParams(params);
    const newurl = seatgeekURL + '?' + seatgeekQueryString;
  
      fetch(newurl)
         .then(response => {
            if (response.ok) {
                return response.json();
            } 
            throw new Error(response.statusText);
        })
        .then(responseJson => 
            displayEventResults(responseJson))
        .catch(err => {
            alert(`Something went wrong: ${err.message}`)
        })

}

/* spotify credentials */
const spotifyID = '5595ffccfff84a34b6e0eba0e5596f78'
const spotifySecret: '379c67bc7de24475a65fc1319dc89115'
const spotifyURL = 'https://api.spotify.com/v1/search'

/* post request for authorization token */

function getToken(){
    const postURL = 'https://accounts.spotify.com/api/token'
    const params = {
        grant_type: 'client_credentials'
    };
    const spotifyQueryString = formatQueryParams(params);
    const spotifyPostURL = postURL + '?' + spotifyQueryString;

    fetch(spotifyPostURL, {
        method: 'POST',
        headers: {
        Authorization: `Basic <base64 encoded ${spotifyID}:${spotifySecret}`
        }
    })

}

/* spotify fetch */ 

function getSongs(searchTerm) {
    const params = { 
      q: searchTerm,
      type: 'track',
      limit: 30,
      include_external: 'audio',
      client_id: '5595ffccfff84a34b6e0eba0e5596f78'
     

      };

    const spotifyQueryString = formatQueryParams(params);
    const newurl = spotifyURL + '?' + spotifyQueryString;
  
      fetch(newurl, {
          headers: {
            'Authorization': spotifyToken
          }
      })
         .then(response => {
            if (response.ok) {
                return response.json();
            } 
            throw new Error(response.statusText);
        })
        .then(responseSongJson => 
            displaySpotifyResults(responseSongJson))
        .catch(err => {
            alert(`Something went wrong: ${err.message}`)
        })

}

/* spotify display */ 

function displaySpotifyResults(responseSongJson) {
    console.log(responseSongJson);
   /* $('#resultList').empty();
    newData.forEach(function(val){
        
            $('#eventList').append(`
                <li>
                    <a class="eventTitleLink" href="${val.url}" target="_blank"><h4 class="eventTitle">${val.title}</h4></a>
                    <h5 class="eventVenue">${val.venue.name}</h5>
                    <img src="${val.performers[0].image}">
                </li> `)
    })*/;   
}

    /* on form submit */ 

    function watchForm() {
        focus();
        $('form').submit(event => {
            event.preventDefault();
            const searchTerm = $('.text').val();
           getEvent(searchTerm);
           getSongs(searchTerm);

        })
    }
    function focus(){
        $(".text").focus();
      };

    $(watchForm);