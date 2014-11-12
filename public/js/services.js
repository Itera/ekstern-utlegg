/* global angular */

var expensesApp = angular.module("expensesApp");

expensesApp.factory("DataStore", [function () {
    "use strict";

    return {
        data: {
            items: []
        }
    };
}]);