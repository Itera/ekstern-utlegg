import reducer from "../personalia";
import { clearPersonalia, updatePersonalia } from "../../actions/personalia";

describe("reducers", () => {
  describe("personalia", () => {
    describe("clearPersonalia", () => {
      it("returns initial state if no state present", () => {
        const state = reducer(undefined, clearPersonalia());

        expect(state).toEqual({
          name: {
            value: "",
            valid: false,
            validReason: ""
          },
          address: {
            value: "",
            valid: false,
            validReason: ""
          },
          postcode: {
            value: "",
            valid: false,
            validReason: ""
          },
          town: {
            value: "",
            valid: false,
            validReason: ""
          },
          telephone: {
            value: "",
            valid: false,
            validReason: ""
          },
          email: {
            value: "",
            valid: false,
            validReason: ""
          },
          event: {
            value: "",
            valid: false,
            validReason: ""
          },
          dept: {
            value: "110 410",
            valid: true
          },
          account: {
            value: "",
            valid: false,
            validReason: ""
          }
        });
      });

      it("returns inital state with state present", () => {
        const state = reducer(
          {
            name: {
              value: "name",
              valid: true,
              validReason: undefined
            }
          },
          clearPersonalia()
        );

        expect(state).toEqual({
          name: {
            value: "",
            valid: false,
            validReason: ""
          },
          address: {
            value: "",
            valid: false,
            validReason: ""
          },
          postcode: {
            value: "",
            valid: false,
            validReason: ""
          },
          town: {
            value: "",
            valid: false,
            validReason: ""
          },
          telephone: {
            value: "",
            valid: false,
            validReason: ""
          },
          email: {
            value: "",
            valid: false,
            validReason: ""
          },
          dept: {
            value: "110 410",
            valid: true
          },
          event: {
            value: "",
            valid: false,
            validReason: ""
          },
          account: {
            value: "",
            valid: false,
            validReason: ""
          }
        });
      });
    });

    describe("updatePersonalia", () => {
      it("returns initial state if no state present", () => {
        const state = reducer(undefined, updatePersonalia({}));

        expect(state).toEqual({
          account: { valid: false, validReason: ["is invalid"], value: "" },
          address: {
            valid: false,
            validReason: ["is too short (minimum is 3 characters)"],
            value: ""
          },
          dept: { valid: true, validReason: undefined, value: "110 410" },
          email: {
            valid: false,
            validReason: ["is not a valid email"],
            value: ""
          },
          event: {
            valid: false,
            validReason: ["is too short (minimum is 3 characters)"],
            value: ""
          },
          name: {
            valid: false,
            validReason: ["is too short (minimum is 3 characters)"],
            value: ""
          },
          postcode: {
            valid: false,
            validReason: [
              "is the wrong length (should be 4 characters)",
              "is invalid"
            ],
            value: ""
          },
          telephone: { valid: false, validReason: ["is invalid"], value: "" },
          town: {
            valid: false,
            validReason: ["is too short (minimum is 2 characters)"],
            value: ""
          }
        });
      });

      it("performs validations", () => {
        const state = reducer(
          undefined,
          updatePersonalia({
            name: {
              value: "x"
            },
            address: {
              value: "x"
            },
            postcode: {
              value: "x"
            },
            telephone: {
              value: "x"
            },
            town: {
              value: "x"
            },
            event: {
              value: "x"
            },
            account: {
              value: "x"
            },
            email: {
              value: "x"
            },
            dept: {
              value: "123"
            }
          })
        );

        expect(state).toEqual({
          name: {
            value: "x",
            valid: false,
            validReason: ["is too short (minimum is 3 characters)"]
          },
          address: {
            value: "x",
            valid: false,
            validReason: ["is too short (minimum is 3 characters)"]
          },
          postcode: {
            value: "x",
            valid: false,
            validReason: [
              "is the wrong length (should be 4 characters)",
              "is invalid"
            ]
          },
          town: {
            value: "x",
            valid: false,
            validReason: ["is too short (minimum is 2 characters)"]
          },
          telephone: {
            value: "x",
            valid: false,
            validReason: ["is invalid"]
          },
          email: {
            value: "x",
            valid: false,
            validReason: ["is not a valid email"]
          },
          dept: {
            value: "123",
            valid: false,
            validReason: [
              "is the wrong length (should be 7 characters)",
              "is invalid"
            ]
          },
          event: {
            value: "x",
            valid: false,
            validReason: ["is too short (minimum is 3 characters)"]
          },
          account: {
            value: "x",
            valid: false,
            validReason: ["is invalid"]
          }
        });
      });

      it("accepts valid data", () => {
        const state = reducer(
          undefined,
          updatePersonalia({
            name: {
              value: "Alice"
            },
            address: {
              value: "Sognsveien 77b"
            },
            postcode: {
              value: "0805"
            },
            telephone: {
              value: "23007650"
            },
            town: {
              value: "Oslo"
            },
            event: {
              value: "Test"
            },
            account: {
              value: "12345678901"
            },
            email: {
              value: "contact@itera.no"
            },
            dept: {
              value: "123 456"
            }
          })
        );

        expect(state).toEqual({
          name: {
            value: "Alice",
            valid: true,
            validReason: undefined
          },
          address: {
            value: "Sognsveien 77b",
            valid: true,
            validReason: undefined
          },
          postcode: {
            value: "0805",
            valid: true,
            validReason: undefined
          },
          telephone: {
            value: "+47 23 00 76 50",
            valid: true,
            validReason: undefined
          },
          town: {
            value: "Oslo",
            valid: true,
            validReason: undefined
          },
          event: {
            value: "Test",
            valid: true,
            validReason: undefined
          },
          account: {
            value: "1234.56.78901",
            valid: true,
            validReason: undefined
          },
          dept: {
            value: "123 456",
            valid: true,
            validReason: undefined
          },
          email: {
            value: "contact@itera.no",
            valid: true,
            validReason: undefined
          }
        });
      });
    });
  });
});
