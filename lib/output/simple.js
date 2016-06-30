'use strict';
var R = require('ramda');

module.exports = (nearestStations) => {
    return R.reduce((result, station) => {
        return result + station.name+' ' 
            + station.bikesAvailable + '/' 
            + station.totalSpaces;
    }, '', nearestStations);
};