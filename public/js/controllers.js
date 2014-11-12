/* global angular */
/* global moment */

var expensesApp = angular.module("expensesApp");

expensesApp.controller("TitleController", ["DataStore", function (DataStore) {
    "use strict";

    var self = this;

    self.title = function() {
        var date = moment().format("YYYY-MM-DD");

        if (DataStore.data.user && DataStore.data.user.name) {
            return date + " - " + DataStore.data.user.name + " - extern utlegg";
        } else {
            return date + " - extern utlegg";
        }
    };
}]);

expensesApp.controller("DataController", ["DataStore", function (DataStore) {
    "use strict";

    var self = this;

    self.data = DataStore.data;
    self.rows = DataStore.rows;

    self.tlfregex = /^(\+[0-9]{2} ?)?(([0-9]{3}[ -]?[0-9]{2}[ -]?[0-9]{3})|([0-9]{2}[ -]?[0-9]{2}[ -]?[0-9]{2}[ -]?[0-9]{2}))$/;
    self.accountregex = /^([0-9]{4})[. ]?([0-9]{2})[. ]?([0-9]{5})$/;

    self.addItem = function () {
        self.data.items.push({
            date: "",
            description: "",
            cost: "",
            supplier: ""
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

        if (self.accountregex.test(account)) {
            var parts = self.accountregex.exec(account);

            return parts[1] + "." + parts[2] + "." + parts[3];
        } else {
            return account;
        }
    };

    self.updateAccount = function() {
        self.data.user.account = self.formatAccount(self.data.user.account);
    };
}]);
