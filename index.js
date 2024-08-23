const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({extended: true}));

app.get('/',function (req,res) {
  res.sendFile(__dirname + '/index.html')

})

app.post('/',function (req,res) {
  const query = req.body.city;
  const unit = 'metric';
  const key = '036914837891df607114d43a30787aea'


  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ key + "&unit="+ unit

    https.get(url,function (response){

    response.on("data",function (data) {
        const weatherData = JSON.parse(data);
        const description = weatherData.weather[0].description ;
        const temp = weatherData.main.temp;
        const icon = weatherData.weather[0].icon;
        const image_url = "https://openweathermap.org/img/wn/" + icon +"@2x.png"
        res.write('<p>The weather is '+ description + '</p>')
        res.write("<h1>The temperature in " + query + " is " + temp + ' degrees celcius </h1>')
        res.write('<img src='+ image_url+">")
        res.send()

    });
    })
})


app.listen(3000, function () {
  console.log('Server running at port 3000');
})
