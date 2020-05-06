const request = require("request");
const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const apiKey = process.env.APIKEY;
// let country = 'USA'
//     let city = 'Statesville'
//     let state = 'North Carolina'
//     let url = `http://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=${apiKey}`;
// template engine
app.set('view engine', 'ejs');
// turning info from the url to json
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));
// sends html and renders it on the client
app.get('/', (req, res) => {
    res.render('index');
});
app.post('/', (req, res) => {
    let country = req.body.country
    let city = req.body.city
    let state = req.body.state
    let url = `http://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=${apiKey}`;
    request(url, (err, response, body) => {
        if(err){
            res.render('index', {air : null, error : 'Error please try again'});
        }
        else {
            let air = JSON.parse(body);
            if(air.data == undefined){
                res.render('index', {air : null, error : 'Error please check your spelling'});
            }
            else {
                // console.log(air.data.current.pollution);
                let airText = `The air quality of ${air.data.city} is ${air.data.current.pollution.aqius}`;
                res.render('index', {air: airText, error : null});
            }
        }
    })
});
// request(url, function(err, response, body){
//     if(err){
//         console.log('error:', err);
//     }
//     else {
//         // console.log('body:', body);
//         let air = JSON.parse(body);
//         let message = `It's ${air.data.country}`;
//         console.log(message);
//     }
// });
const port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log(`This server is running on ${port}`);
})

// app.use(express.static(__dirname + '/ressources'));