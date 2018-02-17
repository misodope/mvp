const config = require('../config.js');
const axios = require('axios');

let getYelpResults = function(searchTerm, callback) {
  let options = {
    method: "get",
    url: "https://api.yelp.com/v3/businesses/search",
    headers: {
      "Authorization": `Bearer ${process.env.TOKEN || config.TOKEN}`
    },
    params: {
      term: searchTerm,
      limit: 10,
      location: {
        zip_code: 10017,
        city: "New York City"
      }
    }
  }
  axios(options)
  .then((results) => {
    console.log("This is my axios results:", results.data.businesses)
    callback(results.data.businesses);
  })
  .catch((error) => {
    console.log("Error getting data", error);
  })
}

module.exports = {
  getYelpResults
}
