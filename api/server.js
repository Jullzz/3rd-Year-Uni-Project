var express = require("express")
var app = express()

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Influx = require('influx');
const influx = new Influx.InfluxDB('http://db:8086/mydb');

const pointsPulled = 15;
var HTTP_PORT = 8000;

const BASE_URL = "/api/"

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT)) 
    influx.query('CREATE DATABASE mydb;').catch();
});

// Root path
app.get(BASE_URL, (req, res, next) => {
    res.sendFile(__dirname + '/public/index.html')
});


app.get(BASE_URL + "getPointData", (req, res, next) => {
    influx.query('SELECT * FROM cpu_load_short').catch().then(data =>
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

app.get(BASE_URL + "pullHours/:point", (req, res, next)=>{
    var i;
    var data = { Bike: {West: new Array(pointsPulled).fill(0), East: new Array(pointsPulled).fill(0)}, Ped:{West: new Array(pointsPulled).fill(0), East: new Array(pointsPulled).fill(0)}}; 
    influx.query('SELECT * FROM cpu_load_short WHERE time > \'' + (new Date((Math.floor(Date.now()/1000)-pointsPulled*3600)*1000)).toISOString() + '\' AND "title" = \''+req.params.point+'\'').then(results =>{
    for(i=0;i<results.length;i++){
     data.Ped.East[((pointsPulled)-1)-(Math.floor((((Math.floor(Date.now()/1000))*1000)-Date.parse(results[i].time))/(3600*1000)))] += results[i].pedDir1;
    data.Bike.East[((pointsPulled)-1)-(Math.floor((((Math.floor(Date.now()/1000))*1000)-Date.parse(results[i].time))/(3600*1000)))] += results[i].bikeDir1;
     data.Ped.West[((pointsPulled)-1)-(Math.floor((((Math.floor(Date.now()/1000))*1000)-Date.parse(results[i].time))/(3600*1000)))] += results[i].pedDir2;
    data.Bike.West[((pointsPulled)-1)-(Math.floor((((Math.floor(Date.now()/1000))*1000)-Date.parse(results[i].time))/(3600*1000)))] += results[i].bikeDir2;
    }

    res.json(data);}).catch(err=> res.status(404).json({error: err.message}));;
});

app.get(BASE_URL + "mapping", (req, res, next)=>{
var locations = new Array(2);
locations[0] = { title:"", lat: "", lng:"", counts:{bike: 0, ped: 0}};
locations[1] = { title:"", lat: "", lng:"", counts:{bike: 0, ped: 0}};
    influx.query('SELECT lat, title, lng, bikeDir1, bikeDir2, pedDir1, pedDir2 FROM cpu_load_short').then(data =>
        {
            var i =0;
            for(i=0;i<data.length;i++)
            {
                if(data[i].title=="Rosalind1")
                {
                    locations[0].title = data[i].title;
                    locations[0].lat = data[i].lat;
                    locations[0].lng = data[i].lng;
                    locations[0].counts.bike += data[i].bikeDir1 + data[i].bikeDir2;
                    locations[0].counts.ped += data[i].pedDir1 + data[i].pedDir2;
                }
		else
                {
                    locations[1].title = data[i].title;
                    locations[1].lat = data[i].lat;
                    locations[1].lng = data[i].lng;
                    locations[1].counts.bike += data[i].bikeDir1 + data[i].bikeDir2;
                    locations[1].counts.ped += data[i].pedDir1 + data[i].pedDir2;
                }
            }    
      res.json(locations)}).catch(err => res.status(404).json({error: err.message}));;
});

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
