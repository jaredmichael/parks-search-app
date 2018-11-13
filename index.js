'use strict';

const apiKey = '1NIBTkBOidlXs47ftK2DzY26aBiUNAn6OwxRB0I1';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if any remove previous results 
  console.log(responseJson);
  $('#results-list').empty();

  //iterate through the items array
  for (let i = 0; i < responseJson.data.length; i++) {
    //for each object in the items array, add list item to results
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href='${responseJson.data[i].url}'>${responseJson.data[i].url}</a>
      </li>`
    )};

    //display results section
  $('#results').removeClass('hidden');
};

function getParks(query, maxResults=10) {
  const params = {
    q: query,
    limit: maxResults,
    api_key: apiKey,
  };

  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
      return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Oops! Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getParks(searchTerm, maxResults);
  });
}

$(watchForm);