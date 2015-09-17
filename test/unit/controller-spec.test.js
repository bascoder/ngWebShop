'use strict';

describe('shopApp controllers', function () {

    beforeEach(module('shopApp'));

    describe('HomeController', function () {
        var ctrl;
        beforeEach(inject(function ($controller) {
            ctrl = $controller('HomeController');
        }));

        it('should return current date', function () {
            var date = ctrl.currentTime();
            var testDate = new Date();

            expect(date.getYear()).toEqual(testDate.getYear());
            expect(date.getMonth()).toEqual(testDate.getMonth());
            expect(date.getDay()).toEqual(testDate.getDay());
            expect(date.getHours()).toEqual(testDate.getHours());
        });
    });

    describe('ShopController', function () {
        var ctrl, scope = {}, $httpBackend, $log,
            rootScope = {}, $timeout, responseHandler, defaultProduct;
        var mockProducts = [
            {
                "id": 0,
                "balance": "1457.47",
                "picture": "http://lorempixel.com/100/100/business?_=100",
                "age": 36,
                "color": "green",
                "founder": {
                    "first": "Norris",
                    "last": "Fisher"
                },
                "brand": "Insource"
            },
            {
                "id": 1,
                "balance": "1827.66",
                "picture": "http://lorempixel.com/100/100/sports?_=101",
                "age": 90,
                "color": "green",
                "founder": {
                    "first": "Lee",
                    "last": "Haynes"
                },
                "brand": "Entropix"
            },
            {
                "id": 2,
                "balance": "3494.24",
                "picture": "http://lorempixel.com/100/100/sports?_=102",
                "age": 50,
                "color": "yellow",
                "founder": {
                    "first": "Mckinney",
                    "last": "Rivers"
                },
                "brand": "Buzzness"
            },
            {
                "id": 3,
                "balance": "2702.64",
                "picture": "http://lorempixel.com/100/100/technics?_=103",
                "age": 69,
                "color": "green",
                "founder": {
                    "first": "Peck",
                    "last": "Bolton"
                },
                "brand": "Miracula"
            },
            {
                "id": 4,
                "balance": "1267.54",
                "picture": "http://lorempixel.com/100/100/technics?_=104",
                "age": 89,
                "color": "yellow",
                "founder": {
                    "first": "Stevenson",
                    "last": "Harrington"
                },
                "brand": "Nutralab"
            }
        ];

        beforeEach(inject(function (_$httpBackend_, _$log_, _$timeout_, placeholderProduct) {
            $httpBackend = _$httpBackend_;
            $log = _$log_;
            $timeout = _$timeout_;
            defaultProduct = placeholderProduct;
        }));

        beforeEach(inject(function(){
            responseHandler = $httpBackend.whenGET('api/products.json')
                .respond(mockProducts);
        }));

        beforeEach(inject(function ($controller) {
            ctrl = $controller('ShopController',
                {
                    $scope: scope,
                    $log: $log,
                    $rootScope: rootScope,
                    $timeout: $timeout
                });
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should humanize durations', function () {

            var couples = [{
                months: 6,
                str: '6 months'
            }, {
                months: 1,
                str: 'a month'
            }, {
                months: -3,
                str: '3 months'
            }, {
                months: 12,
                str: 'a year'
            }, {
                months: 15,
                str: 'a year' //TODO should be 15 months
            }];

            for (var i = 0; i < couples.length; i++) {
                var couple = couples[i];

                expect(scope.humanizeDuration(couple.months))
                    .toEqual(couple.str);
            }
        });

        it('should fill products', function () {

            runHttpRequests();

            var errors = $log.error.logs;
            var errorMessage = scope.errorMessage;

            expect(errorMessage).toBeFalsy();
            expect(errors.length).toEqual(0);
            expect(scope.products).toEqual(mockProducts);
        });

        it('should catch http errors', function () {
            var response = 'could not find resource on the server';
            responseHandler.respond(404, response);

            runHttpRequests();

            var errors = $log.error.logs;
            var errorMessage = scope.errorMessage;

            expect(errorMessage).toBe(response);
            expect(errors[0][0].data).toBe(response);
            expect(errors.length).toEqual(1);
            expect(scope.products[0]).toEqual(defaultProduct);
        });

        it('should catch an invalid response', function () {
            var response = {'foo': 'bar'};
            responseHandler.respond(200, response);

            runHttpRequests();

            var debugLogs = $log.debug.logs;
            var errorMessage = scope.errorMessage;

            expect(errorMessage).toBeFalsy();
            expect(debugLogs[0][1].data).toEqual(response);
            expect(debugLogs.length).toEqual(1);
            expect(scope.products[0]).toEqual(defaultProduct);
        });

        function runHttpRequests() {
            $timeout.flush();
            $httpBackend.flush();
        }
    });
});
