(function () {
  "use strict";

  var app = angular.module('shopApp');

  app.controller('ShopController', ['$scope', '$http', '$log', ShopController]);

  function ShopController($scope, $http, $log) {
    $scope.products = [exampleProduct];
    $scope.errorMessage = false;

    $scope.humanizeDuration = function (duration) {
      return moment.duration(-duration, 'months').humanize();
    };

    $http.get('api/products.json').then(function (response) {
      $log.debug('Got success response', response);

      var data = response.data;
      if (angular.isArray(data)) {
        $scope.products = data;
      }
    }, function (error) {
      $log.error(error);
      $scope.errorMessage = error['data'] || 'something went wrong, review the output log';
    });

    var exampleProduct = {
      "brand": "Placeholder",
      "founder": {
        "last": "van Marwijk",
        "first": "Bas"
      },
      "color": "brown",
      "age": 84,
      "picture": "http://lorempixel.com/100/100/business",
      "balance": "$0.00",
      "id": 0
    };
  }
})();
