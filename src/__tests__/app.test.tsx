import React from "react";

import { render } from "@testing-library/react";
import { getByTestId } from "@testing-library/dom";

import {
  createHistory,
  createMemorySource,
  LocationProvider
} from "@reach/router";

import App from "../App";

function renderWithRouter(
  ui: React.ReactElement,
  { route = "/", history = createHistory(createMemorySource(route)) } = {}
) {
  return {
    ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
    history
  };
}

describe("App routing", () => {
  it("renders the intro page as default", () => {
    const {
      container,
      history: { navigate }
    } = renderWithRouter(<App />);

    const card = getByTestId(container, "intro-card");
  });

  it("renders the person page", () => {
    const {
      container,
      history: { navigate }
    } = renderWithRouter(<App />, {
      route: "/who"
    });

    const card = getByTestId(container, "person-form");
  });

  it("renders the rows page", () => {
    const {
      container,
      history: { navigate }
    } = renderWithRouter(<App />, {
      route: "/rows"
    });

    const card = getByTestId(container, "rows-grid");
  });

  it("renders the report page", () => {
    const {
      container,
      history: { navigate }
    } = renderWithRouter(<App />, {
      route: "/done"
    });

    const card = getByTestId(container, "report-grid");
  });
});
