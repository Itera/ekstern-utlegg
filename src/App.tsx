import React, { useReducer } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

import Container from "@material-ui/core/Container";

import { Router, RouteComponentProps } from "@reach/router";

import Bar from "./bar";
import Intro from "./intro";
import Personal from "./personal";
import Rows from "./rows";
import Report from "./report";

import { Page } from "./types";
import { getInitialState, reducer } from "./reducer";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffffff"
    },
    secondary: red
  }
});

const Home: React.FC<RouteComponentProps> = () => {
  return <Intro />;
};

const Info: React.FC<RouteComponentProps & Page> = ({ state, dispatch }) => {
  return <Personal state={state} dispatch={dispatch} />;
};

const Payments: React.FC<RouteComponentProps & Page> = ({
  state,
  dispatch
}) => {
  return <Rows state={state} dispatch={dispatch} />;
};

const Done: React.FC<RouteComponentProps & Page> = ({ state, dispatch }) => {
  return <Report state={state} dispatch={dispatch} />;
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Bar />
        <Container>
          <Router>
            <Home path="/" />
            <Info path="/who" state={state} dispatch={dispatch} />
            <Payments path="/rows" state={state} dispatch={dispatch} />
            <Done path="/done" state={state} dispatch={dispatch} />
          </Router>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
