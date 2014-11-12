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

    self.formatAccount = function(account) {
        if (!account) {
            return account;
        }

        var re = /^([0-9]{4})[. ]?([0-9]{2})[. ]?([0-9]{5})$/;

        if (re.test(account)) {
            var parts = re.exec(account);

            return parts[1] + "." + parts[2] + "." + parts[3];
        } else {
            return account;
        }
    };

    self.updateAccount = function() {
        self.data.user.account = self.formatAccount(self.data.user.account);
    };
}]);
