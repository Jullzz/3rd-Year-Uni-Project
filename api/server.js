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
    res.json({"API Working?": "true"})
});

app.get("/api/getdbdata", (req, res, next) => {
    influx.query('SELECT * FROM cpu_load_short').then(data =>
        res.json(data)).catch(err => res.status(404).json({error: err.message}));;
    //res.json(data)
});

app.get("/api/1", (req, res, next) => {
    influx.query('CREATE DATABASE mydb').then(data =>
    res.json(data)).catch(err => res.status(500).json({error: err.message}));
});

app.get("/api/3", (req, res, next) => {
    influx.query('INSERT INTO "mydb" cpu,host=serverA,region=us_west value=0.64').then(data =>
    res.json(data)).catch(err => res.status(500).json({error: err.message}));
}); //INSERT DOES NOT WORK

app.get("/api/2", (req, res, next) => {
    influx.query('SHOW DATABASES').then(data =>
    res.json(data)).catch(err => res.status(500).json({error: err.message}));
});
