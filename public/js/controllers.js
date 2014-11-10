/* global angular */

var expensesApp = angular.module("expensesApp");

expensesApp.controller("DataController", ["DataStore", function (DataStore) {
    "use strict";

    var self = this;

    self.data = DataStore.data;
    self.rows = DataStore.rows;

    self.addItem = function () {
        self.data.items.push({
            date: "",
            description: "",
            cost: ""
        });
    };

    self.sum = function (items) {
        return items.reduce(function (a, b) {
            return a + b.cost;
        }, 0);
    };
}]);
