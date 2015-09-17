(function () {
    "use strict";

    var app = angular.module('shopApp');

    app.value('placeholderProduct', {
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
    });
})();
