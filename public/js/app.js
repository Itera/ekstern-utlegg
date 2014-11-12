/* global angular */

var expensesApp = angular.module("expensesApp", ["ngRoute", "ui.bootstrap.showErrors"]);

expensesApp.config(["$routeProvider", function ($routeProvider) {
    "use strict";

    $routeProvider.when("/", {
        templateUrl: "views/front.html"
    }).when("/start", {
        templateUrl: "views/personalia.html"
    }).when("/rows", {
        templateUrl: "views/rows.html"
    }).when("/done", {
        templateUrl: "views/done.html"
    }).otherwise({redirectTo: "/"});
}]);
