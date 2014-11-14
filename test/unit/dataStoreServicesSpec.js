/* globals describe beforeEach module inject it expect */

describe("Services: DataStore", function () {
    "use strict";

    var service;

    beforeEach(function () {
        module("expensesApp");

        inject(function (DataStore) {
            service = DataStore;
        });
    });

    it("should have empty items", function () {
        expect(service.data.items).toEqual([]);
    });
});
