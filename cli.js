#!/usr/bin/env node

'use strict';

var program = require('commander');
var packageInfo = require('./package.json');
var R = require('ramda');

var chalk = require('chalk');
var Table = require('cli-table2');

var hslBike = require('./lib/hsl-bike');

program
    .usage('[options] <station>')
    .version(packageInfo.version)
    .description(packageInfo.description)
    .option('-j, --json', 'Output JSON.')
    .option('-s, --simple', 'Output one line')
    .parse(process.argv);

if (!program.args.length) {
    program.help();
}

var targetStation = process.argv[2];

var makeStationTable = (nearestStations) => {
     var table = new Table({ style:{border:[ ],header:[]} });
     R.forEach(addSingleStation(table), nearestStations);
     return table;
};

var addSingleStation = R.curry((table, station) => {
    var totalSpaces = station.bikesAvailable + station.spacesAvailable;
    var distance = station.distance > 0 ? station.distance + 'm' : '';
    var amountColor = station.bikesAvailable < 2 ? chalk.red : chalk.yellow;
    table.push([ distance, chalk.green(station.name), 
                 amountColor(station.bikesAvailable + '/' + totalSpaces)]);
});

hslBike.fetch(targetStation)
    .then(makeStationTable)
    .then((table) => {
        console.log(table.toString());
    })
    .catch(function (error) {
        console.log(error);
    });
    
