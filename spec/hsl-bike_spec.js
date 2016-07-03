'use strict';

var MockAdapter = require('axios-mock-adapter');
var hslBike = require('../lib/hsl-bike');

describe('get Stations', () => {
    var mock = new MockAdapter(hslBike.testInstance);

    beforeAll(() => {
        mock.onGet('http://api.digitransit.fi/routing/v1/routers/hsl/bike_rental').reply(200, {
            stations: [
                {
                    id: 'T1',
                    name: 'Test Place',
                    x: 1.968021,
                    y: 1.1648,
                    bikesAvailable: 3,
                    spacesAvailable: 13,
                    allowDropoff: true,
                    realTimeData: true
                },
                {
                    id: 'T2',
                    name: 'Test Place2',
                    x: 1.975561,
                    y: 2.167891,
                    bikesAvailable: 0,
                    spacesAvailable: 12,
                    allowDropoff: true,
                    realTimeData: true
                }
            ]
        });
    });

    afterAll(() => {
        mock.restore();
    });

    describe('by location', () => {
        it('contains total spaces', () => {

        });
    });

    describe('by station', () => {
        var response = {};

        beforeEach((done) => {
            response = {};
            hslBike.getByStation('Test Place', 5)
                .then((res) => {
                    response = res;
                    done();
                })
                .catch((error) => {
                    done.fail(error);
                });
        });

        it('expect name to be Test Place', () => {
            var station = response[0];
            expect(station.name).toEqual('Test Place');
        });

        it('expect to contain total spaces', () => {
            var station = response[0];
            expect(station.totalSpaces).toEqual(16);
        });

        it('expect to have distance 0', () => {
            var station = response[0];
            expect(station.distance).toEqual(0);
        });

        it('expect to have latitude and longitude', () => {
            var station = response[0];
            expect(station.latitude).toBeDefined();
            expect(station.longitude).toBeDefined();
        });
    });

    describe('by location', () => {
        var response = {};

        beforeEach((done) => {
            response = {};
            hslBike.getByLocation({
                    latitude: 1.975561,
                    longitude: 2.167891
                }, 5)
                .then((res) => {
                    response = res;
                    done();
                })
                .catch((error) => {
                    done.fail(error);
                });
        });

        it('expect name to be Test Place2', () => {
            var station = response[0];
            expect(station.name).toEqual('Test Place2');
        });

        it('expect to contain total spaces', () => {
            var station = response[0];
            expect(station.totalSpaces).toEqual(12);
        });

        it('expect to have id T2', () => {
            var station = response[0];
            expect(station.id).toEqual('T2');
        });

        it('expect to have latitude and longitude', () => {
            var station = response[0];
            expect(station.latitude).toBeDefined();
            expect(station.longitude).toBeDefined();
        });
    });
});