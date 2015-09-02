(function () {
  "use strict";

  // Declare app level module which depends on views, and components
  angular.module('shopApp', [
    'ngRoute'
  ]).
    config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/', {
        templateUrl: 'pages/home.html',
        controller: 'HomeController',
        controllerAs: 'home'
      }).when('/home', {
        redirectTo: '/'
      }).when('/about', {
        templateUrl: 'pages/about.html',
        controller: 'AboutController',
        controllerAs: 'about'
      }).when('/shop', {
        templateUrl: 'pages/shop.html',
        controller: 'ShopController',
        controllerAs: 'shop'
      }).otherwise({
        redirectTo: '/'
      });
    }]);
})();
