const request = require('request');

const geocode = (address,callback) =>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2Fpa3Jpc2huYWFsbGEzIiwiYSI6ImNrYWd3bWJkYjBjemwyd21qc29iM3pvaXQifQ.YEuu8g38jnxiBsKKSb5u0A&limit=1`;
  
    request({url, json:true},(error,{body} = {})=>{
         if(error){
           callback('Unable to connect to location services!');
         } else if(body.features.length === 0){
           callback(`Unable to find location. Try another search`);
         } else if(body.message){
           callback(`please enter a location`);
         }else {
           callback(undefined,{
             latitude: body.features[0].center[1],
             longitude: body.features[0].center[0],
             location: body.features[0].place_name
           });
         }
    });
  
  };

module.exports = geocode;