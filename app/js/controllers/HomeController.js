(function () {
  "use strict";

  var app = angular.module('shopApp');

  app.controller('HomeController', [HomeController]);

  function HomeController() {
    /**
     * Return current Date object
     * @returns {Date} date object of now
     */
    this.currentTime = function () {
      return new Date();
    };
  }
})();
