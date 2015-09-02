(function () {
  "use strict";

  var app = angular.module('shopApp');

  app.controller('ShopController',
    ['$scope', '$http', '$log', '$rootScope', '$timeout', ShopController]);

  function ShopController($scope, $http, $log, $rootScope, $timeout) {
    var placeholderProduct = {
      "brand": "Placeholder",
      "founder": {
        "last": "Rivera",
        "first": "Rose"
      },
      "color": "green",
      "age": 20,
      "picture": "http://lorempixel.com/100/100/sports?_=147",
      "balance": "1530.4",
      "id": 47
    };

    $scope.products = [placeholderProduct];
    $scope.errorMessage = false;

    $scope.humanizeDuration = function (duration) {
      return moment.duration(-duration, 'months').humanize();
    };

    // start fetching products
    function fetchProducts() {
      $rootScope.isLoading = true;

      // simulate loading delay
      $timeout(function () {
        $http.get('api/products.json').then(function (response) {
          $log.debug('Got success response', response);
          var data = response.data;
          if (angular.isArray(data)) {
            $scope.products = data;
          }
        }, function (error) {
          $log.error(error);
          $scope.errorMessage = error['data'] || 'something went wrong, review the output log';
        }).finally(function () {
          $rootScope.isLoading = false;
        });
      }, 2000);
    }

    fetchProducts();
  }
})();
