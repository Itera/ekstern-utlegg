/* global angular */

var expensesApp = angular.module("expensesApp");

expensesApp.factory("DataStore", [function () {
    "use strict";

    return {
        rows: function() {
            return this.data.items.filter(function (candidate) {
                return candidate.date && candidate.description && candidate.cost && candidate.supplier;
            });
        },
        data: {
            items: []
        }
    };
}]);