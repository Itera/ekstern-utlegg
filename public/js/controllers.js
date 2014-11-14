/* globals angular moment */

var expensesApp = angular.module("expensesApp");

expensesApp.controller("TitleController", ["LocalStorage", function (LocalStorage) {
    "use strict";

    var self = this;

    self.title = function () {
        var date = moment().format("YYYY-MM-DD");

        var data = LocalStorage.getData();

        if (data.user && data.user.name) {
            return date + " - " + data.user.name + " - extern utlegg";
        } else {
            return date + " - extern utlegg";
        }
    };
}]);

expensesApp.controller("DataController", ["LocalStorage", function (LocalStorage) {
    "use strict";

    var self = this;

    self.data = LocalStorage.getData();

    self.rows = function() {
        return this.data.items.filter(function (candidate) {
            return candidate.date && candidate.description && candidate.cost && candidate.supplier;
        });
    };

    self.hasRows = function() {
        var candidateRows = this.data.items.filter(function (candidate) {
            return candidate.date && candidate.description && candidate.cost && candidate.supplier;
        });

        return candidateRows.length > 0;
    };

    self.tlfregex = /^(\+[0-9]{2} ?)?(([0-9]{3}[ -]?[0-9]{2}[ -]?[0-9]{3})|([0-9]{2}[ -]?[0-9]{2}[ -]?[0-9]{2}[ -]?[0-9]{2}))$/;
    self.accountregex = /^([0-9]{4})[. ]?([0-9]{2})[. ]?([0-9]{5})$/;

    self.minDate = moment().subtract(1, "years").format("YYYY-MM-DD");
    self.maxDate = moment().format("YYYY-MM-DD");

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

    self.formatAccount = function (account) {
        if (!account) {
            return account;
        }

        if (self.accountregex.test(account)) {
            var parts = self.accountregex.exec(account);

            return parts[1] + "." + parts[2] + "." + parts[3];
        } else {
            return account;
        }
    };

    self.formatTlf = function (tlf) {
        function format(number) {
            var prefix = number.substring(0, 1);

            var re;

            if (prefix === "4" || prefix === "8" || prefix === "9") {
                re = /([0-9]{3})([0-9]{2})([0-9]{3})/;
            } else {
                re = /([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})/;
            }

            var numberParts = re.exec(number);

            return numberParts.slice(1).join(" ");
        }

        if (!tlf) {
            return tlf;
        }

        if (self.tlfregex.test(tlf)) {
            var parts = self.tlfregex.exec(tlf);

            var land = parts[1];
            var number = parts[2];

            if (!land) {
                land = "+47";
            }

            land = land.replace(/ /g, "");
            number = number.replace(/ /g, "");

            return land + " " + format(number);
        } else {
            return tlf;
        }
    };

    self.updateAccount = function () {
        self.data.user.account = self.formatAccount(self.data.user.account);
        self.updateStore();
    };

    self.updateTlf = function () {
        self.data.user.tlf = self.formatTlf(self.data.user.tlf);
        self.updateStore();
    };

    self.updateStore = function() {
        LocalStorage.setData(self.data);
    };

    self.clearPersonalia = function() {
        self.data.user = {};
        self.data.name = "";
        self.updateStore();
    };

    self.clearRows = function() {
        self.data.items = [];
        self.updateStore();
    };
}]);
