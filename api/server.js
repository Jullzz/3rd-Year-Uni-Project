var express = require("express")
var app = express()

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Influx = require('influx');
const influx = new Influx.InfluxDB('http://db:8086/mydb');

var HTTP_PORT = 8000

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
    influx.query('DELETE FROM "cpu_load_short"').then(data =>
        res.json(data)).catch(err=> res.status(404).json({error: err.message}));;
});

/*app.get(BASE_URL + "test/writePoints", (req, res, next) => {
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
})*/

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
            tags: {host: 'server02', direction: "out"},
            fields: {value: 3.2}
        },
        {
            measurement: 'cpu_load_short',
            tags: {host: 'server03', direction: "out"},
            fields: {value: 2.2}
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

app.get(BASE_URL + "sendSingleData", (req, res, next) => {
    let data = JSON.parse(req.body);
    let date = (new Date()).getTime()/1000 - data.timestamp;
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
            timestamp: date
        }
    ],
    {
        precision: 's'
    })
    .catch(err => console.log(err))
    .then(result => res.json(result))
});

app.get(BASE_URL + "frontPull", (req, res, next)=>{
    influx.query('SELECT * FROM "cpu_load_short" WHERE TIME > ' + String(getLastRecordedTime() - 86400*10)).then(data =>
    res.json(data)).catch(err=> res.status(404).json({error: err.message})).then(console.log("POOP"));;;
});