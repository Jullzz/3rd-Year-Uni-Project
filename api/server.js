var express = require("express")
var app = express()

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Influx = require('influx');
const influx = new Influx.InfluxDB('http://db:8086/mydb');

const pointsPulled = 15;
var HTTP_PORT = 8000;

var Name = "HourlyRosalind";

const BASE_URL = "/api/"

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT)) 
    influx.query('CREATE DATABASE mydb;');
});

// Root path
app.get(BASE_URL, (req, res, next) => {
    res.sendFile(__dirname + '/public/index.html')
});


app.get(BASE_URL + "getPointData", (req, res, next) => {
    influx.query('SELECT * FROM cpu_load_short').then(data =>
        res.json(data)).catch(err => res.status(404).json({error: err.message}));;
    //res.json(data)
});

app.get(BASE_URL + "deleteAllData", (req, res, next) => {
    influx.query('DELETE FROM "Rosalind"').then(data =>
        res.json(data)).catch(err=> res.status(404).json({error: err.message}));;
        influx.query('DELETE FROM "Location"').then(data =>
            res.json(data)).catch(err=> res.status(404).json({error: err.message}));;
            influx.query('DELETE FROM "HourlyRosalind"').then(data =>
                res.json(data)).catch(err=> res.status(404).json({error: err.message}));;
});
/*
app.get(BASE_URL + "test/writePoints", (req, res, next) => {
    let data = req.body.map(point => {
        return {
            measurement: "cpu_load_short",
            tags: {host: point.host, direction: point.direction},
            fields: {value: point.value}
        }
    });
    influx.writePoints(data)
    .catch(err => console.log(err))
    .then(result => res.json({done: true}));
})

app.get(BASE_URL + "test/writePoint", (req, res, next) => {
    let data = [JSON.parse(req.body)].map(point => {
        // console.log(typeof point.time)
        return {
            measurement: "cpu_load_short",
            // timestamp: point.time,
            tags: {host: point.host, direction: point.direction},
            fields: {value: point.value}
        }
    });
    influx.writePoints(data)
    .catch(err => console.log(err))
    .then(result => res.json({done: true}));
})
*/
/*
.########.########..######..########..........##.....######..########.########.##.....##.########.
....##....##.......##....##....##............##.....##....##.##..........##....##.....##.##.....##
....##....##.......##..........##...........##......##.......##..........##....##.....##.##.....##
....##....######....######.....##..........##........######..######......##....##.....##.########.
....##....##.............##....##.........##..............##.##..........##....##.....##.##.......
....##....##.......##....##....##........##.........##....##.##..........##....##.....##.##.......
....##....########..######.....##.......##...........######..########....##.....#######..##.......
*/

/*app.get(BASE_URL + "test/populatedb", (req, res, next) => {
    influx.writePoints([
        {  
            measurement: 'cpu_load_short',
            tags: { 
                title: 'Rosalind1'
            },
            fields: {
                lat: 1,
                lng:5,
                direction1: 'East',
                direction2: 'West',
                bikeDir1: 1,
                bikeDir2: 1,
                pedDir1: 1,
                pedDir2: 1 
            }
        },
        {
            
            measurement: 'cpu_load_short',
            tags: { 
                title: 'Bendigo'
            },
            fields: {
                lat: -36.757234,
                lng: 144.279113,
                bike: 100,
                pedestrian: 12
            }
        },
        {
            measurement: 'cpu_load_short',
            tags: {host: 'server11', direction: "out"},
            fields: {value:  444.99}
        }
    ])
    .catch(err => console.log(err))
    .then(result => res.json(result))
});*/

// Query for locations of the markers
app.get(BASE_URL + "mapping", (req, res, next) => {

    influx.writePoints([
        {
            measurement: 'Location',
            tags: {
                title: 'Rosalind 1'
            },
            fields: {            
                    lat: -36.748794,
                    lng: 144.290756, 
                    bike: 264,
                    pedestrian: 23
            }
        },
        {
            measurement: 'Location',
            tags: { 
                title: 'Bendigo'
            },
            fields: {
                    lat: -36.757234,
                    lng: 144.279113,
                    bike: 100,
                    pedestrian: 12
            }
        }
    ])
.catch(err => console.log(err))
.then(result => res.json(result))
influx.query('SELECT lat, lng, bike, pedestrian FROM Location').then(data =>
    res.json(data)).catch(err => res.status(404).json({error: err.message}));;
});

