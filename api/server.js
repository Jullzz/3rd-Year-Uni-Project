var express = require("express")
var app = express()

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Influx = require('influx');
const influx = new Influx.InfluxDB('http://db:8086/mydb');

const pointsPulled = 15;// the amount of buckets created for each pull and consequently the appropriate timeframe also uses this
var HTTP_PORT = 8000;

const BASE_URL = "/api/"

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT)) 
    influx.query('CREATE DATABASE mydb;').catch();// as soon as the api is up, it creates the database to use.
});

// Root path
app.get(BASE_URL, (req, res, next) => {
    res.sendFile(__dirname + '/public/index.html')
});
// this function is responsible for wirting to the influx databse using their function
app.get(BASE_URL + "sendSingleData", (req, res, next) => {
    let data = JSON.parse(req.body);
    let date = new Date();
    let timestamp = ((date/1000)-(date%1000/1000)) - data.timestamp;
    console.log(timestamp);
    influx.writePoints([
        {
            measurement: 'cpu_load_short',
            tags: { 
                title: data.title
            },
            fields: {
                lat: data.lat,
                lng: data.lng,
                direction1: data.direction1,
                direction2: data.direction2,
                bikeDir1: data.bikeDir1,
                bikeDir2: data.bikeDir2,
                pedDir1: data.pedDir1,
                pedDir2: data.pedDir2
            },
            timestamp: timestamp
        }
    ],
    {
        precision: 's'
    })
    .catch(err => console.log(err))
    .then(result => res.json(result))
});
//pulles 15 hours worth of data
app.get(BASE_URL + "pullHours/:point", (req, res, next)=>{
    var i;
    var data = { Bike: {West: new Array(pointsPulled).fill(0), East: new Array(pointsPulled).fill(0)}, Ped:{West: new Array(pointsPulled).fill(0), East: new Array(pointsPulled).fill(0)}}; //creates an empty array for each bike and pedestrain, each east and west. the info witl be sorted into these buckets or the front end to use
    influx.query('SELECT * FROM cpu_load_short WHERE time > \'' + (new Date((Math.floor(Date.now()/1000)-pointsPulled*3600)*1000)).toISOString() + '\' AND "title" = \''+req.params.point+'\'').then(results =>{// this function queries the data base and asks for all the data from 15 hours before the current time
    for(i=0;i<results.length;i++){// for each record in the database,based on the time, it is given an index and then the information for that record is added to the appropriate bucket
     data.Ped.East[((pointsPulled)-1)-(Math.floor((((Math.floor(Date.now()/1000))*1000)-Date.parse(results[i].time))/(3600*1000)))] += results[i].pedDir1;
    data.Bike.East[((pointsPulled)-1)-(Math.floor((((Math.floor(Date.now()/1000))*1000)-Date.parse(results[i].time))/(3600*1000)))] += results[i].bikeDir1;
     data.Ped.West[((pointsPulled)-1)-(Math.floor((((Math.floor(Date.now()/1000))*1000)-Date.parse(results[i].time))/(3600*1000)))] += results[i].pedDir2;
    data.Bike.West[((pointsPulled)-1)-(Math.floor((((Math.floor(Date.now()/1000))*1000)-Date.parse(results[i].time))/(3600*1000)))] += results[i].bikeDir2;
    }
// array of integers is then returned for the front end to use for the line chart
    res.json(data);}).catch(err=> res.status(404).json({error: err.message}));;
});
// collects all the data from the data bases and places them into a locations array. curently hardcoded but could easily be changed.
// as the data goes in, it is sorted into 1 of the 2 locations and its values are added to the appropriate count, whether bike or pedestrian
app.get(BASE_URL + "mapping", (req, res, next)=>{
var locations = new Array(2);
locations[0] = { title:"", location: {lat: 0, lng: 0}, counts:{bike: 0, ped: 0}};
locations[1] = { title:"", location: {lat: 0, lng: 0}, counts:{bike: 0, ped: 0}};
    influx.query('SELECT lat, title, lng, bikeDir1, bikeDir2, pedDir1, pedDir2 FROM cpu_load_short').then(data =>
        {
            var i =0;
            for(i=0;i<data.length;i++)
            {
                if(data[i].title=="Rosalind1")
                {
                    locations[0].title = data[i].title;
                    locations[0].location.lat = data[i].lat;
                    locations[0].location.lng = data[i].lng;
                    locations[0].counts.bike += data[i].bikeDir1 + data[i].bikeDir2;
                    locations[0].counts.ped += data[i].pedDir1 + data[i].pedDir2;
                }
		else
                {
                    locations[1].title = data[i].title;
                    locations[1].location.lat = data[i].lat;
                    locations[1].location.lng = data[i].lng;
                    locations[1].counts.bike += data[i].bikeDir1 + data[i].bikeDir2;
                    locations[1].counts.ped += data[i].pedDir1 + data[i].pedDir2;
                }
            }    
      res.json(locations)}).catch(err => res.status(404).json({error: err.message}));;
});
//pulls 15 days worth of data
app.get(BASE_URL + "pullDays/:point", (req, res, next)=>{
   var i;
    var data = { Bike: {West: new Array(pointsPulled).fill(0), East: new Array(pointsPulled).fill(0)}, Ped:{West: new Array(pointsPulled).fill(0), East: new Array(pointsPulled).fill(0)}};
influx.query('SELECT * FROM cpu_load_short WHERE time > \'' + (new Date((Math.floor(Date.now()/1000)-pointsPulled*86400)*1000)).toISOString() + '\' AND "title" = \''+req.params.point+'\'').then(results =>{
    for(i=0;i<results.length;i++){
     data.Ped.East[((pointsPulled)-1)-(Math.floor((((Math.floor(Date.now()/1000))*1000)-Date.parse(results[i].time))/(86400*1000)))] += results[i].pedDir1;
    data.Bike.East[((pointsPulled)-1)-(Math.floor((((Math.floor(Date.now()/1000))*1000)-Date.parse(results[i].time))/(86400*1000)))] += results[i].bikeDir1;
     data.Ped.West[((pointsPulled)-1)-(Math.floor((((Math.floor(Date.now()/1000))*1000)-Date.parse(results[i].time))/(86400*1000)))] += results[i].pedDir2;
    data.Bike.West[((pointsPulled)-1)-(Math.floor((((Math.floor(Date.now()/1000))*1000)-Date.parse(results[i].time))/(86400*1000)))] += results[i].bikeDir2;
    }
    res.json(data);
    }).catch(err=> res.status(404).json({error: err.message}));;
});
// pulls 15 weeks worth of data
app.get(BASE_URL + "pullWeeks/:point", (req, res, next)=>{
   var i;
    var data = { Bike: {West: new Array(pointsPulled).fill(0), East: new Array(pointsPulled).fill(0)}, Ped:{West: new Array(pointsPulled).fill(0), East: new Array(pointsPulled).fill(0)}};
influx.query('SELECT * FROM cpu_load_short WHERE time > \'' + (new Date((Math.floor(Date.now()/1000)-pointsPulled*604800)*1000)).toISOString() + '\' AND "title" = \''+req.params.point+'\'').then(results =>{
    for(i=0;i<results.length;i++){
     data.Ped.East[((pointsPulled)-1)-(Math.floor((((Math.floor(Date.now()/1000))*1000)-Date.parse(results[i].time))/(604800*1000)))] += results[i].pedDir1;
    data.Bike.East[((pointsPulled)-1)-(Math.floor((((Math.floor(Date.now()/1000))*1000)-Date.parse(results[i].time))/(604800*1000)))] += results[i].bikeDir1;
     data.Ped.West[((pointsPulled)-1)-(Math.floor((((Math.floor(Date.now()/1000))*1000)-Date.parse(results[i].time))/(604800*1000)))] += results[i].pedDir2;
    data.Bike.West[((pointsPulled)-1)-(Math.floor((((Math.floor(Date.now()/1000))*1000)-Date.parse(results[i].time))/(604800*1000)))] += results[i].bikeDir2;
    }
    res.json(data);
    }).catch(err=> res.status(404).json({error: err.message}));;
});
//pulls 15 months worth of data
app.get(BASE_URL + "pullMonths/:point", (req, res, next)=>{
   var i;
    var data = { Bike: {West: new Array(pointsPulled).fill(0), East: new Array(pointsPulled).fill(0)}, Ped:{West: new Array(pointsPulled).fill(0), East: new Array(pointsPulled).fill(0)}};
influx.query('SELECT * FROM cpu_load_short WHERE time > \'' + (new Date((Math.floor(Date.now()/1000)-pointsPulled*2628002)*1000)).toISOString() + '\' AND "title" = \''+req.params.point+'\'').then(results =>{
    for(i=0;i<results.length;i++){
     data.Ped.East[((pointsPulled)-1)-(Math.floor((((Math.floor(Date.now()/1000))*1000)-Date.parse(results[i].time))/(2628002*1000)))] += results[i].pedDir1;
    data.Bike.East[((pointsPulled)-1)-(Math.floor((((Math.floor(Date.now()/1000))*1000)-Date.parse(results[i].time))/(2628002*1000)))] += results[i].bikeDir1;
     data.Ped.West[((pointsPulled)-1)-(Math.floor((((Math.floor(Date.now()/1000))*1000)-Date.parse(results[i].time))/(2628002*1000)))] += results[i].pedDir2;
    data.Bike.West[((pointsPulled)-1)-(Math.floor((((Math.floor(Date.now()/1000))*1000)-Date.parse(results[i].time))/(2628002*1000)))] += results[i].bikeDir2;
    }
    res.json(data);
    }).catch(err=> res.status(404).json({error: err.message}));;
});
//To be used for testing
app.get(BASE_URL + "pullCustom/:point/:interval", (req, res, next)=>{
    var interval = req.param.interval;
    var i;
    var data = { Bike: {West: new Array(pointsPulled).fill(0), East: new Array(pointsPulled).fill(0)}, Ped:{West: new Array(pointsPulled).fill(0), East: new Array(pointsPulled).fill(0)}};
    influx.query('SELECT * FROM cpu_load_short WHERE time > \'' + (new Date((Math.floor(Date.now()/1000)-pointsPulled*interval)*1000)).toISOString() + '\' AND "title" = \''+req.params.point+'\'').then(results =>{
    for(i=0;i<results.length;i++){
     data.Ped.East[((pointsPulled)-1)-(Math.floor((((Math.floor(Date.now()/1000))*1000)-Date.parse(results[i].time))/(interval*1000)))] += results[i].pedDir1;
    data.Bike.East[((pointsPulled)-1)-(Math.floor((((Math.floor(Date.now()/1000))*1000)-Date.parse(results[i].time))/(interval*1000)))] += results[i].bikeDir1;
     data.Ped.West[((pointsPulled)-1)-(Math.floor((((Math.floor(Date.now()/1000))*1000)-Date.parse(results[i].time))/(interval*1000)))] += results[i].pedDir2;
    data.Bike.West[((pointsPulled)-1)-(Math.floor((((Math.floor(Date.now()/1000))*1000)-Date.parse(results[i].time))/(interval*1000)))] += results[i].bikeDir2;
    }
    res.json(data);
    }).catch(err=> res.status(404).json({error: err.message}));;
});
