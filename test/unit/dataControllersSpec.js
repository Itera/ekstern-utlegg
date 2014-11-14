/* globals beforeEach describe expect it module inject */

describe("Controllers: DataController", function () {
    "use strict";

    var controller;

    beforeEach(function () {
        module("expensesApp");

        inject(function ($controller) {
            controller = $controller("DataController");
        });
    });

    function numbersForPrefix(prefix) {
        var numbers = [];

        ["", "+47", "+47 "].forEach(function (country) {
            numbers.push(country + prefix + "2345678");
            numbers.push(country + prefix + "2 34 56 78");
            numbers.push(country + prefix + "23 45 678");
        });

        return numbers;
    }

    it("should format non-recognized telephone numbers by simply returning them", function () {
        expect(controller.formatTlf("")).toEqual("");
        expect(controller.formatTlf("123")).toEqual("123");
        expect(controller.formatTlf("+47123")).toEqual("+47123");
        expect(controller.formatTlf("George")).toEqual("George");
    });

    it("should format non mobile telephone numbers correctly", function () {
        [1, 2, 3, 5, 6, 7].forEach(function (prefix) {
            numbersForPrefix(prefix).forEach(function (number) {
                expect(controller.formatTlf(number)).toEqual("+47 " + prefix + "2 34 56 78");
            });
        });
    });

    it("should format mobile telephone numbers correctly", function () {
        [4, 8, 9].forEach(function (prefix) {
            numbersForPrefix(prefix).forEach(function (number) {
                expect(controller.formatTlf(number)).toEqual("+47 " + prefix + "23 45 678");
            });
        });
    });

    it("should format account numbers correctly", function () {
        expect(controller.formatAccount("")).toEqual("");
        expect(controller.formatAccount("123")).toEqual("123");
        expect(controller.formatAccount("George")).toEqual("George");

        expect(controller.formatAccount("12341212345")).toEqual("1234.12.12345");
        expect(controller.formatAccount("1234 12 12345")).toEqual("1234.12.12345");
        expect(controller.formatAccount("1234.12.12345")).toEqual("1234.12.12345");
    });

    it("should sum correctly", function () {
        var items = [
            { cost: 123 },
            { cost: 456.20 },
            { cost: 789 }
        ];

        expect(controller.sum(items)).toEqual(1368.2);
    });
});