app.get(BASE_URL + "sendSingleData", (req, res, next) => {
    let data = JSON.parse(req.body);
    let date = new Date();
    let timestamp = ((date/1000)-(date%1000/1000)) - data.timestamp;
    console.log(timestamp);
    influx.writePoints([
        {
            measurement: 'Location',
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
    influx.query('SELECT lat, lng, bike, pedestrian FROM Location').then(data =>
        res.json(data)).catch(err => res.status(404).json({error: err.message}));;
});

// Create a mock data. 
//Query for data
app.get(BASE_URL + "counts", (req, res, next) => {
    influx.writePoints([
        {
            measurement: 'Rosalind',
            tags: { 
                title: 'Rosalind'
            },
            fields: {            
                    bikeW: 15,
                    bikeE: 5,
                    pedestrianW: 18,
                    pedestrianE: 19
            }
        },
        {
            measurement: 'Bendigo',
            tags: { 
                title: 'Bendigo'
            },
            fields: {            
                    bikeW: 20,
                    bikeE: 6,
                    pedestrianW: 13,
                    pedestrianE: 14
            }
        }

    ])
    .catch(err => console.log(err))
    .then(result => res.json(result))
    influx.query('SELECT bikeW, bikeE, pedestrianW, pedestrianE FROM Rosalind').then(data =>
        res.json(data)).catch(err => res.status(404).json({error: err.message}));;
});

// Query for data based on location for hourly
app.get(BASE_URL + "Hourly" + ":point", (req, res, next) => {

    var nameUrl = req.params.point;
    var customSelect = 'SELECT * FROM ' + nameUrl;

    influx.query(customSelect).then(data =>
        res.json(data)).catch(err => res.status(404).json({error: err.message}));;
});

// Query for data based on location for weekly
app.get(BASE_URL + "Weekly" + ":point", (req, res, next) => {

    var nameUrl = req.params.point;
    var customSelect = 'SELECT * FROM ' + nameUrl;

    influx.query(customSelect).then(data =>
        res.json(data)).catch(err => res.status(404).json({error: err.message}));;
});

// Query for data based on location for daily
app.get(BASE_URL + "Daily" + ":point", (req, res, next) => {

    var nameUrl = req.params.point;
    var customSelect = 'SELECT * FROM ' + nameUrl;

    influx.query(customSelect).then(data =>
        res.json(data)).catch(err => res.status(404).json({error: err.message}));;
});

// Query for data based on location for monthly

app.get(BASE_URL + "Monthly" + ":point", (req, res, next) => {

    var nameUrl = req.params.point;
    var customSelect = 'SELECT * FROM ' + nameUrl;

    influx.query(customSelect).then(data =>
        res.json(data)).catch(err => res.status(404).json({error: err.message}));;
});

// Query for data based on location for yearly
app.get(BASE_URL + "Yearly" + ":point", (req, res, next) => {

    var nameUrl = req.params.point;
    var customSelect = 'SELECT * FROM ' + nameUrl;

    influx.query(customSelect).then(data =>
        res.json(data)).catch(err => res.status(404).json({error: err.message}));;
});

app.get(BASE_URL + "pullHours", (req, res, next)=>{
    let s = new Date(((Math.floor(Date.now()/1000)-3600*pointsPulled)*1000)).toISOString();
    let queryString = 'SELECT * FROM cpu_load_short WHERE time > \'' + s + '\'';
    influx.query(queryString).then(data =>
    res.json(data)).catch(err=> res.status(404).json({error: err.message}));;
});

app.get(BASE_URL + "pullDays", (req, res, next)=>{
    let s = new Date(((Math.floor(Date.now()/1000)-86400*pointsPulled)*1000)).toISOString();
    let queryString = 'SELECT * FROM cpu_load_short WHERE time > \'' + s + '\'';
    influx.query(queryString).then(data =>
    res.json(data)).catch(err=> res.status(404).json({error: err.message}));;
});

app.get(BASE_URL + "pullWeeks", (req, res, next)=>{
    let s = new Date(((Math.floor(Date.now()/1000)-604800*pointsPulled)*1000)).toISOString();
    let queryString = 'SELECT * FROM cpu_load_short WHERE time > \'' + s + '\'';
    influx.query(queryString).then(data =>
    res.json(data)).catch(err=> res.status(404).json({error: err.message}));;
});

app.get(BASE_URL + "pullMonths", (req, res, next)=>{
    let s = new Date(((Math.floor(Date.now()/1000)-604800*pointsPulled)*1000)).toISOString();
    let queryString = 'SELECT * FROM cpu_load_short WHERE time > \'' + s + '\'';
    influx.query(queryString).then(data =>
    res.json(data)).catch(err=> res.status(404).json({error: err.message}));;
});

app.get(BASE_URL + "pullCustom", (req, res, next)=>{
    let s = new Date(((Math.floor(Date.now()/1000)-(req.body)*pointsPulled)*1000)).toISOString();
    let queryString = 'SELECT * FROM cpu_load_short WHERE time > \'' + s + '\'';
    influx.query(queryString).then(data =>
    res.json(data)).catch(err=> res.status(404).json({error: err.message}));;
});

app.get(BASE_URL + "pullTest", (req, res, next)=>{
    let data = new Array(10*2);
    for(i=0;i<data.length;i++){data[i] = 0;}
    let lastDate = (Math.floor(Date.now()/1000)-10*86400)*1000;
    let s = new Date(lastDate).toISOString();
    let queryString = 'SELECT * FROM cpu_load_short WHERE time > \'' + s + '\' AND  "title" = \'Rosalind1\'';
    influx.query(queryString).then(results =>{
    var i;
    for(i=0;i<results.length;i++){
    var time = ((Math.floor(Date.now()/1000))*1000)-Date.parse(results[i].time);
    data[19-(Math.floor(time/86400000)*2)] = results[i].pedDir1;
    data[19-(Math.floor((time/86400000)*2+1))]= results[i].bikeDir1;
    }
    res.json(data);
    }).catch(err=> res.status(404).json({error: err.message}));;

});
