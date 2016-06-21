#!/usr/bin/env node

'use strict';

var axios = require('axios');
var R = require('ramda');
var geolib = require('geolib');

var chalk = require('chalk');
var Table = require('cli-table2');
var table = new Table({ style:{border:[ ],header:[]} });

if (process.argv.length<3) {
    console.log('Usage: cli-hsl-bike station');
    return process.exit(0);
}

var targetStation = process.argv[2];

var addStation = (station) => {
    var totalSpaces = station.bikesAvailable + station.spacesAvailable;
    var distance = station.distance > 0 ? station.distance + 'm' : '';
    var amountColor = station.bikesAvailable < 2 ? chalk.red : chalk.yellow;
    table.push([ distance, chalk.green(station.name), amountColor(station.bikesAvailable + '/' + totalSpaces)]);
};

var addStations = R.forEach(addStation);

var findTargetStationByName = R.find(R.propEq('name', targetStation));

var renameKeys = R.curry((keysMap, obj) => {
  return R.reduce((acc, key) => {
    acc[keysMap[key] || key] = obj[key];
    return acc;
  }, {}, R.keys(obj));
});

var XYtoLatLong = R.map(renameKeys({ y: 'latitude', x: 'longitude'}));

var instance = axios.create({
    headers: { 
        'Accept': 'application/json; charset=utf-8', 
        'Content-Type': 'application/json; charset=utf-8' 
    }
});

instance.get('http://api.digitransit.fi/routing/v1/routers/hsl/bike_rental')
    .then((result) => {
        var stations = XYtoLatLong(result.data.stations);
        var targetStation = findTargetStationByName(stations);
        var nearestStations = R.slice(0, 5, geolib.orderByDistance(targetStation, stations));
        addStations(nearestStations);
    })
    .then(() => {
        console.log(table.toString());
    })
    .catch(function (error) {
        console.log(error);
    });
    
