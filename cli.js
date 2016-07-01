#!/usr/bin/env node

'use strict';

var program = require('commander');
var packageInfo = require('./package.json');
var R = require('ramda');
var hslBike = require('./lib/hsl-bike');
var chalk = require('chalk');

program
    .usage('[options] <station>')
    .version(packageInfo.version)
    .description(packageInfo.description)
    .option('-j, --json', 'Output JSON.')
    .option('-s, --simple', 'Output one result.')
    .parse(process.argv);

if (!program.args.length) {
    program.help();
}

var targetStation = program.args[0];

var amountOfResults = program.simple ? 1 : 5;

if (program.simple) {
    var printResults = require('./lib/output/simple');
} else if (program.json) {
    var printResults = require('./lib/output/json');
} else {
    var printResults = require('./lib/output/table');
}

hslBike.getByStation(targetStation, amountOfResults)
    .then(printResults)
    .catch(function (error) {
        console.log(chalk.red(error.message));
        program.help();
    });
    
