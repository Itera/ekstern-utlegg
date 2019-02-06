import { updatePersonalia, clearPersonalia } from "../personalia";

describe("actions", () => {
  describe("personlia", () => {
    describe("updatePersonalia", () => {
      it("handles empty", () => {
        const action = updatePersonalia();

        expect(action).toEqual({
          type: "UPDATE_PERSONALIA",
          personalia: undefined
        });
      });

      it("handles empty string", () => {
        const action = updatePersonalia("");

        expect(action).toEqual({
          type: "UPDATE_PERSONALIA",
          personalia: ""
        });
      });

      it("handles object", () => {
        const action = updatePersonalia({
          foo: "foo",
          bar: "bar",
          baz: {
            b1: "b1",
            b2: "b2"
          }
        });

        expect(action).toEqual({
          type: "UPDATE_PERSONALIA",
          personalia: {
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

    describe("clearPersonalia", () => {
      it("creates a clear action", () => {
        const action = clearPersonalia();

        expect(action).toEqual({
          type: "CLEAR_PERSONALIA"
        });
      });
    });
  });
});
