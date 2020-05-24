const express = require('express');
const path = require('path');
const hbs = require('hbs');
const request = require('request');
const geocode = require('../src/utils/geocode');
const forecast = require('../src/utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define Paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs'); //key value
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/help',(req,res)=>{
     res.render('help',{
           helpText: 'This is some helpful text',
           title: 'Help',
           name:'Sai'
     });
});

app.get('/about', (req,res)=>{
    res.render('about',{
       title:'About Me',
       name:'Sai Krishna'
    });
});

app.get('',(req,res)=>{
     res.render('index',{
         title:'Weather',
         name:'Sai Krishna Alla'
     });
});

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Provide an address to search'
        });
    } else {
        const location = req.query.address;
            geocode(location,(error,{location,latitude,longitude} = {})=>{
            if(error){
              return res.send({error});
            }
            forecast(latitude,longitude, (error, forecastData) => {
              if(error){
                return res.send({error});
              }
              res.send({
                location,
                forecastData,
                });
            });
          });
    }
 
});

app.get('/products',(req,res)=>{
     if(!req.query.search){
         return res.send({
            error:'You must provide a search item'
         });
     }
     console.log(req.query.search);
     res.send({
          products:[]
     });
});

app.get('/help/*',(req,res)=>{
     res.render('404',{
         title:404,
         errorMessage:'Help article not found',
         name:'Sai'
     });
});

app.get('*', (req,res)=>{
   res.render('404', {
       title:404,
       errorMessage:'Page Not Found',
       name:'Sai'
   })
});

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});










