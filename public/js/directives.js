/* global angular */

var expensesApp = angular.module("expensesApp");

expensesApp.directive("possibleMissing", [function () {
    "use strict";

    return {
        templateUrl: "views/possible.html",
        restrict: "A",
        scope: {
            text: "@",
            name: "@",
            page: "@"
        }
    };
}]);