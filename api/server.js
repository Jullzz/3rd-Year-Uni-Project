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

app.get(BASE_URL + "testpoint", (req, res, next) => {
    res.json({sent: true})
});

app.get(BASE_URL + "getPointData", (req, res, next) => {
    influx.query('SELECT * FROM cpu_load_short').then(data =>
        res.json(data)).catch(err => res.status(404).json({error: err.message}));;
});

app.get(BASE_URL + "deleteAllData", (req, res, next) => {
    influx.query('DELETE FROM "cpu_load_short"').then(data =>
        res.json(data)).catch(err=> res.status(404).json({error: err.message}));;
});

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

/*
.########.########..######..########..........##.....######..########.########.##.....##.########.
....##....##.......##....##....##............##.....##....##.##..........##....##.....##.##.....##
....##....##.......##..........##...........##......##.......##..........##....##.....##.##.....##
....##....######....######.....##..........##........######..######......##....##.....##.########.
....##....##.............##....##.........##..............##.##..........##....##.....##.##.......
....##....##.......##....##....##........##.........##....##.##..........##....##.....##.##.......
....##....########..######.....##.......##...........######..########....##.....#######..##.......
*/
app.get(BASE_URL + "test/populatedb", (req, res, next) => {
    influx.writePoints([
        {
            measurement: 'cpu_load_short',
            tags: { 
                title: 'Rosalind1'
            },
            fields: {
                lat: 3.3,
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
                title: 'Rosalind1',
                timestamp: Math.round(new Date().getTime() +10 /1000)
            },
            fields: {
                lat: 3.3,
                lng: 5,
                direction1: 'East',
                direction2: 'West',
                bikeDir1: 2,
                bikeDir2: 2,
                pedDir1: 2,
                pedDir2: 2
            }
        },
        {
            measurement: 'cpu_load_short',
            tags: { 
                title: 'Rosalind1',
                timestamp: Math.round(new Date().getTime() +20 /1000)
            },
            fields: {
                lat: 3.3,
                lng:5,
                direction1: 'East',
                direction2: 'West',
                bikeDir1: 3,
                bikeDir2: 3,
                pedDir1: 3,
                pedDir2: 3 
            }
        }
    ])
    .catch(err => console.log(err))
    .then(result => res.json(result))
});


app.get(BASE_URL + "test/PullAllUnits", (req, res, next) => {
    let newobj = {
        title: '',
        counts: { bike: 0, pedestrian: 0 },
        pedestrian: [],
        bike: [],
        location: { lat: 0, lag: 0 },
        direction: {
            bike: {
                Dir1: 0,
                Dir2: 0,
            },
            pedestrian: {
                Dir1: 0,
                Dir2: 0,
            }
        }
    }
    influx.query('SELECT * FROM cpu_load_short').then(data => {
        for (i = 0; i < data.length; i++) {
            newobj.title = data[i].title;
            newobj.counts.bike += (data[i].bikeDir1 + data[i].bikeDir2);
            newobj.counts.pedestrian +=(data[i].pedDir2 +data[i].pedDir1);
            newobj.location.lat = data[i].lat;
            newobj.location.lag = data[i].lng;
            newobj.direction.bike.Dir1 = data[i].bikeDir1;
            newobj.direction.bike.Dir2 = data[i].bikeDir2;
            newobj.direction.pedestrian.Dir1 = data[i].pedDir1;
            newobj.direction.pedestrian.Dir2 = data[i].pedDir2;
            newobj.pedestrian.push(data[i].pedDir1 + data[i].pedDir2);
            newobj.bike.push(data[i].bikeDir1 + data[i].bikeDir2);
        }
        res.json(newobj).catch(err => res.status(404).json({ error: err.message }));;
    });;
});

