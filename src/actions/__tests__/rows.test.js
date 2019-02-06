import { addRow, clearRows, updateRow } from "../rows";

describe("actions", () => {
  describe("rows", () => {
    describe("updateRow", () => {
      it("handles empty", () => {
        const action = updateRow();

        expect(action).toEqual({
          type: "UPDATE_ROW",
          row: undefined
        });
      });

      it("handles empty string", () => {
        const action = updateRow("");

        expect(action).toEqual({
          type: "UPDATE_ROW",
          row: ""
        });
      });

      it("handles object", () => {
        const action = updateRow({
          foo: "foo",
          bar: "bar",
          baz: {
            b1: "b1",
            b2: "b2"
          }
        });

        expect(action).toEqual({
          type: "UPDATE_ROW",
          row: {
            foo: "foo",
            bar: "bar",
            baz: {
              b1: "b1",
              b2: "b2"
            }
          }
        });
      });
    });

    describe("clearRows", () => {
      it("creates a clear action", () => {
        const action = clearRows();

        expect(action).toEqual({
          type: "CLEAR_ROWS"
        });
      });
    });

    describe("addRow", () => {
      it("creates an add action", () => {
        const action = addRow();

        expect(action).toEqual({
          type: "ADD_ROW"
        });
      });
    });
  });
});
