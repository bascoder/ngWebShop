(function () {
  "use strict";

  var app = angular.module('shopApp');
  app.directive('navBar',
    ['$location',
      function ($location) {
        return {
          restrict: 'E',
          templateUrl: 'templates/nav-bar.html',
          transclude: true,
          scope: false,
          link: function (scope, element, attrs) {

            scope.brand = "Bas' awesome ngWebShop";

            scope.isActive = function (viewLocation) {
              return viewLocation === $location.path();
            };
          }
        }
      }]);
})();
