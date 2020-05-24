const request = require('request');

const forecast = (latitude,longitude,callback)=>{

    const url = `http://api.weatherstack.com/current?access_key=8283c5acf53b896d2f423d39c6db2667&query=${latitude},${longitude}&units=m`;
    
    request({url, json:true}, (error,{body} = {})=>{
      if(error){
        callback(`Unable to connect to weather services`);
      } else if(body.error){
        callback(`please specify a valid location identifier`);
      } else {
        callback(undefined,`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels  like ${body.current.feelslike} degrees out`);
      }
    });
   
  };

  module.exports = forecast;