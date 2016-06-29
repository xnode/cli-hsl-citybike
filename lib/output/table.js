'use strict';

var R = require('ramda');
var Table = require('cli-table2');
var chalk = require('chalk');

var addSingleStation = R.curry((table, station) => {
    var totalSpaces = station.bikesAvailable + station.spacesAvailable;
    var distance = station.distance > 0 ? station.distance + 'm' : '';
    var amountColor = station.bikesAvailable < 2 ? chalk.red : chalk.yellow;
    table.push([ distance, chalk.green(station.name), 
                 amountColor(station.bikesAvailable + '/' + totalSpaces)]);
});

module.exports = (nearestStations) => {
     var table = new Table({ style:{border:[ ],header:[]} });
     R.forEach(addSingleStation(table), nearestStations);
     return table;
};