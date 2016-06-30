'use strict';

var axios = require('axios');
var R = require('ramda');
var geolib = require('geolib');

var instance = axios.create({
    headers: { 
        'Accept': 'application/json; charset=utf-8', 
        'Content-Type': 'application/json; charset=utf-8' 
    }
});

var renameKeys = R.curry((keysMap, obj) => {
  return R.reduce((acc, key) => {
    acc[keysMap[key] || key] = obj[key];
    return acc;
  }, {}, R.keys(obj));
});

var XYtoLatLong = R.map(renameKeys({ y: 'latitude', x: 'longitude'}));

module.exports.getByStation = (station, amount) => {
    var findTargetStationByName = R.find(R.propEq('name', station));
    return fetch().then((stations) => {
        var targetStation = findTargetStationByName(stations);
        return R.slice(0, amount, geolib.orderByDistance(targetStation, stations));
    });
};

var processResult = R.compose(XYtoLatLong, R.prop('stations'), R.prop('data'));

function fetch() {
    return instance.get('http://api.digitransit.fi/routing/v1/routers/hsl/bike_rental')
        .then(processResult);
};