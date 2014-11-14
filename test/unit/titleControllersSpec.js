/* globals describe beforeEach module inject it expect spyOn localStorage moment */

describe("Controllers: TitleController", function () {
    "use strict";

    beforeEach(function () {
        module("expensesApp");
    });

    it("should have default title without user", function () {
        var date = moment().format("YYYY-MM-DD");

        inject(function (LocalStorage, $controller) {
            spyOn(LocalStorage, "getData").and.callFake(function () {
                return {items: []};
            });

            var controller = $controller("TitleController");

            expect(controller.title()).toEqual(date + " - extern utlegg");
        });
    });

    it("should have user title with user", function () {
        var date = moment().format("YYYY-MM-DD");

        inject(function (LocalStorage, $controller) {
            spyOn(LocalStorage, "getData").and.callFake(function () {
                return {items: [], user: {name: "John McWimple"}};
            });

            var controller = $controller("TitleController");

            expect(controller.title()).toEqual(date + " - John McWimple - extern utlegg");
        });
    });
});

