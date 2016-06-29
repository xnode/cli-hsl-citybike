#!/usr/bin/env node

'use strict';

var program = require('commander');
var packageInfo = require('./package.json');
var R = require('ramda');
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

var targetStation = program.args[0];

var amountOfResults = program.simple ? 1 : 5;

var formatResults = program.simple ? require('./lib/output/simple') : require('./lib/output/table');

hslBike.fetch(targetStation, amountOfResults)
    .then(formatResults)
    .then((result) => {
        console.log(result.toString());
    })
    .catch(function (error) {
        console.log(error);
        program.help();
    });
    
