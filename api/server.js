var express = require("express")
var app = express()

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Influx = require('influx');
const influx = new Influx.InfluxDB('http://db:8086/mydb')

var HTTP_PORT = 8000

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

// Root path
app.get("/", (req, res, next) => {
    res.sendFile(__dirname + '/public/index.html')
});

app.get("/api/getdbdata", (req, res, next) => {
    influx.query('SELECT * FROM cpu_load_short').then(data =>
        res.json(data)).catch(err => res.status(404).json({error: err.message}));;
    //res.json(data)
});


/*
.########.########..######..########..........##.....######..########.########.##.....##.########.
....##....##.......##....##....##............##.....##....##.##..........##....##.....##.##.....##
....##....##.......##..........##...........##......##.......##..........##....##.....##.##.....##
....##....######....######.....##..........##........######..######......##....##.....##.########.
....##....##.............##....##.........##..............##.##..........##....##.....##.##.......
....##....##.......##....##....##........##.........##....##.##..........##....##.....##.##.......
....##....########..######.....##.......##...........######..########....##.....#######..##.......
*/

app.get("/test/makedb", (req, res, next) => {
    influx.query('CREATE DATABASE mydb; SHOW DATABASES')
    .then(data => res.status(200).json(data))
    .catch(err =>
        res.status(500)
        .json({error: err.message})
    );
});
app.get("/test/addData", (req, res, next) => {
    // console.log(req.body);
    // res.json(req.body);
    // data.forEach(element => {
    //     element.measurement = 'cpu_load_short';
    // });
    // console.log(data);
    let data = req.body.map(point => {
        return {
            measurement: "cpu_load_short",
            tags: {host: point.host, direction: point.direction, region: point.region},
            fields: {value: point.value}
        }
    });
    console.log(data);
    influx.writePoints(data)
    .catch(err => console.log(err))
    .then(result => res.json({done: true}));
})
app.get("/test/populatedb", (req, res, next) => {
    influx.writePoints([
        /*
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
        */
              //Data that according to data model
              {
                measurement: 'cpu_load_short',
                fields: 
                {
                    PedestrianN: 1,
                    CyclistN: 2,
                    PedestrianS: 3,
                    CyclistS: 2,
                    Direction1: "North",
                    Direction2: "South",
                    Altitude: 1.2,
                    Longitude: 3.5
                },
                tags: {LocationPoint: 1}
                
            },
            {
                measurement: 'cpu_load_short',
                fields: 
                {
                    PedestrianN: 2,
                    CyclistN: 4,
                    PedestrianS: 4,
                    CyclistS: 2,
                    Direction1: "North",
                    Direction2: "South",
                    Altitude: 2.0,
                    Longitude: 3.0
                },
                tags: {LocationPoint: 2}
            }
    ])
    .catch(err => console.log(err))
    .then(result => res.json(result))
});


