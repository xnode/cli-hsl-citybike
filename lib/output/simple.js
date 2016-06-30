'use strict';
var R = require('ramda');

module.exports = (nearestStations) => {
    var result = R.reduce((result, station) => {
        return result + station.name+' ' 
            + station.bikesAvailable + '/' 
            + station.totalSpaces;
    }, '', nearestStations);
    console.log(result);
};