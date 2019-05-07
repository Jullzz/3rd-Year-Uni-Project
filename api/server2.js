var express = require("express")
var app = express()

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Connect to single host
const Influx = require('influx');
const client = new Influx.InfluxDB
({
    database: 'my_db',
    host: 'localhost',
    port: 8086,
    username: '123',
    password: '123',
    schema: 
    [
        measurement: 'Matrix',
        fields:
        {
            PedestrianN: Influx.FieldType.INTEGER,
            CyclistN: Influx.FieldType.INTEGER,
            PedestrianS: Influx.FieldType.INTEGER,
            CyclistS: Influx.FieldType.INTEGER,
            Direction1: Influx.FieldType.STRING,
            Direction1: Influx.FieldType.STRING,
            Altitude: Influx.FieldType.INTEGER,
            Longitude: Influx.FieldType.INTEGER
        }
        tags:
        [
            'LocationPoint'
        ]
    ]
})

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

// Root path
app.get("/", (req, res, next) => {
    res.sendFile(__dirname + '/public/index.html')
});

app.get("/test/insertData", (req, res, next) => {
    influx.writePoints
    ([
        {
            measurement: 'Matrix',
            fields: 
            {
                PedestrianN: 1,
                CyclistN: 2,
                PedestrianS: 3,
                CyclistS: 2,
                Direction1: "North",
                Direction1: "South",
                Altitude: 1.2,
                Longitude: 3.5
            }
            tags: {LocationPoint: 1},
            
        }
    ])
    .catch(err => console.log(err))
    .then(result => res.json(result))
});

app.get("/api/getData", (req, res, next) => {
    influx.query('SELECT * FROM Matrix').then(data =>
        res.json(data)).catch(err => res.status(404).json({error: err.message}));;
    //res.json(data)
});