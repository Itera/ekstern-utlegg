/* globals describe beforeEach module inject it expect spyOn localStorage moment */

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

describe("Services: LocalStorage", function () {
    "use strict";

    var store = {};
    var service;

    beforeEach(function () {
        module("expensesApp");

        spyOn(localStorage, "getItem").and.callFake(function (key) {
            return store[key];
        });

        spyOn(localStorage, "setItem").and.callFake(function (key, value) {
            store[key] = value;
        });

        inject(function (LocalStorage) {
            service = LocalStorage;
        });
    });

    it("should have empty items at start", function () {
        var storeData = service.getData();

        expect(storeData.items).toEqual([]);

        expect(JSON.parse(store["itera-expenses"]).items).toEqual([]);
    });

    it("should return dates as dates", function () {
        var date = moment("2014-12-01").toDate();

        var data = {
            items: [
                {
                    date: date
                }
            ]
        };

        service.setData(data);

        var storeData = service.getData();

        expect(storeData.items[0].date).toEqual(date);

        expect(moment(JSON.parse(store["itera-expenses"]).items[0].date).toDate()).toEqual(date);
    });
});