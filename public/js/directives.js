/* global angular */
/* global setTimeout */
/* global clearTimeout */

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

expensesApp.directive("initFocus", function () {
    "use strict";

    var timer;

    /* eslint-disable no-unused-vars */
    return function (scope, elm, attr) {
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(function () {
            elm[0].focus();
        }, 0);
    };
    /* eslint-enable no-unused-vars */
});