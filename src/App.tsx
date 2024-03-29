import { Page, ViewPage } from "./types";
import React, { useReducer } from "react";
import { RouteComponentProps, Router } from "@reach/router";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { getInitialState, reducer } from "./reducer";

import Bar from "./bar";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Intro from "./intro";
import Personal from "./personal";
import Print from "./report/print";
import Report from "./report";
import Rows from "./rows";
import red from "@material-ui/core/colors/red";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: red,
  },
});

const Home: React.FC<RouteComponentProps> = () => {
  return <Intro />;
};

const Info: React.FC<RouteComponentProps & Page> = ({ state, dispatch }) => {
  return <Personal state={state} dispatch={dispatch} />;
};

const Payments: React.FC<RouteComponentProps & Page> = ({
  state,
  dispatch,
}) => {
  return <Rows state={state} dispatch={dispatch} />;
};

const Done: React.FC<RouteComponentProps & Page> = ({ state, dispatch }) => {
  return <Report state={state} dispatch={dispatch} />;
};

const PrintReport: React.FC<RouteComponentProps & ViewPage> = ({ state }) => {
  return <Print state={state} />;
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
            <PrintReport path="/print" state={state} />
          </Router>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
